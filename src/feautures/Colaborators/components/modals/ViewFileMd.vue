<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-xl overflow-hidden w-[95%] max-w-2xl shadow-xl relative"
    >
      <button
        @click="closeModal"
        class="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md"
      >
        ✕
      </button>

      <div
        v-if="file"
        class="w-full h-[75vh] flex items-center justify-center p-4"
      >
        <iframe
          v-if="fileType === 'pdf'"
          :src="file"
          class="w-full h-full rounded-md"
        ></iframe>

        <img
          v-else-if="fileType === 'image'"
          :src="file"
          class="w-full h-full object-contain rounded-md"
        />

        <p v-else class="text-gray-600">Preview not available</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  file: string | null;
  modelValue: boolean;
}

const props = defineProps<Props>();

const fileType = computed(() => {
  if (!props.file) return null;
  const ext = props.file.split(".").pop()?.toLowerCase();
  if (!ext) return null;

  if (["mp3", "wav", "ogg"].includes(ext)) return "audio";
  if (["pdf"].includes(ext)) return "pdf";
  if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext)) return "image";
  return "other";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>
