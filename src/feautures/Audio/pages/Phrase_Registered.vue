<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] pb-3 w-full" :class="stickyTopPadding">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>
      <div class="w-11/12 mx-auto flex flex-col gap-3">
        <div ref="countryBoxRef" class ="relative w-full">
         <FwbInput
          v-model="country"
          type="text"
          :validation-status="countryError ? 'error' : undefined"
          label="Country"
          placeholder="Ej: Costa Rica"
           @focus="showList = true"
           @input="showList = true"
           @keydown.esc="showList = false"
        >
          <template #suffix>
            <span class="pi pi-home"></span>
          </template>
          <template #validationMessage>
            <span class="font-medium">{{ countryError }}</span>
          </template>
        </FwbInput>
        <ul
            v-if="showList && filteredCountries.length"
            class="absolute top-full left-0 right-0 z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
          >
            <li
              v-for="c in filteredCountries"
              :key="c.code"
              class="px-3 py-2 cursor-pointer hover:bg-amber-100"
              @mousedown.prevent="selectCountry(c.name)"
            >
              {{ c.name }}
            </li>
          </ul>
       </div>
        <FwbSelect
          v-model="selected"
          :options="status"
          label="Choose a status"
          placeholder=""
        />
      </div>
    </div>
  <section
     class="w-full flex justify-center"
  >
    <Request_Phrase_Card_Container
     :country="country" 
     :selected="selected"
     />
  </section>
  </div>
</template>

<script setup lang="ts">
import { Capacitor } from "@capacitor/core";
import Request_Phrase_Card_Container from "../components/Request_Phrase_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useField } from "vee-validate";
import { countries } from "@core/CountriesArray";
import { FwbInput, FwbSelect } from "flowbite-vue";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Phrases",
    route: "Shorts",
  },
  {
    label: "Registers",
  },
];

const isNative = Capacitor.isNativePlatform();
const stickyTopPadding = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const showList = ref(false);

const filteredCountries = computed(() => {
  const search = country.value?.toLowerCase() ?? "";
  const list = search
    ? countries.filter((c) => c.name.toLowerCase().includes(search))
    : countries;

  return list;
});

function selectCountry(name:string) {
  country.value = name;
  showList.value = false;
}
const selected = ref("1");
const status = [
  { value: "1", name: "Approved" },
  { value: "0", name: "Rejected" },
];

watch(country, (val) => {
  if (!val?.trim()) showList.value = false;
});

const countryBoxRef = ref<HTMLElement | null>(null);
function handlePointerDown(e: PointerEvent) {
  const root = countryBoxRef.value;
  if (!root) return;
  if (!root.contains(e.target as Node)) showList.value = false;
}
onMounted(() => {
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", handlePointerDown);
});
</script>
