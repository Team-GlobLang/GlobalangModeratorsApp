<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <Request_Audio_Filters @filterCountryChange="handleFilterCountry" />
    </div>
    <Request_Audio_Card_Container :Country="FilterContry" />
  </section>
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
    label: "Phrases",
    route: "Shorts",
  },
  {
    label: "Requests",
  },
];

const FilterContry = ref("");
const handleFilterCountry = (country: string) => {
  FilterContry.value = country;
};
</script>

<style scoped></style>
