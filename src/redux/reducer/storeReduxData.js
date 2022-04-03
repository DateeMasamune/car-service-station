import useLocalStorageInit from '../../customHooks/useLocalStorageInit';
import carParkMock from '../../mockData/carParkMock';
import serviceStationMock from '../../mockData/serviceStationMock';
import { ORDER_DETAIL, WRITE_CAR, WRITE_SERVICE_STATION } from '../types/types';

useLocalStorageInit('serviceStationMock', serviceStationMock);
useLocalStorageInit('carParkMock', carParkMock);

const initialState = {
  serviceStation: localStorage.getItem('serviceStationMock') ? JSON.parse(localStorage.getItem('serviceStationMock')) : [],
  carPark: localStorage.getItem('carParkMock') ? JSON.parse(localStorage.getItem('carParkMock')) : [],
};

// eslint-disable-next-line default-param-last
const storeReduxData = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_SERVICE_STATION:
      return { ...state, serviceStation: action.payload };
    case WRITE_CAR:
      return { ...state, serviceStation: action.payload };
    case ORDER_DETAIL:
      return { ...state, serviceStation: action.payload };
    default:
      return state;
  }
};

export default storeReduxData;
