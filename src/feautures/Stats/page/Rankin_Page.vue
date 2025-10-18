<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="flex flex-col p-4 gap-4 rounded-lg w-ful items-center">
    <div class="w-11/12">
      <Rankin_Filters @filterCountryChange="handleFilterCountry" />
    </div>
    <Ranking_User_Card_Container :country="FilterContry" />
    <Rankin_Card_Container :country="FilterContry" />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Rankin_Card_Container from "../components/Rankin_Card_Container.vue";
import Rankin_Filters from "../components/Rankin_Filters.vue";
import Ranking_User_Card_Container from "../components/Ranking_User_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Ranking",
  },
];

const FilterContry = ref("");
const handleFilterCountry = (country: string) => {
  FilterContry.value = country;
};
</script>

<style scoped></style>
