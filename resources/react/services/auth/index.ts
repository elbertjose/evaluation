import axiosInstance from "../../requests/axios";
import {Login} from "../../types";

export const authUser = async (auth: Login) => {
    try {
        return await axiosInstance.post('/auth/signin', auth);
    } catch (error) {
        throw new Error(error as string);
    }
};
