import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dialog } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import CustomCard from '../CustomCard/CustomCard';
import BoxStyled from '../ServiceStation/styledComponents';

import carIcon from '../../assets/carIcon.jpg';

function CarPark() {
  const [addCar, setAddCar] = useState(false);
  const carParkRedux = useSelector((store) => store.carPark);
  const serviceStation = useSelector((store) => store.serviceStation);
  const description = useCallback((carId) => (
    serviceStation.find((service) => service.id === carId)?.name
  ), [carParkRedux, serviceStation]);

  const handlerAddCar = () => {
    setAddCar((prevState) => !prevState);
  };

  return (
    <>
      <CustomButton name="Добавить автомобиль" onClick={handlerAddCar} />
      <BoxStyled>
        {carParkRedux.map((car) => (
          <CustomCard
            key={car.brand}
            icon={carIcon}
            name={car.brand}
            description={`Находится на техобслуживании у сервиса ${description(car.serviceId)}`}
            link={`/car-park/single-car-page/${car.id}`}
          />
        ))}
      </BoxStyled>
      <Dialog onClose={handlerAddCar} open={addCar}>
        11111
        {/* тут будут селекты и чекбоксы */}
      </Dialog>
    </>
  );
}

export default CarPark;
