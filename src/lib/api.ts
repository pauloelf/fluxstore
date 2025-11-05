import axios from "axios"

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
})

export const fetchProduct = async (id: string) => {
  const response = await api.get(`products/${id}`, {
    params: {
      select: ["title", "description"],
    },
  })
  return response.data
}

export default api
