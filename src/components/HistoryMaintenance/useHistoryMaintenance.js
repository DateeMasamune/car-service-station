import { useNavigate } from 'react-router-dom';

import useCurrentCar from '../../customHooks/useCurrentCar';

function useHistoryMaintenance() {
  const { carPark } = useCurrentCar();
  const navigate = useNavigate();

  const goToSingleCar = (id) => {
    navigate(`/maintenance/${id}`);
  };

  const filterMaintenance = (car) => (car.status !== '');

  return {
    carPark,
    goToSingleCar,
    filterMaintenance,
  };
}

export default useHistoryMaintenance;
