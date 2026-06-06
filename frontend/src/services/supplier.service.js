import api from "../api/axios"

// CREATE
export const createSupplier =
  async (data) => {

    const response =
      await api.post(
        "/suppliers",
        data
      )

    return response.data
}

// GET ALL
export const getSuppliers =
  async () => {

    const response =
      await api.get(
        "/suppliers"
      )

    return response.data.data
}