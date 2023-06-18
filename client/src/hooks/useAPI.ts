import { AxiosError, AxiosResponse } from 'axios';
import config from '../config.json';
import { MatchData } from '../types/matchData';
import { User } from '../types/user';
import { NewApartment } from '../components/AddProperty/types';
import { Apartment } from '../types/apartment';
import { QuestionAnswer, ServerQuestionAnswer } from '../types/questionAnswer';
import useAxiosPrivate from './useAxiosPrivate';

const useAPI = () => {
  const axiosPrivate = useAxiosPrivate();

  const getTenantMatches = async (data: QuestionAnswer[]) => {
    const response = await axiosPrivate.post(config.api.routes.match, data);

    return response.data;
  };

  const setUserAnswers = async (data: QuestionAnswer[]) => {
    const response = await axiosPrivate.post(config.api.routes.userAnswer, data);

    return response;
  };

  const signIn = async (email: string, password: string) => {
    const response = await axiosPrivate(config.api.routes.signIn, {
      data: { email, password },
      method: 'POST',
      withCredentials: true,
    });
    return response;
  };

  const signUp = async (user: User) => {
    const response: AxiosResponse = await axiosPrivate.post(config.api.routes.signUp, user);
    return response;
  };

  const addApartment = async (newApartment: NewApartment) => {
    try {
      const response: AxiosResponse = await axiosPrivate.post(
        config.api.routes.addApartment,
        newApartment,
      );
      return response;
    } catch (ex: AxiosError | any) {
      return ex;
    }
  };

  const getUserProperties = async (userId: string): Promise<Apartment[]> => {
    const response = await axiosPrivate.get(`${config.api.routes.getLandloard}/${userId}`);

    return response.data;
  };

  const getUserLikedApartments = async (): Promise<any> => {
    const response = await axiosPrivate.get(`${config.api.routes.getLikedApartments}`);

    return response.data;
  };

  const toggleTenantLike = async (apartmentId: string, userId: string) => {
    const response = await axiosPrivate.post(
      `${config.api.routes.toggleTenantLike}/${apartmentId}`,
      { tenantId: userId },
    );

    return response.data;
  };

  const getApartmentById = async (apartmentId: string): Promise<Apartment> => {
    const response = await axiosPrivate.get(`${config.api.routes.getApartment}/${apartmentId}`);

    return response.data;
  };

  const getApartments = async (): Promise<Apartment[]> => {
    const response = await axiosPrivate.get(`${config.api.routes.getApartment}`);

    return response.data;
  };

  const getUserAnswers = async (): Promise<ServerQuestionAnswer[]> => {
    const response = await axiosPrivate.get(config.api.routes.userAnswer);
    return response.data;
  };

  return {
    getTenantMatches,
    setUserAnswers,
    signIn,
    signUp,
    addApartment,
    getUserProperties,
    getUserLikedApartments,
    toggleTenantLike,
    getApartmentById,
    getApartments,
    getUserAnswers,
  };
};

export default useAPI;
