<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] pb-3 w-full" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto">
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
            <span class="font-medium">{{ languageError }}</span>
          </template>
        </FwbInput>

        <datalist id="languages">
          <option v-for="lang in filteredLanguages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </datalist>
      </div>
    </div>
  <section  class="w-full flex justify-center">
    <Request_Colab_Card_Container :language="language"/>
  </section>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import Request_Colab_Card_Container from "../components/Request_Colab_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { computed } from "vue";
import { countries } from "@core/CountriesArray";
import { Capacitor } from "@capacitor/core";
import { FwbInput } from "flowbite-vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Colaborators",
    route: "Collaborators",
  },
  {
    label: "Requests",
  },
];
/// se cambiaron muchas cosas para que funcionara correctamente el filtro
const MAX_INITIAL = 5;

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

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (!isNative ? "top-[5dvh]" : "top-0"));
</script>