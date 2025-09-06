# Deployment Guide

This document explains how to deploy the Retail News Backend service to AWS Lambda using AWS SAM.

## Prerequisites

1. **AWS CLI** installed and configured
   ```bash
   aws configure
   ```

2. **AWS SAM CLI** installed
   ```bash
   # macOS
   brew install aws-sam-cli
   
   # Or download from: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html
   ```

3. **Node.js 18+** and **npm** installed

## Initial Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the project**
   ```bash
   npm run build:sam
   ```

3. **Configure your deployment**
   
   **For local development:**
   ```bash
   cp config/env.sample .env
   # Edit .env with your actual values
   ```
   
   **For AWS SAM deployment:**
   ```bash
   cp config/samconfig.toml.sample samconfig.toml
   # Edit samconfig.toml with your actual values
   ```
   
   This step is optional - you can also provide parameters during the guided deployment.

## First-Time Deployment

Run the guided deployment to set up your stack:

```bash
npm run sam:deploy
```

This will prompt you for:
- Stack name (e.g., `retail-news-backend`)
- AWS region (e.g., `us-east-1`)
- Parameter values:
  - **GeminiApiKey**: Your Gemini API key
  - **GeminiEndpoint**: Gemini API endpoint URL
  - **EmailFrom**: Sender email address
  - **EmailHost**: SMTP server (e.g., `smtp.gmail.com`)
  - **EmailPort**: SMTP port (usually `587`)
  - **EmailUser**: SMTP username
  - **EmailPass**: SMTP password
  - **RecipientEmail**: Email to receive news summaries
  - **FetchInterval**: `daily` or `weekly`
  - **FetchTime**: Time in `HH:MM` format (e.g., `08:00`)

## Subsequent Deployments

For updates after the initial deployment:

```bash
npm run build:sam
npm run sam:deploy:prod
```

## Environment Configuration

### Production Environment Variables

The following environment variables are configured through SAM parameters:

- `GEMINI_API_KEY` - API key for Gemini service
- `GEMINI_ENDPOINT` - Gemini API endpoint URL
- `EMAIL_FROM` - Sender email address
- `EMAIL_HOST` - SMTP server host
- `EMAIL_PORT` - SMTP server port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `RECIPIENT_EMAIL` - Recipient email address
- `FETCH_INTERVAL` - Fetch frequency (`daily`, `weekly`)
- `FETCH_TIME` - Time to fetch news (`HH:MM`)

### Local Development

For local development, copy the sample environment file and customize it:

```bash
cp config/env.sample .env
```

Then edit the `.env` file with your actual values:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
EMAIL_FROM=your-sender@example.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
RECIPIENT_EMAIL=recipient@example.com
FETCH_INTERVAL=daily
FETCH_TIME=08:00
```

## Testing the Deployment

1. **Check the function in AWS Console**
   - Go to AWS Lambda console
   - Find your function (named from your stack)
   - Check the logs in CloudWatch

2. **Manual invoke**
   ```bash
   sam local invoke RetailNewsFunction
   ```

3. **View logs**
   ```bash
   sam logs -n RetailNewsFunction --stack-name your-stack-name --tail
   ```

## Troubleshooting

### Common Issues

1. **Permission Errors**
   - Ensure your AWS credentials have permissions for Lambda, CloudFormation, and CloudWatch

2. **SMTP Authentication Errors**
   - Verify your email credentials
   - For Gmail, you may need to use an App Password

3. **Gemini API Errors**
   - Verify your API key is correct
   - Check the endpoint URL

### Cleaning Up

To delete the stack and all resources:

```bash
sam delete --stack-name your-stack-name
```

## Monitoring

- **CloudWatch Logs**: `/aws/lambda/your-function-name`
- **CloudWatch Metrics**: Lambda function metrics available in AWS Console
- **Scheduled Execution**: The function runs daily at 8:00 AM UTC by default

## Cost Optimization

- Function timeout: 5 minutes (300 seconds)
- Memory: 512 MB
- Log retention: 14 days
- Estimated monthly cost: $1-5 depending on usage (AWS Free Tier eligible)
