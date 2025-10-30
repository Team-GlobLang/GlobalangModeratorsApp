import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { ChangeStatusColaboratorRequest } from "../services/ColaboratorServices";
import { h } from "vue";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
import type { ApiError } from "@core/types/ApiError";


export const UseChangeRequestStatus = () => {
  const mutation = useMutation({
    mutationFn: (data: ColaboratorRequestChangeStatus) =>
      toast.promise(ChangeStatusColaboratorRequest(data), {
        loading: "Please wait...",
          success: h("span", `The action was completed successfully..`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};