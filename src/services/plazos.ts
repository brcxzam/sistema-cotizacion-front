import { AxiosObservable } from 'axios-observable';
import { Plazo } from 'models/plazo';
import instance from 'services';

export const createPlazo = (plazo: Plazo): AxiosObservable<Plazo> => {
  return instance.post(`${process.env.REACT_APP_API_PLAZOS}`, plazo);
};

export const getPlazos = (): AxiosObservable<Plazo[]> => {
  return instance.get(`${process.env.REACT_APP_API_PLAZOS}`);
};

export const updatePlazo = (plazo: number, plazoObj: Plazo): AxiosObservable<Plazo> => {
  return instance.put(`${process.env.REACT_APP_API_PLAZOS}/${plazo}`, plazoObj);
};
export const removePlazo = (plazo: number): AxiosObservable<{ deletedCount: number }> => {
  return instance.delete(`${process.env.REACT_APP_API_PLAZOS}/${plazo}`);
};
