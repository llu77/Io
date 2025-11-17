import { logger } from '../logger';

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('info', () => {
    it('should log info message', () => {
      logger.info('Test message');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('INFO: Test message'));
    });

    it('should log info message with context', () => {
      logger.info('Test message', { key: 'value' });
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('INFO: Test message'));
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('{"key":"value"}'));
    });
  });

  describe('warn', () => {
    it('should log warning message', () => {
      logger.warn('Warning message');
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('WARN: Warning message'));
    });
  });

  describe('error', () => {
    it('should log error message', () => {
      logger.error('Error message');
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('ERROR: Error message'));
    });

    it('should log error message with context', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', { error });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('ERROR: Error occurred')
      );
    });
  });

  describe('debug', () => {
    it('should log debug message in development', () => {
      const originalEnv = process.env['NODE_ENV'];
      process.env['NODE_ENV'] = 'development';

      logger.debug('Debug message');
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('DEBUG: Debug message'));

      process.env['NODE_ENV'] = originalEnv;
    });

    it('should not log debug message in production', () => {
      const originalEnv = process.env['NODE_ENV'];
      process.env['NODE_ENV'] = 'production';

      logger.debug('Debug message');
      expect(consoleLogSpy).not.toHaveBeenCalled();

      process.env['NODE_ENV'] = originalEnv;
    });
  });
});
