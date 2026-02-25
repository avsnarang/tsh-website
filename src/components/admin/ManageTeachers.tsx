'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, Plus, Pencil, Trash2, X,
  AlertTriangle, CheckCircle, Upload, Download, Users
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
// Since CLASS_LEVEL_LABELS is not exported from Faculty.tsx, we'll define it here
const CLASS_LEVEL_LABELS = {
  'NTT': 'Pre-Primary (NTT)',
  'PRT': 'Primary (PRT)',
  'TGT': 'Secondary (TGT)',
  'PGT': 'Senior Secondary (PGT)'
} as const;

interface Teacher {
  id: string;
  full_name: string;
  subject: string | string[];
  class_level: 'NTT' | 'PRT' | 'TGT' | 'PGT';
  qualifications: string | string[];
  experience_years: number;
  photo_url?: string;
  is_visible: boolean;
  designation: string;
}

interface Column {
  key: keyof Teacher;
  label: string;
  sortable?: boolean;
}

// Export columns if needed elsewhere, or use it in the component
export const TEACHER_COLUMNS: Column[] = [
  { key: 'full_name', label: 'Full Name', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'class_level', label: 'Class Level', sortable: true },
  { key: 'designation', label: 'Designation', sortable: true },
  { key: 'qualifications', label: 'Qualifications', sortable: true },
  { key: 'experience_years', label: 'Experience (Years)', sortable: true }
];

