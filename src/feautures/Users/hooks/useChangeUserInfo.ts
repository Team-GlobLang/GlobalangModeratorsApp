import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { h } from "vue";
import { UpdateUser } from "../services/UserServices";
import type { ChangeUser } from "../interfaces/ChangeUser-interface";

export const useChangeUserInfo = () => {
  const mutation = useMutation({
    mutationFn: (data: ChangeUser) =>
      toast.promise(UpdateUser(data), {
        loading: "Please wait...",
        success: h("span", `The action was completed successfully.`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
