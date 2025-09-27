<template>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Full name:</span>
    <span class="text-left">{{ props.name }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Email:</span>
    <span class="text-left">{{ props.email }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Languages spoken:</span>
    <span class="text-left">{{ props.Languages }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Details:</span>
    <p class="text-left">
      {{ props.message }}
    </p>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span>Academic title:</span>
    <span>{{ props.title }}</span>
  </div>
  <p>FILE PLACE</p>
  <Btn_Group_Without_Icon
    accept-text="Approve"
    reject-text="Reject"
    color-accept="bg-[#00A1FF]"
    color-reject="bg-[#900B09]"
    :id_item="props.id_item || ''"
    @accept="onAccept"
    @reject="onReject"
  />
</template>

<script setup lang="ts">
import Btn_Group_Without_Icon from "../../Home/components/Btn_Group_Without_Icon.vue";
const props = defineProps({
  id_item: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  Languages: {
    type: String,
  },
  message: {
    type: String,
  },
  title: {
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
