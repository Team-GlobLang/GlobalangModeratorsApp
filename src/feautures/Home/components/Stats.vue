<template>
  <span
    :class="`${props.color} rounded-lg flex flex-col gap-1 w-20 h-24 items-center justify-center text-center p-2`"
  >
    <h2 class="text-lg font-bold">{{ props.quantity }}</h2>
    <span class="text-xs">{{ props.title }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  color: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
