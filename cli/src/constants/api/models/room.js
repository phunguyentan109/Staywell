import { apiCall } from '../call';

export async function get() {
    return await apiCall('get', `/api/rooms`);
}

export async function create(room) {
    return await apiCall('post', '/api/rooms', room)
}

export async function getOne(room_id) {
    return await apiCall('get', `/api/rooms/${room_id}`)
}

export async function remove(room_id) {
    return await apiCall('delete', `/api/rooms/${room_id}`)
}

export async function update(room_id, room) {
    return await apiCall('put', `/api/rooms/${room_id}`, room)
}

export async function assign(room_id, room) {
    return await apiCall('put', `/api/rooms/${room_id}/assign`)
}
