<template>
  <FwbModal v-if="isOpen" @close="closeModal">
    <template #header> </template>
    <template #body>
      <div class="w-full flex flex-col items-center gap-2">
        <img
          src="/Warning.png"
          alt="WarningImage"
          class="rounded-full w-1/2"
        />
        <span class="text-xl">Are you sure to do this action?</span>
        <span class="text-sm font-bold">this action is unreversible</span>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <FwbButton @click="closeModal" color="alternative">
          Cancel
        </FwbButton>
        <FwbButton @click="handleAction" :color="typeAction ? 'green' : 'red'">
          {{ typeAction ? "Accept" : "Retire" }}
        </FwbButton>
      </div>
    </template>
  </FwbModal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal } from "flowbite-vue";
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
