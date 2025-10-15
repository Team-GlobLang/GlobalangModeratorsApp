<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="text-2xl font-bold">Request options</h3>
    <Options_card
      v-for="option in options"
      :title="option.title"
      :icon="option.icon"
      :description="option.description"
      :routeName="option.route"
    />
  </div>
</template>

<script setup lang="ts">
import Options_card from "./Options_card.vue";

const options = [
  {
    title: "shorts",
    icon: "pi-headphones",
    description: "Review all shorts pending request",
    route: "Request_audio",
  },
  {
    title: "Collabs",
    icon: "pi-users",
    description: "Review all collabs pending request",
    route: "Request_colaborator",
  },
  {
    title: "Quizzes",
    icon: "pi-file",
    description: "Review all quizzes pending request",
    route: "Request_Quiz",
  },
];
</script>

<style scoped></style>
