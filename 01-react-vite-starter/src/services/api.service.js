import axios from "./axios.customize";

const API_USER_ENDPOINT = '/api/v1';

const apiFetchUsers = (current, pageSize) => {
    // const apiUrl = API_USER_ENDPOINT;
    const apiUrl = `${API_USER_ENDPOINT}/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(apiUrl);
};

const apiCreateUser = (data) => {
    const apiUrl = `${API_USER_ENDPOINT}/user`;
    const payload = { 
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber
    };
    return axios.post(apiUrl, payload);
};

const apiUpdateUser = (data) => {
    const apiUrl = `${API_USER_ENDPOINT}/user`;
    const payload = { 
        _id: data.id,
        fullName: data.fullName,
        phone: data.phoneNumber
    };

    // only update avatar when have value
    if (data.avatar) {
        payload.avatar = data.avatar;
    }

    return axios.put(apiUrl, payload);
};

const apiDeleteUser = (id) => {
    const apiUrl = `${API_USER_ENDPOINT}/user/${id}`;
    return axios.delete(apiUrl);
}

const apiUploadFile = (folder, file) => {
    const apiUrl = `${API_USER_ENDPOINT}/file/upload`;
    const formData = new FormData();
    formData.append('fileImg', file);

    const config = {
        headers: {
            'upload-type': folder,
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post(apiUrl, formData, config);
}

const apiLogin = (email, password) => {
    const apiUrl = `${API_USER_ENDPOINT}/auth/login`;
    const payload = { 
        username: email,
        password: password
    };
    return axios.post(apiUrl, payload);
};

const apiRegister = (data) => {
    const apiUrl = `${API_USER_ENDPOINT}/user/register`;
    const payload = { 
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone
    };
    return axios.post(apiUrl, payload);
};

const apiGetAccount = () => {
    const apiUrl = `${API_USER_ENDPOINT}/auth/account`;
    return axios.get(apiUrl);
}

export {
    apiFetchUsers,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser,
    apiUploadFile,

    // auth
    apiLogin,
    apiRegister,
    apiGetAccount
}