import { apiCall } from "../call";

export async function create(room_id, contract_id) {
    return await apiCall('post', `/api/rooms/${room_id}/contracts/${contract_id}/bills`);
}
