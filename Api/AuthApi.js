import axiosClient from "./axiosClient";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const { getItem, setItem, removeItem } = useAsyncStorage('storageData');

const AuthApi = {
	login: (params) => {
		const url = "auth/login";
		return axiosClient.post(url, params).then(async (respone) => {
			// console.log(respone);
			if(respone.data.auth_token) {
				await setItem(JSON.stringify(respone.data));
			}
			return respone.data;
		}).catch(function (error) {
		    console.log(error);
		    console.log(error.config);
	  	});
	},
	register: (params) => {
		const url = "auth/register";
		return axiosClient.post(url, params).then(async (respone) => {
			console.log(respone);
			if(respone.data.auth_token) {
				await setItem(JSON.stringify(respone.data));
			}
			return respone.data;
		}).catch(function (error) {
		    console.log(error);
		    console.log(error.config);
	  	});
	},
	logout: async () => {
		await removeItem();
	},
	getCurrentUser: async () => {
		const user = JSON.parse(await getItem());
		// console.log(user);
		return user;
	},
	getTokenHeader: async () => {
		const user = JSON.parse(await getItem());
		// console.log(user);
		// console.log(user.auth_token);
		if(user !== null && user.auth_token) {
			return {Authorization: `Bearer ${user.auth_token}`};
		} else {
			return {};
		}
	}
}

export default AuthApi;