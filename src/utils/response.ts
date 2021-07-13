import { Response, Request } from 'express'
import { httpStatus } from '../http/http-status'
import { StatusCode, StatusError } from '../constant/status'
import { Logger } from './logger'
import { httpErros } from '../http/http-errors'

interface IHttpResponse {
  res: Response
  statusCode: StatusCode
  statusError?: StatusError
  payload?: any
}

const isOk = (code: number): boolean => code >= 200 && code <= 299

export const response = (res: Response, code: StatusCode, payload: any = []): Response => {
  const response = {
    ok: isOk(code),
    message: httpStatus[code].message,
    description: httpStatus[code].description,
    payload
  }

  return res.status(code).json(response)
}

export const httpResponse = ({ res, statusCode, statusError, payload = [] }: IHttpResponse): Response => {
  const errorDescription = statusError != null ? httpErros[statusError] : {}

  const response = {
    ok: isOk(statusCode),
    message: httpStatus[statusCode].message,
    description: httpStatus[statusCode].description,
    ...errorDescription,
    payload
  }

  return res.status(statusCode).json(response)
}

export const responseError = (error: Error, req: Request, res: Response, statusCode: StatusCode = 500): Response => {
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
