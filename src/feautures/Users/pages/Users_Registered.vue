<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 justify-center rounded-lg">
    <div class="flex justify-end px-4">
      <fwb-button color="green">Register a moderator</fwb-button>
    </div>
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2">
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
    label: "Users",
  },
];

const CountryFilter = ref<string>("");

const handleFilterCountry = (country: string) => {
  CountryFilter.value = country;
  console.log(country);
};

const EmailFilter = ref<string>("");

const handleFilterEmail = (email: string) => {
  EmailFilter.value = email;
  console.log(email);
};
</script>

<style scoped></style>
