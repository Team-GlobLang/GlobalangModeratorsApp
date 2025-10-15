<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="text-2xl font-bold">Registers options</h3>
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
    description: "Manage the records of shorts",
    route: "Phrases_Registered",
  },
  {
    title: "Collabs",
    icon: "pi-users",
    description: "Manage the records of collabs",
    route: "teacher-colaborator_Registered",
  },

  {
    title: "Quizzes",
    icon: "pi-file",
    description: "Manage the records of quizzes",
    route: "quizzes_Registered",
  },
  {
    title: "Users",
    icon: "pi-user",
    description: "Manage the records of users",
    route: "Users_Registered",
  },
];
</script>

<style scoped></style>
