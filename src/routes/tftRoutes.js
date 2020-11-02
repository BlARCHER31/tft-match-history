import express from 'express'
import riotApiClient from '../services/riotApiClient'

function getTFTRoutes(){
    const router = express.Router()
    router.get('/v1/summoner/:summonerName', getSummonerHandler)
    return router
}


async function getSummonerHandler(req, res){
    const summonerName = req.params.summonerName;
    try{
        const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
        res.send(summonerInfo)
    } catch (e) {
      return res.status(500).send(`Unable to fetch summoner ${summonerName}: ${e.message}`)
      }
    }

export {getTFTRoutes}