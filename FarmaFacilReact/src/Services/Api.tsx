import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:44326",
});

export const createSession = async (email: string, password: string) => {
    return api.post("/api/CreateToken", {email, password});
};

