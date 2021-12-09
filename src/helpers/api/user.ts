import * as Axios from '../axios';
import IApiResponse from '../../interfaces/ApiResponse';
import { obj } from '../../interfaces/obj';

export const getResults = async (payload: obj, token: string) => {
  const response: IApiResponse = {
    success: false,
  };
  await Axios.privateInstance(token)
    .get('/user/results', { params: payload })
    .then((res) => {
      response.success = true;
      response.data = res.data.data;
    })
    .catch((error) => {
      response.message = error.response?.data.error;
    });
  return response;
};

export const getCalculatedCGPA = async (payload: obj, token: string) => {
  const response: IApiResponse = {
    success: false,
  };
  await Axios.privateInstance(token)
    .get('/user/results/calculate-cgpa', { params: payload })
    .then((res) => {
      response.success = true;
      response.data = res.data.data;
    })
    .catch((error) => {
      response.message = error.response?.data.error;
    });
  return response;
};

export const getPrintables = async (payload: obj, token: string) => {
  const response: IApiResponse = {
    success: false,
  };
  await Axios.privateInstance(token)
    .get('/user/printables', { params: payload })
    .then((res) => {
      response.success = true;
      response.data = res.data.data;
    })
    .catch((error) => {
      response.message = error.response?.data.error;
    });
  return response;
};
