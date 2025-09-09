import { Repository } from "@/components/RepositoryInfo";

export class ReadmeService {
  static generateReadme(repository: Repository, contents: any[] = []): string {
    console.log('Generating README for repository:', repository.name);
    
    const {
      name,
      description,
      html_url,
      language,
      stargazers_count,
      forks_count,
      owner,
      license
    } = repository;

    // Generate badges
    const badges = this.generateBadges(repository);
    
    // Analyze repository structure
    const hasPackageJson = contents.some((file: any) => file.name === 'package.json');
    const hasRequirementsTxt = contents.some((file: any) => file.name === 'requirements.txt');
    const hasGemfile = contents.some((file: any) => file.name === 'Gemfile');
    const hasCargoToml = contents.some((file: any) => file.name === 'Cargo.toml');
    const hasGoMod = contents.some((file: any) => file.name === 'go.mod');
    
    // Generate installation instructions based on detected files
    const installationInstructions = this.generateInstallationInstructions(
      language,
      hasPackageJson,
      hasRequirementsTxt,
      hasGemfile,
      hasCargoToml,
      hasGoMod
    );
    
    // Generate usage examples based on language
    const usageExamples = this.generateUsageExamples(language);
    
    // Generate features list
    const features = this.generateFeatures(repository, contents);

    const readme = `# ${name}

${badges}

${description || 'A modern and efficient project built with cutting-edge technologies.'}

## ✨ Features

${features}

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
${this.generatePrerequisites(language, hasPackageJson, hasRequirementsTxt, hasGemfile, hasCargoToml, hasGoMod)}

### Installation

${installationInstructions}

## 📖 Usage

${usageExamples}

## 🛠️ Built With

- **${language || 'Multiple Languages'}** - Primary programming language
${this.generateTechStack(contents)}

## 📊 Project Stats

- ⭐ **${stargazers_count}** stars
- 🍴 **${forks_count}** forks
- 👁️ **${repository.watchers_count}** watchers
- 📝 **${license?.name || 'No License'}** license

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

${license 
  ? `This project is licensed under the ${license.name} License - see the [LICENSE](LICENSE) file for details.`
  : 'This project is currently unlicensed. Consider adding a license to protect your work.'
}

## 👤 Author

**${owner.login}**

- GitHub: [@${owner.login}](https://github.com/${owner.login})
- Repository: [${name}](${html_url})

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the open source community
- Built with ❤️ and modern development practices

---

⭐ Don't forget to give the project a star if you found it helpful!

[![GitHub stars](https://img.shields.io/github/stars/${owner.login}/${name}.svg?style=social&label=Star)](${html_url}/stargazers)`;

    console.log('README generated successfully');
    return readme;
  }

  private static generateBadges(repository: Repository): string {
    const { owner, name, language, license, stargazers_count, forks_count } = repository;
    
    const badges = [
      `![GitHub stars](https://img.shields.io/github/stars/${owner.login}/${name}?style=flat-square)`,
      `![GitHub forks](https://img.shields.io/github/forks/${owner.login}/${name}?style=flat-square)`,
      `![GitHub issues](https://img.shields.io/github/issues/${owner.login}/${name}?style=flat-square)`,
    ];

    if (language) {
      badges.push(`![GitHub language](https://img.shields.io/github/languages/top/${owner.login}/${name}?style=flat-square)`);
    }

    if (license) {
      badges.push(`![License](https://img.shields.io/github/license/${owner.login}/${name}?style=flat-square)`);
    }

    badges.push(`![GitHub last commit](https://img.shields.io/github/last-commit/${owner.login}/${name}?style=flat-square)`);

    return badges.join(' ');
  }

  private static generateFeatures(repository: Repository, contents: any[]): string {
    const features = [
      '🎯 **Clean and Modern Design** - Built with best practices in mind',
      '⚡ **High Performance** - Optimized for speed and efficiency',
      '🔧 **Easy to Use** - Simple setup and intuitive interface',
      '📱 **Responsive** - Works seamlessly across all devices',
    ];

    // Add language-specific features
    if (repository.language) {
      switch (repository.language.toLowerCase()) {
        case 'javascript':
        case 'typescript':
          features.push('🌐 **Modern JavaScript/TypeScript** - Leveraging latest ES features');
          break;
        case 'python':
          features.push('🐍 **Python Powered** - Clean and readable Python code');
          break;
        case 'java':
          features.push('☕ **Java Excellence** - Robust and scalable Java architecture');
          break;
        case 'go':
          features.push('🚀 **Go Performance** - Lightning-fast and concurrent');
          break;
        case 'rust':
          features.push('🦀 **Rust Safety** - Memory-safe and blazingly fast');
          break;
      }
    }

    // Add features based on repository contents
    if (contents.some((file: any) => file.name.includes('test'))) {
      features.push('🧪 **Well Tested** - Comprehensive test coverage');
    }

    if (contents.some((file: any) => file.name === 'docker' || file.name === 'Dockerfile')) {
      features.push('🐳 **Docker Ready** - Containerized for easy deployment');
    }

    return features.map(feature => `- ${feature}`).join('\n');
  }

