import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { 
  ArrowLeft, Upload, Download, CheckCircle, AlertTriangle, 
  Search, Plus, Pencil, Trash2, X, Check 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

interface Student {
  admission_number: string;
  full_name: string;
  class: string;
}

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 5 * 1024 * 1024; // 5MB limit

    try {
      setIsUploading(true);
      setUploadError('');
      setUploadSuccess('');

      // Validate file type
      if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
        setUploadError('Please upload a CSV file');
        setIsUploading(false);
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        setUploadError('File size must be less than 5MB');
        setIsUploading(false);
        return;
      }

      // Read file content
      const text = await file.text();
      const rows = text.split('\n').map(row => row.trim()).filter(Boolean);
      
      // Validate CSV structure
      if (rows.length < 2) {
        setUploadError('CSV file must contain at least a header row and one data row');
        setIsUploading(false);
        return;
      }

      // Validate header row
      const headerRow = rows[0].toLowerCase();
      if (!headerRow.includes('admission_number') || !headerRow.includes('full_name')) {
        setUploadError('CSV must contain "admission_number" and "full_name" columns');
        setIsUploading(false);
        return;
      }

      // Process data rows
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
        setIsUploading(false);
        return;
      }

      // Upload to Supabase
      const { error } = await supabase
        .from('students')
        .upsert(students, { 
          onConflict: 'admission_number',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      setUploadSuccess(`Successfully uploaded ${students.length} student records`);
      fetchStudents();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading students:', error);
      setUploadError('Failed to upload student data. Please check the CSV format.');
    } finally {
      setIsUploading(false);
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

  const handleAddStudent = async () => {
    try {
      setUploadError('');
      
      // Validate required fields
      if (!newStudent.admission_number || !newStudent.full_name) {
        setUploadError('Admission number and full name are required');
        return;
      }

      const { error } = await supabase
        .from('students')
        .insert([newStudent]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setUploadError('A student with this admission number already exists');
          return;
        }
        throw error;
      }

      setUploadSuccess('Student added successfully');
      setShowAddForm(false);
      setNewStudent({ admission_number: '', full_name: '', class: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      setUploadError('Failed to add student');
    }
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;

    try {
      setUploadError('');
      
      // Validate required fields
      if (!editingStudent.full_name) {
        setUploadError('Full name is required');
        return;
      }

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
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      setUploadError('Failed to update student');
    }
  };

  const handleDeleteStudent = async (admissionNumber: string) => {
    try {
      setUploadError('');
      
      // First check if student has any RSVPs
      const { data: rsvps, error: rsvpError } = await supabase
        .from('event_rsvps')
        .select('id')
        .eq('admission_number', admissionNumber)
        .limit(1);

      if (rsvpError) throw rsvpError;

      // If student has RSVPs, delete them first
      if (rsvps && rsvps.length > 0) {
        const { error: deleteRsvpsError } = await supabase
          .from('event_rsvps')
          .delete()
          .eq('admission_number', admissionNumber);

        if (deleteRsvpsError) throw deleteRsvpsError;
      }

      // Then delete the student
      const { error: deleteStudentError } = await supabase
        .from('students')
        .delete()
        .eq('admission_number', admissionNumber);

      if (deleteStudentError) throw deleteStudentError;

      setUploadSuccess('Student deleted successfully');
      setShowDeleteConfirm(null);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setUploadError('Failed to delete student. Please try again.');
    }
  };

  const filteredStudents = students.filter(student => 
    student.admission_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl text-neutral-dark mb-2">Student Data Management</h1>
                <p className="text-neutral-dark/80">Upload and manage student admission records</p>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="edit"
                  disabled={isUploading}
                  onClick={downloadSampleCSV}
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download Sample CSV
                </Button>
                <div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    disabled={isUploading}
                    ref={fileInputRef}
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    {isUploading ? 'Uploading...' : 'Upload CSV File'}
                  </Button>
                </div>
              </div>
            </div>

            {uploadError && (
              <div className="mb-6 flex items-center gap-2 bg-red-100 text-red-700 p-4 rounded-lg">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p>{uploadError}</p>
              </div>
            )}

            {uploadSuccess && (
              <div className="mb-6 flex items-center gap-2 bg-green-100 text-green-700 p-4 rounded-lg">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <p>{uploadSuccess}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Search and Add Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Student
                </Button>
              </div>

              {/* Student Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-dark/10">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-dark">
                        Admission Number
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-dark">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-dark">
                        Class
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-neutral-dark">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-dark/10">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-neutral-dark/60">
                          Loading students...
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-neutral-dark/60">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr 
                          key={student.admission_number}
                          className="hover:bg-neutral-light/50 transition-colors"
                        >
                          {editingStudent?.admission_number === student.admission_number ? (
                            <>
                              <td className="px-6 py-4 text-neutral-dark">
                                {student.admission_number}
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  type="text"
                                  value={editingStudent.full_name}
                                  onChange={(e) => setEditingStudent({
                                    ...editingStudent,
                                    full_name: e.target.value
                                  })}
                                  className="w-full px-3 py-1 rounded border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </td>
                              <td className="px-6 py-4">
                                <input
                                  type="text"
                                  value={editingStudent.class}
                                  onChange={(e) => setEditingStudent({
                                    ...editingStudent,
                                    class: e.target.value
                                  })}
                                  className="w-full px-3 py-1 rounded border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <Button
                                  variant="edit"
                                  onClick={handleUpdateStudent}
                                  className="inline-flex items-center gap-1"
                                >
                                  <Check className="h-4 w-4" />
                                  Save
                                </Button>
                                <Button
                                  onClick={() => setEditingStudent(null)}
                                  className="inline-flex items-center gap-1"
                                >
                                  <X className="h-4 w-4" />
                                  Cancel
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 text-neutral-dark">
                                {student.admission_number}
                              </td>
                              <td className="px-6 py-4 text-neutral-dark">
                                {student.full_name}
                              </td>
                              <td className="px-6 py-4 text-neutral-dark">
                                {student.class}
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <Button
                                  variant="edit"
                                  onClick={() => setEditingStudent(student)}
                                  className="inline-flex items-center gap-1"
                                >
                                  <Pencil className="h-4 w-4" />
                                  Edit
                                </Button>
                                <Button
                                  variant="delete"
                                  onClick={() => setShowDeleteConfirm(student.admission_number)}
                                  className="inline-flex items-center gap-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </Button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-neutral-dark">Add New Student</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-neutral-dark/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-neutral-dark" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-neutral-dark mb-2">Admission Number</label>
                <input
                  type="text"
                  value={newStudent.admission_number}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    admission_number: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-dark mb-2">Full Name</label>
                <input
                  type="text"
                  value={newStudent.full_name}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    full_name: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-dark mb-2">Class</label>
                <input
                  type="text"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    class: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outline2"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStudent}
                disabled={!newStudent.admission_number || !newStudent.full_name}
              >
                Add Student
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-2xl font-semibold">Delete Student</h2>
            </div>
            <p className="text-neutral-dark/80 mb-8">
              Are you sure you want to delete this student? This action cannot be undone.
              Any existing RSVPs for this student will also be removed.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline2"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="delete"
                onClick={() => showDeleteConfirm && handleDeleteStudent(showDeleteConfirm)}
              >
                Delete Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}