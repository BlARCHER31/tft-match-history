import express from 'express'

function getTestRoutes() {
  const router = express.Router()
  router.get('/hello', handleHelloRequest)
  router.get('/goodbye', handleGoodbyeRequest)
  return router
}

async function handleHelloRequest(req, res) {
  res.json({'message': 'Hello Blake!!'})
}

async function handleGoodbyeRequest(req, res) {
    res.json({'message': 'Goodbye Blake!'})
}

export {getTestRoutes}
