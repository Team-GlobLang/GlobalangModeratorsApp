<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full flex flex-col justify-center gap-4 bg-white p-4 rounded-lg"
  >
    <Request_Quiz_Filters @filterCountryChange="handleFilterCountry" />
    <Request_Quiz_Card_Container :country="FilterContry" />
  </section>
</template>

<script setup lang="ts">
import Request_Quiz_Filters from "../components/Request_Quiz_Filters.vue";
import Request_Quiz_Card_Container from "../components/Request_Quiz_Card_Container.vue";
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
    label: "Quizzes",
  },
];

const FilterContry = ref("");
const handleFilterCountry = (country: string) => {
  FilterContry.value = country;
};
</script>

<style lang="scss" scoped></style>
