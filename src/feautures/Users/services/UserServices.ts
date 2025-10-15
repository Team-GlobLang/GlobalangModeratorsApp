import axios from "axios";
import type { UserFilter } from "../interfaces/user-filter-interface";
import axiosInstance from "@core/AxiosConfig";

const GetUsersFiltered = async (Data: UserFilter) => {
  try {
    const response = await axiosInstance.get("auth/users-filters", {
      params: Data,
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

export { GetUsersFiltered };
