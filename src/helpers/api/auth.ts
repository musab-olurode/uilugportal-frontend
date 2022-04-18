import * as Axios from '../axios';
import IApiResponse from '../../interfaces/ApiResponse';
import { obj } from '../../interfaces/obj';

export const login = async (payload: obj) => {
	const response: IApiResponse = {
		success: false,
	};
	await Axios.publicInstance
		.post('/auth/signin', payload)
		.then((res) => {
			response.success = true;
			response.data = { token: res.data.data.token };
		})
		.catch((error) => {
			response.message = error.response?.data.message;
		});
	return response;
};

export const getLoggedInUser = async (token: string) => {
	const response: IApiResponse = {
		success: false,
	};
	await Axios.privateInstance(token)
		.get('/auth/me')
		.then((res) => {
			response.success = true;
			response.data = res.data.data;
		})
		.catch((error) => {
			response.message = error.response?.data.message;
		});

	return response;
};

export const logOut = async (token: string) => {
	const response: IApiResponse = {
		success: false,
	};
	await Axios.privateInstance(token)
		.post('/auth/signout')
		.then((res) => {
			response.success = true;
		})
		.catch((error) => {
			response.message = error.response?.data.message;
		});
	return response;
};
