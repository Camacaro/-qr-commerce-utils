import { Response, Request } from 'express'
import { httpStatus } from '../http/http-status'
import { Status } from '../constant/status'
import { Logger } from './logger'

const isOk = (code: number): boolean => code >= 200 && code <= 299

export const response = (res: Response, code: Status, payload: any = []): Response => {
  const response = {
    ok: isOk(code),
    message: httpStatus[code].message,
    description: httpStatus[code].description,
    payload
  }

  return res.status(code).json(response)
}

export const responseError = (error: Error, req: Request, res: Response, statusCode: Status = 500): Response => {
  const logger = new Logger('responseError')

  const errorMessage = error.message

  const response = {
    ok: isOk(statusCode),
    message: httpStatus[statusCode].message,
    description: httpStatus[statusCode].description,
    statusCode,
    errorMessage
  }

  logger.error(error)

  return res.status(statusCode).json(response)
}
