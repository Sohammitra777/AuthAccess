const BASE_URL = import.meta.env.VITE_BASE_URL;

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
