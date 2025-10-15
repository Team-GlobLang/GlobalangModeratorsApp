<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <Request_Quiz_Filters @filterCountryChange="handleFilterCountry" />
    </div>
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
