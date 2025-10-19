<template>
  <div>
    <router-link :to="{ name: 'Request_Quiz' }">Pending Quizzes</router-link>
    <router-link :to="{ name: 'Quizzes_Registered' }"
      >Registered Quizzes</router-link
    >
  </div>
</template>
<script setup lang="ts"></script>
