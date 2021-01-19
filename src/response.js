/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/**
 * Declare libraries
 *
 */

/**
 * Declare dependencies
 *
 */
// const httpError = require('./http/http_error');
const httpStatus = require('./http/http_status');
const Logger = require('./loggers');

const logger = new Logger('response');

const valid = (code) => {
  if (code >= 200 && code <= 299) {
    return true;
  }
  return false;
};

/**
 * Export function responseHttp
 *
 */
module.exports.response = (res, code, payload) => {
  const response = {
    ok: valid(code),
    message: httpStatus[`${code}`].message,
    description: httpStatus[`${code}`].description,
    statusCode: code,
    payload: payload || {}
  };

  return res.status(code).json(response);
};

/**
 * Export function responseError
 *
 */
module.exports.responseError = (error, req, res, statusCode = 500) => {
  logger.error(error);

  const errorMessage = error.message || 'Internal server error';

  const response = {
    ok: valid(statusCode),
    message: httpStatus[`${statusCode}`].message,
    description: httpStatus[`${statusCode}`].description,
    statusCode,
    errorMessage
  };

  return res.status(statusCode).json(response);
};
