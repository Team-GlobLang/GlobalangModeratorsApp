<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="p-2">
    <section
      class="w-full flex flex-col justify-center bg-white p-2 rounded-lg"
    >
      <Request_colab_Filters @filterchange="handleFilterChange" />
      <Request_Colab_Card_Container :language="languageFilter" />
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import Request_colab_Filters from "../components/Request_colab_Filters.vue";
import Request_Colab_Card_Container from "../components/Request_Colab_Card_Container.vue";
import { ref } from "vue";

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
    label: "Colaborators",
  },
];

const languageFilter = ref<string>("");

const handleFilterChange = (language: string) => {
  languageFilter.value = language;
};
</script>

<style scoped></style>
