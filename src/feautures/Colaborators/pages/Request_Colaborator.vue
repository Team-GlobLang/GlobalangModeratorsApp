<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <Request_colab_Filters @filterchange="handleFilterChange" />
    </div>
    <Request_Colab_Card_Container :language="languageFilter" />
  </section>
</template>

<script setup lang="ts">
import Request_colab_Filters from "../components/Request_colab_Filters.vue";
import Request_Colab_Card_Container from "../components/Request_Colab_Card_Container.vue";
import { ref } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Colaborators",
     route: "Collaborators",
  },
  {
    label: "Requests",
  },
];

const languageFilter = ref<string>("");

const handleFilterChange = (language: string) => {
  languageFilter.value = language;
};
</script>

<style scoped></style>
