import axios from "axios";
import type { ColaboratorRequestForm } from "../interfaces/ColaboratorRequestInterface";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
import type { ColaboratorRequestFilters } from "../interfaces/ColaboratorRequestFiltersInterface";
import axiosInstance from "@core/AxiosConfig";

const CreateColabortorRequest = async (Data: ColaboratorRequestForm) => {
  try {
    const response = await axiosInstance.post(
      "colaborator/register-request",
      Data
    );
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

const ChangeStatusColaboratorRequest = async (
  Data: ColaboratorRequestChangeStatus
) => {
  try {
    const response = await axiosInstance.patch(
      "colaborator/colaborator-change-status",
      Data
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw error;
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

const GetColaboratorRequestsFilters = async (
  Data: ColaboratorRequestFilters
) => {
  try {
    const response = await axiosInstance.get(
      "colaborator/colaborator-requests",
      { params: Data }
    );

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

const GetColaboratorRequestById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `colaborator/colaborator-request/${id}`
    );

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

const DeleteCollab = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `colaborator/colaborator-retire/${id}`
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw error;
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

const RetireCollab = async (Data: ColaboratorRequestChangeStatus) => {
  try {
    const response = await axiosInstance.patch(
      "colaborator/retire-collab",
      Data
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw error;
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

export {
  CreateColabortorRequest,
  ChangeStatusColaboratorRequest,
  GetColaboratorRequestsFilters,
  GetColaboratorRequestById,
  DeleteCollab,
  RetireCollab,
};
