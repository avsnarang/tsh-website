export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order: number;
  created_at?: string;
  updated_at?: string;
  posts?: BlogPost[];
  _count?: {
    posts: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  category_id?: string;
  author?: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  category?: BlogCategory;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id: string;
  author: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  is_featured: boolean;
}

export const BLOG_CATEGORIES_CONFIG = [
  {
    name: 'Parenting & Early Education',
    slug: 'parenting-early-education',
    description: 'Tips and guidance for parents of young children',
    color: '#00501B',
  },
  {
    name: 'CBSE Exam Tips',
    slug: 'cbse-exam-tips',
    description: 'Study strategies and exam preparation for CBSE students',
    color: '#A65A20',
  },
  {
    name: 'Admissions Guidance',
    slug: 'admissions-guidance',
    description: 'Information about school admissions and enrollment process',
    color: '#2563EB',
  },
  {
    name: 'Career & Higher Education',
    slug: 'career-higher-education',
    description: 'Career guidance and higher education pathways',
    color: '#7C3AED',
  },
  {
    name: 'School News',
    slug: 'school-news',
    description: 'Latest news, achievements, and announcements from TSH',
    color: '#DC2626',
  },
  {
    name: 'Holistic Development',
    slug: 'holistic-development',
    description: 'Sports, arts, and character building in education',
    color: '#059669',
  },
] as const;
