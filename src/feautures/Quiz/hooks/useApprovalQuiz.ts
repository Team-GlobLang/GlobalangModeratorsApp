import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import type { QuizChangeStatus } from "../interfaces/QuizType";
import { ApprovalQuiz } from "../services/QuizService";
const UseApprovalQuiz = () => {
  const mutation = useMutation({
    mutationFn: (data: QuizChangeStatus) =>
      toast.promise(
        ApprovalQuiz(data).then((response) => {
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

export { UseApprovalQuiz };
