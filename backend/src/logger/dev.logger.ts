import { Injectable, ConsoleLogger } from '@nestjs/common';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class DevLogger extends ConsoleLogger {
  private readonly logDir = path.resolve(__dirname, '../../logs');
  private readonly logFile = path.join(this.logDir, 'dev.log');

  constructor() {
    super('DevLogger', {
      timestamp: true,
      logLevels: ['log', 'error', 'warn', 'debug'],
    });
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeToFile(level: string, message: string) {
    const timestamp = new Date().toISOString();
    const line = `[logger = DEV] [${timestamp}] [${level}] ${message}\n`;
    appendFileSync(this.logFile, line);
  }

  log(message: string) {
    this.writeToFile('LOG', message);
  }

  warn(message: string) {
    this.writeToFile('WARN', message);
  }

  error(message: string, stack?: string) {
    this.writeToFile('ERROR', `${message}${stack ? '\n' + stack : ''}`);
  }

  debug(message: string) {
    this.writeToFile('DEBUG', message);
  }
}
