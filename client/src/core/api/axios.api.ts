const BASE_URL = "http://localhost:3000";

const httpClientConfig = {
    baseURL: BASE_URL,
};

const axiosConfig = {
    httpClientConfig,
    extendedClientConfig: (url: string) => {
        return {
            baseURL: BASE_URL + url,

            withCredentials: true,
        };
    },
};

export default axiosConfig;
