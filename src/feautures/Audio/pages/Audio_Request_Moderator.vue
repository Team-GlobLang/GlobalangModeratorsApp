<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="px-2">
    <section
      class="w-full p-2 flex flex-col gap-4 justify-center bg-white rounded-lg"
    >
      <Request_Audio_Filters @filterCountryChange="handleFilterCountry" />
      <Request_Audio_Card_Container :Country="FilterContry" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Request_Audio_Filters from "../components/Request_Audio_Filters.vue";
import Request_Audio_Card_Container from "../components/Request_Audio_Card_Container.vue";
import { ref } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

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

const FilterContry = ref("");
const handleFilterCountry = (country: string) => {
  FilterContry.value = country;
};
</script>

<style scoped></style>
