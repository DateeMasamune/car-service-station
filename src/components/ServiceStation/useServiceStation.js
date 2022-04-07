import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import useUpdateReduxStore from '../../customHooks/useUpdateReduxStore';
import { writeServiceStation } from '../../redux/actions/actions';

function useServiceStation() {
  const [settings, setSettings] = useState([0]);
  const [open, setOpen] = useState(false);
  const [carServiceName, setCarServiceName] = useState('');
  const [allCarBrands, setAllCarBrands] = useState({});
  const [buttonActive, setButtonActive] = useState(true);
  const [descriptonServiceStation, setDescriptonServiceStation] = useState('');
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const serviceStation = useSelector((store) => store.serviceStation);
  const { enqueueSnackbar } = useSnackbar();

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
    useUpdateReduxStore(setLoad, dispatch, writeServiceStation, updateServiceStation, 'serviceStationMock')
      .then(() => enqueueSnackbar('Автосервис добавлен', { variant: 'success' }));
    setCarServiceName('');
    setDescriptonServiceStation('');
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

  return {
    serviceStation,
    open,
    carServiceName,
    descriptonServiceStation,
    settings,
    load,
    allCarBrands,
    buttonActive,
    handlerAddCarServiceStation,
    handlerOpenDialog,
    handlerChangeCarServiceName,
    handlerDescriptionServiceStation,
    setAllCarBrands,
    addSettings,
  };
}

export default useServiceStation;
