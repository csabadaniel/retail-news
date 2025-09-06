# Tasks: Build a Backend Service for Retail News Summaries

**Input**: Design documents from `/specs/001-build-a-backend/`
**Prerequisites**: plan.md (required)

## Execution Flow (main)
```
1. Load plan.md from feature directory
2. Generate tasks by category:
   → Setup: project init, dependencies, linting, AWS SAM
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: logging, error handling
   → Deployment: AWS SAM configuration, Lambda deployment
   → Polish: unit tests, performance, docs
3. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
4. Number tasks sequentially (T001, T002...)
5. Generate dependency graph
6. Create parallel execution examples
7. Validate task completeness
```

## Phase 3.1: Setup
- [ ] T001 [P] Create a `.gitignore` file at repository root (`/Users/csaba.daniel/vscode-projects/retail-news/.gitignore`) to exclude `node_modules/`, build artifacts, `.env`, `.DS_Store`, `.aws-sam/`, etc.
- [ ] T002 Create project structure in `src/` and `tests/` per implementation plan
- [ ] T003 Initialize NodeJS project with TypeScript and AWS SAM dependencies in `src/`
- [ ] T004 [P] Configure linting and formatting tools (ESLint, Prettier) in `src/`
- [ ] T005 [P] Setup environment variable management (dotenv or AWS Parameter Store) in `src/config/`
- [ ] T006 [P] Configure Jest for TypeScript using ts-jest; add jest.config.js and install ts-jest and @types/jest
- [ ] T007 [P] Set up Jest mocks for external services (nodemailer, Gemini API) at the top of each contract/integration test file using Jest mocks. Do not perform real network calls in tests. If a test fails due to circular structure errors (e.g., TypeError: Converting circular structure to JSON), refactor the test to only assert on primitive values or use a custom serializer. Do not log or assert on objects with circular references.
- [ ] T008 [P] Create AWS SAM template (`template.yaml`) at repository root with Lambda function configuration, environment variables, and deployment settings

## Phase 3.2: Tests First (TDD)
- [ ] T009 Create contract test for Gemini API client in `tests/contract/geminiClient.contract.test.ts`
- [ ] T010 Create contract test for email delivery (nodemailer/SES) in `tests/contract/emailDelivery.contract.test.ts`
- [ ] T011 [P] Create integration test for news fetch and email flow in `tests/integration/newsEmailFlow.integration.test.ts`

## Phase 3.3: Core Implementation
- [ ] T012 Implement NewsSummary model in `src/models/NewsSummary.ts`
- [ ] T013 Implement Recipient model in `src/models/Recipient.ts`
- [ ] T014 Implement FetchSchedule model in `src/models/FetchSchedule.ts`
- [ ] T015 Implement Gemini API client in `src/services/geminiClient.ts`
- [ ] T016 Implement email delivery service in `src/services/emailService.ts`
- [ ] T017 Implement Lambda handler in `src/handler.ts`

## Phase 3.4: Integration
- [ ] T018 [P] Integrate logging (winston) in `src/logger.ts`
- [ ] T019 [P] Implement error handling middleware in `src/middleware/errorHandler.ts`

## Phase 3.5: Deployment
- [ ] T020 [P] Configure build script for Lambda deployment in `package.json` (TypeScript compilation to `dist/`)
- [ ] T021 [P] Add deployment scripts for AWS SAM (`sam build`, `sam deploy`) in `package.json`
- [ ] T022 Create deployment documentation in `DEPLOYMENT.md` with SAM setup and configuration instructions

## Phase 3.6: Polish
- [ ] T023 [P] Write unit tests for models and services in `tests/unit/`
- [ ] T024 [P] Add performance test for Lambda execution in `tests/performance/lambdaPerformance.test.ts`
- [ ] T025 [P] Write documentation for setup and usage in `README.md`

## Dependency Notes
- Setup tasks (T001-T008) must be completed before any other tasks
- Contract and integration tests (T009-T011) must be completed before implementation (T012-T017)
- Models (T012-T014) before services (T015-T016)
- Services before Lambda handler (T017)
- Core before integration (T018-T019)
- Integration before deployment (T020-T022)
- All before polish (T023-T025)

## Parallel Execution Guidance
- Tasks marked [P] can be executed in parallel:
  - T001, T004, T005, T006, T007, T008 (setup)
  - T011 (integration test)
  - T018, T019 (integration)
  - T020, T021, T022 (deployment)
  - T023, T024, T025 (polish)
- Example Task agent command:
  ```bash
  task-agent run T001 T004 T005 T006 T007 T008
  task-agent run T018 T019
  task-agent run T020 T021 T022
  task-agent run T023 T024 T025
  ```

## File Paths
- All paths are absolute and based on repo root: `/Users/csaba.daniel/vscode-projects/retail-news/`
- Feature directory: `/Users/csaba.daniel/vscode-projects/retail-news/specs/001-build-a-backend/`

---

Tasks are ready for execution. Each task is specific and immediately actionable for an LLM agent.
- [ ] T012 Implement Recipient model in `src/models/Recipient.ts`
- [ ] T013 Implement FetchSchedule model in `src/models/FetchSchedule.ts`
- [ ] T014 Implement Gemini API client in `src/services/geminiClient.ts`
- [ ] T015 Implement email delivery service in `src/services/emailService.ts`
- [ ] T016 Implement Lambda handler in `src/handler.ts`

## Phase 3.4: Integration
- [ ] T017 [P] Integrate logging (winston) in `src/logger.ts`
- [ ] T018 [P] Implement error handling middleware in `src/middleware/errorHandler.ts`

## Phase 3.5: Polish
- [ ] T019 [P] Write unit tests for models and services in `tests/unit/`
- [ ] T020 [P] Add performance test for Lambda execution in `tests/performance/lambdaPerformance.test.ts`
- [ ] T021 [P] Write documentation for setup and usage in `README.md`

## Dependency Notes
- Setup tasks (T001-T007) must be completed before any other tasks
- Contract and integration tests (T008-T010) must be completed before implementation (T011-T016)
- Models (T011-T013) before services (T014-T015)
- Services before Lambda handler (T016)
- Core before integration (T017-T018)
- All before polish (T019-T021)

## Parallel Execution Guidance
- Tasks marked [P] can be executed in parallel:
  - T001, T004, T005, T006, T007 (setup)
  - T010 (integration test)
  - T017, T018 (integration)
  - T019, T020, T021 (polish)
- Example Task agent command:
  ```bash
  task-agent run T001 T004 T005 T006 T007
  task-agent run T017 T018
  task-agent run T019 T020 T021
  ```

## File Paths
- All paths are absolute and based on repo root: `/Users/csaba.daniel/vscode-projects/retail-news/`
- Feature directory: `/Users/csaba.daniel/vscode-projects/retail-news/specs/001-build-a-backend/`

---

Tasks are ready for execution. Each task is specific and immediately actionable for an LLM agent.
