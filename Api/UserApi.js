import axiosClient from "./axiosClient";

const UserApi = {
	getAll: (params) => {
		const url = "/user";
		return axiosClient.get(url, {params});
	},
	get: (id) => {
		const url = `/user/${id}`;
		return axiosClient.get(url);
	},
	add: (params) => {
		const url = "/user";
		return axiosClient.post(url, params);
	},
	update: (params) => {
		const url = `user/update/${params.id}`;
		return axiosClient.patch(url, params);
	},
	delete: (id) => {
		const url = `user/delete/${id}`;
		return axiosClient.delete(url);
	},
	setlang: (params) => {
		const url = "user/setlang";
		return axiosClient.post(url, params);
	},
	checkpass: (params) => {
		const url = "user/checkpass";
		return axiosClient.post(url, params);
	},
	changepassword: (params) => {
		const url = "user/changepassword";
		return axiosClient.post(url, params);
	}
}

export default UserApi;