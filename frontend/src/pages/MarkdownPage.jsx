import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { pagesConfig, getPageById, getAllPages } from '@/config/pages';
import { 
  Shield, 
  AlertTriangle, 
  RefreshCcw, 
  Briefcase, 
  FileText,
  TrendingDown,
  Target,
  ArrowLeft,
  ArrowRight,
  Home,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// Icon mapping - add new icons here as needed
const iconMap = {
  Shield,
  AlertTriangle,
  RefreshCcw,
  Briefcase,
  FileText,
  TrendingDown,
  Target,
  CheckCircle2,
};

// Get icon component by name
const getIcon = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className="w-7 h-7 text-white" /> : null;
};

// Custom markdown components for styling
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4 text-foreground border-b border-border pb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 space-y-2 ml-4 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-3 text-muted-foreground">
      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground bg-muted/30 py-2 pr-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, inline }) => (
    inline 
      ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{children}</code>
      : <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto my-4">{children}</code>
  ),
  hr: () => <hr className="my-8 border-border" />,
};

const MarkdownPage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageConfig = getPageById(pageId);
  const allPages = getAllPages().filter(p => p.path !== '/');
  
  // Find previous and next pages for navigation
  const currentIndex = allPages.findIndex(p => p.id === pageId);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  useEffect(() => {
    if (!pageConfig) {
      setError('Page not found');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        // Dynamic import of markdown file
        const response = await fetch(`/content/${pageConfig.file}`);
        if (!response.ok) {
          // Try importing from src/content as module
          const module = await import(`@/content/${pageConfig.file}`);
          setContent(module.default || '');
        } else {
          const text = await response.text();
          setContent(text);
        }
        setError(null);
      } catch (err) {
        // Fallback: try to load raw content
        try {
          const rawModule = await import(`!!raw-loader!@/content/${pageConfig.file}`);
          setContent(rawModule.default);
          setError(null);
        } catch {
          setError(`Could not load content for: ${pageConfig.file}`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [pageId, pageConfig]);

  if (!pageConfig) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" /> Go Home
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <PageHeader
          title={pageConfig.title}
          description={pageConfig.description}
          icon={getIcon(pageConfig.icon)}
        />

        <Section>
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading content...</span>
              </div>
            ) : error ? (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 text-center">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button variant="outline" onClick={() => navigate('/')}>
                    <Home className="w-4 h-4 mr-2" /> Return Home
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <article className="prose-identity">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}

            {/* Page Navigation */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {prevPage ? (
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 justify-start"
                  >
                    <Link to={prevPage.path || `/pages/${prevPage.id}`}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span className="truncate">{prevPage.navLabel}</span>
                    </Link>
                  </Button>
                ) : (
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1 justify-start"
                  >
                    <Link to="/">
                      <Home className="w-4 h-4 mr-2" />
                      <span>Overview</span>
                    </Link>
                  </Button>
                )}
                
                {nextPage && (
                  <Button 
                    asChild 
                    className="flex-1 justify-end bg-primary hover:bg-primary/90"
                  >
                    <Link to={nextPage.path || `/pages/${nextPage.id}`}>
                      <span className="truncate">{nextPage.navLabel}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default MarkdownPage;
