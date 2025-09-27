<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <Request_Phrase_Filters />
    <Request_Phrase_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Request_Phrase_Filters from "../components/Request_Phrase_Filters.vue";
import Request_Phrase_Card_Container from "../components/Request_Phrase_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Registers",
  },
  {
    label: "Phrases",
  },
];
</script>

<style scoped></style>
