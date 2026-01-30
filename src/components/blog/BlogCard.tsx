'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const readTime = estimateReadTime(post.content);
  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
          <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />

          <div className="relative grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
              <NextImage
                src={post.featured_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {post.category && (
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: post.category.color || '#00501B' }}
                >
                  {post.category.name}
                </div>
              )}
            </div>

            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-neutral-dark/60 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-neutral-dark mb-4 group-hover:text-green transition-colors">
                {post.title}
              </h2>

              <p className="text-neutral-dark/70 mb-6 line-clamp-3">
                {post.excerpt || post.content.substring(0, 200)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-dark/60">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <span className="flex items-center gap-2 text-green font-medium group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-xl h-full"
      >
        <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange rounded-2xl" />
        <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-green rounded-2xl" />

        <div className="relative">
          <div className="relative h-48 overflow-hidden">
            <NextImage
              src={post.featured_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {post.category && (
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: post.category.color || '#00501B' }}
              >
                {post.category.name}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 text-sm text-neutral-dark/60 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min</span>
              </div>
            </div>

            <h3 className="font-display text-xl text-neutral-dark mb-3 group-hover:text-green transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-neutral-dark/70 text-sm mb-4 line-clamp-2">
              {post.excerpt || post.content.substring(0, 120)}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-dark/10">
              <div className="flex items-center gap-2 text-sm text-neutral-dark/60">
                <User className="h-4 w-4" />
                <span className="truncate max-w-[120px]">{post.author}</span>
              </div>
              <span className="flex items-center gap-1 text-green text-sm font-medium group-hover:gap-2 transition-all">
                Read <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
