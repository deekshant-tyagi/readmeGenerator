import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, Eye, Code2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReadmeOutputProps {
  content: string;
  onRetry?: () => void;
}

export const ReadmeOutput = ({ content, onRetry }: ReadmeOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "README content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "README.md file downloaded successfully",
    });
  };

  // Enhanced markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    let html = markdown;
    
    // Handle code blocks first (before other replacements)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4 border border-border"><code class="text-sm font-mono text-foreground">${code.trim()}</code></pre>`;
    });
    
    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">$1</code>');
    
    // Handle images (must come before links)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline-block mr-1 mb-1" />');
    
    // Handle links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Handle headers
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mt-6 mb-2 text-foreground">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-8 mb-3 text-foreground">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">$1</h1>');
    
    // Handle bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em class="italic text-foreground/90">$1</em>');
    
    // Handle lists - convert to proper HTML lists
    html = html.replace(/^(\d+\.\s.+(?:\n\d+\.\s.+)*)/gm, (match) => {
      const items = match.split('\n').map(line => {
        const content = line.replace(/^\d+\.\s/, '');
        return `<li class="mb-1 text-foreground/90">${content}</li>`;
      }).join('');
      return `<ol class="list-decimal list-inside ml-4 my-4 space-y-1">${items}</ol>`;
    });
    
    html = html.replace(/^(-\s.+(?:\n-\s.+)*)/gm, (match) => {
      const items = match.split('\n').map(line => {
        const content = line.replace(/^-\s/, '');
        return `<li class="mb-1 text-foreground/90">${content}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside ml-4 my-4 space-y-1">${items}</ul>`;
    });
    
    // Handle horizontal rules
    html = html.replace(/^---$/gm, '<hr class="my-8 border-border">');
    
    // Handle paragraphs (convert double newlines to paragraph breaks)
    html = html.replace(/\n\s*\n/g, '</p><p class="mb-4 text-foreground/90">');
    html = `<p class="mb-4 text-foreground/90">${html}</p>`;
    
    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4 text-foreground\/90"><\/p>/g, '');
    html = html.replace(/<p class="mb-4 text-foreground\/90">\s*<(h[1-6]|ul|ol|pre|hr)/g, '<$1');
    html = html.replace(/<\/(h[1-6]|ul|ol|pre|hr)>\s*<\/p>/g, '</$1>');
    
    return html;
  };

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button 
          onClick={handleCopy}
          variant="hero"
          className="gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        
        <Button 
          onClick={handleDownload}
          variant="secondary"
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download README.md
        </Button>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="gap-2"
          >
            <Code2 className="h-4 w-4" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Content display */}
      <Card className="bg-glass backdrop-blur-sm border-glass shadow-card">
        <Tabs defaultValue="preview" className="w-full">
          <div className="border-b border-glass px-6 py-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="markdown" className="gap-2">
                <Code2 className="h-4 w-4" />
                Markdown
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="preview" className="p-6 m-0">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            />
          </TabsContent>
          
          <TabsContent value="markdown" className="p-0 m-0">
            <pre className="bg-background/50 p-6 text-sm font-mono leading-relaxed text-foreground/90 overflow-x-auto whitespace-pre-wrap">
              {content}
            </pre>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};