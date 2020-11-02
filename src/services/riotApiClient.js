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
              baseURL: `${config.get('riot.baseURL')}`,
              headers: {
                'X-Riot-Token': `${config.get('riot.apiKey')}`
              }
            }
        )
        return response.data
      } catch (err) {
        logger.error(`An error occurred attempting to fetch from ${response.config.url}, ${err.message}`)
        throw err
      }
    }
  }

        
    


export default new RiotApiClient()