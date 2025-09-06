# Data Model: UK Retail News Weekly Summary

## Core Entities

### NewsArticle
**Purpose**: Represents a single news article fetched from Gemini API

**Fields**:
- `title: string` (required) - Article headline/title
- `summary: string` (required) - Brief summary/excerpt of the article
- `publicationDate: Date` (required) - When the article was published
- `sourceUrl: string` (required) - Direct link to the original article
- `source: string` (required) - Publication name (e.g., "BBC Business", "Retail Week")
- `importance: number` (required) - Computed importance score (1-10)
- `category: string[]` (optional) - Categories like ["retail", "uk", "fashion", "grocery"]

**Validation Rules**:
- Title must be 10-200 characters
- Summary must be 50-500 characters  
- Publication date must be within last 7 days
- Source URL must be valid HTTP/HTTPS URL
- Importance score must be 1-10
- Source must be non-empty string

**State Transitions**:
- Created → Validated → Formatted → Included/Excluded

### EmailSummary
**Purpose**: Aggregated weekly digest containing multiple news articles

**Fields**:
- `recipient: string` (required) - Email address of recipient
- `subject: string` (required) - Email subject line
- `htmlContent: string` (required) - Formatted HTML email body
- `textContent: string` (required) - Plain text fallback version
- `articles: NewsArticle[]` (required) - Array of included articles
- `generatedAt: Date` (required) - When summary was created
- `weekStart: Date` (required) - Start of the news week period
- `weekEnd: Date` (required) - End of the news week period

**Validation Rules**:
- Recipient must be valid email address format
- Subject must be 10-100 characters
- Must contain at least HTML or text content
- Articles array must contain 0-20 articles
- Week dates must be logical (start < end)

**Derived Properties**:
- `articleCount: number` - Number of articles included
- `isEmpty: boolean` - Whether any articles were found
- `estimatedReadTime: number` - Calculated reading time in minutes

### ScheduleConfiguration  
**Purpose**: Configuration for weekly execution scheduling

**Fields**:
- `cronExpression: string` (required) - EventBridge cron expression
- `timezone: string` (required) - Timezone for execution (e.g., "Europe/London")
- `enabled: boolean` (required) - Whether scheduling is active
- `lastExecution: Date` (optional) - Timestamp of last successful run
- `nextExecution: Date` (optional) - Calculated next execution time

**Validation Rules**:
- Cron expression must be valid EventBridge format
- Timezone must be valid IANA timezone name
- Execution times must be in chronological order

### ExecutionLog
**Purpose**: Audit trail for system operations and debugging

**Fields**:
- `executionId: string` (required) - Unique identifier for execution
- `timestamp: Date` (required) - When the operation occurred
- `operation: string` (required) - Operation type (FETCH_NEWS, SEND_EMAIL, etc.)
- `status: ExecutionStatus` (required) - SUCCESS, FAILURE, RETRY, TIMEOUT
- `details: string` (optional) - Additional context or error information
- `retryCount: number` (required, default: 0) - Number of retry attempts
- `duration: number` (optional) - Operation duration in milliseconds
- `metadata: Record<string, any>` (optional) - Additional structured data

**Enums**:
```typescript
enum ExecutionStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE', 
  RETRY = 'RETRY',
  TIMEOUT = 'TIMEOUT',
  CANCELLED = 'CANCELLED'
}
```

**Validation Rules**:
- ExecutionId must be unique within execution context
- Operation must be from predefined set
- Retry count must be non-negative integer ≤ 3
- Duration must be positive number if provided

## Relationships

### NewsArticle → EmailSummary
- **Type**: One-to-Many aggregation
- **Description**: Multiple articles are collected into a single weekly summary
- **Constraints**: Maximum 20 articles per summary to avoid email size limits

### ScheduleConfiguration → ExecutionLog
- **Type**: One-to-Many
- **Description**: Each schedule configuration generates multiple execution logs
- **Constraints**: Logs are retained for 30 days for debugging

### EmailSummary → ExecutionLog
- **Type**: One-to-Many
- **Description**: Email generation and sending creates multiple log entries
- **Constraints**: Each summary operation logged with unique execution ID

## Data Flow

```
1. Gemini API Response → NewsArticle[] (parsing & validation)
2. NewsArticle[] → EmailSummary (aggregation & formatting)  
3. EmailSummary → SES API (email delivery)
4. All operations → ExecutionLog[] (audit trail)
```

## Validation Schema

### Runtime Validation
```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Each entity implements validate() method
interface Validatable {
  validate(): ValidationResult;
}
```

### Business Rules
- News articles older than 7 days are rejected
- Email summaries with 0 articles still generate "no news" message
- Retry attempts must not exceed 3 for any operation
- Log entries are immutable once created

## Serialization Formats

### JSON Schema
All entities support JSON serialization for:
- API responses
- Configuration files  
- Log storage
- Testing fixtures

### Email Templates
- HTML format for rich email clients
- Plain text format for accessibility
- Structured data markup for email client features

## Error Handling

### Data Validation Errors
- Invalid field values → ValidationError with field details
- Missing required fields → RequiredFieldError
- Type mismatches → TypeValidationError

### Business Logic Errors  
- No news found → EmptyResultError (handled gracefully)
- Rate limit exceeded → RateLimitError (triggers retry)
- External API failures → ExternalServiceError (logged and retried)
