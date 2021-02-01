import axios from 'react-native-axios';
import AuthApi from "./AuthApi";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const { getItem, setItem, removeItem } = useAsyncStorage('storageData');
const axiosClient = axios.create({
	// baseURL: process.env.REACT_APP_API_URL,
	baseURL: 'http://172.20.10.4:8080/api/v1/',
	// baseURL: 'http://192.168.50.72:8080/api/v1/',
	header: {
		'Content-Type' : 'application/json',
		'Accept' : 'application/json',
	},
	paramsSerializer: params => (params),
});

axiosClient.interceptors.request.use(async (config) => {
	config.headers = await AuthApi.getTokenHeader();
	// console.log(config);
	return config;
});
axiosClient.interceptors.response.use((response) => {
	if(response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	if(error.response.status === 401) {
		removeItem();
	}
	throw error;
});

export default axiosClient;