import useAxiosPrivate from "./useAxiosPrivate";

const useCupidAPI = () => {
  const axiosPrivate = useAxiosPrivate();

  return {
    likeApartment: async (apartmentId: string) => {
      return await axiosPrivate.post(
        `/users-relations/tenant/like/${apartmentId}`
      );
    },
  };
};

export default useCupidAPI;