  private static generatePrerequisites(language: string, hasPackageJson: boolean, hasRequirementsTxt: boolean, hasGemfile: boolean, hasCargoToml: boolean, hasGoMod: boolean): string {
    const prerequisites = [];

    if (hasPackageJson) {
      prerequisites.push('- [Node.js](https://nodejs.org/) (v14 or higher)');
      prerequisites.push('- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)');
    }

    if (hasRequirementsTxt) {
      prerequisites.push('- [Python](https://python.org/) (v3.7 or higher)');
      prerequisites.push('- [pip](https://pip.pypa.io/en/stable/)');
    }

    if (hasGemfile) {
      prerequisites.push('- [Ruby](https://ruby-lang.org/) (v2.7 or higher)');
      prerequisites.push('- [Bundler](https://bundler.io/)');
    }

    if (hasCargoToml) {
      prerequisites.push('- [Rust](https://rustup.rs/) (latest stable)');
      prerequisites.push('- [Cargo](https://doc.rust-lang.org/cargo/)');
    }

    if (hasGoMod) {
      prerequisites.push('- [Go](https://golang.org/) (v1.16 or higher)');
    }

    if (prerequisites.length === 0) {
      prerequisites.push(`- [${language || 'Required runtime'}](https://example.com) - Check project documentation for specific version requirements`);
    }

    return prerequisites.join('\n');
  }

  private static generateInstallationInstructions(language: string, hasPackageJson: boolean, hasRequirementsTxt: boolean, hasGemfile: boolean, hasCargoToml: boolean, hasGoMod: boolean): string {
    const instructions = ['1. Clone the repository:', '   ```bash', '   git clone <repository-url>', '   cd <repository-name>', '   ```', ''];

    if (hasPackageJson) {
      instructions.push(
        '2. Install dependencies:',
        '   ```bash',
        '   npm install',
        '   # or',
        '   yarn install',
        '   ```',
        '',
        '3. Start the application:',
        '   ```bash',
        '   npm start',
        '   # or',
        '   yarn start',
        '   ```'
      );
    } else if (hasRequirementsTxt) {
      instructions.push(
        '2. Create a virtual environment:',
        '   ```bash',
        '   python -m venv venv',
        '   source venv/bin/activate  # On Windows: venv\\Scripts\\activate',
        '   ```',
        '',
        '3. Install dependencies:',
        '   ```bash',
        '   pip install -r requirements.txt',
        '   ```',
        '',
        '4. Run the application:',
        '   ```bash',
        '   python main.py',
        '   ```'
      );
    } else if (hasGemfile) {
      instructions.push(
        '2. Install dependencies:',
        '   ```bash',
        '   bundle install',
        '   ```',
        '',
        '3. Run the application:',
        '   ```bash',
        '   bundle exec ruby main.rb',
        '   ```'
      );
    } else if (hasCargoToml) {
      instructions.push(
        '2. Build and run:',
        '   ```bash',
        '   cargo run',
        '   ```',
        '',
        '   Or build for release:',
        '   ```bash',
        '   cargo build --release',
        '   ```'
      );
    } else if (hasGoMod) {
      instructions.push(
        '2. Install dependencies:',
        '   ```bash',
        '   go mod tidy',
        '   ```',
        '',
        '3. Run the application:',
        '   ```bash',
        '   go run main.go',
        '   ```'
      );
    } else {
      instructions.push(
        '2. Follow the setup instructions specific to this project',
        '3. Refer to the project documentation for detailed installation steps'
      );
    }

    return instructions.join('\n');
  }

  private static generateUsageExamples(language: string): string {
    const examples = ['Here are some basic usage examples:', ''];

    switch (language?.toLowerCase()) {
      case 'javascript':
      case 'typescript':
        examples.push(
          '```javascript',
          'import { ProjectName } from "./src/index.js";',
          '',
          'const project = new ProjectName();',
          'project.initialize();',
          '```'
        );
        break;
      case 'python':
        examples.push(
          '```python',
          'from project_name import ProjectName',
          '',
          'project = ProjectName()',
          'project.run()',
          '```'
        );
        break;
      case 'java':
        examples.push(
          '```java',
          'public class Main {',
          '    public static void main(String[] args) {',
          '        ProjectName project = new ProjectName();',
          '        project.start();',
          '    }',
          '}',
          '```'
        );
        break;
      case 'go':
        examples.push(
          '```go',
          'package main',
          '',
          'import "fmt"',
          '',
          'func main() {',
          '    fmt.Println("Hello from project!")',
          '}',
          '```'
        );
        break;
      case 'rust':
        examples.push(
          '```rust',
          'use project_name::ProjectName;',
          '',
          'fn main() {',
          '    let project = ProjectName::new();',
          '    project.run();',
          '}',
          '```'
        );
        break;
      default:
        examples.push(
          'Please refer to the project documentation for specific usage instructions.',
          'Each feature comes with detailed examples and API documentation.'
        );
    }

    return examples.join('\n');
  }

  private static generateTechStack(contents: any[]): string {
    const stack = [];
    
    const fileExtensions = contents.map((file: any) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ext;
    }).filter(Boolean);

    if (fileExtensions.includes('ts') || fileExtensions.includes('tsx')) {
      stack.push('- **TypeScript** - Type-safe JavaScript');
    }
    if (fileExtensions.includes('js') || fileExtensions.includes('jsx')) {
      stack.push('- **JavaScript** - Dynamic programming language');
    }
    if (fileExtensions.includes('py')) {
      stack.push('- **Python** - High-level programming language');
    }
    if (fileExtensions.includes('java')) {
      stack.push('- **Java** - Object-oriented programming language');
    }
    if (fileExtensions.includes('go')) {
      stack.push('- **Go** - Fast and efficient language');
    }
    if (fileExtensions.includes('rs')) {
      stack.push('- **Rust** - Systems programming language');
    }
    if (contents.some((file: any) => file.name === 'package.json')) {
      stack.push('- **Node.js** - JavaScript runtime environment');
    }
    if (contents.some((file: any) => file.name === 'Dockerfile')) {
      stack.push('- **Docker** - Containerization platform');
    }

    return stack.length > 0 ? stack.join('\n') : '- Modern development tools and practices';
  }
}

export default ReadmeService;