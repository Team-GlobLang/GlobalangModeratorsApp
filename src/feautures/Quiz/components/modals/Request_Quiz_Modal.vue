<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-opacity-50 backdrop-blur-lg z-40 flex items-center justify-center"
    @click.self="closeModal"
  >
    <div
      v-if="isOpen"
      class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50"
      @click.stop
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-end">
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
      </div>

      <div class="px-6 py-6">
        <div class="w-full flex flex-col items-center gap-2 text-center">
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <i
              class="pi pi-exclamation-circle text-orange-400"
              style="font-size: 3rem"
            ></i>
          </div>
          <span class="text-xl font-semibold text-gray-900">
            Are you sure you want to do this?
          </span>
          <span class="text-sm text-gray-600 font-medium">
            This action is irreversible.
          </span>
        </div>
      </div>
      <div
        class="px-6 py-4 border-t border-gray-200 flex justify-between gap-3"
      >
        <button
          @click="handleReject"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
        >
          Reject
        </button>
        <button
          @click="handleAccept"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UseApprovalQuiz } from "../../hooks/useApprovalQuiz";
import type { QuizChangeStatus } from "../../interfaces/QuizType";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  idRequest: {
    type: String,
    required: true,
  },
});

const mutationChangeRequest = UseApprovalQuiz();

const HandleTypeAction = async (status: boolean) => {
  const colaboratorRequestChangeStatus: QuizChangeStatus = {
    id: props.idRequest,
    isApproved: status,
  };
  mutationChangeRequest.mutate(colaboratorRequestChangeStatus, {
    onSuccess: () => emit("completed"),
  });
};

const router = useRouter();
const route = useRoute();
const handleRedirect = () => {
  if (route.path.includes("/quizzes/review")) {
    router.push({ name: "Request_Quiz" });
  } else {
    return;
  }
};

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const handleAccept = () => {
  HandleTypeAction(true);
  handleRedirect();
  emit("close");
};

const handleReject = () => {
  HandleTypeAction(false);
  handleRedirect();
  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>
