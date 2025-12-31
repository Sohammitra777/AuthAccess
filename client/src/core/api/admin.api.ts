import axios from "axios";
import axiosConfig from "./axios.api";

export const adminApi = axios.create(
    axiosConfig.extendedClientConfig("/admin")
);