const CLASS_LEVELS = ['NTT', 'PRT', 'TGT', 'PGT'] as const;

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Teacher;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, 'id' | 'is_visible'>>({
    full_name: '',
    subject: '', // Changed from [] to ''
    class_level: 'PGT',
    qualifications: '',
    experience_years: 0,
    photo_url: '',
    designation: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add handleSort function
  const handleSort = (key: keyof Teacher) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    
    const sortedTeachers = [...teachers].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      
      // Handle undefined or null values
      if (valA == null && valB == null) return 0;
      if (valA == null) return direction === 'asc' ? -1 : 1;
      if (valB == null) return direction === 'asc' ? 1 : -1;

      // Compare values based on their type
      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }

      // For numbers and other comparable types
      return direction === 'asc' 
        ? (valA < valB ? -1 : valA > valB ? 1 : 0)
        : (valB < valA ? -1 : valB > valA ? 1 : 0);
    });

    setTeachers(sortedTeachers);
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // Empty dependency array

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setUploadError('');
      
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('full_name');

      console.log('Fetch teachers result:', { data, error });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setUploadError('Failed to fetch teachers');
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

      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target?.result as string;
        const rows = csvData.split('\n').map(row => row.trim());
        const headers = rows[0].split(',').map(header => header.trim());

        // Add designation to required headers
        const requiredHeaders = ['full_name', 'subject', 'class_level', 'qualifications', 'experience_years', 'designation'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

        if (missingHeaders.length > 0) {
          setUploadError(`Missing required columns: ${missingHeaders.join(', ')}`);
          return;
        }

        const teachers = rows.slice(1).map(row => {
          const values = row.split(',').map(value => value.trim());
          const teacher: any = {};
          headers.forEach((header, index) => {
            teacher[header] = values[index];
          });
          return teacher;
        });

        const { error } = await supabase
          .from('teachers')
          .upsert(teachers.map(t => ({ ...t, is_visible: true })));

        if (error) throw error;

        setUploadSuccess(`Successfully uploaded ${teachers.length} teacher records`);
        await fetchTeachers();

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading teachers:', error);
      setUploadError('Failed to upload teacher data. Please check the CSV format.');
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = "full_name,subject,class_level,qualifications,experience_years,designation,photo_url\nJohn Doe,Mathematics,PGT,M.Sc. B.Ed.,15,Senior Teacher,https://example.com/photo.jpg\nJane Smith,English,TGT,M.A. B.Ed.,8,Teacher,";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_teachers.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleAddTeacher = async () => {
    try {
      setUploadError('');
      setUploadSuccess('');

      if (!newTeacher.full_name || !newTeacher.subject || !newTeacher.qualifications || !newTeacher.designation) {
        setUploadError('Please fill in all required fields');
        return;
      }

      // Create teacher data object with proper Postgres array formatting
      const teacherData = {
        full_name: newTeacher.full_name.trim(),
        // Convert comma-separated subjects to proper Postgres array format
        subject: Array.isArray(newTeacher.subject) 
          ? newTeacher.subject 
          : newTeacher.subject.split(',').map(s => s.trim()),
        class_level: newTeacher.class_level,
        // Convert comma-separated qualifications to proper Postgres array format
        qualifications: Array.isArray(newTeacher.qualifications)
          ? newTeacher.qualifications
          : newTeacher.qualifications.split(',').map(q => q.trim()),
        experience_years: typeof newTeacher.experience_years === 'string' 
          ? parseInt(newTeacher.experience_years, 10) 
          : newTeacher.experience_years,
        designation: newTeacher.designation.trim(),
        is_visible: true,
        ...(newTeacher.photo_url ? { photo_url: newTeacher.photo_url.trim() } : {})
      };

      const { error } = await supabase
        .from('teachers')
        .insert([teacherData])
        .select();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      setUploadSuccess('Teacher added successfully');
      setShowAddForm(false);
      setNewTeacher({
        full_name: '',
        subject: '',
        class_level: 'PGT',
        qualifications: '',
        experience_years: 0,
        photo_url: '',
        designation: ''
      });
      await fetchTeachers();
    } catch (error) {
      console.error('Error adding teacher:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to add teacher');
    }
  };

  const handleUpdateTeacher = async () => {
    if (!editingTeacher) return;

    try {
      setUploadError('');
      setUploadSuccess('');

      const { error } = await supabase
        .from('teachers')
        .update(editingTeacher)
        .eq('id', editingTeacher.id);

      if (error) throw error;

      setUploadSuccess('Teacher updated successfully');
      setEditingTeacher(null);
      await fetchTeachers();
    } catch (error) {
      console.error('Error updating teacher:', error);
      setUploadError('Failed to update teacher');
    }
  };

  const handleDeleteClick = (teacher: Teacher) => {
    console.log('Setting delete confirm for teacher:', teacher);
    setShowDeleteConfirm(teacher.id);
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    try {
      setUploadError('');
      console.log('Starting delete operation for ID:', teacherId);
      
      // First, let's verify we can read the teacher
      const { data: verifyData, error: verifyError } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', teacherId)
        .single();
      
      console.log('Verify teacher exists:', { verifyData, verifyError });

      if (verifyError) {
        throw new Error(`Verification failed: ${verifyError.message}`);
      }

      // Now attempt the delete
      const { data: deleteData, error: deleteError } = await supabase
        .from('teachers')
        .delete()
        .eq('id', teacherId)
        .select();

      console.log('Delete operation result:', { deleteData, deleteError });

      if (deleteError) {
        throw new Error(`Delete failed: ${deleteError.message}`);
      }

      setUploadSuccess('Teacher deleted successfully');
      setShowDeleteConfirm(null);
      await fetchTeachers();
    } catch (error) {
      console.error('Error in handleDeleteTeacher:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to delete teacher');
    }
  };

  const filteredTeachers = teachers.filter(teacher => 
    teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(teacher.subject) 
      ? teacher.subject.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      : teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    teacher.class_level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-neutral-light pb-24">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <div className="relative max-w-360 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-between gap-4 mb-8">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Dashboard
                </Link>
              </div>

              <div className="flex flex-col items-center gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-light/20 text-green rounded-full"
                >
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">Teacher Management</span>
                </motion.div>
              </div>
              
              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">Teachers</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Add, edit, or remove teachers from the directory. You can also bulk upload teacher data using a CSV file.
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Add Teacher Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-end"
          >
            <Button
              onClick={() => setShowAddForm(true)}
              variant="edit"
              className="flex items-center gap-2 px-6 py-3"
            >
              <Plus className="h-5 w-5" />
              Add New Teacher
            </Button>
          </motion.div>

          {/* Status Messages */}
          {uploadError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{uploadError}</span>
            </div>
          )}
          {uploadSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {/* File Upload Section */}
          <div className="mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl shadow-lg"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Bulk Upload Teachers</h3>
                <p className="text-sm text-neutral-dark/60">
                  Upload a CSV file containing teacher information
                </p>
              </div>
              <div className="flex items-center gap-2">
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
                  className="flex items-center gap-2 px-5 py-2.5"
                >
                  <Upload className="h-4 w-4" />
                  Upload CSV
                </Button>
                <Button
                  onClick={downloadSampleCSV}
                  variant="outline2"
                  className="flex items-center gap-2 px-5 py-2.5"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Search and Table Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/30" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-dark/10 focus:outline-hidden focus:ring-2 focus:ring-green/20"
                />
              </div>
            </div>

            {/* Teachers Table */}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-50">
                      {TEACHER_COLUMNS.map(column => (
                        <th 
                          key={column.key}
                          className="px-6 py-3 text-left text-sm font-semibold text-neutral-dark"
                        >
                          {column.sortable ? (
                            <button
                              onClick={() => handleSort(column.key)}
                              className="flex items-center gap-1 hover:text-green transition-colors"
                            >
                              {column.label}
                              {sortConfig?.key === column.key && (
                                <span className="text-green">
                                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </button>
                          ) : (
                            column.label
                          )}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4">{teacher.full_name}</td>
                        <td className="px-6 py-4">{Array.isArray(teacher.subject) ? teacher.subject.join(', ') : teacher.subject}</td>
                        <td className="px-6 py-4">{CLASS_LEVEL_LABELS[teacher.class_level]}</td>
                        <td className="px-6 py-4">{teacher.designation}</td>
                        <td className="px-6 py-4">{Array.isArray(teacher.qualifications) ? teacher.qualifications.join(', ') : teacher.qualifications}</td>
                        <td className="px-6 py-4">{teacher.experience_years} years</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => setEditingTeacher(teacher)}
                              variant="outline2"
                              className="h-9 w-9 p-0 flex items-center justify-center"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteClick(teacher)}
                              variant="redOutline"
                              className="h-9 w-9 p-0 flex items-center justify-center"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </Container>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {(showAddForm || editingTeacher) && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-100 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-neutral-dark">
                    {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTeacher(null);
                    }}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-neutral-dark mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editingTeacher?.full_name || newTeacher.full_name}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, full_name: e.target.value });
                        } else {
                          setNewTeacher({ ...newTeacher, full_name: e.target.value });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Subject</label>
                    <input
                      type="text"
                      value={editingTeacher?.subject || newTeacher.subject}
                      onChange={(e) => {
                        const subjects = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, subject: subjects.join(', ') });
                        } else {
                          setNewTeacher({ ...newTeacher, subject: subjects.join(', ') });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      required
                      placeholder="Enter subjects (comma-separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Class Level</label>
                    <select
                      value={editingTeacher?.class_level || newTeacher.class_level}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, class_level: e.target.value as Teacher['class_level'] });
                        } else {
                          setNewTeacher({ ...newTeacher, class_level: e.target.value as Teacher['class_level'] });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                    >
                      {CLASS_LEVELS.map((level) => (
                        <option key={level} value={level}>{CLASS_LEVEL_LABELS[level]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Designation</label>
                    <input
                      type="text"
                      value={editingTeacher?.designation || newTeacher.designation}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, designation: e.target.value });
                        } else {
                          setNewTeacher({ ...newTeacher, designation: e.target.value });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      required
                      placeholder="e.g., Senior Mathematics Teacher"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Qualifications</label>
                    <input
                      type="text"
                      value={editingTeacher?.qualifications || newTeacher.qualifications}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, qualifications: e.target.value });
                        } else {
                          setNewTeacher({ ...newTeacher, qualifications: e.target.value });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Experience (Years)</label>
                    <input
                      type="number"
                      value={editingTeacher?.experience_years || newTeacher.experience_years}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, experience_years: parseInt(e.target.value) });
                        } else {
                          setNewTeacher({ ...newTeacher, experience_years: parseInt(e.target.value) });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-dark mb-2">Photo URL (Optional)</label>
                    <input
                      type="url"
                      value={editingTeacher?.photo_url || newTeacher.photo_url}
                      onChange={(e) => {
                        if (editingTeacher) {
                          setEditingTeacher({ ...editingTeacher, photo_url: e.target.value });
                        } else {
                          setNewTeacher({ ...newTeacher, photo_url: e.target.value });
                        }
                      }}
                      className="w-full p-3 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-green/20"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      variant="outline2"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTeacher(null);
                      }}
                      className="px-6 py-2.5"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                      variant="edit"
                      className="px-6 py-2.5"
                    >
                      {editingTeacher ? 'Update' : 'Add'} Teacher
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-100 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display text-neutral-dark">Confirm Delete</h3>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-neutral-dark/70 mb-8">
                  Are you sure you want to delete this teacher? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline2"
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-6 py-2.5"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="delete"
                    onClick={() => handleDeleteTeacher(showDeleteConfirm)}
                    className="px-6 py-2.5"
                  >
                    Delete Teacher
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
