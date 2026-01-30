'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import Container from '../ui/Container';
import { supabase } from '../../lib/supabase';
import {
  ArrowLeft,
  Plus,
  Pencil,
  AlertTriangle,
  X,
  Star,
  Ban,
  CheckCircle,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Tag,
  Image as ImageIcon,
  Calendar,
  Search,
  ChevronDown,
  FileText,
} from 'lucide-react';
import Button from '../ui/Button';
import ScrollReveal from '../animations/ScrollReveal';
import TextReveal from '../animations/TextReveal';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploader, { UploadedFile } from '../ui/FileUploader';
import type { BlogPost, BlogCategory, BlogPostFormData, BLOG_CATEGORIES_CONFIG } from '@/types/blog';

const DEFAULT_CATEGORIES = [
  { name: 'Parenting & Early Education', slug: 'parenting-early-education', description: 'Tips and guidance for parents of young children', color: '#00501B' },
  { name: 'CBSE Exam Tips', slug: 'cbse-exam-tips', description: 'Study strategies and exam preparation for CBSE students', color: '#A65A20' },
  { name: 'Admissions Guidance', slug: 'admissions-guidance', description: 'Information about school admissions and enrollment process', color: '#2563EB' },
  { name: 'Career & Higher Education', slug: 'career-higher-education', description: 'Career guidance and higher education pathways', color: '#7C3AED' },
  { name: 'School News', slug: 'school-news', description: 'Latest news, achievements, and announcements from TSH', color: '#DC2626' },
  { name: 'Holistic Development', slug: 'holistic-development', description: 'Sports, arts, and character building in education', color: '#059669' },
];

const initialFormData: BlogPostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featured_image: '',
  category_id: '',
  author: "The Scholars' Home",
  tags: [],
  meta_title: '',
  meta_description: '',
  is_published: false,
  is_featured: false,
};

