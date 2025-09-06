# Service Contracts: UK Retail News Weekly Summary

## Gemini API Contract

### Request Contract
```typescript
interface GeminiNewsRequest {
  model: "gemini-pro";
  prompt: {
    text: string; // Structured prompt for UK retail news
  };
  generationConfig: {
    temperature: number; // 0.3 for factual content
    topK: number; // 40
    topP: number; // 0.8
    maxOutputTokens: number; // 2048
  };
}
```

### Response Contract
```typescript
interface GeminiNewsResponse {
  candidates: [{
    content: {
      parts: [{
        text: string; // JSON string containing news articles
      }];
    };
    finishReason: "STOP" | "MAX_TOKENS" | "SAFETY" | "RECITATION";
  }];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

// Parsed content structure
interface ParsedNewsContent {
  articles: {
    title: string;
    summary: string;
    publicationDate: string; // ISO 8601 format
    sourceUrl: string;
    source: string;
    importance: number; // 1-10 scale
  }[];
  metadata: {
    totalArticles: number;
    dateRange: {
      start: string;
      end: string;
    };
    sources: string[];
  };
}
```

## SES Email Contract

### Send Email Request
```typescript
interface SESEmailRequest {
  Source: string; // From email address
  Destination: {
    ToAddresses: string[]; // Recipient email address(es)
  };
  Message: {
    Subject: {
      Data: string; // Email subject
      Charset: "UTF-8";
    };
    Body: {
      Html: {
        Data: string; // HTML email content
        Charset: "UTF-8";
      };
      Text: {
        Data: string; // Plain text fallback
        Charset: "UTF-8";
      };
    };
  };
  ReplyToAddresses?: string[];
  ReturnPath?: string;
}
```

### Send Email Response
```typescript
interface SESEmailResponse {
  MessageId: string; // Unique message identifier
  $metadata: {
    httpStatusCode: number; // 200 for success
    requestId: string;
    attempts: number;
  };
}
```

## Lambda Handler Contract

### Event Contract (EventBridge Scheduled)
```typescript
interface ScheduledEvent {
  version: "0";
  id: string; // Event UUID
  "detail-type": "Scheduled Event";
  source: "aws.events";
  account: string; // AWS Account ID
  time: string; // ISO 8601 timestamp
  region: string; // AWS region
  detail: {}; // Empty for scheduled events
}
```

### Lambda Response Contract
```typescript
interface LambdaResponse {
  statusCode: number; // 200 for success, 500+ for errors
  body: string; // JSON stringified response
  headers?: Record<string, string>;
}

// Response body structure
interface ExecutionResult {
  success: boolean;
  executionId: string;
  timestamp: string; // ISO 8601
  articlesProcessed: number;
  emailSent: boolean;
  errors?: string[];
  duration: number; // milliseconds
}
```

## Configuration Contract

### Environment Variables
```typescript
interface EnvironmentConfig {
  // Required
  GEMINI_API_KEY: string;
  EMAIL_RECIPIENT: string; // Valid email address
  FROM_EMAIL: string; // SES verified email address
  
  // Optional with defaults
  AWS_REGION?: string; // Default: us-east-1
  LOG_LEVEL?: "DEBUG" | "INFO" | "WARN" | "ERROR"; // Default: INFO
  MAX_ARTICLES?: string; // Default: "10" (number as string)
  TIMEOUT_MS?: string; // Default: "300000" (5 minutes)
}
```

### Local Configuration File (.env.example)
```bash
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration  
EMAIL_RECIPIENT=recipient@example.com
FROM_EMAIL=sender@verified-domain.com

# Optional Configuration
AWS_REGION=us-east-1
LOG_LEVEL=INFO
MAX_ARTICLES=10
TIMEOUT_MS=300000
```

## Error Contracts

### Standard Error Response
```typescript
interface ServiceError {
  error: {
    type: string; // Error category
    message: string; // Human readable message
    code?: string; // Machine readable code
    details?: Record<string, any>; // Additional context
    retryable: boolean; // Whether operation can be retried
  };
  executionId: string;
  timestamp: string; // ISO 8601
}
```

### Error Types
```typescript
enum ErrorType {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  API_ERROR = "API_ERROR", 
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  CONFIGURATION_ERROR = "CONFIGURATION_ERROR"
}
```

## Retry Policy Contract

### Retry Configuration
```typescript
interface RetryPolicy {
  maxAttempts: 3;
  backoffStrategy: "exponential";
  baseDelay: 1000; // milliseconds
  maxDelay: 10000; // milliseconds
  jitter: true; // Add randomness to prevent thundering herd
  retryableErrors: ErrorType[];
}
```

### Retry Metadata
```typescript
interface RetryMetadata {
  attempt: number; // Current attempt (1-based)
  totalAttempts: number; // Maximum attempts
  delay: number; // Delay before this attempt (ms)
  lastError?: ServiceError; // Error from previous attempt
}
```

## Logging Contract

### Structured Log Entry
```typescript
interface LogEntry {
  timestamp: string; // ISO 8601
  level: "DEBUG" | "INFO" | "WARN" | "ERROR";
  message: string;
  executionId: string;
  operation: string;
  metadata?: {
    duration?: number; // milliseconds
    retryCount?: number;
    articleCount?: number;
    error?: ServiceError;
    [key: string]: any;
  };
}
```

## Testing Contracts

### Mock Data Structures
```typescript
interface MockGeminiResponse {
  success: boolean;
  articles: MockNewsArticle[];
  delay?: number; // Simulate API latency
  shouldFail?: boolean; // Force error for testing
}

interface MockNewsArticle {
  title: string;
  summary: string;
  publicationDate: string;
  sourceUrl: string;
  source: string;
  importance: number;
}
```

### Test Fixtures
- Valid Gemini response with 5 news articles
- Empty Gemini response (no news found)
- Gemini API error response
- SES success response
- SES error response (bounce/complaint)
- Invalid configuration scenarios
- Network timeout scenarios
