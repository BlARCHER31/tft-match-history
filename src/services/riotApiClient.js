import logger from 'loglevel' 
import config from 'config'
import axios from 'axios'


class RiotApiClient {
  //Fetches info for the summoner using the Summoner's Name
    async fetchTFTSummonerInfo(summonerName) {
      const url = `/tft/summoner/v1/summoners/by-name/${summonerName}`
  
      let response;
      try {
        response = await axios.get(url,
            {
              baseURL: config.get('riot.baseURL'),
              headers: {
                'X-Riot-Token': config.get('riot.apiKey')
              }
            }
        )
        return response.data
      } catch (err) {
        logger.error(`An error occurred attempting to fetch from ${response.config.url}, ${err.message}`)
        throw err
      }
    }
  // Fetches the most up to date version of data
    async getLoLPatchVersions(req, res) {
      let response;
      try {
      response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      } catch (e) {
          return res.status(500).send(`Unable to fetch Json: ${e.message}`)
      }
      const version = response.data;
      return version[0];
  
   }
   // Fetches whatever amount of most recent match id's you want
   async getRecentMatches(puuid, count) {
     const puuidURL = `/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${count}` 
     let response;
     try{
      response = await axios.get(puuidURL,
        {
          baseURL: config.get('riot.matchURL'),
          headers: {
            'X-Riot-Token': config.get('riot.apiKey')
          }
        }
    )
    return response.data
        
    } catch (err) {
      logger.error(`An error occurred attempting to fetch from ${response.config.puuidURL}, ${err.message}`)
      throw err
    }
  }
  // Fetches match data for individual matches using the Match Id
  async getMatchData(matchId){
    const matchURL = `/tft/match/v1/matches/${matchId}`
    let response;
    try{
      response = await axios.get(matchURL,
        {
          baseURL: config.get('riot.matchURL'),
          headers: {
            'X-Riot-Token': config.get('riot.apiKey')
          }
        }
    ) 
    return response.data
    } catch(err) {
      logger.error(`An error occured attempting to fetch the Match Data from ${response.config.matchURL}, ${err.message}`)
      throw err
    }
  }
  async fetchTFTMatchHistory(puuid, count){
    
    const matchIds = await this.getRecentMatches(puuid, count)
    const matchListInfo = []
        let i;
        for(i = 0; i < matchIds.length; i++){
             matchListInfo.push( await this.getMatchData(matchIds[i]))
        } return matchListInfo
  }
}



        
    


export default new RiotApiClient()