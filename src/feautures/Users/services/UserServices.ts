import axios from "axios";
import type { UserFilter } from "../interfaces/user-filter-interface";
import axiosInstance from "@core/AxiosConfig";
import type { ChangeUser } from "../interfaces/ChangeUser-interface";

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

const UpdateUser = async (data: ChangeUser) => {
  try {
    const response = await axiosInstance.patch("auth/update", data);
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export { GetUsersFiltered, UpdateUser };
