<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="p-4 flex flex-col gap-2">
      <h3 class="text-lg font-bold">Created by: {{ props.user }}</h3>
      <span class="flex flex-col font-light">
        <small class="font-light text-base">Title: {{ props.title }}</small>
        <small class="font-light text-base">Number of questions: {{ props.questionsNUmber }}</small>
        <small class="font-light text-base">Country: {{ props.country }}</small>
      </span>
      <fwb-button-group class="flex justify-between gap-4">
        <fwb-button
          @click="handleAction(false)"
          class="w-full flex justify-center gap-2 border-[#FF0000] rounded-lg!"
          color="light"
          ><i class="pi pi-trash text-[#FF0000]"></i> <span>Reject</span>
        </fwb-button>
        <fwb-button
          @click="HandleViewRequest(props.id)"
          class="w-full flex justify-center gap-2 rounded-lg!"
          color="green"
          ><i class="pi pi-cloud-upload"></i> <span>Review</span>
        </fwb-button>
      </fwb-button-group>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { FwbCard, FwbButtonGroup, FwbButton } from "flowbite-vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  questionsNUmber: {
    type: Number,
  },
  country: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  onAction: {
    type: Function as PropType<
      (payload: { id: string; isAccepted: boolean }) => void
    >,
    required: false,
  },
});

const handleAction = (isAccepted: boolean) => {
  props.onAction?.({
    id: props.id!,
    isAccepted,
  });
};

const router = useRouter();
const HandleViewRequest = (id: string) => {
  router.push({
    name: "Review_Quiz",
    params: { id: id },
  });
};
</script>

<style scoped></style>
