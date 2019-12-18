import axios from "axios";

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export async function apiCall(method, path, data){
    try {
        return (await axios[method](path, data)).data;
    } catch(err) {
        throw err.response.data.errorMsg;
    }
}

export async function apiFdCall(method, url, data) {
    try {
        return (await axios({
            method, url, data,
            headers: {"content-type": "multipart/form-data"}
        })).data;
    } catch(err) {
        throw err.response.data.errorMsg;
    }
}

export default {
    user: {
        auth: type => ["post", `/api/user/${type}`],
        getOne: user_id => ["get", `/api/user/${user_id}`],
        activate: user_id => ["put", `/api/user/${user_id}/activate`]
    }
}
