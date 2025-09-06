import { logger } from '../logger';

export function errorHandler(error: Error, context?: any): void {
  logger.error({
    message: error.message,
    stack: error.stack,
    context
  });
  // Optionally rethrow or handle error
}
