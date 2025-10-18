import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { ChangeStatusColaboratorRequest } from "../services/ColaboratorServices";
import { h } from "vue";
import type { ColaboratorRequestChangeStatus } from "../interfaces/ColaboratorRequestChangeStatusInterface";
//import type { ApiError } from "@core/types/ApiError";

const UseChangeRequestStatus = () => {
  const mutation = useMutation({
    mutationFn: (data: ColaboratorRequestChangeStatus) =>
      toast.promise(
        ChangeStatusColaboratorRequest(data).then((response) => {
          return response;
        }),
        {
          loading: "Please wait...",
          success: h("span", `The action was completed successfully..`),
          error: (error: any) => {
            // Extrae el mensaje del error
            const errorMessage =
              error?.response?.data?.message ||
              `Request failed with status code ${
                error?.response?.status || "unknown"
              }`;

            return h("span", errorMessage);
          },
        }
      ),
  });

  return mutation;
};

export { UseChangeRequestStatus };
