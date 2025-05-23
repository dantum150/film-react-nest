import { JsonLogger } from './json.logger';
import { appendFileSync } from 'fs';
import * as fs from 'fs';

jest.mock('fs', () => ({
  appendFileSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let mockWrite: jest.SpyInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    mockWrite = jest
      .spyOn(fs, 'appendFileSync')
      .mockImplementation((file, message) => {
        console.log('Пример сообщения:', message);
      });
    logger = new JsonLogger();
  });

  it('В случае отсутствия нужной директории вызывается mkdirSync', () => {
    expect(fs.mkdirSync).toHaveBeenCalledWith(logger['logDir'], {
      recursive: true,
    });
  });

  it('проверяем логирования LOG', () => {
    const logMessage = 'cообщение для LOG';
    const logParams = 'какой-то компанент для LOG';
    const logLevel = 'log';
    logger.log(logMessage, logParams);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `{"logger":"json","timestamp":".*?","level":"${logLevel}","message":"${logMessage}","params":\\["${logParams}"\\]}`,
      ),
    );
  });
  it('проверяем логирования WARN', () => {
    const warnMessage = 'cообщение для WARN';
    const warnParams = 'какой-то компанент для WARN';
    const warnLevel = 'warn';
    logger.warn(warnMessage, warnParams);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `{"logger":"json","timestamp":".*?","level":"${warnLevel}","message":"${warnMessage}","params":\\["${warnParams}"\\]}`,
      ),
    );
  });
  it('проверяем логирования ERROR', () => {
    const errorMessage = 'cообщение для ERROR';
    const errorParams = 'какой-то компанент для ERROR';
    const errorLevel = 'error';
    logger.error(errorMessage, errorParams);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `{"logger":"json","timestamp":".*?","level":"${errorLevel}","message":"${errorMessage}","params":\\["${errorParams}"\\]}`,
      ),
    );
  });
  it('проверяем логирования DEBUG', () => {
    const debugMessage = 'cообщение для DEBUG';
    const debugParams = 'какой-то компанент для DEBUG';
    const debugLevel = 'debug';
    logger.debug(debugMessage, debugParams);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `{"logger":"json","timestamp":".*?","level":"${debugLevel}","message":"${debugMessage}","params":\\["${debugParams}"\\]}`,
      ),
    );
  });
});
