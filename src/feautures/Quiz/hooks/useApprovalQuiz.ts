import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { QuizChangeStatus } from "../interfaces/QuizType";
import { ApprovalQuiz } from "../services/QuizService";
import type { ApiError } from "@core/types/ApiError";
const UseApprovalQuiz = () => {
  const mutation = useMutation({
    mutationFn: (data: QuizChangeStatus) =>
      toast.promise(ApprovalQuiz(data), {
        loading: "Please wait...",
        success: h("span", `The action was completed successfully.`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

export { UseApprovalQuiz };
