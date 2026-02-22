import { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch(`/${filename}`)
      .then(res => res.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading markdown:', err);
        setLoading(false);
      });
  }, [filename]);

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
        <div className="max-w-4xl mx-auto">
          {/* En-tête du document */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          {/* Contenu Markdown */}
          <div className="prose prose-slate dark:prose-invert max-w-none
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
  );
}
