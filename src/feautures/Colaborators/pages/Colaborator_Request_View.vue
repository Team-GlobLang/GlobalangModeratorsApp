<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="flex flex-col gap-6 justify-center items-center bg-[#F6F6F6] p-4 rounded-lg text-sm"
  >
    <Colab_Request_View_Card_Container :id="props.id" />
  </section>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import Colab_Request_View_Card_Container from "../components/Colab_Request_View_Card_Container.vue";

const props = defineProps({
  id: {
    type: String,
  },
});

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
    route: "Request_colaborator",
  },
];
</script>

<style scoped></style>
