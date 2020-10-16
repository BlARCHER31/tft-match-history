import express from 'express'
import {getTestRoutes} from './testRoutes'
import {getSummoner} from './matchHistoryRoutes'


function getRoutes() {
  const router = express.Router()
  router.use('/test', getTestRoutes())
  router.use('/test-run', getSummoner())
  return router
}


export {getRoutes}
