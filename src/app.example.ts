import { Logger } from '.'

const exampleLog1 = (): void => {
  const logger = new Logger('exampleLog1')
  logger.info('Hola Mundo: exampleLog1')
}

const exampleLog2 = (): void => {
  const logger = new Logger('exampleLog2')
  logger.error('Hola Mundo: exampleLog2')
}

const exampleLog3 = (): void => {
  const logger = new Logger('exampleLog3')
  logger.error(new Error('exampleLog3'))
}

const exampleLog4 = (): void => {
  const logger = new Logger('exampleLog4')
  try {
    logger.info('Dentro de try')
    JSON.stringify(undefined)
  } catch (error) {
    logger.info(error)
  }
}

const exampleLog5 = (): void => {
  const logger = new Logger('exampleLog5')
  try {
    logger.info('Antes del Ups!')
    throw new Error('throw new Error!')
  } catch (error) {
    logger.info(error)
  }
}

const exampleLog6 = (): void => {
  const logger = new Logger('exampleLog6')

  const data = {
    name: 'ABC',
    lastname: 'DEF',
    yeas: 24,
    sex: 'M',
    valid: true
  }

  const message = 'Se guardo la orden con esto datos'

  logger.info(message, data)
}

const exampleLog7 = (): void => {
  const logger = new Logger('exampleLog7')

  const data = {
    name: 'ABC',
    lastname: 'DEF',
    yeas: 24,
    sex: 'M',
    valid: true
  }
  const dataString = JSON.stringify(data, null, 4)
  const message = `Se guardo la orden con esto datos ${dataString}`

  logger.info(message)
}

exampleLog1()
exampleLog2()
exampleLog3()
exampleLog4()
exampleLog5()
exampleLog6()
exampleLog7()
