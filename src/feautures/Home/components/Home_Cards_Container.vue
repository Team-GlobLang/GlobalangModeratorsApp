<template>
  <div class="w-full flex flex-col items-center gap-10">
    <router-link :to="{ name: 'User_Info' }">
      <Home_User_Card
        name="Adrian Aguilar"
        role="System Moderator"
        notifyNumber="2"
      />
    </router-link>
    <router-link :to="{ name: 'Request_Quiz' }">
      <Home_Options_Request
        title="Quiz Request"
        description="Review and approve quizzes submitted by teachers to make them public."
        requestNumber="2"
        icon="pi-list"
        bgColor="bg-[#CCFFE7]"
      />
    </router-link>

    <router-link :to="{ name: 'Request_audio' }">
      <Home_Options_Request
        title="Phrase Request"
        description="Manage request for new grades and expressions."
        requestNumber="2"
        icon="pi-microphone"
        bgColor="bg-[#FFD5FE]"
      />
    </router-link>

    <router-link :to="{ name: 'Request_colaborator' }">
      <Home_Options_Request
        title="Colaborator Request"
        description="Approve new teachers and colaborators."
        requestNumber="2"
        icon="pi-users"
        bgColor="bg-[#FFDADA]"
      />
    </router-link>
    <Home_Stadistics_Card />
  </div>
</template>

<script setup lang="ts">
import Home_Options_Request from "./Home_Options_Request.vue";
import Home_Stadistics_Card from "./Home_Stadistics_Card.vue";
import Home_User_Card from "./Home_User_Card.vue";
</script>

<style scoped></style>
