/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import debug, { Debugger } from 'debug'
import moment from 'moment'
import winston, { Logger as LoggerWinton } from 'winston'
import { Time } from '../constant/time'
import { dateFormat } from './format'

export class Logger {
  private readonly logDev: Debugger
  private readonly logProd: Debugger
  private readonly logError: Debugger
  private readonly createFile: LoggerWinton

  constructor (method: string) {
    this.logDev = debug(`${'dev'}:${method}`)
    this.logProd = debug(`${'prod'}:${method}`)
    this.logError = debug(`${'error'}:${method}`)

    this.createFile = winston.createLogger({
      format: winston.format.printf((info: winston.Logform.TransformableInfo) => {
        const level = info.level.toUpperCase()
        const logTime = moment().format('dddd, MMMM D YYYY, h:mm:ss a')
        const message = info.message
        const lineLog = `${logTime} | ${level} | ${method} | ${message}`
        return lineLog
      }),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.combine(
            winston.format.colorize({
              all: true
            })
          ))
        }),
        new winston.transports.File({
          filename: `./logs/${dateFormat(Time.YEAR)}-${dateFormat(Time.MONTH)}-${dateFormat(Time.DAY)}/tracking.log`
        })
      ]
    })
  }

  debug (message: any): void {
    this.logDev(message)
  }

  info (message: string, payload: any = null): void {
    let msg = message
    if (payload) {
      msg += ` ${JSON.stringify(payload, null, 4)}`
    }

    this.logProd(msg)
    this.createFile.log('info', msg)
  }

  error (message: any): void {
    this.logError(message)
    this.createFile.log('error', message.stack || message)
  }
}
