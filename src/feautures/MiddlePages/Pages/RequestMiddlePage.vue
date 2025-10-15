<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="bg-white p-4 rounded-lg">
    <Request_Options_Container />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import Request_Options_Container from "../components/Request_Options_Container.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Request",
  },
];
</script>

<style scoped></style>
