import agent from './agent';
import { AxiosRequestConfig } from 'axios';

enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

interface BaseConfig {
  url: string;
  params?: Object;
}

interface PostConfig extends BaseConfig {
  data: Object;
}

interface ServerResonpse<T> {
  codeStatus?: number;
  data: T;
  message?: string;
  isOk?: boolean;
}



export default class BaseApi {
  private baseURL = 'https://app.api.ggzy.truelore.cn';
  async get<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.GET, config, extra);
  }

  async post<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.POST, config, extra);
  }

  async delete<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.DELETE, config, extra);
  }

  async put<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PUT, config, extra);
  }

  private async request<T>(
    method: HttpMethods,
    config: BaseConfig | PostConfig,
    extra: AxiosRequestConfig = {}
  ): Promise<ServerResonpse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method: method,
      url: config.url,
      params: config.params || {},
      ...extra
    };
    if (method === HttpMethods.POST || method === HttpMethods.PUT) {
      requestConfig.data = (config as PostConfig).data || {};
    }

    try {
      const result = await agent(this.baseURL).request<ServerResonpse<T>>(requestConfig);
      return result.data;
    } catch (error) {
      // TODO: handle fault by yourself 
      console.error('api 请求错误');
      console.error(error);
      throw error;
    }
  }
}
