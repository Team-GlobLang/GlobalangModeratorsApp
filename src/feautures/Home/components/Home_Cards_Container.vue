<template>
  <div class="w-full flex flex-col items-center gap-10">
    <router-link :to="{ name: 'User_Info' }">
      <Home_User_Card
        name="Adrian Aguilar"
        role="Moderador de sistema"
        notifyNumber="2"
      />
    </router-link>
    <router-link :to="{ name: 'Request_Quiz' }">
      <Home_Options_Request
        title="solicitudes de quiz"
        description="Revisa y
    aprueba quizzes enviados por profesores para hacerlos de vista publica."
        requestNumber="2"
        icon="pi-list"
        bgColor="bg-[#CCFFE7]"
      />
    </router-link>

    <router-link :to="{ name: 'Request_audio' }">
      <Home_Options_Request
        title="solicitudes de frases"
        description="Gestiona solicitudes de nuevas grases y expresiones."
        requestNumber="2"
        icon="pi-microphone"
        bgColor="bg-[#FFD5FE]"
      />
    </router-link>

    <router-link :to="{ name: 'Request_colaborator' }">
      <Home_Options_Request
        title="solicitudes de colaboradores"
        description="Aprobar nuevos profesores y colaboradores."
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
