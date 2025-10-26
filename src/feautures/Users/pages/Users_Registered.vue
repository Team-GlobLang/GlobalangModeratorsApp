<template>
  <BreadCrumb :items="breadCrumbItems" />
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <div class="flex justify-end w-11/12">
      <FwbButton @click="visible = true" color="green"
        >Register a Moderator</FwbButton
      >
    </div>

    <User_Registered_Card_Container />

    <RegisterModeradorMForm v-model:visible="visible" />
  </section>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import User_Registered_Card_Container from "../components/User_Registered_Card_Container.vue";
import { ref } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import RegisterModeradorMForm from "../../Auth/Components/Modals/RegisterModeradorMForm.vue";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Registers",
  },
  {
    label: "Users",
  },
];

const visible = ref<boolean>(false);
</script>

<style scoped></style>
