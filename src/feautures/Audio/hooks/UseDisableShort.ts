import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import { DisableShort } from "@shared/Service/AudioService";
import type { ApiError } from "@core/types/ApiError";

const UseDisableShort = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(
        DisableShort(id).then((response) => {
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

export { UseDisableShort };
