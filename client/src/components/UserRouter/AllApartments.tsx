import { useState, useEffect } from 'react';
import { Apartment } from '../../types/apartment';
import useAPI from '../../hooks/useAPI';
import GenericHousesList from '../GenericHousesList';
import CupidoorSpinner from '../CupidoorSpinner';
const AllApartments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apartments, setApartments] = useState<Apartment[]>([] as Apartment[]);
  const { getApartments } = useAPI();
  useEffect(() => {
    const fetchApartments = async () => {
      const response = await getApartments();
      setApartments(response);
      setIsLoading(false);
    };

    fetchApartments();
  }, []);

  return isLoading ? (
    <CupidoorSpinner></CupidoorSpinner>
  ) : (
    <GenericHousesList apartments={apartments} />
  );
};

export default AllApartments;
