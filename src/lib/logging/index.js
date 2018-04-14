/* Include dependencies */
import winston from 'winston';
import config from 'config';

/* Create and export the logger */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine( winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: config.logging.errorFile, level: 'error' }),
    new winston.transports.File({ filename: config.logging.logFile })
  ],
});

export default logger;
