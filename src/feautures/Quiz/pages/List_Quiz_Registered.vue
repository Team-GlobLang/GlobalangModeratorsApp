<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <Quiz_Registered_Card_Container />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";

import Quiz_Registered_Card_Container from "../components/Quiz_Registered_Card_Container.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Quizzes",
    route: "Quizzes",
  },
  {
    label: "Registers",
  },
];
</script>

<style scoped></style>
