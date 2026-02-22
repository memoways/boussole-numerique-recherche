import { useEffect, useState, useRef } from 'react';
import { Streamdown } from 'streamdown';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'wouter';

interface MarkdownDocumentProps {
  title: string;
  filename: string;
  description?: string;
}

export default function MarkdownDocument({ title, filename, description }: MarkdownDocumentProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/${filename}`)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        // Extract headings from markdown
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const matches = Array.from(text.matchAll(headingRegex));
        const extractedHeadings = matches.map((match, index) => {
          const level = match[1].length;
          const text = match[2].trim();
          const id = `heading-${index}`;
          return { id, text, level };
        });
        setHeadings(extractedHeadings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading markdown:', err);
        setLoading(false);
      });
  }, [filename]);

  // Scroll spy effect
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    // Observe all headings
    const headingElements = contentRef.current.querySelectorAll('h1, h2, h3');
    headingElements.forEach((heading, index) => {
      heading.id = `heading-${index}`;
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#515792' }}></div>
          <p className="text-muted-foreground">Chargement du document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixe */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/#documents">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>
            <Button size="sm" className="gap-2" style={{ backgroundColor: '#515792' }} asChild>
              <a href={`/${filename}`} download>
                <Download className="h-4 w-4" />
                Télécharger
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          {/* En-tête du document */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex gap-8">
            {/* Table des matières */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="border rounded-lg p-4" style={{ backgroundColor: 'rgba(81, 87, 146, 0.05)', borderColor: '#515792' }}>
                    <h3 className="font-semibold mb-4 text-sm" style={{ color: '#515792' }}>Table des matières</h3>
                    <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`block w-full text-left text-sm transition-colors hover:text-[#515792] ${
                            activeId === heading.id ? 'text-[#515792] font-medium' : 'text-muted-foreground'
                          }`}
                          style={{
                            paddingLeft: `${(heading.level - 1) * 12}px`
                          }}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}

            {/* Contenu principal */}
            <div className="flex-1 min-w-0">
              {/* Contenu Markdown */}
              <div ref={contentRef} className="prose prose-slate dark:prose-invert max-w-none
                prose-headings:font-bold
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:pb-2
                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6
                prose-p:mb-4 prose-p:leading-7
                prose-a:text-[#515792] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-2
                prose-blockquote:border-l-4 prose-blockquote:border-[#515792] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-table:w-full prose-table:my-6
                prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:p-3 prose-td:border-t
                prose-hr:my-8 prose-hr:border-border
              ">
                <Streamdown>{content}</Streamdown>
              </div>

              {/* Pied de page */}
              <div className="mt-16 pt-8 border-t flex items-center justify-between">
                <Link href="/#documents">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Retour aux documents
                  </Button>
                </Link>
                <Button className="gap-2" style={{ backgroundColor: '#515792' }} asChild>
                  <a href={`/${filename}`} download>
                    <Download className="h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
