jest.mock('axios')
import mockAxios from 'axios'
import riotApiClient from './riotApiClient'
import config from 'config'
import logger from 'loglevel'

describe('When fetching summoner info using summonerName, the Riot APi Client', () => {
  beforeEach(() => {
    riotApiClient.latestLolPatchVersion = 1
  })

  test('When fetching summoner info using summoner name, the Riot API Client should return a valid summoner info response.', async () => {
    riotApiClient.latestLolPatchVersion = 1

    const mockedResponse = {
      data: {
        name: 'Blarcher',
        summonerLevel: 100,
        profileIconId: 26,
        puuid: 12345,
        id: 1,
      },
    }
    const expectedResult = {
      summonerName: mockedResponse.data.name,
      level: mockedResponse.data.summonerLevel,
      profileIconUrl: `http://ddragon.leagueoflegends.com/cdn/1/img/profileicon/26.png`,
      puuid: mockedResponse.data.puuid,
    }

    mockAxios.get.mockResolvedValue(mockedResponse)

    const result = await riotApiClient.fetchTFTSummonerInfo(
      mockedResponse.data.name
    )
    expect(result).toEqual(expectedResult)
  })

  test('The get request is using the correct URL.', async () => {
    const summonerName = 'Blarcher'

    await riotApiClient.fetchTFTSummonerInfo(summonerName)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.baseURL).toMatch(config.riot.baseURL)
  })

  test('Sends the apiKey as a header', async () => {
    const summonerName = 'Blarcher'

    await riotApiClient.fetchTFTSummonerInfo(summonerName)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.headers['X-Riot-Token']).toMatch(config.riot.apiKey)
  })

  test('RiotApiClient throws an error when the GET request fails.', async () => {
    mockAxios.get.mockImplementation(() => {
      throw new Error('Api Key Out of date.')
    })
    const summonerName = 'Blarcher'

    await expect(
      riotApiClient.fetchTFTSummonerInfo(summonerName)
    ).rejects.toThrow()
  })
})

describe('When fetching summoner info using puuid, the Riot APi Client', () => {
  beforeEach(() => {
    riotApiClient.latestLolPatchVersion = 1
  })

  test('When fetching summoner info using summoner name, the Riot API Client should return a valid summoner info response.', async () => {
    riotApiClient.latestLolPatchVersion = 1

    const mockedResponse = {
      data: {
        name: 'Blarcher',
        summonerLevel: 100,
        profileIconId: 26,
        puuid: 12345,
        id: 1,
      },
    }
    const expectedResult = {
      summonerName: mockedResponse.data.name,
      level: mockedResponse.data.summonerLevel,
      profileIconUrl: `http://ddragon.leagueoflegends.com/cdn/1/img/profileicon/26.png`,
      puuid: mockedResponse.data.puuid,
    }

    mockAxios.get.mockResolvedValue(mockedResponse)

    const result = await riotApiClient.fetchTFTSummonerInfoByPuuid(
      mockedResponse.data.name
    )
    expect(result).toEqual(expectedResult)
  })

  test('The get request is using the correct URL.', async () => {
    const puuid = 12345

    await riotApiClient.fetchTFTSummonerInfoByPuuid(puuid)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.baseURL).toMatch(config.riot.baseURL)
  })

  test('Sends the apiKey as a header', async () => {
    const puuid = 12345

    await riotApiClient.fetchTFTSummonerInfoByPuuid(puuid)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.headers['X-Riot-Token']).toMatch(config.riot.apiKey)
  })

  test('RiotApiClient throws an error when the GET request fails.', async () => {
    mockAxios.get.mockImplementation(() => {
      throw new Error('Api Key Out of date.')
    })
    const puuid = 12345

    await expect(
      riotApiClient.fetchTFTSummonerInfoByPuuid(puuid)
    ).rejects.toThrow()
  })
})

