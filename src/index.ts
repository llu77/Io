/**
 * Main entry point for the application
 */

import { logger } from './utils/logger';

async function main(): Promise<void> {
  try {
    logger.info('Application starting...');

    // Your application logic here

    logger.info('Application started successfully');
  } catch (error) {
    logger.error('Failed to start application', { error });
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error });
  process.exit(1);
});

// Start the application
main().catch((error) => {
  logger.error('Fatal error:', { error });
  process.exit(1);
});
