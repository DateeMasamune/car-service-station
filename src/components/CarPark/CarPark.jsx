import React from 'react';

import CustomButton from '../CustomButton/CustomButton';
import BoxStyled from '../ServiceStation/styledComponents';

function CarPark() {
  return (
    <>
      <CustomButton name="Добавить автомобиль" />
      <BoxStyled>
        CarPark
      </BoxStyled>
    </>
  );
}

export default CarPark;
