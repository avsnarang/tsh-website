'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Search, Plus, Pencil, Trash2, X, 
  AlertTriangle, CheckCircle, Users, Upload, Download 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Student {
  admission_number: string;
  full_name: string;
  class: string;
}

interface Column {
  key: keyof Student;
  label: string;
  sortable?: boolean;
}

const columns: Column[] = [
  { key: 'admission_number', label: 'Admission No.', sortable: true },
  { key: 'full_name', label: 'Full Name', sortable: true },
  { key: 'class', label: 'Class', sortable: true }
];

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    admission_number: '',
    full_name: '',
    class: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('admission_number');

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setUploadError('Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 5 * 1024 * 1024; // 5MB limit

    try {
      setUploadError('');
      setUploadSuccess('');

      if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
        setUploadError('Please upload a CSV file');
        return;
      }

      if (file.size > maxFileSize) {
        setUploadError('File size must be less than 5MB');
        return;
      }

      const text = await file.text();
      const rows = text.split('\n').map(row => row.trim()).filter(Boolean);
      
      if (rows.length < 2) {
        setUploadError('CSV file must contain at least a header row and one data row');
        return;
      }

      const headerRow = rows[0].toLowerCase();
      if (!headerRow.includes('admission_number') || !headerRow.includes('full_name')) {
        setUploadError('CSV must contain "admission_number" and "full_name" columns');
        return;
      }

      const students = rows.slice(1)
        .map(row => {
          const [admission_number, full_name, class_name] = row.split(',').map(cell => cell.trim());
          return { 
            admission_number, 
            full_name, 
            class: class_name 
          };
        })
        .filter(student => student.admission_number && student.full_name);

      if (students.length === 0) {
        setUploadError('No valid student records found in CSV');
        return;
      }

      const { error } = await supabase
        .from('students')
        .upsert(students, { 
          onConflict: 'admission_number',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      setUploadSuccess(`Successfully uploaded ${students.length} student records`);
      await fetchStudents();

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading students:', error);
      setUploadError('Failed to upload student data. Please check the CSV format.');
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "admission_number,full_name,class\nA12345,John Doe,10A\nB67890,Jane Smith,11B";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_students.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSort = (key: keyof Student) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    
    const sortedStudents = [...students].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setStudents(sortedStudents);
  };

  const handleAddStudent = async () => {
    try {
      setUploadError('');
      
      if (!newStudent.admission_number || !newStudent.full_name) {
        setUploadError('Admission number and full name are required');
        return;
      }

      const { error } = await supabase
        .from('students')
        .insert([newStudent]);

      if (error) {
        if (error.code === '23505') {
          setUploadError('A student with this admission number already exists');
          return;
        }
        throw error;
      }

      setUploadSuccess('Student added successfully');
      setShowAddForm(false);
      setNewStudent({ admission_number: '', full_name: '', class: '' });
      await fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      setUploadError('Failed to add student');
    }
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent?.admission_number || !editingStudent.full_name) {
      setUploadError('Full name is required');
      return;
    }

    try {
      setUploadError('');

      const { error } = await supabase
        .from('students')
        .update({
          full_name: editingStudent.full_name,
          class: editingStudent.class
        })
        .eq('admission_number', editingStudent.admission_number);

      if (error) throw error;

      setUploadSuccess('Student updated successfully');
      setEditingStudent(null);
      await fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      setUploadError('Failed to update student');
    }
  };

  const handleDeleteStudent = async (admissionNumber: string) => {
    try {
      setUploadError('');
      
      const { error: deleteStudentError } = await supabase
        .from('students')
        .delete()
        .eq('admission_number', admissionNumber);

      if (deleteStudentError) throw deleteStudentError;

      setUploadSuccess('Student deleted successfully');
      setShowDeleteConfirm(null);
      await fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setUploadError('Failed to delete student');
    }
  };

  const filteredStudents = students.filter(student => 
    student.admission_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-neutral-light">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <div className="relative pb-24">
        <Container>
          <div className="max-w-360 mx-auto">
            <motion.div
              className="flex-1 text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back to Dashboard Link */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Dashboard
                </Link>
              </div>

              {/* Section Tag */}
              <motion.div
                className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="h-4 w-4 mr-2" />
                <span className="font-semibold">Student Management</span>
              </motion.div>

              <h1 className="font-display text-5xl lg:text-7xl text-neutral-dark mb-6">
                Manage <span className="text-green">Students</span>
              </h1>
              <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto mb-12">
                Add, edit, and manage student records in the database
              </p>
            </motion.div>

            {/* Search and Actions Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-green/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="edit"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Student
                </Button>
              </div>
            </div>

            {/* Status Messages */}
            {uploadError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-8">
                <AlertTriangle className="h-5 w-5" />
                <p>{uploadError}</p>
              </div>
            )}
            {uploadSuccess && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg mb-8">
                <CheckCircle className="h-5 w-5" />
                <p>{uploadSuccess}</p>
              </div>
            )}

            {/* File Upload Section */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline2"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Upload CSV
                </Button>
                
                <Button
                  variant="outline2"
                  onClick={downloadSampleCSV}
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Sample CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-dark/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          onClick={() => column.sortable && handleSort(column.key)}
                          className={`px-6 py-3 text-left text-sm font-semibold text-gray-600 ${
                            column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {column.label}
                            {sortConfig?.key === column.key && (
                              <span className="text-gray-400">
                                {sortConfig.direction === 'asc' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          Loading...
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr 
                          key={student.admission_number}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.admission_number}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.full_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.class}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingStudent(student)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                              >
                                <Pencil className="h-4 w-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(student.admission_number)}
                                className="p-1 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add/Edit Modal */}
            {(showAddForm || editingStudent) && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {editingStudent ? 'Edit Student' : 'Add New Student'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingStudent(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Admission Number
                      </label>
                      <input
                        type="text"
                        value={editingStudent?.admission_number || newStudent.admission_number}
                        onChange={(e) => editingStudent 
                          ? setEditingStudent({...editingStudent, admission_number: e.target.value})
                          : setNewStudent({...newStudent, admission_number: e.target.value})
                        }
                        disabled={!!editingStudent}
                        className="w-full p-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editingStudent?.full_name || newStudent.full_name}
                        onChange={(e) => editingStudent
                          ? setEditingStudent({...editingStudent, full_name: e.target.value})
                          : setNewStudent({...newStudent, full_name: e.target.value})
                        }
                        className="w-full p-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Class
                      </label>
                      <input
                        type="text"
                        value={editingStudent?.class || newStudent.class}
                        onChange={(e) => editingStudent
                          ? setEditingStudent({...editingStudent, class: e.target.value})
                          : setNewStudent({...newStudent, class: e.target.value})
                        }
                        className="w-full p-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingStudent(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
                    >
                      {editingStudent ? 'Update' : 'Add'} Student
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Confirm Delete</h3>
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Are you sure you want to delete this student? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="delete"
                      onClick={() => handleDeleteStudent(showDeleteConfirm)}
                    >
                      Delete Student
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
