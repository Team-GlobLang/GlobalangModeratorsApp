<template>
  <Lyout>
    <BreadCrumb :items="breadCrumbItems" />
    <section class="justify-center bg-[#F6F6F6] p-2 rounded-lg">
      <FwbInput
        list="languages"
        v-model="language"
        type="text"
        :validation-status="languageError ? 'error' : undefined"
        @blur="languageBlur"
        label="Language"
        placeholder="Ej: Spanish, English"
      >
        <template #suffix>
          <span class="pi pi-language"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ languageError }} </span>
        </template>
      </FwbInput>

      <FwbInput
        list="languages"
        v-model="language"
        type="text"
        :validation-status="languageError ? 'error' : undefined"
        @blur="languageBlur"
        label="Estado"
        placeholder="Ej: Spanish, English"
      >
        <template #suffix>
          <span class="pi pi-language"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ languageError }} </span>
        </template>
      </FwbInput>

      <datalist id="languages">
        <option v-for="lang in filteredLanguages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </datalist>

      <Quiz_List_Card
        user="Keirin Obando Duarte"
        title="Ingles avanzado"
        language="Newyorkino"
        :questionsNUmber="10"
        approbe-by="Dian Adrian"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import { computed } from "vue";
import { FwbInput } from "flowbite-vue";
import Quiz_List_Card from "../components/Quiz_List_Card.vue";
import BreadCrumb from "../../../lyouts/BreadCrumb.vue";
import { useField } from "vee-validate";
import { countries } from "../../../Core/CountriesArray";

const breadCrumbItems = [
  {
    label: "Home",
    route: "/home/moderator",
    isHome: true,
  },
  {
    label: "Solicitudes colaboradores",
  },
];

const MAX_INITIAL = 10;

const allLanguages = computed(() => {
  const languagesSet = new Set<string>();
  countries.forEach((country) => {
    country.languages.forEach((lang) => {
      languagesSet.add(lang);
    });
  });
  return Array.from(languagesSet).sort();
});

const filteredLanguages = computed(() => {
  if (!language.value) {
    return allLanguages.value.slice(0, MAX_INITIAL);
  }
  return allLanguages.value.filter((lang) =>
    lang.toLowerCase().includes(language.value.toLowerCase())
  );
});

const {
  value: language,
  errorMessage: languageError,
  handleBlur: languageBlur,
} = useField<string>("language");
</script>

<style scoped></style>
