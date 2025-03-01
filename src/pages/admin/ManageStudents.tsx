import React, { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { parseCSV } from '@/lib/utils';
import type { Student } from '@/types';

export default function ManageStudents(): JSX.Element {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!event.target.files?.[0]) return;
    
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const file = event.target.files[0];
      const students = await parseCSV(file);
      
      const { error } = await supabase
        .from('students')
        .upsert(students, { 
          onConflict: 'admission_number',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      setUploadSuccess(`Successfully uploaded ${students.length} student records`);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setUploadError('Failed to upload student data. Please check the CSV format.');
      console.error('Error uploading students:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleCSV = (): void => {
    const csvContent = "admission_number,full_name,class\nA12345,John Doe,10A\nB67890,Jane Smith,11B";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="manage-students">
      {/* Your JSX */}
    </div>
  );
}
