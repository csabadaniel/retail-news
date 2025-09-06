# GitHub Copilot Instructions for UK Retail News Application

## Project Overview
TypeScript/Node.js serverless application that fetches UK retail news from Google Gemini AI weekly and sends email summaries via AWS SES. Deployed as AWS Lambda with SAM.

## Architecture Principles
- **Library-first**: Each feature (news-fetcher, email-sender, scheduler) as standalone library
- **Test-driven**: RED-GREEN-Refactor cycle mandatory
- **Minimal dependencies**: Direct AWS SDK/Gemini SDK usage, avoid wrapper abstractions
- **Serverless-native**: EventBridge scheduling, CloudWatch logging, no persistent state

## Technology Stack
- **Runtime**: Node.js 18+, TypeScript 5.x
- **Cloud**: AWS Lambda, SES, EventBridge, CloudWatch
- **APIs**: Google Gemini Pro, AWS SDK v3  
- **Testing**: Jest with integration tests using real AWS services
- **Deployment**: AWS SAM CLI with CloudFormation

## Code Organization
```
src/
├── lib/
│   ├── news-fetcher/     # Gemini API integration
│   ├── email-sender/     # SES integration  
│   └── scheduler/        # EventBridge cron logic
├── models/               # TypeScript interfaces
├── services/             # Business logic orchestration
└── cli/                  # Command-line interfaces per library

tests/
├── unit/                 # Fast isolated tests
├── integration/          # Real AWS service tests
└── contract/             # API contract validation
```

## Key Entities
- **NewsArticle**: `{title, summary, publicationDate, sourceUrl, source, importance}`
- **EmailSummary**: `{recipient, htmlContent, textContent, articles[], generatedAt}`
- **ExecutionLog**: `{executionId, operation, status, retryCount, details}`

## Development Patterns

### Error Handling
```typescript
// Exponential backoff with jitter for API calls
const retryWithBackoff = async (operation: () => Promise<T>, maxAttempts = 3)

// Structured error logging
logger.error('Operation failed', { 
  executionId, operation, error: error.message, retryCount 
});
```

### Configuration Management
```typescript
interface Config {
  GEMINI_API_KEY: string;
  EMAIL_RECIPIENT: string;
  FROM_EMAIL: string;
  LOG_LEVEL?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
}
```

### Testing Requirements
- Tests written BEFORE implementation
- Integration tests use real AWS services (SES, CloudWatch)
- Contract tests validate API responses
- Each library has CLI with `--help`, `--version`, `--format` options

## Recent Context
- Feature spec completed with 9 functional requirements
- Implementation plan focuses on Saturday 8 AM GMT execution
- 3-retry strategy for all external API calls
- Structured JSON logging to CloudWatch
- Single recipient email configuration approach

## Code Style Preferences
- Async/await over Promises.then()
- TypeScript strict mode enabled
- Functional programming patterns where appropriate
- Descriptive variable names over comments
- Early returns to reduce nesting

## AWS SAM Configuration
- EventBridge cron: `cron(0 8 ? * SAT *)` (8 AM GMT Saturdays)
- Lambda timeout: 300 seconds (5 minutes)
- Memory: 512 MB
- Environment variables from template parameters

## Common Operations
1. **News Fetching**: Structured Gemini prompt → parse JSON → validate articles
2. **Email Generation**: Articles → HTML template → text fallback → SES format
3. **Retry Logic**: Exponential backoff → log attempts → fail after 3 tries
4. **Scheduling**: EventBridge event → Lambda trigger → execute workflow

This application prioritizes reliability, observability, and maintainability over complexity.
