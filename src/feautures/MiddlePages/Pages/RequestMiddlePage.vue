<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="min-h-[80dvh] flex items-center">
    <div class="container mx-auto px-4">
      <section class="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow">
        <Request_Options_Container />
      </section>
    </div>
  </div>
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
