import React, { useCallback, useMemo, useState } from 'react';

import {
  Box, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../CustomButton/CustomButton';
import { orderDetail } from '../../../redux/actions/actions';
import Loading from '../../Loading/Loading';
import useUpdateReduxStore from '../../../customHooks/useUpdateReduxStore';

function SingleCarPage() {
  const [load, setLoad] = useState(false);
  const location = useLocation().pathname.split('/');
  const navigate = useNavigate();
  const pageId = location[location.length - 1];
  const dispatch = useDispatch();
  const carPark = useSelector((store) => store.carPark);
  const serviceStation = useSelector((store) => store.serviceStation);
  const currentCar = useMemo(() => (
    carPark.find((car) => car.id === pageId)
  ), [carPark]);
  const services = useMemo(() => (
    serviceStation?.find((service) => service.id === currentCar.serviceId)
  ), [carPark, serviceStation]);
  const { supportedСars } = services;
  const getSupportedСars = useCallback((detail) => (
    !supportedСars[currentCar.brand]?.spareParts.includes(detail)
  ), [currentCar, serviceStation]);

  const backPage = () => (navigate(-1));

  const handleOrderDetail = (detail) => {
    const order = {
      ...services,
      supportedСars: {
        ...supportedСars,
        [currentCar.brand]: {
          spareParts: [...new Set(supportedСars[currentCar.brand]?.spareParts), detail],
        },
      },
    };

    const newStateServiceStation = serviceStation.map((service) => {
      if (service.id === order.id) {
        return order;
      }
      return service;
    });
    useUpdateReduxStore(setLoad, dispatch, orderDetail, newStateServiceStation);
  };

  return (
    <Box>
      {load && (
        <Loading load={load} />
      )}
      <CustomButton name="Назад" onClick={backPage} />
      <Typography variant="h2" component="h2" style={{ marginTop: 50 }}>
        {currentCar.brand}
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 50 }}>
        {`Станция техобслуживания: ${services.name}`}
      </Typography>
      <Typography variant="h5" style={{ marginBottom: 50 }}>
        Запчасти которые нужно поменять:
      </Typography>
      {currentCar.details.map((detail) => (
        <List key={detail}>
          <ListItem style={{ background: getSupportedСars(detail) ? 'red' : '#1976d2', color: 'white' }}>
            <ListItemText primary={detail} />
            {getSupportedСars(detail) && (
            <Box style={{
              display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            }}
            >
              <Typography>
                Нет в наличии
              </Typography>
              <CustomButton name="Заказать деталь" onClick={() => handleOrderDetail(detail)} />

            </Box>
            )}
          </ListItem>
        </List>
      ))}
    </Box>
  );
}

export default SingleCarPage;
