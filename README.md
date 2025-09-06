# Retail News Backend Service

This backend periodically fetches top UK retail news summaries from Gemini and emails them to a configurable recipient. Built with NodeJS, TypeScript, and AWS Lambda (SAM).

## Features
- Fetches news summaries from Gemini API
- Sends email via nodemailer or AWS SES
- Configurable recipient and fetch interval
- Robust error handling and logging
- TDD: contract, integration, and unit tests

## Setup
1. Clone the repo
2. Install dependencies: `npm install`
3. Configure environment variables in `.env` or AWS Parameter Store
4. Build: `npm run build`
5. Test: `npm test`
6. Deploy via AWS SAM

## Environment Variables
- `GEMINI_API_KEY`, `GEMINI_ENDPOINT`
- `EMAIL_FROM`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`
- `RECIPIENT_EMAIL`, `FETCH_INTERVAL`, `FETCH_TIME`

## Project Structure
- `src/` - Source code
- `tests/` - Tests (contract, integration, unit, performance)
- `specs/` - Feature specs and tasks

## Usage
- Run locally: `npm run build && node dist/handler.js`
- Run tests: `npm test`
- Deploy: `sam deploy`

## License
MIT
