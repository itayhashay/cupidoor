import axios from "axios";
import config from "../config.json";
import { MatchData } from "../types/matchData";

export const getTenantMatches = async (data: MatchData) => {
  const response = await axios.post(
    `${config.api.baseUrl}${config.api.routes.match}`,
    data
  );

  return response.data;
};