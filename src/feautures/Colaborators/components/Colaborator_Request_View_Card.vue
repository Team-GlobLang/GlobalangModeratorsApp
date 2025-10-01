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
  <div
    v-if="props.filesUrls && props.filesUrls.length > 0"
    class="flex flex-wrap gap-2"
  >
    <button
      v-for="(url, index) in props.filesUrls"
      :key="index"
      @click="() => openFile(url)"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
    ></button>
  </div>
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
  filesUrls: {
    type: Array as () => string[],
    default: () => [],
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

const openFile = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>

<style scoped></style>
