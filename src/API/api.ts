import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/v1`,
});

export default api;
