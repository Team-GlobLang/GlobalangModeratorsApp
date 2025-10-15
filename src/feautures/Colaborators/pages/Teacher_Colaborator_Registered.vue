<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="jw-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
  >
    <div class="sticky top-0 z-10 bg-[#f6f6f6] pb-2 w-11/12">
      <Teacher_Colab_Registered_Filters
        @filterchange="handleFilterChange"
        @statusChange="handleStatus"
      />
    </div>
    <Teacher_Colab_Card_Container
      :language="languageFilter"
      :status="statusFilter"
    />
  </section>
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
