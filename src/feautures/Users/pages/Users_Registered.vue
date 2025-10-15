<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <div class="flex justify-end w-11/12">
      <fwb-button color="green">Register a moderator</fwb-button>
    </div>
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <User_Registered_Filters
        @filterchangeCountry="handleFilterCountry"
        @filterchangeEmail="handleFilterEmail"
      />
    </div>
    <User_Registered_Card_Container
      :country="CountryFilter"
      :Email="EmailFilter"
    />
  </section>
</template>

<script setup lang="ts">
import User_Registered_Filters from "../components/User_Registered_Filters.vue";
import { FwbButton } from "flowbite-vue";
import User_Registered_Card_Container from "../components/User_Registered_Card_Container.vue";
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
    label: "Users",
  },
];

const CountryFilter = ref<string | undefined>(undefined);
const EmailFilter = ref<string | undefined>(undefined);

const handleFilterCountry = (country: string | undefined) => {
  CountryFilter.value = country;
};

const handleFilterEmail = (email: string | undefined) => {
  EmailFilter.value = email;
};
</script>

<style scoped></style>
