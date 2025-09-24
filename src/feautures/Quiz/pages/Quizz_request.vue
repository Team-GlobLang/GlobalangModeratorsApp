<template>
  <section
    class="w-full flex flex-col justify-center gap-4 bg-[#F6F6F6] p-2 rounded-lg"
  >
    <Request_Quiz_Filters />
    <Request_Quiz_Card_Container />
  </section>
</template>

<script setup lang="ts">
import Request_Quiz_Filters from "../components/Request_Quiz_Filters.vue";
import Request_Quiz_Card_Container from "../components/Request_Quiz_Card_Container.vue";
</script>

<style lang="scss" scoped></style>
