<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <List_Quiz_Registered_Filters />
    <Quiz_Registered_Card_Container />
  </section>
</template>

<script setup lang="ts">
import List_Quiz_Registered_Filters from "../components/List_Quiz_Registered_Filters.vue";
import Quiz_Registered_Card_Container from "../components/Quiz_Registered_Card_Container.vue";
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
    label: "Quiz",
  },
];
</script>

<style scoped></style>
