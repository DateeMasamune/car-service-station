import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Chip, Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import CustomButton from '../../CustomButton/CustomButton';
import BoxStyled from './styledComponents';

import carServiceIcon from '../../../assets/brake-disc.jpg';

function SinglePageCarService() {
  const location = useLocation().pathname.split('/');
  const pageId = location[location.length - 1];
  const navigate = useNavigate();
  const reduxStore = useSelector((store) => store.serviceStation);
  const currentService = useMemo(() => (
    reduxStore.find((service) => service.id === pageId)
  ), [reduxStore]);

  const backPage = () => (navigate(-1));

  return (
    <Box>
      <CustomButton name="Назад" onClick={backPage} />
      <Typography variant="h2" component="h2" style={{ marginTop: 50 }}>
        {currentService.name}
      </Typography>
      <img alt="icon" src={carServiceIcon} style={{ maxWidth: 400, height: 'auto' }} />
      <Typography variant="body1" style={{ marginBottom: 50 }}>
        {currentService.description}
      </Typography>
      <Typography variant="h6" style={{ marginBottom: 50 }}>
        Марки автомобилей которые мы рассматриваем
      </Typography>
      <BoxStyled>
        {Object.keys(currentService.supportedСars).map((car) => (
          <Chip color="primary" key={car} label={car} />
        ))}
      </BoxStyled>
    </Box>
  );
}

export default SinglePageCarService;
