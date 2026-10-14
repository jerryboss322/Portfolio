// Article card component for blog listings
import type { Article } from '../../types/article';
import { ARTICLE_CATEGORIES_LABEL } from '../../types/article';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const categoryLabel = ARTICLE_CATEGORIES_LABEL[article.category] || article.category;

  return (
    <article className="blog-article-card">
      <div className="blog-article-card-header">
        <span className={`blog-category-badge blog-category-${article.category}`}>
          {categoryLabel}
        </span>
      </div>
      <h2 className="blog-article-card-title">
        <a href={`/blog/${article.slug}`}>{article.title}</a>
      </h2>
      <p className="blog-article-card-excerpt">{article.excerpt}</p>
      <div className="blog-article-card-footer">
        <div className="blog-article-meta">
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
        <div className="blog-article-tags">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="blog-tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
