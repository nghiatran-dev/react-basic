import axios from "./axios.customize";

const apiFetchUsers = () => {
    const apiUrl = '/api/v1/user';
    return axios.get(apiUrl);
};

const apiCreateUser = (data) => {
    const apiUrl = '/api/v1/user';
    const payload = { 
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber
    };
    return axios.post(apiUrl, payload);
};

const apiUpdateUser = (data) => {
    const apiUrl = '/api/v1/user';
    const payload = { 
        _id: data.id,
        fullName: data.fullName,
        phone: data.phoneNumber
    };
    return axios.put(apiUrl, payload);
};

export {
    apiFetchUsers,
    apiCreateUser,
    apiUpdateUser
}