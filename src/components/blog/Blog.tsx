'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import { BookOpen, Search, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import BlogCardSkeleton from './BlogCardSkeleton';
import NotionDropdown from '@/components/ui/NotionDropdown';
import type { BlogPost, BlogCategory } from '@/types/blog';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Blog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/blog/categories');
        const result = await response.json();
        if (result.success) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', pagination.limit.toString());

      if (selectedCategory !== 'all') {
        params.set('category', selectedCategory);
      }
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      }

      const response = await fetch(`/api/blog/posts?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
        setPagination((prev) => ({
          ...prev,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
        }));

        // Set featured post (first featured or first post)
        if (pagination.page === 1 && result.data.length > 0) {
          const featured = result.data.find((p: BlogPost) => p.is_featured) || result.data[0];
          setFeaturedPost(featured);
        }
      } else {
        setError(result.message || 'Failed to load posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [selectedCategory, debouncedSearch]);

  const categoryOptions = [
    {
      value: 'all',
      label: 'All Categories',
      icon: <Tag className="h-5 w-5 text-green" />,
    },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: `${cat.name} (${cat._count?.posts || 0})`,
      icon: (
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: cat.color || '#00501B' }}
        />
      ),
    })),
  ];

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter out featured post from regular posts display
  const regularPosts = featuredPost
    ? posts.filter((p) => p.id !== featuredPost.id)
    : posts;

  if (error) {
    return (
      <div className="min-h-screen pb-24 bg-neutral-light">
        <Container>
          <div className="text-center text-red-600">{error}</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light w-full">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-light/30 animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-light/30 animate-pulse" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="relative pb-12">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                className="inline-flex items-center px-4 py-3 rounded-full bg-green-light/20 text-green mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">INSIGHTS & RESOURCES</span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-5xl text-neutral-dark mb-4">
                <span className="text-green">School</span> Blog
              </h1>

              <p className="text-lg text-neutral-dark/70 mb-8">
                Expert insights on education, parenting tips, exam preparation strategies, and the latest news from The Scholars' Home.
              </p>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <div className="relative w-full sm:w-64">
                  <NotionDropdown
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categoryOptions}
                    placeholder="Select Category"
                    searchable={false}
                    className="w-full"
                  />
                </div>

                <div className="relative w-full sm:flex-1">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-4 pl-12 rounded-lg border-2 border-neutral-dark/10
                      focus:ring-2 focus:ring-green/20 focus:border-green
                      text-neutral-dark placeholder:text-neutral-dark/50
                      transition-all duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Content Section */}
      <div className="relative pb-24">
        <Container>
          {loading ? (
            <div className="space-y-12">
              {/* Featured Skeleton */}
              <BlogCardSkeleton featured />
              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <ScrollReveal>
              <div className="relative bg-white p-12 rounded-2xl shadow-lg text-center overflow-hidden max-w-md mx-auto">
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                <BookOpen className="h-16 w-16 text-neutral-dark/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-dark mb-2">No Articles Found</h3>
                <p className="text-neutral-dark/70">
                  {debouncedSearch
                    ? 'Try adjusting your search terms'
                    : 'Check back soon for new articles'}
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-12">
              {/* Featured Post */}
              {featuredPost && pagination.page === 1 && !debouncedSearch && selectedCategory === 'all' && (
                <ScrollReveal>
                  <BlogCard post={featuredPost} featured />
                </ScrollReveal>
              )}

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(pagination.page === 1 && !debouncedSearch && selectedCategory === 'all'
                  ? regularPosts
                  : posts
                ).map((post, index) => (
                  <ScrollReveal key={post.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-lg border-2 border-neutral-dark/10 disabled:opacity-50 disabled:cursor-not-allowed hover:border-green hover:text-green transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Show first, last, and pages around current
                    if (
                      page === 1 ||
                      page === pagination.totalPages ||
                      (page >= pagination.page - 1 && page <= pagination.page + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            page === pagination.page
                              ? 'bg-green text-white border-green'
                              : 'border-neutral-dark/10 hover:border-green hover:text-green'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    // Show ellipsis
                    if (page === pagination.page - 2 || page === pagination.page + 2) {
                      return (
                        <span key={page} className="px-2 text-neutral-dark/50">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 rounded-lg border-2 border-neutral-dark/10 disabled:opacity-50 disabled:cursor-not-allowed hover:border-green hover:text-green transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
