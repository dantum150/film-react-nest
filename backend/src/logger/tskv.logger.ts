import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class TSKVLogger implements LoggerService {
  private readonly logDir = path.resolve(__dirname, '../../logs');
  private readonly logFile = path.join(this.logDir, 'tskv.log');

  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const logObject: { [key: string]: string } = {
      ['logger']: 'tskv',
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.extractContext(optionalParams) || ' -',
      params: optionalParams.length > 0 ? optionalParams.join(', ') : ' -',
    };
    return Object.entries(logObject)
      .map(([key, value]) => `${key}=${value}`)
      .join('\t');
  }

  private extractContext(params: string[]): string | undefined {
    if (params.length && typeof params[params.length - 1] === 'string') {
      return params.pop();
    }
    return undefined;
  }

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
    const logMessage = this.formatMessage(level, message, ...optionalParams);
    appendFileSync(this.logFile, logMessage + '\n');
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

  debug(message: string, ...optionalParams: string[]) {
    this.writeToFile('debug', message, ...optionalParams);
  }
}
