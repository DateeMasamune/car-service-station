import { WRITE_CAR, WRITE_SERVICE_STATION } from '../types/types';

export const writeServiceStation = (payload) => ({
  type: WRITE_SERVICE_STATION,
  payload,
});

export const writeCar = (payload) => ({
  type: WRITE_CAR,
  payload,
});
