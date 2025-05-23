import { DevLogger } from './dev.logger';
import { appendFileSync } from 'fs';
import * as fs from 'fs';

jest.mock('fs', () => ({
  appendFileSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

describe('Дев-логгирование', () => {
  let logger: DevLogger;
  let mockWrite: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    mockWrite = jest
      .spyOn(fs, 'appendFileSync')
      .mockImplementation((file, message) => {
        console.log('Пример сообщения:', message);
      });
    logger = new DevLogger();
  });

  it('В случае отсутствия нужной директории вызывается mkdirSync', () => {
    expect(fs.mkdirSync).toHaveBeenCalledWith(logger['logDir'], {
      recursive: true,
    });
  });

  it('Проверка логирования LOG', () => {
    const logMessage = 'cообщение для LOG';
    logger.log(logMessage);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(`\\[logger = DEV] \\[.*\\] \\[LOG] ${logMessage}\\n`),
    );
  });
  it('Проверка логирования WARN (предупреждение)', () => {
    const warnMessage = 'cообщение для WARN';
    logger.warn(warnMessage);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(`\\[logger = DEV] \\[.*\\] \\[WARN] ${warnMessage}\\n`),
    );
  });
  it('проверяем логирования ERROR(ошибка)', () => {
    const errorMessage = 'cообщение для ERROR';
    const errorStack = 'тест STACK';
    logger.error(errorMessage, errorStack);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(
        `\\[logger = DEV] \\[.*\\] \\[ERROR] ${errorMessage}\\n${errorStack}\\n`,
      ),
    );
  });
  it('Проверка логирования DEBUG', () => {
    const debugMessage = 'cообщение для DEBUG';
    logger.debug(debugMessage);

    expect(appendFileSync).toHaveBeenCalledTimes(1);
    const writtenMessage = mockWrite.mock.calls[0][1];
    expect(writtenMessage).toMatch(
      new RegExp(`\\[logger = DEV] \\[.*\\] \\[DEBUG] ${debugMessage}\\n`),
    );
  });
});
