<template>
  <div
    class="w-full relative rounded-lg p-4 bg-white shadow-gray-300 shadow-md"
  >
    <div class="flex flex-col gap-2">
      <span
        class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full uppercase"
        :class="badgeClass"
      >
        {{ props.status ? "Accepted" : "Rejected" }}
      </span>
      <h2 class="text-lg font-bold">Created by: {{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small class="font-light text-base">Title: {{ props.title }}</small>
        <small class="font-light text-base"
          >Number of questions: {{ props.questionsNUmber }}</small
        >
        <small class="font-light text-base">Country: {{ props.country }}</small>
        <small class="font-light text-base">written in: {{ props.writtenIn }}</small>
        <small class="font-light text-base"
          >Approve by: {{ props.aprobeBy }}</small
        >
      </span>
      <fwb-button-group class="flex justify-between gap-4">
        <fwb-button
          v-if="props.status"
          @click="handleAction(false)"
          class="w-full flex justify-center gap-2 border-[#FF0000] rounded-lg!"
          color="light"
          ><i class="pi pi-trash text-[#FF0000]"></i> <span>Retire</span>
        </fwb-button>
        <fwb-button
          @click="HandleViewRequest(props.id)"
          class="w-full flex justify-center gap-2 rounded-lg!"
          color="green"
          ><i class="pi pi-cloud-upload"></i> <span>Review</span>
        </fwb-button>
      </fwb-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbButtonGroup } from "flowbite-vue";
import { computed, type PropType } from "vue";
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
  aprobeBy: {
    type: String,
  },
  writtenIn: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
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
    name: "Review_Quiz_Registered",
    params: { id: id },
  });
};

const badgeClass = computed(() => {
  switch (props.status) {
    case true:
      return "bg-green-100 text-green-700 border border-green-300";
    case false:
      return "bg-red-100 text-red-700 border border-red-300";
    case undefined:
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
});
</script>

<style scoped></style>
