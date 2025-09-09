import { Repository } from "@/components/RepositoryInfo";

export class GitHubService {
  private static baseUrl = 'https://api.github.com';

  static parseRepoUrl(url: string): { owner: string; repo: string } | null {
    try {
      console.log('Parsing repository URL:', url);
      
      // Remove trailing slash
      const cleanUrl = url.trim().replace(/\/$/, '');
      
      // Extract owner/repo from various formats
      let match = cleanUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      
      if (!match) {
        // Handle username/repo format
        match = cleanUrl.match(/^([^\/]+)\/([^\/]+)$/);
        if (match) {
          return { owner: match[1], repo: match[2] };
        }
        return null;
      }
      
      const [, owner, repo] = match;
      
      // Remove .git suffix if present
      const cleanRepo = repo.replace(/\.git$/, '');
      
      console.log('Parsed repository:', { owner, repo: cleanRepo });
      return { owner, repo: cleanRepo };
    } catch (error) {
      console.error('Error parsing repository URL:', error);
      return null;
    }
  }

  static async fetchRepository(owner: string, repo: string): Promise<Repository> {
    const url = `${this.baseUrl}/repos/${owner}/${repo}`;
    console.log('Fetching repository data from:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'README-Generator/1.0'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repository not found. Please check the URL and make sure the repository is public.');
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Failed to fetch repository: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('Repository data fetched successfully:', data);
      
      return data as Repository;
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  }

  static async fetchRepoContents(owner: string, repo: string): Promise<any[]> {
    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents`;
    console.log('Fetching repository contents from:', url);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'README-Generator/1.0'
        }
      });

      if (!response.ok) {
        console.warn(`Could not fetch repository contents: ${response.status}`);
        return [];
      }

      const data = await response.json();
      console.log('Repository contents fetched:', data.length, 'items');
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      return [];
    }
  }
}

export default GitHubService;