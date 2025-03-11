import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Search, Plus, Pencil, Trash2, X,
  AlertTriangle, CheckCircle, Upload, Download, Users
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
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
  const [loading, setLoading] = useState(false);
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

      <div className="relative pt-32 pb-24">
        <Container>
          <div className="max-w-[90rem] mx-auto">
            <motion.div
              className="flex-1 text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back to Dashboard Link */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 text-neutral-dark hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Dashboard
                </Link>
              </div>

              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-green" />
              </div>

              <h1 className="text-4xl font-bold text-neutral-dark mb-4">
                Manage Teachers
              </h1>

              <p className="text-neutral-dark/60 max-w-2xl mx-auto mb-8">
                Add, edit, or remove teachers from the directory. You can also bulk upload teacher data using a CSV file.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="edit"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Add Teacher
                  </Button>
                </div>
              </div>
            </motion.div>

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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-sm">
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
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Upload CSV
                  </Button>
                  <Button
                    onClick={downloadSampleCSV}
                    variant="outline2"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>

            {/* Search and Table Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/30" />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/20"
                  />
                </div>
              </div>

              {/* Teachers Table */}
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredTeachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-neutral-50">
                          <td className="px-6 py-4">{teacher.full_name}</td>
                          <td className="px-6 py-4">{Array.isArray(teacher.subject) ? teacher.subject.join(', ') : teacher.subject}</td>
                          <td className="px-6 py-4">{CLASS_LEVEL_LABELS[teacher.class_level]}</td>
                          <td className="px-6 py-4">{teacher.designation}</td>
                          <td className="px-6 py-4">{teacher.qualifications}</td>
                          <td className="px-6 py-4">{teacher.experience_years} years</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingTeacher(teacher)}
                                className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(teacher)}
                                className="p-1 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingTeacher) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTeacher(null);
                }}
                className="p-2 hover:bg-neutral-100 rounded-lg"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline2"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTeacher(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                  variant="edit"
                >
                  {editingTeacher ? 'Update' : 'Add'} Teacher
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
              Are you sure you want to delete this teacher? This action cannot be undone.
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
                onClick={() => {
                  console.log('Delete button clicked, ID:', showDeleteConfirm);
                  handleDeleteTeacher(showDeleteConfirm);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