export default function ManageBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPostFormData>(initialFormData);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Category form state
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#00501B',
  });
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title),
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleFileUpload = async (uploadFiles: File[]) => {
    const formDataUpload = new FormData();
    formDataUpload.append('file', uploadFiles[0]);

    const response = await fetch('/api/upload-event-image', {
      method: 'POST',
      body: formDataUpload,
    });

    if (!response.ok) throw new Error('Upload failed');

    const result = await response.json();
    setFormData((prev) => ({
      ...prev,
      featured_image: result.url,
    }));

    return [result.url];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      if (!formData.title || !formData.slug || !formData.content) {
        throw new Error('Title, slug, and content are required');
      }

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        featured_image: formData.featured_image || null,
        category_id: formData.category_id || null,
        author: formData.author || "The Scholars' Home",
        tags: formData.tags,
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.excerpt || null,
        is_published: formData.is_published,
        is_featured: formData.is_featured,
        updated_at: new Date().toISOString(),
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        setSuccess('Blog post updated successfully!');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...postData,
            created_at: new Date().toISOString(),
            published_at: formData.is_published ? new Date().toISOString() : null,
          }]);

        if (error) throw error;
        setSuccess('Blog post created successfully!');
      }

      setTimeout(() => setSuccess(''), 3000);
      setShowForm(false);
      setEditingPost(null);
      setFormData(initialFormData);
      setFiles([]);
      await fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      setError(error instanceof Error ? error.message : 'Failed to save blog post');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      category_id: post.category_id || '',
      author: post.author || "The Scholars' Home",
      tags: post.tags || [],
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      is_published: post.is_published,
      is_featured: post.is_featured,
    });
    if (post.featured_image) {
      setFiles([{
        file: new File([], 'existing'),
        preview: post.featured_image,
        progress: 100,
        status: 'success',
        url: post.featured_image,
      }]);
    }
    setShowForm(true);
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      setError('');
      const newPublished = !post.is_published;

      const { error } = await supabase
        .from('blog_posts')
        .update({
          is_published: newPublished,
          published_at: newPublished && !post.published_at ? new Date().toISOString() : post.published_at,
        })
        .eq('id', post.id);

      if (error) throw error;
      await fetchPosts();
      setSuccess(newPublished ? 'Post published!' : 'Post unpublished');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error toggling publish status:', error);
      setError('Failed to update publish status');
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;

    try {
      setError('');
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;
      await fetchPosts();
      setSuccess('Post deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  // Category management
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');

      if (!categoryFormData.name || !categoryFormData.slug) {
        throw new Error('Name and slug are required');
      }

      if (editingCategory) {
        const { error } = await supabase
          .from('blog_categories')
          .update({
            name: categoryFormData.name,
            slug: categoryFormData.slug,
            description: categoryFormData.description,
            color: categoryFormData.color,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingCategory.id);

        if (error) throw error;
        setSuccess('Category updated!');
      } else {
        const { error } = await supabase
          .from('blog_categories')
          .insert([{
            ...categoryFormData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        setSuccess('Category created!');
      }

      setTimeout(() => setSuccess(''), 3000);
      setShowCategoryForm(false);
      setEditingCategory(null);
      setCategoryFormData({ name: '', slug: '', description: '', color: '#00501B' });
      await fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      setError(error instanceof Error ? error.message : 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (category: BlogCategory) => {
    if (!confirm(`Delete category "${category.name}"? Posts will be uncategorized.`)) return;

    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', category.id);

      if (error) throw error;
      await fetchCategories();
      setSuccess('Category deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category');
    }
  };

  const initializeDefaultCategories = async () => {
    try {
      for (const cat of DEFAULT_CATEGORIES) {
        await supabase
          .from('blog_categories')
          .upsert([{
            ...cat,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }], { onConflict: 'slug' });
      }
      await fetchCategories();
      setSuccess('Default categories initialized!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error initializing categories:', error);
      setError('Failed to initialize categories');
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' || post.category_id === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.is_published) ||
      (filterStatus === 'draft' && !post.is_published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
        <div className="relative">
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
                  <BookOpen className="h-4 w-4" />
                  <span className="font-semibold">Blog Management</span>
                </motion.div>
              </div>

              <TextReveal>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                  Manage <span className="text-green">Blog Posts</span>
                </h1>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-neutral-dark/70 text-lg max-w-2xl mx-auto">
                  Create and manage blog articles to improve SEO and engage with parents
                </p>
              </TextReveal>
            </div>
          </ScrollReveal>

          {/* Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-4 justify-between items-center"
          >
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setEditingPost(null);
                  setFormData(initialFormData);
                  setFiles([]);
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>New Post</span>
              </button>
              <button
                onClick={() => setShowCategoryForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl hover:bg-orange-dark transition-colors"
              >
                <Tag className="h-5 w-5" />
                <span>Manage Categories</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 pl-10 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green w-48"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-dark/50" />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                className="px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </motion.div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{success}</span>
            </div>
          )}

          {/* Posts List */}
          <ScrollReveal>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green mx-auto" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
                <FileText className="h-16 w-16 text-neutral-dark/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">No Posts Found</h3>
                <p className="text-neutral-dark/70 mb-4">
                  {searchQuery || filterCategory !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first blog post to get started'}
                </p>
                {categories.length === 0 && (
                  <button
                    onClick={initializeDefaultCategories}
                    className="text-green hover:underline"
                  >
                    Initialize default categories first
                  </button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-dark/10"
                  >
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      {/* Thumbnail */}
                      <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-neutral-dark/5">
                        {post.featured_image ? (
                          <NextImage
                            src={post.featured_image}
                            alt={post.title}
                            width={192}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-neutral-dark/20" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-display text-neutral-dark mb-2">
                              {post.title}
                            </h3>
                            <p className="text-neutral-dark/70 text-sm line-clamp-2 mb-3">
                              {post.excerpt || post.content.substring(0, 150)}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              {post.category && (
                                <span
                                  className="inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-medium"
                                  style={{ backgroundColor: post.category.color || '#00501B' }}
                                >
                                  {post.category.name}
                                </span>
                              )}
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  post.is_published
                                    ? 'bg-green-light/20 text-green'
                                    : 'bg-neutral-dark/10 text-neutral-dark/60'
                                }`}
                              >
                                {post.is_published ? 'Published' : 'Draft'}
                              </span>
                              {post.is_featured && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-light/20 text-orange">
                                  Featured
                                </span>
                              )}
                              <span className="text-xs text-neutral-dark/50 flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.view_count} views
                              </span>
                              <span className="text-xs text-neutral-dark/50 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.created_at && new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => togglePublished(post)}
                              className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                              title={post.is_published ? 'Unpublish' : 'Publish'}
                            >
                              {post.is_published ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(post)}
                              className="p-2 text-neutral-dark/70 hover:text-red-500 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </ScrollReveal>
        </div>
      </Container>

      {/* Post Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-start justify-center z-[100] p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8"
            >
              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-neutral-dark">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingPost(null);
                      setFormData(initialFormData);
                      setFiles([]);
                    }}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                      placeholder="Enter post title"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">
                      URL Slug *
                      <span className="text-neutral-dark/50 text-sm ml-2">(auto-generated)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                      placeholder="url-friendly-slug"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                      <label className="block text-neutral-dark mb-2 font-medium">Category</label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-neutral-dark mb-2 font-medium">Author</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="Author name"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">
                      Excerpt
                      <span className="text-neutral-dark/50 text-sm ml-2">(Short summary for previews)</span>
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green h-24"
                      placeholder="Brief summary of the article..."
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">
                      Content *
                      <span className="text-neutral-dark/50 text-sm ml-2">(HTML supported)</span>
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green h-64 font-mono text-sm"
                      placeholder="<p>Write your article content here...</p>"
                      required
                    />
                    <p className="text-xs text-neutral-dark/50 mt-1">
                      Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;a href=&quot;&quot;&gt; for formatting
                    </p>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">Featured Image</label>
                    {formData.featured_image ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-2">
                        <NextImage
                          src={formData.featured_image}
                          alt="Featured"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, featured_image: '' });
                            setFiles([]);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <FileUploader
                        accept="image/jpeg,image/png,image/webp"
                        maxSize={10 * 1024 * 1024}
                        maxFiles={1}
                        onUpload={handleFileUpload}
                        files={files}
                        label="Upload featured image"
                        description="Recommended: 1200 x 630 px, max 10MB"
                      />
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-neutral-dark mb-2 font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-dark/10 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-neutral-dark/50 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="flex-grow px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="Add a tag"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-neutral-dark/10 rounded-lg hover:bg-neutral-dark/20 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* SEO Section */}
                  <div className="border-t border-neutral-dark/10 pt-6">
                    <h3 className="text-lg font-display text-neutral-dark mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-neutral-dark mb-2 font-medium">
                          Meta Title
                          <span className="text-neutral-dark/50 text-sm ml-2">(defaults to title)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.meta_title}
                          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="SEO title (max 60 characters)"
                          maxLength={60}
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-dark mb-2 font-medium">
                          Meta Description
                          <span className="text-neutral-dark/50 text-sm ml-2">(defaults to excerpt)</span>
                        </label>
                        <textarea
                          value={formData.meta_description}
                          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green h-20"
                          placeholder="SEO description (max 160 characters)"
                          maxLength={160}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Publishing Options */}
                  <div className="flex flex-wrap gap-6 border-t border-neutral-dark/10 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-5 h-5 rounded border-neutral-dark/20 text-green focus:ring-green"
                      />
                      <span className="text-neutral-dark">Publish immediately</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-5 h-5 rounded border-neutral-dark/20 text-orange focus:ring-orange"
                      />
                      <span className="text-neutral-dark">Featured post</span>
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline2"
                      onClick={() => {
                        setShowForm(false);
                        setEditingPost(null);
                        setFormData(initialFormData);
                        setFiles([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      {editingPost ? 'Save Changes' : 'Create Post'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Management Modal */}
      <AnimatePresence>
        {showCategoryForm && (
          <div className="fixed inset-0 bg-neutral-dark/50 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display text-neutral-dark">Manage Categories</h2>
                  <button
                    onClick={() => {
                      setShowCategoryForm(false);
                      setEditingCategory(null);
                      setCategoryFormData({ name: '', slug: '', description: '', color: '#00501B' });
                    }}
                    className="p-2 text-neutral-dark/70 hover:text-neutral-dark rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Existing Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-dark mb-4">Existing Categories</h3>
                  {categories.length === 0 ? (
                    <div className="text-center py-6 bg-neutral-dark/5 rounded-xl">
                      <p className="text-neutral-dark/60 mb-3">No categories yet</p>
                      <button
                        onClick={initializeDefaultCategories}
                        className="text-green hover:underline"
                      >
                        Initialize default categories
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-4 bg-neutral-dark/5 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cat.color || '#00501B' }}
                            />
                            <div>
                              <span className="font-medium text-neutral-dark">{cat.name}</span>
                              <span className="text-neutral-dark/50 text-sm ml-2">/{cat.slug}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingCategory(cat);
                                setCategoryFormData({
                                  name: cat.name,
                                  slug: cat.slug,
                                  description: cat.description || '',
                                  color: cat.color || '#00501B',
                                });
                              }}
                              className="p-2 text-neutral-dark/70 hover:text-green rounded-lg transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat)}
                              className="p-2 text-neutral-dark/70 hover:text-red-500 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add/Edit Category Form */}
                <div className="border-t border-neutral-dark/10 pt-6">
                  <h3 className="text-lg font-semibold text-neutral-dark mb-4">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  <form onSubmit={handleSaveCategory} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-dark mb-2 text-sm font-medium">Name *</label>
                        <input
                          type="text"
                          value={categoryFormData.name}
                          onChange={(e) => {
                            setCategoryFormData({
                              ...categoryFormData,
                              name: e.target.value,
                              slug: editingCategory
                                ? categoryFormData.slug
                                : generateSlug(e.target.value),
                            });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="Category name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-dark mb-2 text-sm font-medium">Slug *</label>
                        <input
                          type="text"
                          value={categoryFormData.slug}
                          onChange={(e) =>
                            setCategoryFormData({ ...categoryFormData, slug: e.target.value })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="url-slug"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-neutral-dark mb-2 text-sm font-medium">Description</label>
                      <input
                        type="text"
                        value={categoryFormData.description}
                        onChange={(e) =>
                          setCategoryFormData({ ...categoryFormData, description: e.target.value })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="Brief description"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-dark mb-2 text-sm font-medium">Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={categoryFormData.color}
                          onChange={(e) =>
                            setCategoryFormData({ ...categoryFormData, color: e.target.value })
                          }
                          className="w-12 h-10 rounded cursor-pointer border border-neutral-dark/20"
                        />
                        <input
                          type="text"
                          value={categoryFormData.color}
                          onChange={(e) =>
                            setCategoryFormData({ ...categoryFormData, color: e.target.value })
                          }
                          className="flex-grow px-4 py-2 rounded-lg border border-neutral-dark/20 focus:outline-none focus:ring-2 focus:ring-green"
                          placeholder="#00501B"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-2">
                      {editingCategory && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(null);
                            setCategoryFormData({ name: '', slug: '', description: '', color: '#00501B' });
                          }}
                          className="px-4 py-2 text-neutral-dark/70 hover:text-neutral-dark transition-colors"
                        >
                          Cancel Edit
                        </button>
                      )}
                      <Button type="submit" variant="primary">
                        {editingCategory ? 'Update Category' : 'Add Category'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
