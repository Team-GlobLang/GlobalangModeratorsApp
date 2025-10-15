<template>
  <fwb-card class="w-full rounded-lg p-4 bg-white shadow-gray-300 shadow-md">
    <div class="flex flex-col gap-2">
      <span class="flex flex-col font-light text-sm">
        <small class="text-md font-bold">{{ props.user }}</small>
        <small>Language: {{ props.language }}</small>
        <small>Category: {{ props.category }}</small>
        <small>Approve by: {{ props.aprobeBy }}</small>
      </span>
      <fwb-button
        v-if="props.status != 'REJECTED'"
        color="light"
        class="border-[#FF0000] text-sm"
        @click="handleRetire"
      >
        <i class="pi pi-trash text-[#FF0000]"></i>
        Retire as a {{ props.category }}</fwb-button
      >
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
// import { FwbCard } from "flowbite-vue";

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
});

const emit = defineEmits<{
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
  isApprove: [isApprove: boolean];
}>();

const handleRetire = () => {
  emit("idItem", props.id);
  emit("openModal", true);
  emit("isApprove", false);
};
</script>

<style scoped></style>
