import { apiCall } from "../call";

export async function get(user_id) {
   return await apiCall('get', `/api/user/${user_id}/contracts`);
}

export async function remove(user_id, contract_id) {
    return await apiCall('delete', `/api/user/${user_id}/contracts/${contract_id}`)
}
