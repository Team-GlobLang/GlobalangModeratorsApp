import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { UserFilter } from "../interfaces/user-filter-interface";

const GetUsersFiltered = async (Data: UserFilter) => {
  try {
    console.log("el pais: ", Data.country, "el email: ", Data.email);
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
