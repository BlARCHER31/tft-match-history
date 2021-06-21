import express from 'express'
import { getTFTRoutes } from './tftRoutes'

function getRoutes() {
  const router = express.Router()
  router.use('/tft', getTFTRoutes())
  return router
}

export { getRoutes }
