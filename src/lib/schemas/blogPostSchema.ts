import type { BlogPost } from '@/types/blog';

export function generateBlogPostSchema(post: BlogPost, url: string) {
  const publishDate = post.published_at || post.created_at;
  const modifyDate = post.updated_at || publishDate;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt || post.content.substring(0, 160),
    image: post.featured_image || 'https://tsh.edu.in/og-blog.jpg',
    datePublished: publishDate,
    dateModified: modifyDate,
    author: {
      '@type': 'Organization',
      name: post.author || "The Scholars' Home",
      url: 'https://tsh.edu.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tsh.edu.in/logo.png',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: "The Scholars' Home",
      url: 'https://tsh.edu.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tsh.edu.in/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', ') || '',
    articleSection: post.category?.name || 'Education',
    wordCount: post.content.split(/\s+/).length,
    url: url,
  };
}

export function generateBreadcrumbSchema(post: BlogPost) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://tsh.edu.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://tsh.edu.in/blog',
    },
  ];

  if (post.category) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: post.category.name,
      item: `https://tsh.edu.in/blog?category=${post.category.slug}`,
    });
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: post.title,
      item: `https://tsh.edu.in/blog/${post.slug}`,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title,
      item: `https://tsh.edu.in/blog/${post.slug}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
