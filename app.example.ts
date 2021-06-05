import { Logger } from './src'

const logger = new Logger('App Example')

logger.info('Hola Mundo')

logger.info('Imformación')

logger.error(new Error('Error 123'))
