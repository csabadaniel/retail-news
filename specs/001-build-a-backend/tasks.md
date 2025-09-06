# Tasks: Build a Backend Service for Retail News Summaries

**Input**: Design documents from `/specs/001-build-a-backend/`
**Prerequisites**: plan.md (required)

## Execution Flow (main)
```
1. Load plan.md from feature directory
2. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: logging, error handling
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
- [ ] T001 [P] Create a `.gitignore` file at repository root (`/Users/csaba.daniel/vscode-projects/retail-news/.gitignore`) to exclude `node_modules/`, build artifacts, `.env`, `.DS_Store`, etc.
- [ ] T002 Create project structure in `src/` and `tests/` per implementation plan
- [ ] T003 Initialize NodeJS project with TypeScript and AWS SAM dependencies in `src/`
- [ ] T004 [P] Configure linting and formatting tools (ESLint, Prettier) in `src/`
- [ ] T005 [P] Setup environment variable management (dotenv or AWS Parameter Store) in `src/config/`

## Phase 3.2: Tests First (TDD)
- [ ] T006 Create contract test for Gemini API client in `tests/contract/geminiClient.contract.test.ts`
- [ ] T007 Create contract test for email delivery (nodemailer/SES) in `tests/contract/emailDelivery.contract.test.ts`
- [ ] T008 [P] Create integration test for news fetch and email flow in `tests/integration/newsEmailFlow.integration.test.ts`

## Phase 3.3: Core Implementation
- [ ] T009 Implement NewsSummary model in `src/models/NewsSummary.ts`
- [ ] T010 Implement Recipient model in `src/models/Recipient.ts`
- [ ] T011 Implement FetchSchedule model in `src/models/FetchSchedule.ts`
- [ ] T012 Implement Gemini API client in `src/services/geminiClient.ts`
- [ ] T013 Implement email delivery service in `src/services/emailService.ts`
- [ ] T014 Implement Lambda handler in `src/handler.ts`

## Phase 3.4: Integration
- [ ] T015 [P] Integrate logging (winston) in `src/logger.ts`
- [ ] T016 [P] Implement error handling middleware in `src/middleware/errorHandler.ts`

## Phase 3.5: Polish
- [ ] T017 [P] Write unit tests for models and services in `tests/unit/`
- [ ] T018 [P] Add performance test for Lambda execution in `tests/performance/lambdaPerformance.test.ts`
- [ ] T019 [P] Write documentation for setup and usage in `README.md`

## Dependency Notes
- Setup tasks (T001-T005) must be completed before any other tasks
- Contract and integration tests (T006-T008) must be completed before implementation (T009-T014)
- Models (T009-T011) before services (T012-T013)
- Services before Lambda handler (T014)
- Core before integration (T015-T016)
- All before polish (T017-T019)

## Parallel Execution Guidance
- Tasks marked [P] can be executed in parallel:
  - T001, T004, T005 (setup)
  - T008 (integration test)
  - T015, T016 (integration)
  - T017, T018, T019 (polish)
- Example Task agent command:
  ```bash
  task-agent run T001 T004 T005
  task-agent run T015 T016
  task-agent run T017 T018 T019
  ```

## File Paths
- All paths are absolute and based on repo root: `/Users/csaba.daniel/vscode-projects/retail-news/`
- Feature directory: `/Users/csaba.daniel/vscode-projects/retail-news/specs/001-build-a-backend/`

---

Tasks are ready for execution. Each task is specific and immediately actionable for an LLM agent.
