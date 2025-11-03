'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
  onUpload: (files: File[]) => Promise<string[]>; // Returns URLs
  onRemove?: (index: number) => void;
  files?: UploadedFile[];
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export default function FileUploader({
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  multiple = false,
  onUpload,
  onRemove,
  files: externalFiles,
  disabled = false,
  label = 'Click to upload and attach files or drag and drop',
  description,
  className = ''
}: FileUploaderProps) {
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const files = externalFiles || internalFiles;

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`;
    }
    if (accept && !accept.includes(file.type.split('/')[0])) {
      return 'Invalid file type';
    }
    return null;
  };

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: File[] = Array.from(selectedFiles);
    const remainingSlots = maxFiles - files.length;
    
    if (newFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more file(s)`);
      return;
    }

    const validFiles: UploadedFile[] = [];
    const errors: string[] = [];

    newFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
        validFiles.push({
          file,
          preview,
          progress: 0,
          status: 'pending'
        });
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      // Add files to state first (only if using internal state)
      if (!externalFiles) {
        setInternalFiles(prev => [...prev, ...validFiles.map(f => ({ ...f, status: 'uploading' as const }))]);
      }

      // Auto-upload
      setUploading(true);
      try {
        const filesToUpload = validFiles.map(f => f.file);
        const urls = await onUpload(filesToUpload);
        
        // Update files with success status and URLs (only if using internal state)
        // For external files, parent component handles state updates
        if (!externalFiles) {
          setInternalFiles(prev => {
            const updated = [...prev];
            validFiles.forEach((fileObj, index) => {
              const fileIndex = updated.findIndex(f => f.file === fileObj.file);
              if (fileIndex !== -1) {
                updated[fileIndex] = {
                  ...fileObj,
                  status: 'success',
                  progress: 100,
                  url: urls[index]
                };
              }
            });
            return updated;
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        console.error('FileUploader upload error:', error);
        
        // Update files with error status (only if using internal state)
        // For external files, parent component handles error state
        if (!externalFiles) {
          setInternalFiles(prev => {
            const updated = [...prev];
            validFiles.forEach((fileObj, index) => {
              const fileIndex = updated.findIndex(f => f.file === fileObj.file);
              if (fileIndex !== -1) {
                updated[fileIndex] = {
                  ...fileObj,
                  status: 'error',
                  error: errorMessage
                };
              }
            });
            return updated;
          });
        }
        
        // Show error alert for user feedback
        alert(`Upload failed: ${errorMessage}`);
        throw error;
      } finally {
        setUploading(false);
      }
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [files, maxFiles, accept, maxSize, onUpload, externalFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  }, [disabled, handleFileSelect]);

  const handleRemove = useCallback((index: number) => {
    if (onRemove) {
      onRemove(index);
    } else if (!externalFiles) {
      setInternalFiles(prev => {
        const updated = [...prev];
        const removed = updated.splice(index, 1)[0];
        if (removed.preview) {
          URL.revokeObjectURL(removed.preview);
        }
        return updated;
      });
    }
  }, [onRemove, externalFiles]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-neutral-dark mb-2 font-medium">
          {label}
          {description && (
            <span className="text-xs text-neutral-dark/50 block mt-1 font-normal">
              {description}
            </span>
          )}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all
          ${isDragging ? 'border-green bg-green-light/10' : 'border-neutral-dark/20'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-green'}
        `}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="text-center">
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? 'text-green' : 'text-neutral-dark/40'}`} />
          <p className="text-neutral-dark/70 mb-2">
            {disabled ? 'Upload disabled' : label}
          </p>
          {description && !label && (
            <p className="text-sm text-neutral-dark/50">{description}</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((fileObj, index) => (
              <motion.div
                key={`${fileObj.file.name}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-neutral-light rounded-lg border border-neutral-dark/10"
              >
                {fileObj.preview && (
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-dark truncate">
                    {fileObj.file.name}
                  </p>
                  <p className="text-xs text-neutral-dark/50">
                    {formatFileSize(fileObj.file.size)}
                  </p>
                  {fileObj.status === 'uploading' && (
                    <div className="mt-1">
                      <div className="w-full bg-neutral-dark/10 rounded-full h-1.5">
                        <motion.div
                          className="bg-green h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${fileObj.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {fileObj.status === 'error' && fileObj.error && (
                    <p className="text-xs text-red-500 mt-1">{fileObj.error}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {fileObj.status === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green" />
                  )}
                  {fileObj.status === 'error' && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  {fileObj.status === 'uploading' && (
                    <Loader2 className="h-5 w-5 text-green animate-spin" />
                  )}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(index);
                      }}
                      className="p-1 text-neutral-dark/50 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

