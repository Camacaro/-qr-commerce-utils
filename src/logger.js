/**
 * Declare libraries
 * {description}
 */
import winston from 'winston';
import moment from 'moment';

/**
 *
 * {description}
 */
const dateFormat = (type) => {
  switch (type) {
    case 'day':
      return moment(new Date()).format('DD');
    case 'month':
      return moment(new Date()).format('MM');
    case 'year':
      return moment(new Date()).format('YYYY');
    default:
  }
  return null;
};

/**
 *
 * {description}
 */
class LoggerService {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      format: winston.format.printf((info) => {
        let message = `${new Date(Date.now()).toUTCString()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message}`;
        message += info.obj ? `data:${JSON.stringify(info.obj)} | ` : '';
        message += this.log_data ? `log_data:${JSON.stringify(this.log_data)} | ` : '';
        return message;
      }),
      transports: [
        new winston.transports.Console({
          silent: process.env.NODE_ENV === 'testing'
        }),
        new winston.transports.File({
          filename: `./logs/${dateFormat('year')}/${dateFormat('month')}/${dateFormat('day')}/${route}.log`
        })
      ]
    });
    this.logger = logger;
  }

  /**
   *
   * {description}
   */
  setLogData(logData) {
    this.log_data = logData;
  }

  /**
   *
   * {description}
   */
  async alert(message, object = null) {
    if (object) {
      this.logger.log('alert', message, {
        object
      });
    } else {
      this.logger.log('alert', message);
    }
  }

  /**
   *
   * {description}
   */
  async critical(message, object = null) {
    if (object) {
      this.logger.log('crit', message, {
        object
      });
    } else {
      this.logger.log('crit', message);
    }
  }

  /**
   *
   * {description}
   */
  async debug(message, object = null) {
    if (object) {
      this.logger.log('debug', message, {
        object
      });
    } else {
      this.logger.log('debug', message);
    }
  }

  /**
   *
   * {description}
   */
  async emergency(message, object = null) {
    if (object) {
      this.logger.log('emerg', message, {
        object
      });
    } else {
      this.logger.log('emerg', message);
    }
  }

  /**
   *
   * {description}
   */
  async error(message, object = null) {
    if (object) {
      this.logger.log('error', message, {
        object
      });
    } else {
      this.logger.log('error', message);
    }
  }

  /**
   *
   * {description}
   */
  async info(message, object = null) {
    if (object) {
      this.logger.log('info', message, {
        object
      });
    } else {
      this.logger.log('info', message);
    }
  }

  /**
   *
   * {description}
   */
  async notice(message, object = null) {
    if (object) {
      this.logger.log('notice', message, {
        object
      });
    } else {
      this.logger.log('notice', message);
    }
  }

  /**
   *
   * {description}
   */
  async warning(message, object = null) {
    if (object) {
      this.logger.log('warning', message, {
        object
      });
    } else {
      this.logger.log('warning', message);
    }
  }
}

/**
 *
 * {description}
 */
module.exports = LoggerService;
