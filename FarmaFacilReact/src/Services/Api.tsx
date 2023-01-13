import axios from "axios";

export const api = axios.create({
    baseURL: "https://192.168.0.95:44326",
});

export const createSession = async (email: string, password: string) => {
    return api.post("/api/CreateToken", {email, password});
};

