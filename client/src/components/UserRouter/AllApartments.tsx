import { useState, useEffect } from 'react';
import { Apartment } from '../../types/apartment';
import useAPI from '../../hooks/useAPI';
import GenericHousesList from '../GenericHousesList';
import CupidoorSpinner from '../CupidoorSpinner';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
const AllApartments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apartments, setApartments] = useState<Apartment[]>([] as Apartment[]);
  const { getApartments } = useAPI();
  const {user} = useAuth();
  useEffect(() => {
    const fetchApartments = async () => {
      const response = await getApartments();
      setApartments(response);
      setIsLoading(false);
    };

    fetchApartments();
  }, []);
  if(user?.role === "landlord"){
    return <Navigate to={"/home/my-properties"}></Navigate>
  }
  return isLoading ? (
    <CupidoorSpinner></CupidoorSpinner>
  ) : (
    <GenericHousesList apartments={apartments} />
  );
};

export default AllApartments;
