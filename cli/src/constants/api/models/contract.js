import { apiCall } from "../call";

export async function get(room_id) {
   return await apiCall('get', `/api/rooms/${room_id}/contracts`);
}

export async function getOne(room_id, contract_id) {
    return await apiCall('get', `/api/rooms/${room_id}/contracts/${contract_id}`);
}

export async function create(room_id) {
    return await apiCall('post', `/api/rooms/${room_id}/contracts`)
}

export async function remove(room_id, contract_id) {
    return await apiCall('delete', `/api/room/${room_id}/contracts/${contract_id}`)
}
