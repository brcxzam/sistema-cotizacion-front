import { AxiosObservable } from 'axios-observable';
import { Producto } from 'models/producto';
import instance from 'services';

export const createProducto = (producto: Producto): AxiosObservable<Producto> => {
  return instance.post(`${process.env.REACT_APP_API_PRODUCTOS}`, producto);
};

export const getProductos = (): AxiosObservable<Producto[]> => {
  return instance.get(`${process.env.REACT_APP_API_PRODUCTOS}`);
};

export const findProductos = (search: string): AxiosObservable<Producto[]> => {
  return instance.get(`${process.env.REACT_APP_API_PRODUCTOS}/${search}`);
};

export const updateProducto = (sku: number, producto: Producto): AxiosObservable<Producto> => {
  return instance.put(`${process.env.REACT_APP_API_PRODUCTOS}/${sku}`, producto);
};
export const removeProducto = (sku: number): AxiosObservable<{ deletedCount: number }> => {
  return instance.delete(`${process.env.REACT_APP_API_PRODUCTOS}/${sku}`);
};
