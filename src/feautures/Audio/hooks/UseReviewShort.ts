import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "@core/types/ApiError";
import { ReviewShorts } from "@shared/Service/AudioService";
import type { ReviewShort } from "@shared/Interfaces/ReviewShort";

const UseReviewShort = () => {
  const mutation = useMutation({
    mutationFn: (Data: ReviewShort) =>
      toast.promise(
        ReviewShorts(Data).then((response) => {
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

export { UseReviewShort };
