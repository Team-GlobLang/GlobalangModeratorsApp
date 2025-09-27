<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-end">
      <fwb-button color="green">Register a moderator</fwb-button>
    </div>
    <FwbInput
      list="languages"
      v-model="language"
      type="text"
      :validation-status="languageError ? 'error' : undefined"
      @blur="languageBlur"
      label="Choose a language"
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
    <fwb-select v-model="selected" :options="email" label="email" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FwbInput } from "flowbite-vue";
import { FwbSelect } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";
import { useField } from "vee-validate";
import { countries } from "../../../Core/CountriesArray";
import { computed, watch } from "vue";

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

const emit = defineEmits<{
  filterchange: [language: string];
}>();

watch(
  language,
  (newLanguage) => {
    emit("filterchange", newLanguage || "");
  },
  { immediate: true }
);

const selected = ref("");

const email = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>
