<template>
  <section
    class="justify-center items-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
  >
    <review_quizz_card
      question="En base al audio en que situación piensa que se le encuentra la
          persona"
      :number-question="3"
    />
  </section>
</template>

<script setup lang="ts">
import review_quizz_card from "../components/review_quizz_card.vue";
</script>

<style scoped></style>
