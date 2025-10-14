<template>
  <div class="w-full flex flex-col gap-6 p-4">
    <Info_User_Card />

    <Info_User_Options_Card
      v-for="option in options"
      :icon="option.icon"
      :color="option.iconBg"
      :text="option.title"
    />
  </div>
</template>

<script setup lang="ts">
import Info_User_Options_Card from "./Info_User_Options_Card.vue";
import Info_User_Card from "./Info_User_Card.vue";

const options = [
  {
    title: "Change password",
    icon: "pi-key",
    iconBg: "bg-[#CFFFC9]",
  },
  {
    title: "My favorites",
    icon: "pi-heart",
    iconBg: "bg-[#FFC9D8]",
  },
  {
    title: "Statistics",
    icon: "pi-chart-line",
    iconBg: "bg-[#C9F2FF]",
  },
  {
    title: "Log out",
    icon: "pi-sign-out",
    iconBg: "bg-[#ff4949]",
  },
];
</script>

<style scoped></style>
