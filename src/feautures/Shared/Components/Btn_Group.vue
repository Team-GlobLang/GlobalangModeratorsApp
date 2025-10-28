<template>
  <div>
    <div class="flex justify-between gap-4">
      <button
        class="flex flex-1 flex-row items-center justify-center gap-2 border border-[#FF0000] p-1.5 rounded-md text-sm"
        @Click="handleReject"
      >
        <i :class="`pi ${props.rejectIcon} text-[#FF0000]`"></i>
        <small>{{ props.rejectText }}</small>
      </button>
      <button
        class="flex flex-1 flex-row items-center justify-center gap-2 bg-[#009951] rounded-md text-white p-1.5 text-sm"
        @click="handleAccept"
      >
        <i :class="`pi ${props.acceptIcon}`"></i>
        <small>{{ props.acceptText }}</small>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  acceptText: {
    type: String,
  },
  acceptIcon: {
    type: String,
  },
  rejectText: {
    type: String,
  },
  rejectIcon: {
    type: String,
  },
  id_item: {
    type: String,
    required:true
    
  },
});

const emit = defineEmits<{
  idItem: [itemId: string];
  openModal: [isModalOpen: boolean];
  isAccepted: [isAccepeted: boolean];
}>();

const handleAccept = () => {
  emit("openModal", true);
  emit("isAccepted", true);
  emit("idItem", props.id_item);
};

const handleReject = () => {
  emit("openModal", true);
  emit("isAccepted", false);
  emit("idItem", props.id_item);
};
</script>

<style scoped></style>
