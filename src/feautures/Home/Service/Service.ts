import axiosInstance from "@core/AxiosConfig";
import axios from "axios";

async function getCounters() {
  try {
    const response = await axiosInstance.get("stats/counters");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
}

export {getCounters}
