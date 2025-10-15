<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="justify-center flex flex-col bg-white p-2 rounded-lg gap-4">
    <Request_Phrase_Filters
      @filterCountryChange="hadleCountryFilter"
      @filterStatusChange="handleStatusFilter"
    />
    <Request_Phrase_Card_Container
      :Country="CountryFilter"
      :Status="StatusFilter"
    />
  </section>
</template>

<script setup lang="ts">
import Request_Phrase_Filters from "../components/Request_Phrase_Filters.vue";
import Request_Phrase_Card_Container from "../components/Request_Phrase_Card_Container.vue";
import { ref } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

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

const CountryFilter = ref<string>("");
const hadleCountryFilter = (country: string) => {
  CountryFilter.value = country;
};

const StatusFilter = ref<boolean>(true);
const handleStatusFilter = (status: boolean) => {
  StatusFilter.value = status;
};
</script>

<style scoped></style>
