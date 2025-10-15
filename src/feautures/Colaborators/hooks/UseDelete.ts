import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { DeleteCollab } from "../services/ColaboratorServices";

const UseDeleteCollab = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(
        DeleteCollab(id).then((response) => {
          return response;
        }),
        {
          loading: "Please wait...",
          success: h("span", `The action was completed successfully..`),
          error: (error: ApiError) => h("span", `${error.message}`),
        }
      ),
  });

  return mutation;
};

export { UseDeleteCollab };
