jest.mock('../src/services/riotApiClient')
import mockRiotApiClient from '../src/services/riotApiClient'
import {
  handleGetSummonerInfo,
  handleGetMatchDetail,
  handleGetMatchesForSummoner,
} from '../src/routes/tftRoutes'

describe('When fetching summoner info from the riotApiClient, the tft route handler', () => {
  let req = {}
  const mockJson = jest.fn(() => {})
  const mockSend = jest.fn(() => {})
  let res = { json: mockJson, send: mockSend }
  const mockStatus = jest.fn(() => {
    return res
  })
  res.status = mockStatus

  beforeEach(() => {
    req.params = {}
  })

  test('fetches summoner info from riotApiClient', async () => {
    req.params.summonerName = 'Blarcher'
    await handleGetSummonerInfo(req, res)

    expect(mockRiotApiClient.fetchTFTSummonerInfo).toHaveBeenCalledWith(
      'Blarcher'
    )
  })

  test('sends summoner info to caller', async () => {
    req.params.summonerName = 'Blarcher'
    await handleGetSummonerInfo(req, res)

    expect(mockSend).toHaveBeenCalledTimes(1)
  })

  test('sends an error to the caller when riotApiClient fails', async () => {
    mockRiotApiClient.fetchTFTSummonerInfo.mockImplementation(() => {
      throw new Error('Summoner Info Not Found')
    })
    req.params.summonerName = 'Blarcher'
    await handleGetSummonerInfo(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })
})

describe('When fetching match info from the riotApiClient, the tft route handler', () => {
  let req = {}
  const mockJson = jest.fn(() => {})
  const mockSend = jest.fn(() => {})
  let res = { json: mockJson, send: mockSend }
  const mockStatus = jest.fn(() => {
    return res
  })
  res.status = mockStatus

  beforeEach(() => {
    req.params = {}
  })

  test('fetches match info from riotApiClient', async () => {
    req.params.matchId = 123456
    await handleGetMatchDetail(req, res)

    expect(mockRiotApiClient.getMatchData).toHaveBeenCalledWith(123456)
  })

  test('sends an error to the caller when riotApiClient fails', async () => {
    mockRiotApiClient.getMatchData.mockImplementation(() => {
      throw new Error('Match ID not found.')
    })
    req.params.matchId = 123456

    await handleGetMatchDetail(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })
})

describe('When fetching a match list from the riotApiClient, the tft route handler', () => {
  let req = {}
  const mockJson = jest.fn(() => {})
  const mockSend = jest.fn(() => {})
  let res = { json: mockJson, send: mockSend }
  const mockStatus = jest.fn(() => {
    return res
  })
  res.status = mockStatus

  beforeEach(() => {
    req.params = {}
    req.query = {}
  })

  test('Fetches summoner info from the API client ', async () => {
    req.params.summonerName = 'Blarcher'
    await handleGetMatchesForSummoner(req, res)
    expect(mockRiotApiClient.fetchTFTSummonerInfo).toHaveBeenCalledWith(
      'Blarcher'
    )
  })

  test('Fetches a match list from the API client', async () => {
    const puuid = 12345
    mockRiotApiClient.fetchTFTSummonerInfo.mockResolvedValue({ puuid: puuid })
    req.query.count = 2

    await handleGetMatchesForSummoner(req, res)
    expect(mockRiotApiClient.getRecentMatchesList).toHaveBeenCalledWith(
      puuid,
      req.query.count
    )
  })

  test('Sends an error to the caller when the riotApiClient caLL fails.', async () => {
    req.params.summonerName = 'Blarcher'

    mockRiotApiClient.fetchTFTSummonerInfo.mockImplementation(() => {
      throw new Error('Summoner not found.')
    })

    await handleGetMatchesForSummoner(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
  })
})
