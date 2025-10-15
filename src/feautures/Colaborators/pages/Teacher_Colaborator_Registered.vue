<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div class="p-2">
    <section class="justify-center flex flex-col bg-white p-2 rounded-lg gap-4">
      <Teacher_Colab_Registered_Filters
        @filterchange="handleFilterChange"
        @statusChange="handleStatus"
      />
      <Teacher_Colab_Card_Container
        :language="languageFilter"
        :status="statusFilter"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import Teacher_Colab_Registered_Filters from "../components/Teacher_Colab_Registered_Filters.vue";
import Teacher_Colab_Card_Container from "../components/Teacher_Colab_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
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
    label: "Colaborators",
  },
];

const languageFilter = ref<string>("");

const handleFilterChange = (language: string) => {
  languageFilter.value = language;
};

const statusFilter = ref<string>("");

const handleStatus = (status: string) => {
  statusFilter.value = status;
};
</script>

<style scoped></style>
