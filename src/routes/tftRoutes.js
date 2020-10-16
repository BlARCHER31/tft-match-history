import express from 'express'

function getTFTRoutes(){
    const router = express.Router()
    router.get('/summoner/:summonerName', getSummonerHandler)
    return router
}

async function getSummonerHandler(req, res){
    res.json({"message": req.params.summonerName})
}

export {getTFTRoutes}