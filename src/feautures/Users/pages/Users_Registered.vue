<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <User_Registered_Filters
      @filterchangeCountry="handleFilterCountry"
      @filterchangeEmail="handleFilterEmail"
    />
    <User_Registered_Card_Container
      :country="CountryFilter"
      :Email="EmailFilter"
    />
  </section>
</template>

<script setup lang="ts">
import User_Registered_Filters from "../components/User_Registered_Filters.vue";
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
