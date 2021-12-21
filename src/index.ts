import { wait } from './utils/wait'
import { Logger } from './utils/logger'
import { cleanCharacters } from './utils/format'
import { TRACK_ID_NAME } from './constant/track'
import { permissions } from './constant/permissions'
import { StatusCode, StatusError } from './constant/status'
import { response, responseError, httpResponse } from './utils/response'

const permission = permissions

const logger = new Logger('@jcamacaro96/utils')
logger.info('Module Utils ready')

export {
  wait,
  Logger,
  response,
  permission,
  StatusCode,
  StatusError,
  httpResponse,
  responseError,
  TRACK_ID_NAME,
  cleanCharacters
}
