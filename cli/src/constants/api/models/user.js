import { apiCall } from "../call";

export async function auth(authType) {
    return await apiCall('post', `/api/user/${authType}`)
}

export async function getOne(user_id) {
    return await apiCall('get', `/api/user/${user_id}`)
}

export async function activate(user_id) {
    return await apiCall('put', `/api/user/${user_id}/activate`)
}

export async function forgot() {
    return await apiCall('post', `/api/user/forgot`)
}

export async function changePassword(user_id) {
    return await apiCall('put', `/api/user/${user_id}/password`)
}

export async function get() {
    return await apiCall('get', `/api/user`)
}

export async function getAssign() {
    return await apiCall('get', `/api/user/assign`)
}

export async function remove(user_id) {
    return await apiCall('delete', `/api/user/${user_id}`)
}

export async function update(user_id) {
    return await apiCall('put', `/api/user/${user_id}`)
}
