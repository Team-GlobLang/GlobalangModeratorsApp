<template>
  <div class="w-full flex flex-col items-center gap-8">
    <Info_User_Card
      icon="pi-user"
      color="bg-[#C9F2FF]"
      role="System moderator"
      email="adrianaguilar@gmail.com"
      name="Adrian Aguilar Diaz"
    />

    <Info_User_Options_Card
      icon="pi-key"
      color="bg-[#CFFFC9]"
      text="Change password"
    />

    <Info_User_Options_Card
      icon="pi-file-check"
      color="bg-[#D5C9FF]"
      text="Quizzes history"
    />

    <Info_User_Options_Card
      icon="pi-heart"
      color="bg-[#FFC9D8]"
      text="My favorites"
    />

    <Info_User_Options_Card
      icon="pi-chart-line"
      color="bg-[#C9F2FF]"
      text="Statistics"
    />
  </div>
</template>

<script setup lang="ts">
import Info_User_Options_Card from "./Info_User_Options_Card.vue";
import Info_User_Card from "./Info_User_Card.vue";
</script>

<style scoped></style>
