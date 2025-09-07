# Tasks: UK Retail News Weekly Summary Application

**Input**: Design documents from `/specs/001-build-an-application/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → COMPLETE: Node.js 18+, TypeScript 5.x, AWS Lambda, SAM deployment
   → Extract: AWS SDK v3, Gemini AI SDK, Jest testing, library-first structure
2. Load optional design documents:
   → data-model.md: NewsArticle, EmailSummary, ExecutionLog, ScheduleConfiguration → model tasks
   → contracts/: Gemini API, SES Email, Lambda Handler → contract test tasks
   → research.md: Technical decisions → setup and integration tasks
3. Generate tasks by category:
   → Setup: SAM project init, TypeScript config, dependencies, linting
   → Tests: contract tests, integration tests for each service
   → Core: models, libraries (news-fetcher, email-sender, scheduler), services
   → Integration: AWS SDK integration, error handling, logging
   → Polish: unit tests, performance validation, documentation
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests? ✓
   → All entities have models? ✓
   → All libraries implemented? ✓
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions (Single project structure)
- **Source**: `src/` at repository root
- **Tests**: `tests/` at repository root
- **Config**: SAM template, package.json, tsconfig.json at root

## Phase 3.1: Setup
- [ ] T001 Create SAM project structure with TypeScript configuration
- [ ] T002 Initialize Node.js project with package.json and dependencies (AWS SDK v3, @google/generative-ai, Jest, TypeScript)
- [ ] T003 [P] Configure linting (ESLint) and formatting (Prettier) tools in .eslintrc.js and .prettierrc
- [ ] T004 [P] Create SAM template.yaml with Lambda function, EventBridge schedule, IAM roles
- [ ] T005 [P] Setup TypeScript configuration in tsconfig.json with strict mode and Lambda target
- [ ] T006 [P] Create environment configuration structure with .env.example and validation

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T007 [P] Contract test for Gemini API integration in tests/contract/gemini-api.test.ts
- [ ] T008 [P] Contract test for SES email sending in tests/contract/ses-email.test.ts
- [ ] T009 [P] Contract test for Lambda handler EventBridge trigger in tests/contract/lambda-handler.test.ts
- [ ] T010 [P] Integration test for news fetching workflow in tests/integration/news-fetcher.test.ts
- [ ] T011 [P] Integration test for email sending workflow in tests/integration/email-sender.test.ts
- [ ] T012 [P] Integration test for complete weekly summary execution in tests/integration/weekly-summary.test.ts
- [ ] T013 [P] Integration test for error handling and retry logic in tests/integration/error-handling.test.ts

## Phase 3.3: Core Models (ONLY after tests are failing)
- [ ] T014 [P] NewsArticle model with validation in src/models/NewsArticle.ts
- [ ] T015 [P] EmailSummary model with HTML/text generation in src/models/EmailSummary.ts
- [ ] T016 [P] ExecutionLog model for audit trail in src/models/ExecutionLog.ts
- [ ] T017 [P] ScheduleConfiguration model for cron settings in src/models/ScheduleConfiguration.ts

## Phase 3.4: Library Implementation (ONLY after models complete)
- [ ] T018 [P] News-fetcher library with Gemini API client in src/lib/news-fetcher/index.ts
- [ ] T019 [P] News-fetcher CLI interface in src/lib/news-fetcher/cli.ts (--help, --version, --format)
- [ ] T020 [P] Email-sender library with SES integration in src/lib/email-sender/index.ts
- [ ] T021 [P] Email-sender CLI interface in src/lib/email-sender/cli.ts (--help, --version, --format)
- [ ] T022 [P] Scheduler library with EventBridge logic in src/lib/scheduler/index.ts
- [ ] T023 [P] Scheduler CLI interface in src/lib/scheduler/cli.ts (--help, --version, --format)

## Phase 3.5: Service Layer Integration
- [ ] T024 Configuration service for environment variable loading and validation in src/services/ConfigService.ts
- [ ] T025 Logger service with structured CloudWatch logging in src/services/LoggerService.ts  
- [ ] T026 Retry service with exponential backoff and jitter in src/services/RetryService.ts
- [ ] T027 Weekly summary orchestration service in src/services/WeeklySummaryService.ts
- [ ] T028 Lambda handler function integrating all services in src/index.ts

## Phase 3.6: Error Handling & Resilience
- [ ] T029 Error handling middleware with proper error types and logging in src/middleware/ErrorHandler.ts
- [ ] T030 API rate limiting and quota management for Gemini API in src/lib/news-fetcher/RateLimiter.ts
- [ ] T031 Email delivery failure handling and bounce processing in src/lib/email-sender/DeliveryHandler.ts
- [ ] T032 Lambda timeout and memory optimization in src/utils/PerformanceOptimizer.ts

## Phase 3.7: Deployment & Configuration
- [ ] T033 [P] Build script for TypeScript compilation and bundling in build.sh
- [ ] T034 [P] SAM deployment configuration with parameter overrides in samconfig.toml
- [ ] T035 [P] EventBridge cron expression setup (cron(0 8 ? * SAT *)) in template.yaml
- [ ] T036 [P] CloudWatch log group and retention policy configuration in template.yaml

## Phase 3.8: Polish & Validation
- [ ] T037 [P] Unit tests for models validation logic in tests/unit/models/
- [ ] T038 [P] Unit tests for retry mechanisms in tests/unit/services/RetryService.test.ts  
- [ ] T039 [P] Unit tests for configuration validation in tests/unit/services/ConfigService.test.ts
- [ ] T040 [P] Performance tests for Lambda cold start optimization in tests/performance/cold-start.test.ts
- [ ] T041 [P] End-to-end validation following quickstart.md test scenarios
- [ ] T042 [P] Update README.md with setup instructions and architecture overview
- [ ] T043 [P] Create example event payloads in events/ directory for local testing
- [ ] T044 Remove code duplication and optimize bundle size
- [ ] T045 Final integration test with real AWS services deployment

## Dependencies
- Setup (T001-T006) must complete before all other phases
- Tests (T007-T013) before any implementation (T014-T045)
- Models (T014-T017) before libraries (T018-T023)
- Libraries (T018-T023) before services (T024-T028)
- Services (T024-T028) before error handling (T029-T032)
- Core implementation (T014-T032) before deployment (T033-T036)
- Implementation complete before polish (T037-T045)

## Parallel Execution Examples

### Phase 3.2 - Contract Tests (All parallel)
```bash
# Launch T007-T013 together:
Task: "Contract test for Gemini API integration in tests/contract/gemini-api.test.ts"
Task: "Contract test for SES email sending in tests/contract/ses-email.test.ts"
Task: "Contract test for Lambda handler EventBridge trigger in tests/contract/lambda-handler.test.ts"
Task: "Integration test for news fetching workflow in tests/integration/news-fetcher.test.ts"
Task: "Integration test for email sending workflow in tests/integration/email-sender.test.ts"
Task: "Integration test for complete weekly summary execution in tests/integration/weekly-summary.test.ts"
Task: "Integration test for error handling and retry logic in tests/integration/error-handling.test.ts"
```

### Phase 3.3 - Models (All parallel)
```bash
# Launch T014-T017 together:
Task: "NewsArticle model with validation in src/models/NewsArticle.ts"
Task: "EmailSummary model with HTML/text generation in src/models/EmailSummary.ts"
Task: "ExecutionLog model for audit trail in src/models/ExecutionLog.ts"
Task: "ScheduleConfiguration model for cron settings in src/models/ScheduleConfiguration.ts"
```

### Phase 3.4 - Libraries (All parallel)
```bash
# Launch T018-T023 together:
Task: "News-fetcher library with Gemini API client in src/lib/news-fetcher/index.ts"
Task: "News-fetcher CLI interface in src/lib/news-fetcher/cli.ts (--help, --version, --format)"
Task: "Email-sender library with SES integration in src/lib/email-sender/index.ts"
Task: "Email-sender CLI interface in src/lib/email-sender/cli.ts (--help, --version, --format)"
Task: "Scheduler library with EventBridge logic in src/lib/scheduler/index.ts"
Task: "Scheduler CLI interface in src/lib/scheduler/cli.ts (--help, --version, --format)"
```

## Notes
- [P] tasks target different files with no dependencies
- All tests must fail before implementation begins (TDD requirement)
- Each library must have CLI interface with standard options
- Commit after each task completion
- Integration tests use real AWS services, not mocks
- Focus on library-first architecture with standalone, testable components

## Task Generation Rules Applied

1. **From Contracts**:
   - Gemini API contract → T007 contract test
   - SES Email contract → T008 contract test
   - Lambda Handler contract → T009 contract test
   
2. **From Data Model**:
   - NewsArticle entity → T014 model task
   - EmailSummary entity → T015 model task  
   - ExecutionLog entity → T016 model task
   - ScheduleConfiguration entity → T017 model task
   
3. **From User Stories & Research**:
   - News fetching story → T010 integration test + T018-T019 library
   - Email sending story → T011 integration test + T020-T021 library
   - Weekly scheduling story → T022-T023 scheduler library
   - Error handling requirements → T013 integration test + T029-T032

4. **From Quickstart Validation**:
   - Local testing scenarios → T041 end-to-end validation
   - Deployment guide → T033-T036 deployment tasks
   - Performance expectations → T040 performance tests

## Validation Checklist
*GATE: Checked before task execution*

- [x] All contracts have corresponding tests (T007-T009)
- [x] All entities have model tasks (T014-T017)
- [x] All tests come before implementation (T007-T013 before T014+)
- [x] Parallel tasks truly independent (different files, no shared dependencies)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Library-first architecture maintained (separate lib directories)
- [x] CLI interfaces included for each library
- [x] TDD workflow enforced (tests must fail first)
