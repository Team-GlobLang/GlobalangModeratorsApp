<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section
    class="flex flex-col gap-6 justify-center items-center bg-[#F6F6F6] p-4 rounded-lg text-sm"
  >
    <Colab_Request_View_Card_Container :id="props.id" />
  </section>
</template>

<script setup lang="ts">
import Colab_Request_View_Card_Container from "../components/Colab_Request_View_Card_Container.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";

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
    label: "Solicitudes",
  },
  {
    label: "Colaboradores",
    route: "Request_colaborator",
  },
  {
    label: "Info",
  },
];
</script>

<style scoped></style>
