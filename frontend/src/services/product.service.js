import api from "../api/axios"

export const getProducts = async () => {

  const response =
    await api.get("/products")

  return response.data.data
}

export const createProduct =
  async (data) => {

    const response =
      await api.post(
        "/products",
        data
      )

    return response.data
}

export const deleteProduct =
  async (id) => {

    const res =
      await api.delete(
        `/products/${id}`
      );

    return res.data;
  };

export const updateProduct =
  async (id, data) => {

    const res =
      await api.put(
        `/products/${id}`,
        data
      );

    return res.data;
  };  