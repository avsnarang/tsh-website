import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostDetail from '@/components/blog/BlogPostDetail';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/lib/schemas/blogPostSchema';
import type { BlogPost } from '@/types/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tsh.edu.in';
    const response = await fetch(`${baseUrl}/api/blog/posts/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || post.content.substring(0, 160);
  const url = `https://tsh.edu.in/blog/${post.slug}`;

  return {
    title: title,
    description: description,
    keywords: post.tags,
    authors: [{ name: post.author || "The Scholars' Home" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: 'article',
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author || "The Scholars' Home"],
      section: post.category?.name,
      tags: post.tags,
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const url = `https://tsh.edu.in/blog/${post.slug}`;
  const blogPostSchema = generateBlogPostSchema(post, url);
  const breadcrumbSchema = generateBreadcrumbSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <BlogPostDetail slug={slug} />
    </>
  );
}
