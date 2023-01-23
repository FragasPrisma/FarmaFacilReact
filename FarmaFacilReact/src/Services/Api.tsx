import axios, { AxiosResponse } from "axios";
import { url } from "inspector";

const API_URL = "https://localhost:44326/api/";

export const api = axios.create({
  baseURL: API_URL,
});

/**
Cria uma nova sessão
@param email email do usuário
@param password senha do usuário
*/
export const createSession = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return api.post("CreateToken", { email, password });
};
/**

Obtém todos os dados da url especificada
@param url url do endpoint
*/
export const getAll = async (url: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get(url);
    return response;
  } catch (error: any) {
    throw new Error(`Erro ao buscar dados de ${url}. Erro: ${error.message}`);
  }
};
/**

Envia dados para a url especificada
@param url url do endpoint
@param payload dados a serem enviados
*/
export const postFormAll = async (
  url: string,
  payload: any
): Promise<AxiosResponse> => {
  try {
    return await api.post(url, payload);
  } catch (error: any) {
    return await error;
    //throw new Error(`Erro ao enviar dados para ${url}. Erro: ${error.message}`);
  }
};
/**

Deleta dados para a url especificada
@param url url do endpoint
@param payload dados a serem enviados
*/
export const deleteDetail = async (
  url: string,
  payload: any
): Promise<AxiosResponse> => {
  try {
    return await api.post(url, payload);
  } catch (error: any) {
    throw new Error(`Erro ao Deletar dado ${url}. Erro: ${error.message}`);
  }
};

export const GetId = async (url: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get(url);
    return response;
  } catch (error: any) {
    throw new Error(`Erro ao buscar dados de ${url}. Erro: ${error.message}`);
  }
};

