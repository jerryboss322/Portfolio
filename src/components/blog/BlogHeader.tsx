// Blog header component
import { Link } from 'react-router-dom';

export function BlogHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="blog-header">
      <div className="blog-header-content">
        <h1 className="blog-header-title">{title}</h1>
        {subtitle && <p className="blog-header-subtitle">{subtitle}</p>}
        <div className="blog-header-nav">
          <Link to="/blog" className="blog-nav-link">
            All Articles
          </Link>
          <Link to="/blog" className="blog-nav-link blog-nav-link-primary">
            Start Reading
          </Link>
        </div>
      </div>
    </header>
  );
}

export default BlogHeader;
