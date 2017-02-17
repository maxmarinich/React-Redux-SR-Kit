import winston from 'winston';


const log = winston.loggers.add('log', {
  console: {
    level: 'info',
    colorize: true,
    timestamp: true,
    prettyPrint: true,
    humanReadableUnhandledException: true
  }
});

export default log;
