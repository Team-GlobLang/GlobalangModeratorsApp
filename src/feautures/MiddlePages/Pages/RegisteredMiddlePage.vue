<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="bg-white p-4 rounded-lg">
    <Registered_Options_Container />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import Registered_Options_Container from "../components/Registered_Options_Container.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Registered",
  },
];
</script>

<style scoped></style>
