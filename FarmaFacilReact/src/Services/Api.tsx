import axios from "axios";


export const api = axios.create({
  baseURL: "https://localhost:44326/api/",
});

export const createSession = async (email: string, password: string) => {
  return api.post("CreateToken", { email, password });
};

export const getAll = async ( url: string): Promise<void> => {
  return api.get(url);
};
