import axios, {
  AxiosHeaders,
  AxiosResponse,
  Method,
  RawAxiosRequestHeaders,
} from "axios";

export const callAPI = <T = any, R = AxiosResponse<T>, D = any>(
  baseUrl: string,
  endpoint: string,
  method: Method = "GET",
  headers?: RawAxiosRequestHeaders | AxiosHeaders,
  params?: object,
  data?: D
): Promise<R> => {
  const options = {
    baseURL: baseUrl,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return axios(options);
};
