<template>
  <fwb-button-group>
    <div class="w-full flex justify-between gap-4">
      <fwb-button
        class="w-full flex flex-row items-center justify-center gap-2 p border border-[#FF0000] rounded-md p-2 text-lg"
        @Click="handleReject"
      >
        <i :class="`pi ${props.rejectIcon} text-[#FF0000]`"></i>
        <small>{{ props.rejectText }}</small>
      </fwb-button>
      <fwb-button
        class="w-full flex flex-row items-center justify-center gap-2 bg-[#009951] rounded-md text-white p-2 text-lg"
        @click="handleAccept"
      >
        <i :class="`pi ${props.acceptIcon}`"></i>
        <small>{{ props.acceptText }}</small>
      </fwb-button>
    </div>
  </fwb-button-group>
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
    required: true,
  },
});

const emit = defineEmits<{
  accept: [itemId: string];
  reject: [itemId: string];
}>();

const handleAccept = () => {
  emit("accept", props.id_item);
};

const handleReject = () => {
  emit("reject", props.id_item);
};
</script>

<style scoped></style>
