<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-4 flex flex-col gap-4 justify-center bg-[#F6F6F6] rounded-lg"
  >
    <Request_Audio_Filters />
    <Request_Audio_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Request_Audio_Filters from "../components/Request_Audio_Filters.vue";
import Request_Audio_Card_Container from "../components/Request_Audio_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Requests",
  },
  {
    label: "Phrases",
  },
];
</script>

<style scoped></style>
