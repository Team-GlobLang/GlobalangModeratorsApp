<template>
  <fwb-modal v-if="isOpen" @close="closeModal">
    <template #header> </template>
    <template #body>
      <div class="w-full flex flex-col items-center gap-2">
        <img
          src="../../../../assets/Warning.png"
          alt="WarningImage"
          class="rounded-full w-1/2"
        />
        <span class="text-xl">Are you sure to do this?</span>
        <span class="text-sm font-bold">this action is unreversible</span>
      </div>
      <fwb-textarea
        v-model="reviewShortData.reviewComment"
        :rows="4"
        label=""
        placeholder="Write an comment ..."
      />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative">
          Cancel
        </fwb-button>
        <fwb-button @click="handleAction" :color="typeAction ? 'green' : 'red'">
          {{ typeAction ? "Accept" : "Reject" }}
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal, FwbTextarea } from "flowbite-vue";
import { UseReviewShort } from "../../hooks/UseReviewShort";
import { ref, toRaw, watch } from "vue";
import type { ReviewShort } from "@shared/Interfaces/ReviewShort";
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

const reviewShortData = ref<ReviewShort>({
  reviewShortId: props.idRequest,
  reviewComment: "",
  approved: props.typeAction,
});

const ReviewShorts = UseReviewShort();

const handleReviewShort = async () => {
  const NewData: ReviewShort = {
    reviewShortId: reviewShortData.value.reviewShortId,
    reviewComment: reviewShortData.value.reviewComment,
    approved: reviewShortData.value.approved,
  };
  const data = toRaw(NewData);
  try {
    ReviewShorts.mutate(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch {
    console.log("Error al aceptar solicitud");
  }
};

watch(
  () => props.idRequest,
  (newId) => {
    reviewShortData.value.reviewShortId = newId;
    reviewShortData.value.reviewComment = "";
  }
);

watch(
  () => props.typeAction,
  (newstatus) => {
    reviewShortData.value.approved = newstatus;
    reviewShortData.value.reviewComment = "";
  }
);

const emit = defineEmits<{
  close: [];
  completed: [];
}>();

const handleAction = () => {
  handleReviewShort();
  emit("close");
  emit("completed");
};

const closeModal = () => {
  emit("close");
};
</script>
