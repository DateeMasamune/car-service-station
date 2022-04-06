import React, { useCallback, useMemo, useState } from 'react';

import {
  Box, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CustomButton from '../../CustomButton/CustomButton';
import { orderDetail } from '../../../redux/actions/actions';
import Loading from '../../Loading/Loading';
import useUpdateReduxStore from '../../../customHooks/useUpdateReduxStore';
import useCurrentCar from '../../../customHooks/useCurrentCar';
import CarTitle from '../CarTitle/CarTitle';
import useCurrentService from '../../../customHooks/useCurrentService';

function SingleCarPage() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCar, pageId } = useCurrentCar();
  const { services, serviceStation } = useCurrentService();
  const { supportedСars } = services;

  const searchDetail = (detail) => (
    !supportedСars[currentCar.brand]?.spareParts.includes(detail)
  );

  const getSupportedСars = useCallback((detail) => (
    searchDetail(detail)
  ), [currentCar, serviceStation]);

  const sendMaintenance = useMemo(() => (
    currentCar.details.some(
      (detail) => !searchDetail(detail) === false,
    )
  ), [serviceStation]);

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

  const handleSendCarMaintenance = () => {
    navigate(`/maintenance/${pageId}`);
  };

  return (
    <Box>
      {load && (
        <Loading load={load} />
      )}
      <CustomButton name="Назад" onClick={backPage} />
      <CarTitle currentCar={currentCar} services={services} />
      <Box style={{ marginBottom: 50 }}>
        <CustomButton name="Отправить автомобиль на техобслуживание" onClick={handleSendCarMaintenance} disabled={sendMaintenance} />
      </Box>
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
