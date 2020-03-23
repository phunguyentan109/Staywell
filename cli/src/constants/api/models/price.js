import { apiCall } from '../call';

export async function get() {
    return await apiCall('get', `/api/price`);
}

export async function create(price) {
    return await apiCall('post', '/api/price', price)
}

export async function remove(price_id) {
    return await apiCall('delete', `/api/price/${price_id}`)
}

export async function update(price_id, price) {
    return await apiCall('put', `/api/price/${price_id}`, price)
}
