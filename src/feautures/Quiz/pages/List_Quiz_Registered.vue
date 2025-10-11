<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="justify-center flex flex-col bg-white p-2 rounded-lg gap-4">
    <List_Quiz_Registered_Filters
      @filterCountryChange="handleFilterCountry"
      @filterStatusChange="handleStatusFilter"
    />
    <Quiz_Registered_Card_Container
      :country="FilterContry"
      :status="StatusFilter"
    />
  </section>
</template>

<script setup lang="ts">
import List_Quiz_Registered_Filters from "../components/List_Quiz_Registered_Filters.vue";
import Quiz_Registered_Card_Container from "../components/Quiz_Registered_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import { ref } from "vue";

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
    label: "Quizzes",
  },
];

const FilterContry = ref("");
const handleFilterCountry = (country: string) => {
  FilterContry.value = country;
};

const StatusFilter = ref<boolean>(true);
const handleStatusFilter = (status: boolean) => {
  StatusFilter.value = status;
};
</script>

<style scoped></style>
