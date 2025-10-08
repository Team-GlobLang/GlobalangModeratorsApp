import type { AudiosByFilters } from "../interfaces/AudiosByFilter";
import axiosInstance from "../../../Core/AxiosConfig";
import axios from "axios";
import type { ReviewShort } from "../interfaces/ReviewShort";

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

const DisableShort = async (id: string) => {
  try {
    const response = await axiosInstance.post(`shorts/disable/${id}`);
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

const DeleteShort = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`shorts/remove/${id}`);
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

const ReviewShorts = async (Data: ReviewShort) => {
  try {
    const response = await axiosInstance.post("moderator/review-short", Data);
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

export { GetAllAudiosByFilters, DisableShort, DeleteShort, ReviewShorts };
