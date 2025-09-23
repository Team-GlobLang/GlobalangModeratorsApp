<template>
  <Lyout>
    <section
      class="justify-center items-center flex flex-col bg-[#F6F6F6 p-2 rounded-lg gap-4"
    >
      <h3>¡Revision completada!</h3>
      <span class="text-gray-500">"Español Basico"</span>
      <Quiz_Result_Card />

      <Btn_Group_Without_Icon
        accept-text="Aprobar"
        reject-text="Rechazar"
        id_item=""
        color-accept="bg-[#F00FEE]"
        color-reject="bg-[#F00FEE]"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Quiz_Result_Card from "../components/Quiz_Result_Card.vue";
import Btn_Group_Without_Icon from "../components/Btn_Group_Without_Icon.vue";
</script>

<style scoped></style>
