import api from "./api";

export const Login = async (email: string, type: string) => {
  try {
    await api.post(`/auth/${type}`, { email });
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};
