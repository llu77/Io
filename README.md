# Io - TypeScript Full-Stack Project

A modern TypeScript-based full-stack project template with React/Next.js, Node.js, Cloudflare Workers, and Claude AI integration.

## 🚀 Stack

- **Frontend**: React 18+, Next.js 14+ (App Router)
- **Backend**: Node.js 20+, Express/Hono
- **Edge Computing**: Cloudflare Workers
- **AI Integration**: Claude API (Sonnet 4.5)
- **Language**: TypeScript with strict mode

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Git

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Io
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Required environment variables:

- `CLAUDE_API_KEY`: Your Claude AI API key from Anthropic
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `JWT_SECRET`: A secure secret for JWT tokens (minimum 32 characters)
- `DATABASE_URL`: Your database connection string

### 4. Build the project

```bash
npm run build
```

## 📦 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build the project for production
npm start            # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Cleanup

```bash
npm run clean        # Remove build artifacts
```

## 🏗️ Project Structure

```
/
├── .github/              # GitHub workflows and actions
├── .husky/              # Git hooks
├── src/                 # Source code
│   ├── index.ts         # Main entry point
│   ├── utils/           # Utility functions
│   └── __tests__/       # Test files
├── dist/                # Compiled output (generated)
├── coverage/            # Test coverage reports (generated)
├── .env.example         # Environment variables template
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .clinerules          # Development guidelines
├── jest.config.js       # Jest configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Package dependencies and scripts
```

## 🔒 Security

### Best Practices

1. **Never commit secrets**: Use `.env` files for sensitive data
2. **Input validation**: Always validate and sanitize user inputs
3. **API security**: Implement rate limiting and authentication
4. **Dependency audits**: Regularly run `npm audit` to check for vulnerabilities
5. **TypeScript strict mode**: Enabled by default for type safety

### Security Checklist

- ✅ TypeScript strict mode enabled
- ✅ ESLint configured with security rules
- ✅ Environment variables template provided
- ✅ Git hooks for pre-commit checks
- ✅ No secrets in version control

## 🧪 Testing

Tests are written using Jest and ts-jest. The project aims for:

- Minimum 70% code coverage
- Unit tests for all critical functions
- Integration tests for API endpoints
- E2E tests for critical user flows

### Writing Tests

```typescript
// Example test file: src/utils/__tests__/example.test.ts
import { myFunction } from '../example';

describe('myFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle errors gracefully', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

## 📝 Development Guidelines

Please read [.clinerules](./.clinerules) for comprehensive development guidelines, including:

- Code quality standards
- TypeScript best practices
- Error handling requirements
- Security best practices
- Testing strategies
- API design principles
- Performance guidelines

### Key Principles

1. **Think deeply BEFORE coding** - Understand the problem completely
2. **Question ambiguity, never assume** - Ask for clarification
3. **Security & scalability first** - Design with growth in mind
4. **TypeScript strict mode always** - No `any` types
5. **Comprehensive error handling** - Handle all edge cases

## 🔄 Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve memory leak in API
docs: update README with setup instructions
test: add unit tests for user service
refactor: simplify error handling logic
```

### Git Hooks

This project uses Husky for Git hooks:

- **pre-commit**: Runs linting and formatting on staged files
- **pre-push**: Runs tests before pushing to remote

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m "feat: add new feature"`
6. Push to the branch: `git push origin feat/my-feature`
7. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Issue**: TypeScript compilation errors

```bash
# Clear build cache and rebuild
npm run clean
npm run build
```

**Issue**: ESLint errors

```bash
# Auto-fix ESLint issues
npm run lint:fix
```

**Issue**: Test failures

```bash
# Run tests in watch mode to debug
npm run test:watch
```

**Issue**: Module resolution errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Claude API Documentation](https://docs.anthropic.com/)
- [React Documentation](https://react.dev/)

## 📄 License

ISC

## 🙋 Support

For questions or issues, please open an issue on GitHub.

---

**Remember**: Think deeply BEFORE coding. Question ambiguity, never assume. Security & scalability first.
