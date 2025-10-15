<template>
  <fwb-button-group class="w-full">
    <div class="flex w-full justify-between gap-10">
      <fwb-button
        :class="`w-full flex gap-4 justify-center border ${colorReject} p-2 text-${textColorReject} rounded-md p-0.5`"
        @click="handleReject"
      >
        <span>{{ props.rejectText }}</span>
      </fwb-button>
      <fwb-button
        :class="`w-full flex gap-4 justify-center p-2 ${props.colorAccept} rounded-md text-${textColorApprove} p-0.5`"
        @click="handleAccept"
      >
        <span>{{ props.acceptText }}</span>
      </fwb-button>
    </div>
  </fwb-button-group>
</template>

<script setup lang="ts">
const props = defineProps({
  acceptText: {
    type: String,
  },
  colorAccept: {
    type: String,
  },
  rejectText: {
    type: String,
  },
  colorReject: {
    type: String,
  },
  id_item: {
    type: String,
    required: true,
  },
  textColorApprove: {
    type: String,
  },
  textColorReject: {
    type: String,
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
