export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  slug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { id: 'post-1', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(1).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 5, featured: true, slug: 'deep-dive-react-' + 1 },
  { id: 'post-2', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(2).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 8, featured: false, slug: 'deep-dive-react-' + 2 },
  { id: 'post-3', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(3).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 11, featured: false, slug: 'deep-dive-react-' + 3 },
  { id: 'post-4', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(4).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 14, featured: false, slug: 'deep-dive-react-' + 4 },
  { id: 'post-5', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(5).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 17, featured: false, slug: 'deep-dive-react-' + 5 },
  { id: 'post-6', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(6).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 20, featured: false, slug: 'deep-dive-react-' + 6 },
  { id: 'post-7', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(7).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 23, featured: false, slug: 'deep-dive-react-' + 7 },
  { id: 'post-8', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(8).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 26, featured: false, slug: 'deep-dive-react-' + 8 },
  { id: 'post-9', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(9).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 29, featured: false, slug: 'deep-dive-react-' + 9 },
  { id: 'post-10', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(10).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 32, featured: false, slug: 'deep-dive-react-' + 10 },
  { id: 'post-11', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(11).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 35, featured: true, slug: 'deep-dive-react-' + 11 },
  { id: 'post-12', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(12).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 38, featured: false, slug: 'deep-dive-react-' + 12 },
  { id: 'post-13', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(1).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 41, featured: false, slug: 'deep-dive-react-' + 13 },
  { id: 'post-14', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(2).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 44, featured: false, slug: 'deep-dive-react-' + 14 },
  { id: 'post-15', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(3).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 47, featured: false, slug: 'deep-dive-react-' + 15 },
  { id: 'post-16', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(4).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 50, featured: false, slug: 'deep-dive-react-' + 16 },
  { id: 'post-17', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(5).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 53, featured: false, slug: 'deep-dive-react-' + 17 },
  { id: 'post-18', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(6).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 56, featured: false, slug: 'deep-dive-react-' + 18 },
  { id: 'post-19', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(7).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 59, featured: false, slug: 'deep-dive-react-' + 19 },
  { id: 'post-20', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(8).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 62, featured: false, slug: 'deep-dive-react-' + 20 },
  { id: 'post-21', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(9).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 65, featured: true, slug: 'deep-dive-react-' + 21 },
  { id: 'post-22', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(10).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 68, featured: false, slug: 'deep-dive-react-' + 22 },
  { id: 'post-23', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(11).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 71, featured: false, slug: 'deep-dive-react-' + 23 },
  { id: 'post-24', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(12).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 74, featured: false, slug: 'deep-dive-react-' + 24 },
  { id: 'post-25', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(1).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 77, featured: false, slug: 'deep-dive-react-' + 25 },
  { id: 'post-26', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(2).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 80, featured: false, slug: 'deep-dive-react-' + 26 },
  { id: 'post-27', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(3).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 83, featured: false, slug: 'deep-dive-react-' + 27 },
  { id: 'post-28', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(4).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 86, featured: false, slug: 'deep-dive-react-' + 28 },
  { id: 'post-29', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(5).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 89, featured: false, slug: 'deep-dive-react-' + 29 },
  { id: 'post-30', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(6).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 92, featured: false, slug: 'deep-dive-react-' + 30 },
  { id: 'post-31', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(7).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 95, featured: true, slug: 'deep-dive-react-' + 31 },
  { id: 'post-32', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(8).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 98, featured: false, slug: 'deep-dive-react-' + 32 },
  { id: 'post-33', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(9).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 101, featured: false, slug: 'deep-dive-react-' + 33 },
  { id: 'post-34', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(10).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 104, featured: false, slug: 'deep-dive-react-' + 34 },
  { id: 'post-35', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(11).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 107, featured: false, slug: 'deep-dive-react-' + 35 },
  { id: 'post-36', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(12).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 110, featured: false, slug: 'deep-dive-react-' + 36 },
  { id: 'post-37', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(1).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 113, featured: false, slug: 'deep-dive-react-' + 37 },
  { id: 'post-38', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(2).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 116, featured: false, slug: 'deep-dive-react-' + 38 },
  { id: 'post-39', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(3).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 119, featured: false, slug: 'deep-dive-react-' + 39 },
  { id: 'post-40', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(4).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 122, featured: false, slug: 'deep-dive-react-' + 40 },
  { id: 'post-41', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(5).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 125, featured: true, slug: 'deep-dive-react-' + 41 },
  { id: 'post-42', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(6).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 128, featured: false, slug: 'deep-dive-react-' + 42 },
  { id: 'post-43', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(7).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 131, featured: false, slug: 'deep-dive-react-' + 43 },
  { id: 'post-44', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(8).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 134, featured: false, slug: 'deep-dive-react-' + 44 },
  { id: 'post-45', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(9).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 137, featured: false, slug: 'deep-dive-react-' + 45 },
  { id: 'post-46', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (0+1), publishedAt: '2024-' + String(10).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 140, featured: false, slug: 'deep-dive-react-' + 46 },
  { id: 'post-47', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (1+1), publishedAt: '2024-' + String(11).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 143, featured: false, slug: 'deep-dive-react-' + 47 },
  { id: 'post-48', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (2+1), publishedAt: '2024-' + String(12).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 146, featured: false, slug: 'deep-dive-react-' + 48 },
  { id: 'post-49', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (3+1), publishedAt: '2024-' + String(1).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 149, featured: false, slug: 'deep-dive-react-' + 49 },
  { id: 'post-50', title: 'Deep Dive into Modern React Development', excerpt: 'Exploring the latest patterns and best practices in React development...', content: '## Introduction

Modern React development has evolved significantly...', author: 'Author ' + (4+1), publishedAt: '2024-' + String(2).padStart(2,'0') + '-01', category: 'Development', tags: ['react', 'web', 'frontend'], readingTime: 152, featured: false, slug: 'deep-dive-react-' + 50 },
];
