<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] w-full pb-3" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto flex flex-col gap-3">
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

        <FwbSelect
          v-model="selected"
          :options="status"
          label="Choose a status"
        />
      </div>
    </div>
    <section
      class="w-full flex justify-center"
    >
      <Teacher_Colab_Card_Container :language="language" :selected="selected" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Teacher_Colab_Card_Container from "../components/Teacher_Colab_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { countries } from "@core/CountriesArray";
import { Capacitor } from "@capacitor/core";
import { useField } from "vee-validate";
import { FwbInput, FwbSelect } from "flowbite-vue";

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
    label: "Registers",
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

const selected = ref("");

const status = [
  { value: "ACCEPTED", name: "Accepted" },
  { value: "REJECTED", name: "Rejected" },
  { value: "", name: "All" },
];

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

const {
  value: language,
  errorMessage: languageError,
  handleBlur: languageBlur,
} = useField<string>("language");
</script>

<style scoped></style>
