import { TSKVLogger } from './tskv.logger';
import { appendFileSync } from 'fs';
import * as fs from 'fs';

jest.mock('fs', () => ({
  appendFileSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

describe('TSKVLogger', () => {
  let logger: TSKVLogger;
  let mockWrite: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    mockWrite = jest
      .spyOn(fs, 'appendFileSync')
      .mockImplementation((file, message) => {
        console.log('Пример сообщения:', message);
      });
    logger = new TSKVLogger();
  });

  it('должен вызывать mkdirSync, если директория не существует', () => {
    expect(fs.mkdirSync).toHaveBeenCalledWith(logger['logDir'], {
      recursive: true,
    });
  });

  it('проверяем логирования LOG', () => {
    const logMessage = 'cообщение для LOG';
    const logContext = 'какой-то компанент для LOG';
    logger.log(logMessage, logContext);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `logger=tskv\ttimestamp=.*?\tlevel=log\tmessage=${logMessage}\tcontext=${logContext}\tparams= -`,
      ),
    );
  });

  it('проверяем логирования WARN', () => {
    const warnMessage = 'cообщение для WARN';
    const warnContext = 'какой-то компанент для WARN';
    logger.warn(warnMessage, warnContext);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `logger=tskv\ttimestamp=.*?\tlevel=warn\tmessage=${warnMessage}\tcontext=${warnContext}\tparams= -`,
      ),
    );
  });

  it('проверяем логирования ERROR', () => {
    const errorMessage = 'cообщение для ERROR';
    const errorContext = 'какой-то компанент для ERROR';
    logger.error(errorMessage, errorContext);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `logger=tskv\ttimestamp=.*?\tlevel=error\tmessage=${errorMessage}\tcontext=${errorContext}\tparams= -`,
      ),
    );
  });

  it('проверяем логирования DEBUG', () => {
    const debugMessage = 'cообщение для DEBUG';
    const debugContext = 'какой-то компанент для DEBUG';
    logger.debug(debugMessage, debugContext);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `logger=tskv\ttimestamp=.*?\tlevel=debug\tmessage=${debugMessage}\tcontext=${debugContext}\tparams= -`,
      ),
    );
  });
});
