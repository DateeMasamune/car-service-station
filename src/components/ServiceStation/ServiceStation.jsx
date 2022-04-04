import React, { useState } from 'react';

import { useSelector } from 'react-redux';
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

function ServiceStation() {
  const serviceStation = useSelector((store) => store.serviceStation);
  const [settings, setSettings] = useState([1]);
  const [carServiceName, setCarServiceName] = useState('');
  const [open, setOpen] = useState(false);

  const handler = () => {
    setOpen((prevState) => !prevState);
  };

  const handlerChangeCarServiceName = (event) => {
    setCarServiceName(event.target.value);
  };

  return (
    <>
      <CustomButton name="Добавить станцию техобслуживания" onClick={handler} />
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
      <Dialog onClose={handler} open={open} maxWidth="xs">
        <DialogContent>
          <TextField
            value={carServiceName}
            onChange={handlerChangeCarServiceName}
            style={{ minWidth: 400, marginBottom: 20 }}
            id="standard-basic"
            label="Введи название станции ТО"
            variant="standard"
          />
          {settings.map(() => (
            <ServiceSettings />
          ))}
          <IconButton onClick={() => setSettings((prevState) => [...prevState, 1])} color="primary" aria-label="add an alarm">
            <AddBox />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <CustomButton
          // disabled={buttonDisabled}
            name="Готово"
            onClick={handler}
          />
        </DialogActions>
      </Dialog>
    </>

  );
}

export default ServiceStation;
