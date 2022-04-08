import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

function useCarPark() {
  const [addCar, setAddCar] = useState(false);
  const [load, setLoad] = useState(false);
  const carParkRedux = useSelector((store) => store.carPark);
  const serviceStation = useSelector((store) => store.serviceStation);
  const description = useCallback((carId) => (
    serviceStation.find((service) => service.id === carId)?.name
  ), [carParkRedux, serviceStation]);

  const handlerAddCar = () => {
    setAddCar((prevState) => !prevState);
  };

  const filterReadyMaintenance = (car) => (car.status === '');

  return {
    addCar,
    load,
    carParkRedux,
    setLoad,
    description,
    handlerAddCar,
    filterReadyMaintenance,
  };
}

export default useCarPark;
