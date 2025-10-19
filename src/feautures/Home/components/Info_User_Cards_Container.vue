<template>
  <div class="w-11/12 flex flex-col gap-6 p-4">
    <Info_User_Card />

    <Info_user_Options_Modal_Card
      v-for="option in optionsModals"
      :icon="option.icon"
      :color="option.iconBg"
      :text="option.title"
    />
  </div>
</template>

<script setup lang="ts">
import Info_User_Card from "./Info_User_Card.vue";
import Info_user_Options_Modal_Card from "./Info_user_Options_Modal_Card.vue";


const optionsModals = [
  {
    title: "Change password",
    icon: "pi-key",
    iconBg: "bg-[#CFFFC9]",
  },
  {
    title: "Log out",
    icon: "pi-sign-out",
    iconBg: "bg-[#ff4949]",
  },
];
</script>

<style scoped></style>
