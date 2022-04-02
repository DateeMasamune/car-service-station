import useLocalStorageInit from '../../customHooks/useLocalStorageInit';
import serviceStationMock from '../../mockData/serviceStationMock';
import { WRITE_CAR, WRITE_SERVICE_STATION } from '../types/types';

useLocalStorageInit('serviceStationMock', serviceStationMock);

const initialState = {
  serviceStation: localStorage.getItem('serviceStationMock') ? JSON.parse(localStorage.getItem('serviceStationMock')) : [],
  carPark: [],
};

// eslint-disable-next-line default-param-last
const storeReduxData = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_SERVICE_STATION:
      return { ...state, serviceStation: action.payload };
    case WRITE_CAR:
      return { ...state, serviceStation: action.payload };
    default:
      return state;
  }
};

export default storeReduxData;
