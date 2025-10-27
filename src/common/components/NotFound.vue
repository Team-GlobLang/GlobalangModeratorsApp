<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <img
      class="rounded-full"
      src="/NotFoundImage.png"
      alt="NotFoundImage"
    />
    <p class="text-xl">
      <small>{{ props.message }}</small>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String
  },
});
</script>

<style scoped></style>
