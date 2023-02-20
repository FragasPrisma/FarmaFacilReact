import axios from "axios";
import { IViaCep } from "../Interfaces/ViaCep/IViaCep";

export async function ViaCep(cep: string) {

  const api = axios.create({
    baseURL: `http://viacep.com.br/ws/${cep}/json/`,
  });

  const request = await api.get("")

  let dados: IViaCep = request.data;
  return dados;
}