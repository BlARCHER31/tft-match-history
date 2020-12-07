import express from 'express'
import riotApiClient from '../services/riotApiClient'


function getTFTRoutes(){
    const router = express.Router()
    router.get('/v1/summoner/:summonerName', getSummonerHandler)
    router.get('/v1/match/:summonerName', getRecentMatchInfo)
    router.get('/v1/match/history/:summonerName', getMatchHistoryForSummoner)
    //router.get('/v1/stats/:count/:summonerName', getAverageScores)
    return router
}

// This handler retrieves the summoner info using the fetchTFTSummonerInfo function
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
// This handler gets the recent matches JSON using two functions from the riotApiClient
async function getRecentMatchInfo(req, res) {
    const summonerName = req.params.summonerName;
    
    try {
        const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
        const puuid = summonerInfo.puuid
        const matchList = await riotApiClient.getRecentMatches(puuid, req.query.count)

        const matchInfo = await riotApiClient.getMatchData(matchList[0])

        
        
        //res.send(matchInfo.info.participants)
        let i;
        for(i = 0; i < matchInfo.info.participants.length; i++){
            if(matchInfo.info.participants[i].puuid === puuid){
                let finalPosition = matchInfo.info.participants[i].placement
                let totalDamage = matchInfo.info.participants[i].total_damage_to_players
                let totalElims = matchInfo.info.participants[i].players_eliminated 
                
                res.send(`Hello ${summonerName}, in the most recent match here is how you did.
                Total Eliminations: ${totalElims}
                Total Damage to Other Players: ${totalDamage}
                Final Place: ${finalPosition}`)
                {break;}                  }
        }
        
        
         
    
    } catch (e) {
        return res.status(500).send(`Unable to fetch summoner Match Data for  ${summonerName}: ${e.message}`)
        }
}

async function getMatchHistoryForSummoner(req, res) {
    const summonerName = req.params.summonerName
    const count = req.query.count

    try {
    
        const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
        let puuid = summonerInfo.puuid
        
        const matches = await riotApiClient.fetchTFTMatchHistory(puuid, count)
        //const correctSummonerInfo = await Promise.all(matches.summonerInfo.map(riotApiClient.fetchTFTSummonerInfoByPuuid))
        
        
        const response = { summoner: summonerInfo, matches: matches }
        
        res.json(response)
        
    } catch (e) {
        return res.status(500).send(`Unable to fetch the Specific Match Information ${summonerName}: ${e.message}`)
    }
}

/*async function getAverageScores(req, res){
    
        
}*/


export {getTFTRoutes}