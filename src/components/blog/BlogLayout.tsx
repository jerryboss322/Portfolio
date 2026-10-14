// Blog layout wrapper component
import { ReactNode } from 'react';
import { BlogStatistics } from '../../components/blog/BlogStatistics';

interface BlogLayoutProps {
  children: ReactNode;
  showStats?: boolean;
  title?: string;
  subtitle?: string;
}

export function BlogLayout({ children, showStats = true, title, subtitle }: BlogLayoutProps) {
  return (
    <div className="blog-layout">
      <div className="blog-layout-header">
        {title && <h1 className="blog-layout-title">{title}</h1>}
        {subtitle && <p className="blog-layout-subtitle">{subtitle}</p>}
      </div>
      {showStats && <BlogStatistics showInRow />}
      <div className="blog-layout-content">{children}</div>
    </div>
  );
}

export default BlogLayout;