describe('Fetching the latest patch version', () => {
  beforeEach(() => {
    riotApiClient.latestLolPatchVersion = 1
  })

  test('Returns the latest patch version', async () => {
    mockAxios.get.mockResolvedValue({ data: ['11.1.1', '10.1.2', '9.2.1'] })

    await riotApiClient.fetchLatestLolPatchVersion()
    expect(riotApiClient.latestLolPatchVersion).toBe('11.1.1')
  })

  test('Riot API Client throws an error when the GET request fails.', async () => {
    let result = { data : [1, 2, 3]}
    logger.error = jest.fn()
    mockAxios.get.mockImplementation(() => {
      throw new Error('Internal Server Issue')
    })

    await expect(
      riotApiClient.fetchLatestLolPatchVersion()
      ).rejects.toThrow('')
  })
})

describe(`Getting a specific number of match Id's, The riot api client`, () => {
  beforeEach(() => {
    riotApiClient.latestLolPatchVersion = 1
  })

  test('The puuid and count parameters are used in the puuidURL', async () => {
    let puuid = 12345
    let count = 3
    const puuidURL = `/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${count}`
    const mockedResponse = { data: ['ma-1', 'ma-2', 'ma-3'] }

    mockAxios.get.mockResolvedValue(mockedResponse)

    await riotApiClient.getRecentMatchesList(puuid, count)
    expect(puuidURL).toEqual(`/tft/match/v1/matches/by-puuid/12345/ids?count=3`)
  })

  test('The get request is using the matchURL from the config.', async () => {
    const puuid = 12345
    const count = 3

    await riotApiClient.getRecentMatchesList(puuid, count)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.baseURL).toMatch(config.riot.matchURL)
  })

  test('Sends the apiKey as a header', async () => {
    const puuid = 12345
    const count = 3

    await riotApiClient.getRecentMatchesList(puuid, count)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.headers['X-Riot-Token']).toMatch(config.riot.apiKey)
  })

  test('RiotApiClient throws an error when the GET request fails.', async () => {
    mockAxios.get.mockImplementation(() => {
      throw new Error('Api Key Out of date.')
    })
    const puuid = 12345
    const count = 3

    await expect(
      riotApiClient.getRecentMatchesList(puuid, count)
    ).rejects.toThrow()
  })
})

describe('Getting a specific matches info, the Riot Api Client', () => {
  beforeEach(() => {
    riotApiClient.latestLolPatchVersion = 1
  })

  test('the matchURL uses the matchID parameter', async () => {
    const mockedResponse = {
      data: {
        info: {
          participants: [
            {
              summoner: 'Blarcher',
              puuid: 123456,
              placement: 1,
              level: 100,
              players_eliminated: 7,
              total_damage_to_players: 2000,
              units: [
                {
                  character_id: ['TFT4_TwistedFate'],
                  rarity: 10,
                },
              ],
            },
          ],
        },
      },
    }

    mockAxios.get.mockResolvedValue(mockedResponse)

    const matchId = 1
    const url = `/tft/match/v1/matches/${matchId}`

    await riotApiClient.getMatchData(matchId)
    const options = mockAxios.get.mock.calls[0][0]
    expect(url).toEqual(options)
  })

  test('The riot api key is sent', async () => {
    const matchId = 1
    await riotApiClient.getMatchData(matchId)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.headers['X-Riot-Token']).toMatch(config.riot.apiKey)
  })

  test('The correct URL is being used.', async () => {
    const matchId = 1
    await riotApiClient.getMatchData(matchId)
    const options = mockAxios.get.mock.calls[0][1]
    expect(options.baseURL).toMatch(config.riot.matchURL)
  })

  test('The Riot Api Client throws an error when the GET request fails.', async () => {
    const matchId = 1
    mockAxios.get.mockImplementation(() => {
      throw new Error('Api Key Out of date.')
    })

    await expect(riotApiClient.getMatchData(matchId)).rejects.toThrow()
  })
})
