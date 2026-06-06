import api from "../api/axios"

export const getSales =
  async (
    page = 1,
    search = ""
  ) => {

    const response =
      await api.get(
        `/sales?page=${page}&limit=10&search=${search}`
      )

    return response.data.data
  }

  export const deleteSale = async (id) => {
  const { data } = await api.delete(
    `/bills/${id}`
  );

  return data;
};

export const updateBill =
  async (id, data) => {

    const response =
      await api.put(
        `/bills/${id}`,
        data
      );

    return response.data;
};