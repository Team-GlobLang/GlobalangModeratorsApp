<template>
  <div>
    <router-link :to="{ name: 'Users_Registered' }"
      >Registered Users</router-link
    >
    <router-link :to="{ name: 'User_Info' }">User Info</router-link>
  </div>
</template>
<script setup lang="ts"></script>
