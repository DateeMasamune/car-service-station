/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCurrentCar from '../../customHooks/useCurrentCar';
import CustomButton from '../CustomButton/CustomButton';
import CarTitle from '../CarPark/CarTitle/CarTitle';
import useCurrentService from '../../customHooks/useCurrentService';
import useUpdateReduxStore from '../../customHooks/useUpdateReduxStore';
import { writeCar } from '../../redux/actions/actions';
import Loading from '../Loading/Loading';

const steps = [
  {
    nameStep: 'Поступил на ТО',
    status: 'accepted',
  },
  {
    nameStep: 'Разбор',
    status: 'takeAppart',
  },
  {
    nameStep: 'Установка новых деталей',
    status: 'installation',
  },
  {
    nameStep: 'Сборка',
    status: 'build',
  },
  {
    nameStep: 'Обслуживание закончено',
    status: 'ready',
  },
];

function Maintenance() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [load, setLoad] = useState(false);
  const [historyCar, setHistoryCar] = useState([`${steps[activeStep].nameStep} time`]);
  const dispatch = useDispatch();
  const { currentCar, carPark, pageId } = useCurrentCar();
  const { services } = useCurrentService();
  const navigate = useNavigate();
  // проверить почему не корректно записывается история
  const updateStatusCar = (currentStep) => {
    if (!steps[activeStep].status) return;
    const newStatusCar = carPark.map((car) => {
      if (car.id === pageId) {
        return {
          ...car,
          status: steps[activeStep].status,
          step: currentStep,
          history: [...new Set(historyCar)],
        };
      }
      return car;
    });
    useUpdateReduxStore(setLoad, dispatch, writeCar, newStatusCar);
  };

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setHistoryCar((prevState) => ([...prevState, `${steps[activeStep].nameStep} time`]));
    updateStatusCar(activeStep + 1, 'next');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const deleteLastHistory = historyCar.slice(0, historyCar.length - 1);
    setHistoryCar(deleteLastHistory);
    updateStatusCar(activeStep - 1, 'back');
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    setActiveStep(currentCar.step);
  }, []);

  const backPage = () => (navigate(-1));

  return (
    <Box sx={{ width: '100%' }}>
      <CustomButton name="Назад" onClick={backPage} />
      <CarTitle currentCar={currentCar} services={services} />
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label.nameStep} {...stepProps}>
              <StepLabel {...labelProps}>{label.nameStep}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Техобслуживание пройдено
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Повторить</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {`Шаг ${activeStep + 1}`}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Конец' : 'Далее'}
            </Button>
          </Box>
        </>
      )}
      {load && (
      <Loading load={load} />
      )}
    </Box>
  );
}

export default Maintenance;
