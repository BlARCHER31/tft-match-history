import express from 'express'

function getSummoner(){
    const router = express.Router()
    router.get('/summoner', getSummonerHandler)
    router.get('/summoner/:id', getSummonerNameHandler)
    return router
}

async function getSummonerHandler(req, res) {
    res.json({"Summoner Id": "This is the summoner endpoint!"})
}

async function getSummonerNameHandler(req, res){
    res.json({"message": req.params.id})
}

export {getSummoner}