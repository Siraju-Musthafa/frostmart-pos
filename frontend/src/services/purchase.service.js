import api from "../api/axios"

// CREATE PURCHASE
export const createPurchase =
  async (data) => {

    const response =
      await api.post(
        "/purchases",
        data
      )

    return response.data
}

// GET PURCHASES
export const getPurchases =
  async () => {

    const response =
      await api.get(
        "/purchases"
      )

    return response.data.data
}

export const deletePurchase =
async (id) => {

  const response =
    await api.delete(
      `/purchases/${id}`
    );

  return response.data;
};