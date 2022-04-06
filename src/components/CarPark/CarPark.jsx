import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import CustomButton from '../CustomButton/CustomButton';
import CustomCard from '../CustomCard/CustomCard';
import BoxStyled from '../ServiceStation/styledComponents';

import carIcon from '../../assets/carIcon.jpg';
import DialogAddCar from './DialogAddCar/DialogAddCar';
import Loading from '../Loading/Loading';

function CarPark() {
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

  return (
    <>
      <CustomButton name="Добавить автомобиль" onClick={handlerAddCar} />
      <BoxStyled>
        {carParkRedux.map((car) => (
          <CustomCard
            key={car.id}
            icon={carIcon}
            name={car.brand}
            description={`Находится на техобслуживании у сервиса ${description(car.serviceId)}`}
            link={`/car-park/single-car-page/${car.id}`}
          />
        ))}
      </BoxStyled>
      <DialogAddCar handlerAddCar={handlerAddCar} addCar={addCar} setLoad={setLoad} />
      {load && <Loading load={load} />}
    </>
  );
}

export default CarPark;
