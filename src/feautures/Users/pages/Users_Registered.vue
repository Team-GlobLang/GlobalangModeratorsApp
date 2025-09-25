<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <User_Registered_Filters />
    <User_Registered_Card_Container />
  </section>
</template>

<script setup lang="ts">
import User_Registered_Filters from "../components/User_Registered_Filters.vue";
import User_Registered_Card_Container from "../components/User_Registered_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Registros",
  },
  {
    label: "Usuarios",
  },
];
</script>

<style scoped></style>
