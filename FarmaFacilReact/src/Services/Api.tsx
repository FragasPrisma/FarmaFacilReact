import axios from "axios";
export const api = axios.create({
  baseURL: "https://localhost:44326/api/",
});

export const createSession = async (email: string, password: string) => {
  return api.post("CreateToken", { email, password });
};

export const getAll = async (url: string): Promise<any> => {
  try{
    const response = await api.get(url);
    return response
  }catch(error){
    throw new Error("Erro ao buscar dados");
  }
};

export const postFormAll = async (url: string, payload: any): Promise<JSON> => {
  try {
    const response = await api.post(url, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao enviar dados para ${url}. Erro: ${error}`);
  }
};
