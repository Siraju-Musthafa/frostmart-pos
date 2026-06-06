import axios from "axios"

const api = axios.create({
  baseURL: "https://snowfreez-backend.onrender.com/api",
})

// ADD TOKEN AUTOMATICALLY
api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token")

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`
  }

  return config
})

export default api