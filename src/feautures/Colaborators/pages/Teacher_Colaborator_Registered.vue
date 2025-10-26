<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="jw-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <Teacher_Colab_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Teacher_Colab_Card_Container from "../components/Teacher_Colab_Card_Container.vue";
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
    label: "Registers",
  },
];
</script>

<style scoped></style>
