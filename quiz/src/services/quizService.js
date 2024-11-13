import { post } from "../utils/request";

export const createAnswer = async (optinons) => {
    const result = await post(`answers`,optinons)
    return result;
}