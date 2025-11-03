<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] pb-3 w-full" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto">
        <div ref="langBoxRef" class="relative w-full">
          <FwbInput
            v-model="language"
            type="text"
            :validation-status="languageError ? 'error' : undefined"
            label="Choose a language"
            placeholder="Ej: Spanish, English"
            @focus="openLangList"
            @input="openLangList"
            @keydown.esc.prevent="closeLangList"
          >
            <template #suffix>
              <span class="pi pi-language"></span>
            </template>
            <template #validationMessage>
              <span class="font-medium">{{ languageError }}</span>
            </template>
          </FwbInput>

          <ul
            v-if="showLangList && filteredLanguages.length"
            class="absolute top-full left-0 right-0 z-[60] w-full bg-white shadow-md border rounded-md mt-1 max-h-60 overflow-y-auto"
          >
            <li
              v-for="lang in filteredLanguages"
              :key="lang"
              class="px-3 py-2 cursor-pointer hover:bg-amber-100"
              @mousedown.prevent="selectLanguage(lang)"
            >
              {{ lang }}
            </li>
          </ul>
        </div>
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
  const set = new Set<string>();
  countries.forEach((c) => c.languages.forEach((l) => set.add(l)));
  return Array.from(set).sort();
});


const showLangList = ref(false);
const { 
  value: language, 
  errorMessage: languageError 
} = useField<string>("language");

const filteredLanguages = computed(() => {
  const q = language.value?.toLowerCase() ?? "";
  if (!q) return allLanguages.value.slice(0, MAX_INITIAL);
  return allLanguages.value.filter((l) => l.toLowerCase().includes(q));
});

function openLangList() {
  showLangList.value = !!language.value?.trim();
}
function closeLangList() {
  showLangList.value = false;
}
function selectLanguage(lang: string) {
  language.value = lang;
  closeLangList();
}

watch(language, (v) => {
  if (!v?.trim()) closeLangList();
});

const langBoxRef = ref<HTMLElement | null>(null);
function onGlobalPointer(e: PointerEvent) {
  const root = langBoxRef.value;
  if (!root) return;
  if (!root.contains(e.target as Node)) closeLangList();
}
onMounted(() => window.addEventListener("pointerdown", onGlobalPointer, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("pointerdown", onGlobalPointer));


const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));
</script>