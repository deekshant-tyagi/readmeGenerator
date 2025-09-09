import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, GitFork, Eye, Calendar, User, Code } from "lucide-react";

export interface Repository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  license?: {
    name: string;
    spdx_id: string;
  };
}

interface RepositoryInfoProps {
  repository: Repository;
}

export const RepositoryInfo = ({ repository }: RepositoryInfoProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Card className="p-8 bg-glass backdrop-blur-sm border-glass shadow-card">
      <div className="space-y-6">
        {/* Header with avatar and basic info */}
        <div className="flex items-start gap-4">
          <img 
            src={repository.owner.avatar_url} 
            alt={repository.owner.login}
            className="w-16 h-16 rounded-xl ring-2 ring-primary/20"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {repository.name}
            </h2>
            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
              <User className="h-4 w-4" />
              {repository.owner.login}
            </p>
            {repository.description && (
              <p className="text-foreground/90 mt-3 leading-relaxed">
                {repository.description}
              </p>
            )}
          </div>
        </div>

        {/* Stats and metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="font-medium">{formatNumber(repository.stargazers_count)}</span>
            <span className="text-muted-foreground">stars</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <GitFork className="h-4 w-4 text-accent" />
            <span className="font-medium">{formatNumber(repository.forks_count)}</span>
            <span className="text-muted-foreground">forks</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Eye className="h-4 w-4 text-secondary" />
            <span className="font-medium">{formatNumber(repository.watchers_count)}</span>
            <span className="text-muted-foreground">watching</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{formatDate(repository.created_at)}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {repository.language && (
            <Badge variant="secondary" className="gap-1">
              <Code className="h-3 w-3" />
              {repository.language}
            </Badge>
          )}
          
          {repository.license && (
            <Badge variant="outline">
              {repository.license.name}
            </Badge>
          )}
          
          <Badge variant="outline">
            Public Repository
          </Badge>
        </div>

        {/* Repository link */}
        <div className="pt-4 border-t border-glass">
          <a 
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-glow transition-colors text-sm font-medium"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </Card>
  );
};