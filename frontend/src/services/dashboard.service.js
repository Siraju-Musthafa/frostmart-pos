import api from "../api/axios"

export const getDashboardStats =
  async () => {

    const response =
      await api.get(
        "/dashboard/stats"
      )

    return response.data.data
}

export const getMonthlySales =
  async () => {

    const response =
      await api.get(
        "/dashboard/monthly-sales"
      )

    return response.data.data
}