'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  FolderPlus,
  X,
  Image as ImageIcon,
  Loader2,
  Tag,
  FolderOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PhotoRecord {
  id: string;
  filename: string;
  storage_path: string;
  url: string;
  folder: string;
  tags: string[];
  size_bytes: number;
  content_type: string;
  width: number;
  height: number;
  created_at: string;
}

export default function PhotoLibrary() {
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingTags, setEditingTags] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoRecord | null>(null);

  // Upload state
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFolder, setUploadFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [uploadTags, setUploadTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('photo_library')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedFolder) {
      query = query.eq('folder', selectedFolder);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching photos:', error);
    } else {
      setPhotos(data || []);
      // Extract unique folders
      const allFolders = [...new Set((data || []).map((p: PhotoRecord) => p.folder))].sort();
      if (!selectedFolder) {
        setFolders(allFolders);
      }
    }
    setLoading(false);
  }, [selectedFolder]);

  // Fetch all folders separately so sidebar always shows all
  const fetchFolders = useCallback(async () => {
    const { data } = await supabase
      .from('photo_library')
      .select('folder');
    if (data) {
      const allFolders = [...new Set(data.map((p: { folder: string }) => p.folder))].sort();
      setFolders(allFolders);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const filteredPhotos = photos.filter(photo => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      photo.filename.toLowerCase().includes(q) ||
      photo.tags.some(t => t.toLowerCase().includes(q)) ||
      photo.folder.toLowerCase().includes(q)
    );
  });

  const handleUpload = async () => {
    if (!uploadFiles.length) return;

    const folder = showNewFolder ? newFolderName.trim() : uploadFolder;
    if (!folder) {
      setUploadError('Please select or create a folder');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      uploadFiles.forEach(file => formData.append('files', file));
      formData.append('folder', folder);
      if (uploadTags.trim()) {
        formData.append('tags', uploadTags);
      }

      const response = await fetch('/api/photo-library/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const errors = data.results.filter((r: { error?: string }) => r.error);
      if (errors.length) {
        setUploadError(`Some files failed: ${errors.map((e: { filename: string; error: string }) => `${e.filename}: ${e.error}`).join(', ')}`);
      }

      // Reset and refresh
      setUploadFiles([]);
      setUploadFolder('');
      setUploadTags('');
      setNewFolderName('');
      setShowNewFolder(false);
      if (!errors.length) setShowUploadModal(false);
      fetchPhotos();
      fetchFolders();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/photo-library/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      setPhotos(prev => prev.filter(p => p.id !== id));
      setShowDeleteConfirm(null);
      if (selectedPhoto?.id === id) setSelectedPhoto(null);
      fetchFolders();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleCopyUrl = async (photo: PhotoRecord) => {
    await navigator.clipboard.writeText(photo.url);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUpdateTags = async (id: string, tags: string[]) => {
    try {
      const response = await fetch(`/api/photo-library/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags }),
      });
      if (!response.ok) throw new Error('Update failed');
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, tags } : p));
      setEditingTags(null);
      setTagInput('');
    } catch (error) {
      console.error('Tag update error:', error);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="relative min-h-screen bg-neutral-light">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30" />
      </div>

      <div className="relative pb-24">
        <Container className="relative z-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center text-neutral-dark/60 hover:text-green transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-4xl lg:text-5xl text-neutral-dark">
                    Photo <span className="text-green">Library</span>
                  </h1>
                  <p className="text-neutral-dark/60 mt-2">
                    Upload and manage images for the website
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => {
                    setUploadFolder(selectedFolder || '');
                    setShowUploadModal(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-5 w-5" />
                  Upload Images
                </Button>
              </div>
            </motion.div>

            <div className="flex gap-6">
              {/* Folder Sidebar */}
              <motion.div
                className="w-56 shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-4 sticky top-8">
                  <h3 className="font-display text-lg text-neutral-dark mb-3">Folders</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedFolder
                          ? 'bg-green/10 text-green font-medium'
                          : 'text-neutral-dark/70 hover:bg-neutral-light'
                      }`}
                    >
                      <FolderOpen className="h-4 w-4 inline mr-2" />
                      All Images
                    </button>
                    {folders.map(folder => (
                      <button
                        key={folder}
                        onClick={() => setSelectedFolder(folder)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedFolder === folder
                            ? 'bg-green/10 text-green font-medium'
                            : 'text-neutral-dark/70 hover:bg-neutral-light'
                        }`}
                      >
                        <FolderOpen className="h-4 w-4 inline mr-2" />
                        {folder}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Search */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-dark/40" />
                    <input
                      type="text"
                      placeholder="Search by filename or tag..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-neutral-dark/10 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
                    />
                  </div>
                </motion.div>

                {/* Image Grid */}
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 text-green animate-spin" />
                  </div>
                ) : filteredPhotos.length === 0 ? (
                  <motion.div
                    className="text-center py-20 bg-white rounded-xl shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ImageIcon className="h-16 w-16 mx-auto text-neutral-dark/20 mb-4" />
                    <p className="text-neutral-dark/50 text-lg">
                      {searchQuery ? 'No images match your search' : 'No images yet'}
                    </p>
                    <p className="text-neutral-dark/40 text-sm mt-1">
                      Upload images to get started
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="group relative bg-white rounded-xl shadow-md overflow-hidden"
                      >
                        {/* Image */}
                        <div
                          className="aspect-square cursor-pointer"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <img
                            src={photo.url}
                            alt={photo.filename}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors pointer-events-none" />
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={e => { e.stopPropagation(); handleCopyUrl(photo); }}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-green hover:text-white transition-colors"
                            title="Copy URL"
                          >
                            {copiedId === photo.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); setShowDeleteConfirm(photo.id); }}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                          <p className="text-xs text-neutral-dark/80 truncate font-medium">
                            {photo.filename}
                          </p>
                          <p className="text-xs text-neutral-dark/40 mt-0.5">
                            {photo.width}x{photo.height} &middot; {formatSize(photo.size_bytes)}
                          </p>
                          {photo.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {photo.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 bg-green/10 text-green rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !uploading && setShowUploadModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-neutral-dark">Upload Images</h2>
                  <button
                    onClick={() => !uploading && setShowUploadModal(false)}
                    className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Folder Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-dark mb-2">Folder</label>
                  {showNewFolder ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFolderName}
                        onChange={e => setNewFolderName(e.target.value.toLowerCase().replace(/[^a-z0-9-_/]/g, ''))}
                        placeholder="e.g. homepage/banners"
                        className="flex-1 px-3 py-2 border border-neutral-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30"
                      />
                      <button
                        onClick={() => { setShowNewFolder(false); setNewFolderName(''); }}
                        className="px-3 py-2 text-sm text-neutral-dark/60 hover:text-neutral-dark"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <select
                        value={uploadFolder}
                        onChange={e => setUploadFolder(e.target.value)}
                        className="flex-1 px-3 py-2 border border-neutral-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30 bg-white"
                      >
                        <option value="">Select folder...</option>
                        {folders.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowNewFolder(true)}
                        className="flex items-center gap-1 px-3 py-2 text-sm text-green hover:bg-green/10 rounded-lg transition-colors"
                      >
                        <FolderPlus className="h-4 w-4" />
                        New
                      </button>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-dark mb-2">
                    Tags <span className="text-neutral-dark/40 font-normal">(comma-separated, optional)</span>
                  </label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={e => setUploadTags(e.target.value)}
                    placeholder="e.g. hero, banner, campus"
                    className="w-full px-3 py-2 border border-neutral-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30"
                  />
                </div>

                {/* File Drop Zone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-dark mb-2">Images</label>
                  <div
                    className="border-2 border-dashed border-neutral-dark/20 rounded-xl p-8 text-center cursor-pointer hover:border-green transition-colors"
                    onClick={() => document.getElementById('photo-upload-input')?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-green', 'bg-green/5'); }}
                    onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('border-green', 'bg-green/5'); }}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-green', 'bg-green/5');
                      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                      setUploadFiles(prev => [...prev, ...files]);
                    }}
                  >
                    <Upload className="h-10 w-10 mx-auto mb-3 text-neutral-dark/30" />
                    <p className="text-neutral-dark/60 text-sm">
                      Drop images here or click to browse
                    </p>
                    <p className="text-neutral-dark/40 text-xs mt-1">
                      Max 10MB per image. Auto-compressed to WebP.
                    </p>
                  </div>
                  <input
                    id="photo-upload-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => {
                      const files = Array.from(e.target.files || []);
                      setUploadFiles(prev => [...prev, ...files]);
                      e.target.value = '';
                    }}
                  />
                </div>

                {/* Selected Files Preview */}
                {uploadFiles.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {uploadFiles.map((file, i) => (
                      <div key={`${file.name}-${i}`} className="flex items-center gap-3 p-2 bg-neutral-light rounded-lg">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-neutral-dark truncate">{file.name}</p>
                          <p className="text-xs text-neutral-dark/40">{formatSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => setUploadFiles(prev => prev.filter((_, idx) => idx !== i))}
                          className="p-1 text-neutral-dark/40 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadError && (
                  <p className="text-red-500 text-sm mb-4">{uploadError}</p>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFiles([]);
                      setUploadError('');
                    }}
                    disabled={uploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={uploading || !uploadFiles.length}
                    className="flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload {uploadFiles.length > 0 ? `(${uploadFiles.length})` : ''}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSelectedPhoto(null); setEditingTags(null); }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.filename}
                  className="w-full max-h-[50vh] object-contain bg-neutral-light rounded-t-2xl"
                />
                <button
                  onClick={() => { setSelectedPhoto(null); setEditingTags(null); }}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-lg shadow hover:bg-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-neutral-dark mb-1">{selectedPhoto.filename}</h3>
                <p className="text-sm text-neutral-dark/50 mb-4">
                  {selectedPhoto.width}x{selectedPhoto.height} &middot; {formatSize(selectedPhoto.size_bytes)} &middot; {selectedPhoto.folder}
                </p>

                {/* URL Copy */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-neutral-dark/50 mb-1">CDN URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedPhoto.url}
                      className="flex-1 px-3 py-2 bg-neutral-light rounded-lg text-sm text-neutral-dark/80 border border-neutral-dark/10"
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedPhoto)}
                      className="px-3 py-2 bg-green text-white rounded-lg hover:bg-green/90 transition-colors flex items-center gap-1 text-sm"
                    >
                      {copiedId === selectedPhoto.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedId === selectedPhoto.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-neutral-dark/50 mb-1">Tags</label>
                  {editingTags === selectedPhoto.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        placeholder="comma-separated tags"
                        className="flex-1 px-3 py-2 border border-neutral-dark/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green/30"
                      />
                      <button
                        onClick={() => {
                          const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
                          handleUpdateTags(selectedPhoto.id, tags);
                          setSelectedPhoto(prev => prev ? { ...prev, tags } : null);
                        }}
                        className="px-3 py-2 bg-green text-white rounded-lg text-sm hover:bg-green/90"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingTags(null); setTagInput(''); }}
                        className="px-3 py-2 text-neutral-dark/50 text-sm hover:text-neutral-dark"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap gap-1 flex-1">
                        {selectedPhoto.tags.length > 0 ? (
                          selectedPhoto.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-green/10 text-green rounded-full">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-neutral-dark/40">No tags</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setEditingTags(selectedPhoto.id);
                          setTagInput(selectedPhoto.tags.join(', '));
                        }}
                        className="p-1.5 text-neutral-dark/40 hover:text-green transition-colors"
                        title="Edit tags"
                      >
                        <Tag className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="redOutline"
                    onClick={() => setShowDeleteConfirm(selectedPhoto.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Image
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="font-display text-xl text-neutral-dark mb-2">Delete Image?</h3>
              <p className="text-neutral-dark/60 text-sm mb-6">
                This will permanently delete the image from storage. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                  Cancel
                </Button>
                <Button
                  variant="redOutline"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
