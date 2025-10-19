<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <List_Quiz_Registered_Filters
        @filterCountryChange="handleFilterCountry"
        @filterStatusChange="handleStatusFilter"
      />
    </div>
    <Quiz_Registered_Card_Container
      :country="FilterContry"
      :status="StatusFilter"
    />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import List_Quiz_Registered_Filters from "../components/List_Quiz_Registered_Filters.vue";
import Quiz_Registered_Card_Container from "../components/Quiz_Registered_Card_Container.vue";
import { ref } from "vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Quizzes",
    route: "Quizzes",
  },
  {
    label: "Registers",
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
