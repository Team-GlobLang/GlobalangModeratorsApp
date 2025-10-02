import type { AudiosByFilters } from "../interfaces/AudiosByFilter";
import axiosInstance from "../../../Core/AxiosConfig";
import axios from "axios";

const GetAllAudiosByFilters = async (Data: AudiosByFilters) => {
  try {
    const response = await axiosInstance.get("shorts", {
      params: Data,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

export { GetAllAudiosByFilters };
