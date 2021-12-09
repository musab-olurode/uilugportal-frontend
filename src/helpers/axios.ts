import axios from 'axios';
import config from './config';

// let errFun = (error) => {
// 	//console.log(error);
// 	if (
// 		error.response.status === 401 &&
// 		(error.response.data.error === 'Invalid token' ||
// 			error.response.data.error === 'Token has expired' ||
// 			error.response.data.error === 'A token is required')
// 	) {
// 		let userType = getUserType();
// 		console.log(userType, 'user type');
// 		if (userType.toLowerCase() === 'admin') {
// 			redirect({}, '/admin');
// 		} else {
// 			redirect({}, '/auth/' + userType.toLowerCase() + '/login');
// 		}
// 	} else {
// 		throw error;
// 	}
// };

const privateInstance = (token: string) =>
  axios.create({
    baseURL: config.configBaseServerUrl,
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true,
  });

// privateInstance.interceptors.request.use((config) => {
//   config.headers = { withCredentials: true };
//   return config;
// });

// privateInstance.interceptors.response.use((response) => {
//   return response;
// }, errFun);

const publicInstance = axios.create({
  baseURL: config.configBaseServerUrl,
  headers: { 'X-Custom-Header': 'foobar' },
});

export { privateInstance, publicInstance };
