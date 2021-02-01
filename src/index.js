import logger from 'loglevel'
import { startServer } from './start'
import config from 'config'
import riotApiClient from './services/riotApiClient'

const isTest = process.env.NODE_ENV === 'test'
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info')

logger.setLevel(logLevel)

async function serverStartup() {
    try{
        await startServer({ port: config.get('app.server.port') })
        await riotApiClient.initialize()
    } catch(err) {
        logger.error(
            `There was an error trying to start the server: ${err.message}`
        )
        throw err
    }

}

serverStartup()