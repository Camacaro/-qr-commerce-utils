/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */
/**
 * Declare libraries
 *
 */

/**
 * Declare dependencies
 *
 */
const httpError = require('./utils/http_error');
const httpStatus = require('./utils/http_status');

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
    description: httpStatus[code].description,
    statusCode: code,
    payload: payload || {}
  };

  return res.status(code).json(response);
};

/**
 * Export function responseError
 *
 */
module.exports.responseError = (traceError, res, code, descriptionError = null, nameFile = '', logger = null) => {
  if (logger) {
    logger.error(`${nameFile}(${descriptionError}) -> Response(error)`);
    logger.error(String(traceError));
  }

  traceError.errors && delete traceError.errors;

  const response = {
    ok: valid(code),
    description: httpStatus[code].description,
    details: descriptionError ? httpError[descriptionError].description : null,
    errorTrace: traceError
  };

  return res
    .status(code)
    .json(response);
};
