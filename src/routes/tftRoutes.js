import express from "express";
import riotApiClient from "../services/riotApiClient";

function getTFTRoutes() {
  const router = express.Router();
  router.get("/v1/summoner/:summonerName", handleGetSummonerInfo);
  router.get("/v1/match/history/:matchId", handleGetMatchDetail);
  router.get("/v1/matches/:summonerName", handleGetMatchesForSummoner);
  return router;
}

async function handleGetSummonerInfo(req, res) {
  const summonerName = req.params.summonerName;

  try {
    const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);

    res.send(summonerInfo);
  } catch (e) {
    return res
      .status(500)
      .send(`Unable to fetch summoner ${summonerName}: ${e.message}`);
  }
}

async function handleGetMatchDetail(req, res) {
  const matchId = req.params.matchId;
  try {
    const matchInfo = await riotApiClient.getMatchData(matchId);
    const match = { matchInfo: matchInfo };

    res.json(match);
  } catch (e) {
    return res
      .status(500)
      .send(
        `Unable to fetch match info for the match: ${matchId}: ${e.message}`
      );
  }
}

async function handleGetMatchesForSummoner(req, res) {
  const summonerName = req.params.summonerName;
  try {
    const summonerInfo = await riotApiClient.fetchTFTSummonerInfo(summonerName);
    const puuid = summonerInfo.puuid;

    const matchList = await riotApiClient.getRecentMatchesList(
      puuid,
      req.query.count
    );
    res.json(matchList);
  } catch (e) {
    return res
      .status(500)
      .send(
        `Unable to fetch summoner Match List Data for  ${summonerName}: ${e.message}`
      );
  }
}

export {
  getTFTRoutes,
  handleGetSummonerInfo,
  handleGetMatchDetail,
  handleGetMatchesForSummoner,
};
