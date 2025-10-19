<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full flex flex-col items-center">
    <Info_User_Cards_Container />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import Info_User_Cards_Container from "../components/Info_User_Cards_Container.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "My Info",
  },
];
</script>

<style scoped></style>
