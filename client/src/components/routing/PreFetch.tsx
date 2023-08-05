import { useState, useEffect } from 'react';
import CupidoorSpinner from '../CupidoorSpinner';
// import useAPI from '../../hooks/useAPI';

const PreFetch = ({ children }: { children?: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const { getUserLikedApartments } = useAPI();
  useEffect(() => {
    // const fetchUserLikedApartments = async () => {
    //   const response = await getUserLikedApartments();
    //   localStorage.setItem('userLikedApartments', JSON.stringify(response.likes));
    // };
    // fetchUserLikedApartments();
    setIsLoading(false);
  }, []);
  return isLoading ? <CupidoorSpinner /> : <>{children}</>;
};

export default PreFetch;
