<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <Request_Quiz_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Request_Quiz_Card_Container from "../components/Request_Quiz_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

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
    label: "Requests",
  },
];
</script>

<style lang="scss" scoped></style>
