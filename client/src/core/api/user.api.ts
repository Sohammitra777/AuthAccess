import axios from "axios";
import axiosConfig from "./axios.api";


export const userApi = axios.create(axiosConfig.extendedClientConfig("/user"));


