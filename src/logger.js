const debug = require('debug');
const winston = require('winston');
const moment = require('moment');

const { dateFormat } = require('./format');

class Logger {
  constructor(nameFile) {
    this.logdev = debug(`${'dev'}:${nameFile}`);
    this.logprod = debug(`${'prod'}:${nameFile}`);
    this.logerror = debug(`${'error'}:${nameFile}`);

    this.createfile = winston.createLogger({
      format: winston.format.printf((info) => {
        let message = `${moment().format('llll')} | ${info.level.toUpperCase()} | ${nameFile}.log | ${info.message}`;
        message += info.obj ? `data:${JSON.stringify(info.obj)} | ` : '';
        message += this.log_data ? `log_data:${JSON.stringify(this.log_data)} | ` : '';
        return message;
      }),
      transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${dateFormat('year')}/${dateFormat('month')}/${dateFormat('day')}/${nameFile}.log`
        })
      ]
    });
  }

  debug(message) {
    this.logdev(message);
  }

  info(message) {
    this.logprod(message);
    this.createfile.log('info', message);
  }

  error(message) {
    this.logerror(message);
    this.createfile.log('error', message);
  }
}

module.exports = Logger;
