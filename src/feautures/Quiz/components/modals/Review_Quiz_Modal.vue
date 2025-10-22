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
            :class="typeAction ? 'bg-green-100' : 'bg-red-100'"
          >
            <i
              class="pi text-3xl"
              :class="
                typeAction
                  ? 'pi-check-circle text-green-600'
                  : 'pi-times-circle text-red-600'
              "
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
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          @click="handleAction"
          class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
          :class="
            typeAction
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          "
        >
          {{ typeAction ? "Accept" : isRegistered ? "Retire" : "Reject" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { UseApprovalQuiz } from "../../hooks/useApprovalQuiz";
import type { QuizChangeStatus } from "../../interfaces/QuizType";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },

  typeAction: {
    type: Boolean,
    required: true,
  },

  idRequest: {
    type: String,
    required: true,
  },
  isRegistered: {
    type: Boolean,
    required: false,
  },
});

const mutationChangeRequest = UseApprovalQuiz();

const Data = ref<QuizChangeStatus>({
  id: props.idRequest,
  isApproved: props.typeAction,
});

const HandleTypeAction = async () => {
  const colaboratorRequestChangeStatus: QuizChangeStatus = {
    id: Data.value.id,
    isApproved: Data.value.isApproved,
  };
  console.log(colaboratorRequestChangeStatus.isApproved);
  try {
    await mutationChangeRequest.mutate(colaboratorRequestChangeStatus);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (err) {
    console.log("Error al rechazar solicitud");
  }
};

const router = useRouter();

const handleRedirect = () => {
  router.push({
    name: "Home",
  });
};

watch(
  () => props.typeAction,
  (newVal) => {
    Data.value.isApproved = newVal;
  },
  { immediate: true }
);

watch(
  () => props.idRequest,
  (newVal) => {
    Data.value.id = newVal;
  },
  { immediate: true }
);

const emit = defineEmits<{
  close: [];
}>();

const handleAction = () => {
  HandleTypeAction();
  handleRedirect();
  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>
