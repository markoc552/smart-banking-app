import axios from "axios";

export const dbAxios = axios.create({baseURL: 'http://localhost:3005/'})

export const axiosClient = axios.create({baseURL: 'http://localhost:8080/'})
