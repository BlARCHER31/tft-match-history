import logger from 'loglevel' 
import config from 'config'
import axios from 'axios'


class RiotApiClient {
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
}



        
    


export default new RiotApiClient()