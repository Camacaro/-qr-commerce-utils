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

  constructor (nameFile: string) {
    this.logDev = debug(`${'dev'}:${nameFile}`)
    this.logProd = debug(`${'prod'}:${nameFile}`)
    this.logError = debug(`${'error'}:${nameFile}`)

    this.createFile = winston.createLogger({
      format: winston.format.printf((info) => {
        let message = `${moment().format('llll')} | ${info.level.toUpperCase()} | ${nameFile}.log | ${info.message}`
        // message += info.obj ? `data:${JSON.stringify(info.obj)} | ` : ''
        message += ''
        return message
      }),
      transports: [
        // new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${dateFormat(Time.YEAR)}/${dateFormat(Time.MONTH)}/${dateFormat(Time.DAY)}/${nameFile}.log`
        })
      ]
    })
  }

  debug (message: any): void {
    this.logDev(message)
  }

  info (message: any): void {
    this.logProd(message)
    this.createFile.log('info', message)
  }

  error (message: any): void {
    this.logError(message)
    this.createFile.log('error', message)
  }
}
