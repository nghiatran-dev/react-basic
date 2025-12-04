import axios from "./axios.customize";

const API_USER_ENDPOINT = '/api/v1/user';
const apiFetchUsers = () => {
    const apiUrl = API_USER_ENDPOINT;
    return axios.get(apiUrl);
};

const apiCreateUser = (data) => {
    const apiUrl = API_USER_ENDPOINT;
    const payload = { 
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber
    };
    return axios.post(apiUrl, payload);
};

const apiUpdateUser = (data) => {
    const apiUrl = API_USER_ENDPOINT;
    const payload = { 
        _id: data.id,
        fullName: data.fullName,
        phone: data.phoneNumber
    };
    return axios.put(apiUrl, payload);
};

const apiDeleteUser = (id) => {
    const apiUrl = `${API_USER_ENDPOINT}/${id}`;
    return axios.delete(apiUrl);
}

export {
    apiFetchUsers,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser
}