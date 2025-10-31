<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] w-full pb-3" :class="stickyTopPading">
      <div class="w-full">
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
      </div>
    </div>
    <section class="w-full flex justify-center">
      <Request_Quiz_Card_Container :country="country" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Request_Quiz_Card_Container from "../components/Request_Quiz_Card_Container.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { countries } from "@core/CountriesArray";
import { useField } from "vee-validate";
import { Capacitor } from "@capacitor/core";
import { FwbInput } from "flowbite-vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Quizzes",
    route: "Quizzes",
  },
  {
    label: "Requests",
  },
];

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
const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (!isNative ? "top-[5dvh]" : "top-0"));

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


