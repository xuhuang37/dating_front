import axios from 'axios'

// some place need define
// 1. base URL
// 2. timeout
// 3. interceptor for convert the props name
// 4. fault, inactive some fault action
const createAxios = (baseURL:string)=>{
  const agent = axios.create({ baseURL: baseURL, timeout: 8000 });
  // conversion between camelCase and pascal_case
  // convert CamelCase to pascal_case
  agent.interceptors.request.use(
    config => {
      config.data = transformPropertyName(config.data, key =>
        key.replace(/[A-Z]/g, str => '_' + str.toLowerCase())
      );
      return config;
    },
    error => Promise.reject(error)
  );
  // convert pascal_case to UpperCamelCase
  agent.interceptors.response.use(
    response => {
      response.data = transformPropertyName(response.data, key =>
        key.replace(/\_./g, str => str[1].toUpperCase())
      );
      return response;
    },
    error => Promise.reject(error)
  );
  function transformPropertyName(data: any, transformer: (key: string) => string): any {
    if (!isObject(data)) {
      // ignore sub-data typeof obj
      return data;
    } else {
      const newObj = Array.isArray(data) ? [] : {};
      Object.keys(data).forEach(key => {
        const newKey = transformer(key);
        newObj[newKey] = transformPropertyName(data[key], transformer);
      });
      return newObj;
    }
  }
  function isObject(data: any) {
    return data !== null && typeof data === 'object';
  }
  return agent;
}

export default createAxios;
