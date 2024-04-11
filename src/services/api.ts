import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/api',
      withCredentials: true,
    });

    this.instance.interceptors.request.use(this.handleRequest as any);
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }

  private injectToken(config: AxiosRequestConfig = {}, token: string): AxiosRequestConfig {
    const authConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };

    return authConfig;
  }

  public get(url: string, token: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, this.injectToken(config, token));
  }

  public post(url: string, data: any, token: string, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, this.injectToken(config, token));
  }

  public put(url: string, data: any, token: string, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, this.injectToken(config, token));
  }
  public delete(url: string, token: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, this.injectToken(config, token));
  }
}

export default new ApiService();
