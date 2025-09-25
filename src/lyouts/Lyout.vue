<template>
  <header class="bg-[#00A1FF] p-6 top-0 fixed w-full"></header>
  <main class="py-20 px-4">
    <router-view></router-view>
  </main>
  <footer class="bg-[#00A1FF] p-4 bottom-0 fixed w-full flex justify-between">
    <router-link :to="{ name: 'Users_Registered' }"
      ><i class="pi pi-user" style="font-size: 3rem"> </i
    ></router-link>

    <router-link :to="{ name: 'teacher-colaborator_Registered' }">
      <i class="pi pi-address-book" style="font-size: 3rem"></i
    ></router-link>

    <router-link :to="{ name: 'Home_Moderator' }">
      <i class="pi pi-home" style="font-size: 3rem"></i>
    </router-link>

    <router-link :to="{ name: 'Phrases_Registered' }">
      <i class="pi pi-microphone" style="font-size: 3rem"></i>
    </router-link>

    <router-link :to="{ name: 'quizzes_Registered' }">
      <i class="pi pi-file-check" style="font-size: 3rem"></i>
    </router-link>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
