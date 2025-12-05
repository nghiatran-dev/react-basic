import axios from "./axios.customize";

const API_USER_ENDPOINT = '/api/v1/user';

const apiFetchUsers = (current, pageSize) => {
    // const apiUrl = API_USER_ENDPOINT;
    const apiUrl = `${API_USER_ENDPOINT}?current=${current}&pageSize=${pageSize}`;
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
    console.log('data update: ', data.avatar);
    const apiUrl = API_USER_ENDPOINT;
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
    const apiUrl = `${API_USER_ENDPOINT}/${id}`;
    return axios.delete(apiUrl);
}

const apiUploadFile = (folder, file) => {
    const apiUrl = '/api/v1/file/upload';
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

const apiUpdateAvatarUser = (_id, avatar) => {
    const apiUrl = API_USER_ENDPOINT;
    const payload = { 
        _id,
        avatar
    };
    return axios.put(apiUrl, payload);
};

export {
    apiFetchUsers,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser,
    apiUploadFile,
    apiUpdateAvatarUser
}