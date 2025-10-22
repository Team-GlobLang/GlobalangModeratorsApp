import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "@core/types/ApiError";
import type { LoginForm } from "src/feautures/Auth/Interfaces";
import axiosInstance from "@core/AxiosConfig";
import axios from "axios";

export const UseRegisterModerator = () => {
  const mutation = useMutation({
    mutationFn: (Data: RegisterForm) =>
      toast.promise(registerModerator(Data), {
        loading: "Please wait ...",
        success: () => h("span", `Moderator has been successfully registered.`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};

const registerModerator = async (Data: RegisterForm) => {
  try {
    const response = await axiosInstance.post("auth/register-moderator", Data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export interface RegisterForm extends LoginForm {
  fullName: string;
  country: string;
  birthDate: string;
}
