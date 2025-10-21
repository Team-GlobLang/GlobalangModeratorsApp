<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <Request_Colab_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Request_Colab_Card_Container from "../components/Request_Colab_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Colaborators",
    route: "Collaborators",
  },
  {
    label: "Requests",
  },
];
</script>

<style scoped></style>
