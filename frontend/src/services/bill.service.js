import api from "../api/axios"

export const createBill = async (
  data
) => {

  const response =
    await api.post(
      "/bills",
      data
    )

  return response.data
}