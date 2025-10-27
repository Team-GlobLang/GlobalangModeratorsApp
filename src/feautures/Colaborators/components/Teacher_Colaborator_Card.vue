<template>
  <FwbCard class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <span class="flex flex-col font-light text-sm">
        <small class="text-lg font-bold">{{ props.user }}</small>
        <small class="text-base font-light">Language: {{ props.language }}</small>
        <small class="text-base font-light">Category: {{ props.category }}</small>
        <small class="text-base font-light">Reviewed by: {{ props.aprobeBy }}</small>
      </span>
      <FwbButton
        v-if="props.status != 'REJECTED'"
        color="light"
        class="border-[#FF0000] text-sm"
        @click="handleAction(false)"
      >
        <i class="pi pi-trash text-[#FF0000]"></i>
        Retire as a {{ props.category }}</FwbButton
      >
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { FwbCard } from "flowbite-vue";
import type { PropType } from "vue";

const props = defineProps({
  user: {
    type: String,
  },
  language: {
    type: String,
  },
  category: {
    type: String,
  },
  aprobeBy: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  status: {
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
</script>

<style scoped></style>
