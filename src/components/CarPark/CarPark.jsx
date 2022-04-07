import React from 'react';

import CustomButton from '../CustomButton/CustomButton';
import CustomCard from '../CustomCard/CustomCard';
import BoxStyled from '../ServiceStation/styledComponents';
import carIcon from '../../assets/carIcon.jpg';
import DialogAddCar from './DialogAddCar/DialogAddCar';
import Loading from '../Loading/Loading';
import Skeleton from '../Skeleton/Skeleton';
import useCarPark from './useCarPark';

function CarPark() {
  const {
    addCar,
    load,
    carParkRedux,
    setLoad,
    description,
    handlerAddCar,
    filterReadyMaintenance,
  } = useCarPark();

  return (
    <>
      <CustomButton name="Добавить автомобиль" onClick={handlerAddCar} />
      <BoxStyled>
        {carParkRedux.filter(filterReadyMaintenance).map((car) => (
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
      {carParkRedux.filter(filterReadyMaintenance).length === 0 && (
        <Skeleton text="Автомобилей еще нет" />
      )}
    </>
  );
}

export default CarPark;
