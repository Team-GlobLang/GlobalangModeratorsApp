import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { RetireCollab } from "../services/ColaboratorServices";

const UseRetireCollab = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(
        RetireCollab(id).then((response) => {
          return response;
        }),
        {
          loading: "Please wait...",
          success: h("span", `Se realizo la acción exitosamente.`),
          error: (error: ApiError) => h("span", `${error.message}`),
        }
      ),
  });

  return mutation;
};

export { UseRetireCollab };
