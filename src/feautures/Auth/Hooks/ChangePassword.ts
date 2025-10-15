import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import type { changePasswordInterface } from "../Interfaces";
import { changePassword } from "../Services/AuthServices";
import { h } from "vue";
import type { ApiError } from "@core/types/ApiError";

export const UseChangePassword = () => {
  const mutation = useMutation({
    mutationFn: (data: changePasswordInterface) =>
      toast.promise(changePassword(data), {
        loading: "Please wait...",
        success: (message: string) => h("span", `${message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
