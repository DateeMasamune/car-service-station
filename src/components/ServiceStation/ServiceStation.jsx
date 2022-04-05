import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
} from '@mui/material';
import {
  AddBox,
} from '@mui/icons-material';
import BoxStyled from './styledComponents';

import carServiceIcon from '../../assets/brake-disc.jpg';
import CustomButton from '../CustomButton/CustomButton';
import CustomCard from '../CustomCard/CustomCard';
import ServiceSettings from './ServiceSettings/ServiceSettings';
import { writeServiceStation } from '../../redux/actions/actions';
import Loading from '../Loading/Loading';
import useUpdateReduxStore from '../../customHooks/useUpdateReduxStore';

function ServiceStation() {
  const [settings, setSettings] = useState([0]);
  const [open, setOpen] = useState(false);
  const [carServiceName, setCarServiceName] = useState('');
  const [allCarBrands, setAllCarBrands] = useState({});
  const [buttonActive, setButtonActive] = useState(true);
  const [descriptonServiceStation, setDescriptonServiceStation] = useState('');
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const serviceStation = useSelector((store) => store.serviceStation);

  const handlerOpenDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const handlerChangeCarServiceName = (event) => {
    setCarServiceName(event.target.value);
  };

  const addSettings = () => {
    setSettings((prevState) => [...prevState, prevState[prevState.length - 1] + 1]);
  };

  const handlerAddCarServiceStation = () => {
    setOpen(false);
    const newServiceStation = {
      id: Math.random().toString(36).substr(2, 9),
      name: carServiceName,
      description: descriptonServiceStation,
      supportedСars: {
        ...allCarBrands,
      },
    };
    const updateServiceStation = [...serviceStation, newServiceStation];
    useUpdateReduxStore(setLoad, dispatch, writeServiceStation, updateServiceStation);
  };

  const handlerDescriptionServiceStation = (event) => {
    setDescriptonServiceStation(event.target.value);
  };

  useEffect(() => {
    if (Object.keys(allCarBrands).length && !!carServiceName) {
      setButtonActive(false);
    } else {
      setButtonActive(true);
    }
  }, [allCarBrands, carServiceName]);

  return (
    <>
      <CustomButton name="Добавить станцию техобслуживания" onClick={handlerOpenDialog} />
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
      <Dialog onClose={handlerOpenDialog} open={open} maxWidth="xs">
        <DialogContent>
          <TextField
            value={carServiceName}
            onChange={handlerChangeCarServiceName}
            style={{ minWidth: 400, marginBottom: 20 }}
            id="standard-basic"
            label="Введи название станции ТО"
            variant="standard"
          />
          <TextField
            value={descriptonServiceStation}
            onChange={handlerDescriptionServiceStation}
            style={{ minWidth: 400, marginBottom: 20 }}
            id="standard-basic"
            label="Описание станции ТО"
            variant="standard"
          />
          {settings.map((settingKey) => (
            <ServiceSettings
              key={settingKey}
              setAllCarBrands={setAllCarBrands}
              allCarBrands={allCarBrands}
            />
          ))}
          <IconButton onClick={addSettings} color="primary" aria-label="add an alarm">
            <AddBox />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <CustomButton
            disabled={buttonActive}
            name="Готово"
            onClick={handlerAddCarServiceStation}
          />
        </DialogActions>
      </Dialog>
      {load && <Loading load={load} />}
    </>

  );
}

export default ServiceStation;
