<template>
  <fwb-card class="w-full">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h2 class="text-lg font-bold">{{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small>Academic title: {{ props.title }}</small>
        <small>Language: {{ props.language }}</small>
        <small>Category: {{ props.category }}</small>
      </span>
      <btn_-group
        accept-icon="pi-cloud-upload"
        accept-text="Review request"
        reject-icon="pi-trash"
        reject-text="Reject"
        accept-path="/request/colaborator/view/moderator"
        :id_item="props.id_item || ''"
        @accept="onAccept"
        @reject="onReject"
      />
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Group from "../../Home/components/Btn_Group.vue";
import { FwbCard } from "flowbite-vue"; //fbw_CARD tiene resrecciones con el w-full
const props = defineProps({
  id_item: {
    type: String,
  },
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  language: {
    type: String,
  },
});

const emit = defineEmits<{
  accept: [itemId: string];
  reject: [itemId: string];
}>();

const onAccept = (itemId: string) => {
  emit("accept", itemId);
};

const onReject = (itemId: string) => {
  emit("reject", itemId);
};
</script>

<style scoped></style>
