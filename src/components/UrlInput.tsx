import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export const UrlInput = ({ onSubmit, loading }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const validateUrl = (input: string): boolean => {
    // Support formats: https://github.com/username/repo, github.com/username/repo, username/repo
    const patterns = [
      /^https?:\/\/github\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/?$/,
      /^github\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/?$/,
      /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/
    ];
    
    return patterns.some(pattern => pattern.test(input.trim()));
  };

  const normalizeUrl = (input: string): string => {
    const trimmed = input.trim();
    
    // If it's just username/repo, add github.com prefix
    if (/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/.test(trimmed)) {
      return `https://github.com/${trimmed}`;
    }
    
    // If it starts with github.com but no protocol, add https
    if (trimmed.startsWith('github.com/')) {
      return `https://${trimmed}`;
    }
    
    return trimmed;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL (e.g., username/repo or https://github.com/username/repo)",
        variant: "destructive",
      });
      return;
    }

    const normalizedUrl = normalizeUrl(url);
    console.log('Submitting normalized URL:', normalizedUrl);
    onSubmit(normalizedUrl);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Github className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Enter GitHub repository URL (e.g., username/repo)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="pl-14 text-base placeholder:text-muted-foreground/70"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading || !url.trim()}
          variant="hero"
          size="lg"
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating README...
            </>
          ) : (
            'Generate README'
          )}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Supports formats: <code className="bg-muted px-2 py-1 rounded">username/repo</code> or full GitHub URLs</p>
      </div>
    </div>
  );
};