import { apiCall, spec } from '../call'
const common = '/api/rooms'

export const get = async(id) => await apiCall('get', `${common}${spec(id)}`)
export const create = async(room) => await apiCall('post', common, room)

export const getOne = async(id) => await apiCall('get', `${common}/${id}`)
export const remove = async(id) => await apiCall('delete', `${common}/${id}`)
export const update = async(id, data) => await apiCall('put', `${common}/${id}`, data)
export const assign = async(id, data) => await apiCall('put', `${common}/${id}/assign`, data)
