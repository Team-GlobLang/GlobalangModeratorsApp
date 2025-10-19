<template>
  <div>
    <router-link :to="{ name: 'Request_Collaborator' }"
      >Pending Collaborators</router-link
    >
    <router-link :to="{ name: 'Teacher_Collaborator_Registered' }"
      >Registered Teachers</router-link
    >
  </div>
</template>
<script setup lang="ts"></script>
