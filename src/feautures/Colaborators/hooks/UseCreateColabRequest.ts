import { useMutation } from "@tanstack/vue-query";
import type { ColaboratorRequestForm } from "../interfaces/ColaboratorRequestInterface";
import toast from "vue3-hot-toast";
import { CreateColabortorRequest } from "../services/ColaboratorServices";
import { h } from "vue";
import type { ColaboratorReponse } from "../interfaces/ColaboratorReponse";
import type { ApiError } from "../../../Core/types/ApiError";

export const UseCreateColabRequest = () => {
  const mutation = useMutation({
    mutationFn: (Data: ColaboratorRequestForm) =>
      toast.promise(CreateColabortorRequest(Data), {
        loading: "Please wait ...",
        success: (response: ColaboratorReponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};
