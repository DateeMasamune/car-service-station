import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCurrentCar from './useCurrentCar';

function useCurrentService() {
  const serviceStation = useSelector((store) => store.serviceStation);
  const { currentCar, carPark } = useCurrentCar();
  const services = useMemo(() => (
    serviceStation?.find((service) => service.id === currentCar.serviceId)
  ), [carPark, serviceStation]);

  return {
    services,
    serviceStation,
  };
}

export default useCurrentService;
