import axios from "./axios.customize";

const fetchUsers = () => {
    const apiUrl = '/api/v1/user';
    return axios.get(apiUrl);
};

const createUser = (data) => {
    const apiUrl = '/api/v1/user';
    const payload = { 
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber
    };
    return axios.post(apiUrl, payload);
};

export {
    fetchUsers,
    createUser
}