import axios, { AxiosError, AxiosResponse } from "axios";
import config from "../config.json";
import { MatchData } from "../types/matchData";
import { User } from "../types/user";

export const getTenantMatches = async (data: MatchData) => {
  const response = await axios.post(
    `${config.api.baseUrl}${config.api.routes.match}`,
    data
  );

  return response.data;
};

export const setUserAnswers = async (data: MatchData) => {
  const response = await axios.post(
    `${config.api.baseUrl}${config.api.routes.userAnswer}`,
    data
  );

  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await axios.post(
    `${config.api.baseUrl}${config.api.routes.signIn}`,
    {
      email,
      password,
    }
  );
  return response;
};

export const signUp = async (user: User) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${config.api.baseUrl}${config.api.routes.signUp}`,
      user
    );
    return response;
  } catch (ex: AxiosError | any) {
    alert(ex);
    console.log(ex);
    return ex;
  }
};
