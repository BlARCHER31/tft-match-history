import express from 'express'
import {getTestRoutes} from './testRoutes'
import {getGoodbye} from './testRoutes'



function getRoutes() {
  const router = express.Router()
  router.use('/test', getTestRoutes())
  return router
}

function getRoutesTwo() {
    const router = express.Router()
    router.use('/test', getGoodbye())
    return router
}

export {getRoutes}
export {getRoutesTwo}