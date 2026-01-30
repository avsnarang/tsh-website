'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Eye,
  ChevronRight,
} from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import type { BlogPost } from '@/types/blog';

interface BlogPostDetailProps {
  slug: string;
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogPostDetail({ slug }: BlogPostDetailProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch the post with view increment
        const response = await fetch(`/api/blog/posts/${slug}?view=true`);
        const result = await response.json();

        if (!result.success) {
          setError(result.message || 'Post not found');
          return;
        }

        setPost(result.data);

        // Fetch related posts from same category
        if (result.data.category_id) {
          const relatedResponse = await fetch(
            `/api/blog/posts?category=${result.data.category?.slug}&limit=3`
          );
          const relatedResult = await relatedResponse.json();
          if (relatedResult.success) {
            setRelatedPosts(
              relatedResult.data.filter((p: BlogPost) => p.id !== result.data.id).slice(0, 3)
            );
          }
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post?.title || '';

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-24 bg-neutral-light">
        <Container>
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 w-32 bg-neutral-dark/10 rounded mb-8" />
            <div className="h-12 w-3/4 bg-neutral-dark/10 rounded mb-4" />
            <div className="h-12 w-1/2 bg-neutral-dark/10 rounded mb-8" />
            <div className="h-96 bg-neutral-dark/10 rounded-2xl mb-8" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-neutral-dark/10 rounded" />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pb-24 bg-neutral-light">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-display text-neutral-dark mb-4">Article Not Found</h1>
            <p className="text-neutral-dark/70 mb-8">{error || 'The article you are looking for does not exist.'}</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-xl hover:bg-green-dark transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);
  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

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

      {/* Article Content */}
      <div className="relative pb-24">
        <Container>
          <article className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <ScrollReveal>
              <nav className="flex items-center gap-2 text-sm text-neutral-dark/60 mb-8">
                <Link href="/" className="hover:text-green transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-green transition-colors">
                  Blog
                </Link>
                {post.category && (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    <Link
                      href={`/blog?category=${post.category.slug}`}
                      className="hover:text-green transition-colors"
                    >
                      {post.category.name}
                    </Link>
                  </>
                )}
              </nav>
            </ScrollReveal>

            {/* Header */}
            <ScrollReveal>
              <header className="mb-8">
                {post.category && (
                  <Link
                    href={`/blog?category=${post.category.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium mb-4 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: post.category.color || '#00501B' }}
                  >
                    <Tag className="h-4 w-4" />
                    {post.category.name}
                  </Link>
                )}

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-neutral-dark mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-dark/60">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{post.view_count} views</span>
                  </div>
                </div>
              </header>
            </ScrollReveal>

            {/* Featured Image */}
            {post.featured_image && (
              <ScrollReveal>
                <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />
                  <div className="relative aspect-video">
                    <NextImage
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Content */}
            <ScrollReveal>
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-neutral-dark
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-neutral-dark/80 prose-p:leading-relaxed
                  prose-a:text-green prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-neutral-dark
                  prose-ul:my-6 prose-li:text-neutral-dark/80
                  prose-blockquote:border-l-green prose-blockquote:bg-green-light/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </ScrollReveal>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <ScrollReveal>
                <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-neutral-dark/10">
                  <span className="text-sm text-neutral-dark/60 font-medium">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 bg-neutral-dark/5 rounded-full text-sm text-neutral-dark/70 hover:bg-green-light/20 hover:text-green transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Share Section */}
            <ScrollReveal>
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-dark/10">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-green hover:text-green-dark transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Blog
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-neutral-dark/10 hover:border-green hover:text-green transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>

                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-neutral-dark/10 overflow-hidden z-50"
                    >
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-neutral-dark/5 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-neutral-dark/5 transition-colors"
                      >
                        <Twitter className="h-5 w-5 text-sky-500" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-neutral-dark/5 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-neutral-dark/5 transition-colors"
                      >
                        <Link2 className="h-5 w-5 text-neutral-dark/60" />
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-6xl mx-auto mt-24">
              <ScrollReveal>
                <h2 className="font-display text-2xl md:text-3xl text-neutral-dark mb-8 text-center">
                  Related <span className="text-green">Articles</span>
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <ScrollReveal key={relatedPost.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <BlogCard post={relatedPost} />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          )}
        </Container>
      </div>
    </div>
  );
}
