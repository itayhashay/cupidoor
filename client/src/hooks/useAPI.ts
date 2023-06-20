import { AxiosError, AxiosResponse } from 'axios';
import config from '../config.json';
import { MatchData } from '../types/matchData';
import { User } from '../types/user';
import { Apartment } from '../types/apartment';
import { QuestionAnswer, ServerQuestionAnswer } from '../types/questionAnswer';
import useAxiosPrivate from './useAxiosPrivate';
import { StepperApartment } from '../components/AddProperty/types';
import { useAuth } from '../context/AuthContext';
import { CupidAxiosError } from '../types/cupidAxiosError';

const useAPI = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAccessToken, setUser, user } = useAuth();

  const getTenantMatches = async (data: QuestionAnswer[]) => {
    const response = await axiosPrivate.post(config.api.routes.match, data);

    return response.data;
  };

  const setUserAnswers = async (data: QuestionAnswer[]) => {
    const response = await axiosPrivate.post(config.api.routes.userAnswer, data);

    return response;
  };


  const addApartment = async (newApartment: StepperApartment) => {
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

  const editApartment = async (editedApartment: StepperApartment) => {
    try {
      const response: AxiosResponse = await axiosPrivate.put(
        `${config.api.routes.addApartment}/${editedApartment._id}`,
        editedApartment,
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

  const getApartmentLikes = async (apartmentId: string): Promise<User[]> => {
    const response = await axiosPrivate.get(
      `${config.api.routes.getApartmentLikes}/${apartmentId}`,
    );
    return response.data;
  };

  const approveTenant = async (tenantId: string, apartmentId: string) => {
    const response = await axiosPrivate.post(`${config.api.routes.approveTenant}/${tenantId}`, {
      apartmentId,
    });
    return response.data;
  };

  const updateUser = async (newUserData: User) => {
    try {
      const response: AxiosResponse = await axiosPrivate.put(`/user/${user?._id}`, {
        ...user,
        ...newUserData,
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (ex) {
      throw ex;
    }
  };

  const fetchUser = async () => {
    const response = await axiosPrivate.get('/user');
    const userData: User = response.data;
    setUser((prevState) => {
      return { ...prevState, ...userData };
    });
  };

  return {
    getTenantMatches,
    setUserAnswers,
    updateUser,
    fetchUser,
    addApartment,
    editApartment,
    getApartmentLikes,
    approveTenant,
    getUserProperties,
    getUserLikedApartments,
    toggleTenantLike,
    getApartmentById,
    getApartments,
    getUserAnswers,
  };
};

export default useAPI;
