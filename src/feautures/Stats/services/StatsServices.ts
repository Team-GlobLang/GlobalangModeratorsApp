import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { StatsFilterDto } from "../interfaces/filter-stats.interface";

const GetRankin = async (data: StatsFilterDto) => {
  try {
    const response = await axiosInstance.get("stats/rankin", { params: data });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Errro desconocido");
    }
  }
};

const GetRankinUser = async (data: StatsFilterDto) => {
  try {
    const response = await axiosInstance.get("stats/user-rankin", {
      params: data,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Errro desconocido");
    }
  }
};

export { GetRankin, GetRankinUser };
