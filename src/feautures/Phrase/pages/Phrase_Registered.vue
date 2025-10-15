<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <Request_Phrase_Filters
        @filterCountryChange="hadleCountryFilter"
        @filterStatusChange="handleStatusFilter"
      />
    </div>
    <Request_Phrase_Card_Container
      :Country="CountryFilter"
      :Status="StatusFilter"
    />
  </section>
</template>

<script setup lang="ts">
import Request_Phrase_Filters from "../components/Request_Phrase_Filters.vue";
import Request_Phrase_Card_Container from "../components/Request_Phrase_Card_Container.vue";
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
