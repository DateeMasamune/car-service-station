import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import useUniqValuesCheckbox from '../../../customHooks/useUniqValuesCheckbox';
import useUpdateReduxStore from '../../../customHooks/useUpdateReduxStore';
import { writeCar } from '../../../redux/actions/actions';

function useDialogAddCar(handlerAddCar, setLoad) {
  const [selectService, setSelectService] = useState('');
  const [selectCarBrand, setSelectCarBrand] = useState('');
  const [selectDetail, setSelectDetail] = useState([]);
  const [carBrands, setCarBrands] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const serviceStation = useSelector((store) => store.serviceStation);
  const carPark = useSelector((store) => store.carPark);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
    useUpdateReduxStore(setLoad, dispatch, writeCar, updateCarPark, 'carParkMock')
      .then(() => enqueueSnackbar('Автомобиль добавлен', { variant: 'success' }));
    setSelectService('');
    setSelectCarBrand('');
    setSelectDetail([]);
  };

  return {
    carBrands,
    buttonDisabled,
    selectService,
    serviceStation,
    selectCarBrand,
    handleChangeService,
    handleChangeBrand,
    handlerChangeBrand,
    handleAddCar,
  };
}

export default useDialogAddCar;
