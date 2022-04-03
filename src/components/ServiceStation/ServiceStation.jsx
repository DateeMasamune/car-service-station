import React from 'react';

import { useSelector } from 'react-redux';
import BoxStyled from './styledComponents';

import carServiceIcon from '../../assets/brake-disc.jpg';
import CustomButton from '../CustomButton/CustomButton';
import CustomCard from '../CustomCard/CustomCard';

function ServiceStation() {
  const serviceStation = useSelector((store) => store.serviceStation);
  const addCarService = () => (console.log('service new'));
  return (
    <>
      <CustomButton name="Добавить станцию техобслуживания" onClick={addCarService} />
      <BoxStyled>
        {serviceStation.map((service) => (
          <CustomCard
            key={service.id}
            icon={carServiceIcon}
            name={service.name}
            description={service.description}
            link={`/single-page-car-service/${service.id}`}
          />
        ))}
      </BoxStyled>
    </>

  );
}

export default ServiceStation;
