/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent, FormControl, FormControlLabel, FormGroup, MenuItem, Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import detailsMock from '../../../mockData/detailsMock';
import CustomButton from '../../CustomButton/CustomButton';
import { writeCar } from '../../../redux/actions/actions';
import useUniqValuesCheckbox from '../../../customHooks/useUniqValuesCheckbox';
import useUpdateReduxStore from '../../../customHooks/useUpdateReduxStore';

function DialogAddCar({ handlerAddCar, addCar, setLoad }) {
  const [selectService, setSelectService] = useState('');
  const [selectCarBrand, setSelectCarBrand] = useState('');
  const [selectDetail, setSelectDetail] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const serviceStation = useSelector((store) => store.serviceStation);
  const carPark = useSelector((store) => store.carPark);
  const dispatch = useDispatch();

  const handleChangeService = (event) => {
    setSelectService(event.target.value);
  };

  const handlerChangeBrand = (event) => {
    setSelectCarBrand(event.target.value);
  };

  useEffect(() => {
    if (!selectService) return;
    const getService = serviceStation.find((service) => service.id === selectService);
    setCarBrands(Object.keys(getService.supportedСars));
    setSelectCarBrand('');
  }, [selectService]);

  const handleChangeBrand = (event) => {
    useUniqValuesCheckbox(event, selectDetail, setSelectDetail);
  };

  useEffect(() => {
    if (selectService && selectCarBrand && selectDetail.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectService, selectCarBrand, selectDetail]);

  const handleAddCar = () => {
    const car = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectService,
      brand: selectCarBrand,
      status: '',
      step: 0,
      history: [],
      details: selectDetail,
    };
    const updateCarPark = [...carPark, car];
    handlerAddCar(false);
    useUpdateReduxStore(setLoad, dispatch, writeCar, updateCarPark);
  };

  return (
    <Dialog onClose={handlerAddCar} open={addCar} maxWidth="xs">
      <DialogContent>
        <FormControl fullWidth style={{ marginBottom: 20, minWidth: 300 }}>
          <Select
            value={selectService}
            onChange={handleChangeService}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>Станция техобслуживании</em>
            </MenuItem>
            {serviceStation.map((serviceName) => (
              <MenuItem
                key={serviceName.name}
                value={serviceName.id}
              >
                {serviceName.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ minWidth: 300 }}>
          <Select
            value={selectCarBrand}
            onChange={handlerChangeBrand}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem
              disabled
              value=""
            >
              <em>Марка автомобиля</em>
            </MenuItem>
            {carBrands.map((brand) => (
              <MenuItem key={brand} value={brand}>{brand}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          {detailsMock.map((detail) => (
            <FormControlLabel
              key={detail}
              control={<Checkbox name={detail} onChange={handleChangeBrand} />}
              label={detail}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <CustomButton
          disabled={buttonDisabled}
          name="Добавить автомобиль"
          onClick={handleAddCar}
        />
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddCar;
