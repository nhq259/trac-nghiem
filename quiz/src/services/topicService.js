import { get} from "../utils/request";

export const getListTopic = async () => {
    const result = await get(`topics`)
    return result;
}

export const getTopic = async (id) => {
    const result = await get(`topics/${id}`)
    return result;
}

// export const register = async (optinons) => {
//     const result = await post(`users`,optinons)
//     return result;
// }

// export const checkExits = async (key,value) => {
//     const result = await get(`users?${key}=${value}`)
//     return result;
// }

