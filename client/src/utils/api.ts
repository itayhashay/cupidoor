import axios, { AxiosError, AxiosResponse } from "axios";
import config from "../config.json";
import { MatchData } from "../types/matchData";
import { User } from "../types/user";
import { NewApartment } from "../components/AddProperty/types";
import { Apartment } from "../types/apartment";

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
  const response = await axios(
    `${config.api.baseUrl}${config.api.routes.signIn}`,
    {
      data: { email, password },
      method:"POST",
      withCredentials: true,
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

export const addApartment = async (newApartment: NewApartment) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${config.api.baseUrl}${config.api.routes.addApartment}`,
      newApartment
    );
    return response;
  } catch (ex: AxiosError | any) {
    alert(ex);
    console.log(ex);
    return ex;
  }
};

export const getUserProperties = async (userId: string): Promise<Apartment[]> => {
  const response = await axios.get(
    `${config.api.baseUrl}${config.api.routes.getLandloard}/${userId}`
  );

  return response.data;
};

export const getUserLikedApartments = async (userId: string): Promise<any> => {
  const response = await axios.get(
    `${config.api.baseUrl}${config.api.routes.getLikedApartments}/${userId}`
  );
  console.log(response);

  return response.data;
};

export const toggleTenantLike = async (apartmentId: string, userId: string) => {
  const response = await axios.post(
    `${config.api.baseUrl}${config.api.routes.toggleTenantLike}/${apartmentId}`,
    {tenantId: userId}
  );

  return response.data;
};

export const getApartmentById = async (apartmentId: string): Promise<Apartment> => {
  const response = await axios.get(
    `${config.api.baseUrl}${config.api.routes.getApartment}/${apartmentId}`
  );
  console.log(response);

  return response.data;
};
