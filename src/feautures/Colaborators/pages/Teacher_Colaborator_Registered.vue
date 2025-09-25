<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <Teacher_Colab_Registered_Filters />
    <Teacher_Colab_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Teacher_Colab_Registered_Filters from "../components/Teacher_Colab_Registered_Filters.vue";
import Teacher_Colab_Card_Container from "../components/Teacher_Colab_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Solicitudes",
  },
  {
    label: "Colaboradores",
  },
];
</script>

<style scoped></style>
