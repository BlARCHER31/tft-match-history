import express from 'express'
import riotApiClient from '../services/riotApiClient'


function getTFTRoutes(){
    const router = express.Router()
    router.get('/v1/summoner/:summonerName', getSummonerHandler)
    router.get('/v1/match/:summonerName/:count', getMatchHistoryHandler)
    return router
}


async function getSummonerHandler(req, res){
    const summonerName = req.params.summonerName;
    try{
        const iconIdURL = await riotApiClient.getLoLPatchVersions();
        const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
        
        const iconID = summonerInfo.profileIconId

        summonerInfo['profileIconId'] = `http://ddragon.leagueoflegends.com/cdn/${iconIdURL}/img/profileicon/${iconID}.png`;
        res.send(summonerInfo)
    } catch (e) {
      return res.status(500).send(`Unable to fetch summoner ${summonerName}: ${e.message}`)
      }
}

async function getMatchHistoryHandler(req, res) {
    const summonerName = req.params.summonerName;
    const count = req.params.count
    try {
        const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
        const puuid = summonerInfo.puuid
        const matchInfo = await riotApiClient.getRecentMatches(puuid, count)
        res.send(matchInfo)
    } catch (e) {
        return res.status(500).send(`Unable to fetch summoner Match Data for  ${summonerName}: ${e.message}`)
        }
}




export {getTFTRoutes}