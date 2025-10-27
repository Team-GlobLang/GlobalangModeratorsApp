<template>
  <FwbCard class="relative w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <span
      class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full uppercase"
      :class="badgeClass"
    >
      {{ props.status }}
    </span>

    <div class="flex flex-col gap-2">
      <span class="flex flex-col font-light text-sm">
        <small class="text-lg font-bold">{{ props.user }}</small>
        <small class="text-base font-light">Language: {{ props.language }}</small>
        <small class="text-base font-light">Category: {{ props.category }}</small>
        <small class="text-base font-light">Reviewed by: {{ props.aprobeBy }}</small>
      </span>

      <FwbButton
        v-if="props.status !== 'REJECTED'"
        color="light"
        class="border-[#FF0000] text-sm"
        @click="handleAction(false)"
      >
        <i class="pi pi-trash text-[#FF0000]"></i>
        Retire as a {{ props.category }}
      </FwbButton>
    </div>
  </FwbCard>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { FwbCard } from "flowbite-vue";
import { computed, type PropType } from "vue";

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
    
  },
  status: {
    type: String,
    
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

const badgeClass = computed(() => {
  switch (props.status) {
    case "ACCEPTED":
      return "bg-green-100 text-green-700 border border-green-300";
    case "REJECTED":
      return "bg-red-100 text-red-700 border border-red-300";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
});
</script>

<style scoped></style>
