import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class JsonLogger implements LoggerService {
  private readonly logDir = path.resolve(__dirname, '../../logs');
  private readonly logFile = path.join(this.logDir, 'json.log');

  constructor() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeToFile(
    level: string,
    message: string,
    ...optionalParams: string[]
  ) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      logger: 'json',
      timestamp,
      level,
      message,
      params: optionalParams.length > 0 ? optionalParams : ' -',
    };

    appendFileSync(this.logFile, JSON.stringify(logEntry) + '\n');
  }

  log(message: string, ...optionalParams: string[]) {
    this.writeToFile('log', message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: string[]) {
    this.writeToFile('warn', message, ...optionalParams);
  }

  error(message: string, ...optionalParams: string[]) {
    this.writeToFile('error', message, ...optionalParams);
  }

  debug?(message: string, ...optionalParams: string[]) {
    this.writeToFile('debug', message, ...optionalParams);
  }
}
