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
        <span class="text-xl">Are you sure to retire this audio?</span>
        <span class="text-sm font-bold">this action is unreversible</span>
      </div>
      <FwbTextarea
        v-model="reviewShortData.reviewComment"
        :rows="4"
        label=""
        placeholder="Write an comment ..."
      />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <FwbButton @click="closeModal" color="alternative">
          Cancel
        </FwbButton>
        <FwbButton @click="handleAction" color="red"> Retire </FwbButton>
      </div>
    </template>
  </FwbModal>
</template>

<script lang="ts" setup>
import { FwbButton, FwbModal, FwbTextarea } from "flowbite-vue";
import { ref, toRaw, watch } from "vue";
import type { ReviewShort } from "../../../Shared/Interfaces/ReviewShort";
import { UseReviewShort } from "../../../Audio/hooks/UseReviewShort";
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  idRequest: {
    type: String,
    required: true,
  },

  typeAction: {
    type: Boolean,
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
    await ReviewShorts.mutate(data);
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
