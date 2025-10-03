<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-4 flex flex-col gap-4 justify-center bg-[#F6F6F6] rounded-lg"
  >
    <Request_Audio_Filters @filterCountryChange="handleFilterCountry" />
    <Request_Audio_Card_Container :Country="FilterContry" />
  </section>
</template>

<script setup lang="ts">
import Request_Audio_Filters from "../components/Request_Audio_Filters.vue";
import Request_Audio_Card_Container from "../components/Request_Audio_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import { ref } from "vue";

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
