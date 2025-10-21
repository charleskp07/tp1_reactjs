
import type { user } from "../../data/models/user.model";
import axiosInstance from "../axios_instance";

export const userApi = {
    login: async (formData: FormData): Promise<user> => {
        const response = await axiosInstance.post('/login', formData);
        return response.data;
    },

}