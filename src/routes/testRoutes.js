import express from 'express'

function getTestRoutes() {
  const router = express.Router()
  router.get('/hello', handleHelloRequest)
  return router
}
function getGoodbye(){
    const router = express.Router()
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
export {getGoodbye}