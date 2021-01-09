jest.mock('axios')
import mockAxios from 'axios'
import riotApiClient from './riotApiClient'
import config from 'config'
import axios from 'axios'


describe('When fetching summoner info using Axios, the Riot APi Client', () => {
    let req = {}
    riotApiClient.fetchLatestLolPatchVersion.mockImplementation(() => {1})

    beforeEach(() => {
        req.params = {}
    })

    test('', async () => {
        req.params.summonerName = 'Blarcher'
        let response
        const summonerInfo = {name: 'Blarcher',
                              summonerLevel: 100,
                              profileIconId: 26,
                              puuid: 12345,
                              id: 1
                            }

        const mockResponse = {data: summonerInfo}
        await riotApiClient.fetchTFTSummonerInfo
        
        response = await mockAxios.get.mockResolvedValue(mockResponse)
        
        riotApiClient.transformSummonerInfo.mockImplementation(() => {
            return {
                summonerName: summonerInfo.name,
                level: summonerInfo.summonerLevel, 
                profileIconUrl: url,
                puuid: summonerInfo.puuid
              }
        })
        
        

    })
})