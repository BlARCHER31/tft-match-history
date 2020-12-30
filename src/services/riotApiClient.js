import logger from 'loglevel' 
import config from 'config'
import axios from 'axios'
import { response } from 'express';


class RiotApiClient {
  constructor () {
    this.fetchLatestLolPatchVersion()
  }

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
      return this.transformSummonerInfo(response.data)
    } catch (err) {
      logger.error(`An error occurred attempting to fetch from ${response.config.url}, ${err.message}`)
      throw err
    }
  }

  async fetchTFTSummonerInfoByPuuid(puuid) {
    const url = `/tft/summoner/v1/summoners/by-puuid/${puuid}`

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
      return this.transformSummonerInfo(response.data)
  
    } catch (err) {
      logger.error(`An error occurred attempting to fetch from ${response.config.url}, ${err.message}`)
      throw err
    }
  }
  
  // Fetches the most up to date version of data
  async fetchLatestLolPatchVersion() {
    let response
    try {
    response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    } catch (e) {
        return res.status(500).send(`Unable to fetch Json: ${e.message}`)
    }
    const versions = response.data
    this.latestLolPatchVersion = versions[0]
  
  }
   
  // Fetches whatever amount of most recent match id's you want
  async getRecentMatchesList(puuid, count) {
    const puuidURL = `/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${count}` 
    let response
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
    let response
    try{
      response = await axios.get(matchURL,
        {
          baseURL: config.get('riot.matchURL'),
          headers: {
            'X-Riot-Token': config.get('riot.apiKey')
          }
        }
      )
    
      return this.correctMatchTransformation(response.data)
    } catch(err) { 
      logger.error(`An error occured attempting to fetch the Match Data from ${response.config.matchURL}, ${err.message}`)
      throw err
    }
  }

  async fetchTFTMatchHistory(puuid, count){
    
    const matchIds = await this.getRecentMatches(puuid, count)
    const allMatches = await Promise.all(matchIds.map(this.getMatchData))
    const matches = allMatches.map( match => {
      return { 
        matchDate: match.info.game_datetime,
        matchLength: match.info.game_length,
        matchId: match.metadata.match_id
      }
    })
  
    return matches
    
  }

  async transformMatchData(matchInfo) {
    const summoners = await Promise.all(matchInfo.info.participants.puuid.map( puuid => this.fetchTFTSummonerInfoByPuuid(puuid)))
      return {
      matchId: matchInfo.metadata.match_id,
      matchTime: matchInfo.info.game_datetime,
      matchLength: matchInfo.info.game_length,
      matchParticipants: summoners
      }
    return newMatchInfo
  }
  
  transformSummonerInfo(summonerInfo) {
    const iconID = summonerInfo.profileIconId
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.latestLolPatchVersion}/img/profileicon/${iconID}.png`
    return {
      summonerName: summonerInfo.name,
      level: summonerInfo.summonerLevel, 
      profileIconUrl: url,
      puuid: summonerInfo.puuid
    }
  }
  
  async correctMatchTransformation(matchInfo) {
    return await Promise.all(matchInfo.info.participants.map( async info => {
      return {
        summoner: await this.fetchTFTSummonerInfoByPuuid(info.puuid),
        placement: info.placement,
        level: info.level,
        playersEliminated: info.players_eliminated,
        totalDamage: info.total_damage_to_players,
        champions: info.units.map(championInfo => {
          const champion = championInfo.character_id.slice(5)
          const randomChampionPicture = Math.floor(Math.random() * 4)
          const championImgURL = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_${randomChampionPicture}.jpg`  
          return {
            championName: championInfo.character_id,
            imgURL: championImgURL,
            rarity: championInfo.rarity,
            /*items: championInfo.items.map(item => {
              const itemImgURL = `http://ddragon.leagueoflegends.com/cdn/10.25.1/img/item/${item}.png`
              return {
                itemURL: itemImgURL
              }
            })*/
          }
        }),

      }
    }))
  }
}



        
    


export default new RiotApiClient()