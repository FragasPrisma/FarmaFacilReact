import axios, { AxiosResponse } from "axios";

//const API_URL = "https://localhost:44326/api/";
const API_URL = "https://api-ffweb.prismafive.com.br/api/"

let token = localStorage.getItem("token")

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
    console.log(error)
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
): Promise<AxiosResponse> => {
  try {
    return await api.post(url);
  } catch (error: any) {
    if (error.response.data) {
      return error.response.data
    } else {
      throw new Error(`Erro ao Deletar dado ${url}. Erro: ${error.message}`);
    }

  }
};
/**
 
 * @param url url do endpoint
 * @param id id do item
 */
export const GetId = async (url: string, id: string): Promise<AxiosResponse> => {
  try {
    const response = await api.get(`${url}/${id}`);
    return response;
  } catch (error: any) {
    throw new Error(`Erro ao buscar dados de ${url}. Erro: ${error.message}`);
  }
};