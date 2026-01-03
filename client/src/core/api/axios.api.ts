const BASE_URL = "http://localhost:3000";

const httpClientConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
};

const axiosConfig = {
  httpClientConfig,
  extendedClientConfig: (url: string) => {
    return {
      baseURL: BASE_URL + url,
      timeout: 5000,
      withCredentials: true,
    };
  },
};

export default axiosConfig;
