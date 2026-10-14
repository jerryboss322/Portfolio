// Individual article detail page
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadArticles, getArticleBySlug } from '../../data/articles-loader';
import { ArticleCard } from '../../components/blog/ArticleCard';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { ARTICLE_CATEGORIES_LABEL, getCategories } from '../../types/article';
import { getAllAuthors, getAuthorById } from '../../data/articles-loader';

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [categories] = useState<string[]>(() => getCategories());

  useEffect(() => {
    async function loadArticle() {
      const articles = await loadArticles();
      const found = slug ? articles.find((a) => a.slug === slug) : null;
      setArticle(found);

      if (found) {
        const related = articles.filter(
          (a) => a.id !== found.id && a.category === found.category
        );
        setRelatedArticles(related.slice(0, 3));
      }
    }
    loadArticle();
  }, [slug]);

  const categoryLabel = article
    ? ARTICLE_CATEGORIES_LABEL[article.category] || article.category
    : '';
  const author = article ? getAuthorById(article.authorId) : null;

  if (!article) {
    return (
      <div className="blog-page">
        <BlogHeader title="Article Not Found" />
        <div className="blog-empty-state">
          <h2>Oops!</h2>
          <p>The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="blog-link-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-article-detail-page">
      <BlogHeader
        title={article.title}
        subtitle={`${categoryLabel} • ${article.readingTime} min read`}
      />

      <article className="blog-article-detail">
        <div className="blog-article-detail-header">
          <span className={`blog-category-badge blog-category-${article.category}`}>
            {categoryLabel}
          </span>
        </div>

        <h1 className="blog-article-detail-title">{article.title}</h1>

        <div className="blog-article-detail-meta">
          <time dateTime={article.publishedAt}>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </time>
          <span className="blog-reading-time">{article.readingTime} min read</span>
          {article.wordCount > 0 && (
            <span className="blog-word-count">{article.wordCount.toLocaleString()} words</span>
          )}
        </div>

        {author && <div className="blog-article-author">{author.name}</div>}

        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="blog-article-tags-detail">
            {article.tags.map((tag: string) => (
              <span key={tag} className="blog-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedArticles.length > 0 && (
        <div className="blog-related-section">
          <h2 className="blog-related-title">Related Articles</h2>
          <div className="blog-article-grid">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
