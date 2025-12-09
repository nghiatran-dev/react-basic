import axios from "./axios.customize";

const API_USER_ENDPOINT = '/api/v1';
const API_BOOK_ENDPOINT = '/api/v1/book';

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

const apiLogin = (email, password) => {
    const apiUrl = `${API_USER_ENDPOINT}/auth/login`;
    const payload = { 
        username: email,
        password: password
    };
    return axios.post(apiUrl, payload);
};

const apiLogout = () => {
    const apiUrl = `${API_USER_ENDPOINT}/auth/logout`;
    return axios.post(apiUrl);
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
};

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
};

// BOOK APIs:
const apiFetchBooks = (current, pageSize) => {
    const apiUrl = `${API_BOOK_ENDPOINT}?current=${current}&pageSize=${pageSize}`;
    return axios.get(apiUrl);
}

const bookPayload = (data) => {
    return {
        thumbnail: data.thumbnail,
        mainText: data.mainText,
        author: data.author,
        category: data.category,
        quantity: data.quantity,
        price: data.price
    };
};

const apiCreateBook = (data) => {
    const apiUrl = `${API_BOOK_ENDPOINT}`;
    return axios.post(apiUrl, bookPayload(data));
};

const apiUpdateBook = (data) => {
    const apiUrl = `${API_BOOK_ENDPOINT}`;
    const payload = bookPayload(data);
    // only update avatar when have value
    if (data.id) {
        payload._id = data.id;
    }

    return axios.put(apiUrl, payload);
};

export {
    // user
    apiFetchUsers,
    apiCreateUser,
    apiUpdateUser,
    apiDeleteUser,
    apiUploadFile,

    // book
    apiFetchBooks,
    apiCreateBook,
    apiUpdateBook,

    // auth
    apiLogin,
    apiLogout,
    apiRegister,
    apiGetAccount
}