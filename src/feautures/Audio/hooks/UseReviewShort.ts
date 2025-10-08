import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { ReviewShorts } from "../services/AudioService";
import type { ReviewShort } from "../interfaces/ReviewShort";

const UseReviewShort = () => {
  const mutation = useMutation({
    mutationFn: (Data: ReviewShort) =>
      toast.promise(
        ReviewShorts(Data).then((response) => {
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

export { UseReviewShort };
