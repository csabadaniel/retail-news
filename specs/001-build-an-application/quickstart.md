# Quickstart: UK Retail News Weekly Summary Application

## Prerequisites

- Node.js 18+ installed
- AWS CLI configured with appropriate permissions
- SAM CLI installed
- Google Gemini API key
- AWS SES verified email address

## Quick Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd retail-news
npm install
```

### 2. Configure Environment
```bash
# Copy example configuration
cp .env.example .env

# Edit with your values
nano .env
```

Required configuration:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
EMAIL_RECIPIENT=your-email@example.com  
FROM_EMAIL=verified-sender@your-domain.com
```

### 3. Local Development
```bash
# Run tests (should all pass)
npm test

# Build the application
npm run build

# Test locally with SAM
sam local invoke WeeklyNewsFunction --event events/scheduled-event.json
```

### 4. Deploy to AWS
```bash
# Deploy with SAM
sam build
sam deploy --guided

# For subsequent deploys
sam deploy
```

## Validation Tests

### 1. Test News Fetching
```bash
# Test Gemini API integration
npm run test:integration -- --testNamePattern="Gemini"

# Expected: Successfully fetches and parses UK retail news
```

### 2. Test Email Generation  
```bash
# Test email formatting
npm run test:unit -- --testNamePattern="EmailSummary"

# Expected: Generates valid HTML and text email content
```

### 3. Test Email Sending
```bash
# Test SES integration (requires AWS config)
npm run test:integration -- --testNamePattern="SES"

# Expected: Successfully sends test email
```

### 4. Test Full Workflow
```bash
# End-to-end test
npm run test:e2e

# Expected: Complete workflow from news fetch to email delivery
```

## Manual Testing

### Test Scheduled Execution
```bash
# Invoke Lambda function manually
aws lambda invoke \
  --function-name retail-news-weekly-summary \
  --payload '{}' \
  response.json

# Check response
cat response.json
```

### Verify Email Delivery
1. Check your configured email inbox
2. Verify HTML formatting displays correctly
3. Test links to news articles work
4. Check plain text version in email client

### Monitor Execution
```bash
# View CloudWatch logs
sam logs -n WeeklyNewsFunction --start-time '10min ago'

# Check for errors
aws logs filter-log-events \
  --log-group-name '/aws/lambda/retail-news-weekly-summary' \
  --filter-pattern 'ERROR'
```

## Development Workflow

### 1. Make Changes
```bash
# Edit source code in src/
# Add tests in tests/
```

### 2. Test Changes
```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration  

# Check test coverage
npm run test:coverage
```

### 3. Build and Deploy
```bash
# Build TypeScript
npm run build

# Deploy changes
sam build && sam deploy
```

### 4. Verify Deployment
```bash
# Test deployed function
aws lambda invoke \
  --function-name retail-news-weekly-summary \
  --payload '{}' \
  response.json
```

## Troubleshooting

### Common Issues

#### Gemini API Errors
```bash
# Check API key configuration
echo $GEMINI_API_KEY

# Test API connectivity
curl -H "Authorization: Bearer $GEMINI_API_KEY" \
  https://generativelanguage.googleapis.com/v1/models
```

#### Email Delivery Issues
```bash
# Verify SES email address
aws ses get-identity-verification-attributes \
  --identities $FROM_EMAIL

# Check SES sending quota
aws ses get-send-quota
```

#### Lambda Function Errors
```bash
# Check function configuration
aws lambda get-function-configuration \
  --function-name retail-news-weekly-summary

# View recent errors
aws logs filter-log-events \
  --log-group-name '/aws/lambda/retail-news-weekly-summary' \
  --start-time $(date -d '1 hour ago' +%s)000
```

### Debug Mode
```bash
# Enable debug logging
export LOG_LEVEL=DEBUG

# Run with detailed logging
npm run dev
```

## Configuration Reference

### Environment Variables
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `EMAIL_RECIPIENT` | Yes | - | Email address to receive summaries |
| `FROM_EMAIL` | Yes | - | SES verified sender email |
| `AWS_REGION` | No | us-east-1 | AWS region for SES |
| `LOG_LEVEL` | No | INFO | Logging level (DEBUG/INFO/WARN/ERROR) |
| `MAX_ARTICLES` | No | 10 | Maximum articles per email |
| `TIMEOUT_MS` | No | 300000 | Function timeout in milliseconds |

### SAM Template Parameters
```yaml
Parameters:
  ScheduleExpression:
    Type: String
    Default: "cron(0 8 ? * SAT *)"  # 8 AM GMT every Saturday
    
  FunctionTimeout:
    Type: Number
    Default: 300  # 5 minutes
    
  FunctionMemory:
    Type: Number
    Default: 512  # 512 MB
```

## Performance Expectations

### Execution Metrics
- **Cold Start**: < 3 seconds
- **Warm Execution**: < 30 seconds  
- **Memory Usage**: < 200 MB typical
- **API Calls**: 1-3 Gemini requests, 1 SES request

### Success Criteria
✅ Executes every Saturday at 8:00 AM GMT  
✅ Fetches 5-15 UK retail news articles  
✅ Sends formatted email within 2 minutes  
✅ Handles API failures gracefully with retries  
✅ Logs all operations for monitoring  

## Next Steps

### Production Considerations
1. **Monitoring**: Set up CloudWatch alarms for failures
2. **Alerting**: Configure SNS for critical errors
3. **Cost**: Monitor Gemini API and SES usage
4. **Security**: Rotate API keys regularly
5. **Backup**: Consider manual execution capability

### Feature Enhancements  
- Multiple email recipients
- Custom news categories
- RSS feed backup source
- Email open/click tracking
- Historical news archive

### Integration Options
- Slack webhook integration
- Mobile push notifications
- RSS feed generation
- API endpoint for on-demand summaries
