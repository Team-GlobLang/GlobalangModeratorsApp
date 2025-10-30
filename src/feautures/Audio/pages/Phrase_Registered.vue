<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] pb-3 w-full" :class="stickyTopPadding">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>
      <div class="w-11/12 mx-auto flex flex-col gap-3">
        <FwbInput
          list="countries"
          v-model="country"
          type="text"
          :validation-status="countryError ? 'error' : undefined"
          label="Country"
          placeholder="Ej: Costa Rica"
        >
          <template #suffix>
            <span class="pi pi-home"></span>
          </template>
          <template #validationMessage>
            <span class="font-medium">{{ countryError }}</span>
          </template>
        </FwbInput>

        <datalist id="countries">
          <option
            v-for="countryItem in filteredCountries"
            :key="countryItem.code"
            :value="countryItem.name"
          >
            {{ countryItem.name }}
          </option>
        </datalist>

        <FwbSelect
          v-model="selected"
          :options="status"
          label="Choose a status"
          placeholder=""
        />
      </div>
    </div>
  <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
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
import { computed, ref } from "vue";
import { useField } from "vee-validate";
import { countries } from "@core/CountriesArray";
import { FwbInput, FwbSelect } from "flowbite-vue";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
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
const stickyTopPadding = computed(() => (!isNative ? "top-[5dvh]" : "top-0"));

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const MAX_INITIAL = 5;
const filteredCountries = computed(() => {
  if (!country.value) return countries.slice(0, MAX_INITIAL);
  return countries.filter((c) =>
    c.name.toLowerCase().includes(country.value.toLowerCase())
  );
});

const selected = ref("1");
const status = [
  { value: "1", name: "Approved" },
  { value: "0", name: "Rejected" },
];
</script>

<style scoped>
input[list="countries"] {
  background-color: #f1f4fb !important;
  position: relative;
  z-index: 1;
}

input[list="countries"]:focus::after {
  content: "";
  position: fixed;
  inset: 0; 
  background-color: #f1f4fb;
  z-index: -1;
}
</style>
