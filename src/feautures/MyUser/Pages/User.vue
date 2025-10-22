<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <div class=" w-full pt-2 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <CardUserInfo />

    <CardEditProfile/>

    <LogOutBtn/> 
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import CardUserInfo from "../Components/CardUserInfo.vue";
import LogOutBtn from "../Components/LogOutBtn.vue";
import CardEditProfile from "../Components/CardEditProfile.vue";


const breadcrumbItems = [
  { label: "Home", route: "Home", isHome: true },
  { label: "My profile" },
];

</script>
