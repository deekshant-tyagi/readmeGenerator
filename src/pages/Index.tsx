import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { RepositoryInfo, Repository } from "@/components/RepositoryInfo";
import { ReadmeOutput } from "@/components/ReadmeOutput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { GitHubService } from "@/services/github";
import { ReadmeService } from "@/services/readme";
import { toast } from "@/hooks/use-toast";
import { FileText, Github, Sparkles } from "lucide-react";

type AppState = 'input' | 'loading' | 'repository' | 'generating' | 'output' | 'error';

const Index = () => {
  const [state, setState] = useState<AppState>('input');
  const [repository, setRepository] = useState<Repository | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const handleUrlSubmit = async (url: string) => {
    console.log('Starting README generation process for URL:', url);
    setCurrentUrl(url);
    setState('loading');
    setError('');

    try {
      // Parse the repository URL
      const parsed = GitHubService.parseRepoUrl(url);
      if (!parsed) {
        throw new Error('Invalid repository URL format');
      }

      // Fetch repository data
      console.log('Fetching repository data...');
      const repoData = await GitHubService.fetchRepository(parsed.owner, parsed.repo);
      setRepository(repoData);
      setState('repository');

      // Fetch repository contents for better README generation
      console.log('Fetching repository contents...');
      const contents = await GitHubService.fetchRepoContents(parsed.owner, parsed.repo);

      // Generate README
      console.log('Generating README...');
      setState('generating');
      
      // Simulate AI processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedReadme = ReadmeService.generateReadme(repoData, contents);
      setReadme(generatedReadme);
      setState('output');

      toast({
        title: "README Generated!",
        description: "Your professional README has been generated successfully.",
      });

    } catch (err) {
      console.error('Error in README generation process:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setState('error');
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    if (currentUrl) {
      handleUrlSubmit(currentUrl);
    } else {
      setState('input');
    }
  };

  const handleStartOver = () => {
    setState('input');
    setRepository(null);
    setReadme('');
    setError('');
    setCurrentUrl('');
  };

  const handleRegenerateReadme = async () => {
    if (!repository) return;
    
    setState('generating');
    try {
      const parsed = GitHubService.parseRepoUrl(currentUrl);
      if (parsed) {
        const contents = await GitHubService.fetchRepoContents(parsed.owner, parsed.repo);
        
        // Add slight delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const generatedReadme = ReadmeService.generateReadme(repository, contents);
        setReadme(generatedReadme);
        setState('output');
        
        toast({
          title: "README Regenerated!",
          description: "Your README has been updated with fresh content.",
        });
      }
    } catch (err) {
      console.error('Error regenerating README:', err);
      toast({
        title: "Regeneration Failed",
        description: "Failed to regenerate README. Please try again.",
        variant: "destructive",
      });
      setState('output'); // Stay on output page
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-glass bg-glass backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  README Generator
                </h1>
                <p className="text-xs text-muted-foreground">AI-powered documentation</p>
              </div>
            </div>
            
            {state !== 'input' && (
              <button
                onClick={handleStartOver}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors border p-3 rounded-md text-white"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {state === 'input' && (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
                <div className="relative p-4 rounded-2xl bg-gradient-primary">
                  <Github className="h-16 w-16 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Generate Professional READMEs
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Transform any GitHub repository into a stunning, comprehensive README with AI-powered documentation generation.
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-accent" />
                  <span>GitHub Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span>Professional Output</span>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <UrlInput onSubmit={handleUrlSubmit} loading={false} />
          </div>
        )}

        {state === 'loading' && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner size="lg" text="Fetching repository data..." />
          </div>
        )}

        {state === 'repository' && repository && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Repository Found!</h2>
              <p className="text-muted-foreground">Analyzing repository structure and generating your README...</p>
            </div>
            <RepositoryInfo repository={repository} />
          </div>
        )}

        {state === 'generating' && (
          <div className="max-w-2xl mx-auto">
            <LoadingSpinner size="lg" text="Generating your professional README..." />
          </div>
        )}

        {state === 'output' && readme && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Your README is Ready!
              </h2>
              <p className="text-muted-foreground">
                Here's your professional README.md file, ready to copy or download.
              </p>
            </div>
            
            {repository && (
              <div className="mb-8">
                <RepositoryInfo repository={repository} />
              </div>
            )}
            
            <ReadmeOutput content={readme} onRetry={handleRegenerateReadme} />
          </div>
        )}

        {state === 'error' && (
          <div className="max-w-2xl mx-auto">
            <ErrorDisplay message={error} onRetry={handleRetry} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-glass bg-glass/50 backdrop-blur-sm mt-6">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-3xl">
              Made By <span className="font-extrabold text-foreground">Anshika.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
