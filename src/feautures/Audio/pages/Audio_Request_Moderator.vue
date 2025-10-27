<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] pb-3 w-full" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto">
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
      </div>
    </div>

    <section class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg">
      <Request_Audio_Card_Container :country="country" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Capacitor } from "@capacitor/core";
import { countries } from "@core/CountriesArray";
import { useField } from "vee-validate";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import Request_Audio_Card_Container from "../components/Request_Audio_Card_Container.vue";
import { FwbInput } from "flowbite-vue";

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
    label: "Requests",
  },
];
const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (isNative ? "top-[5dvh]" : "top-0"));

 const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
   if (!country.value) { 
    return countries.slice(0, MAX_INITIAL); 
  } 
  return countries.filter((c) => 
  c.name.toLowerCase().includes(country.value.toLowerCase()) 
); 
});
</script>

<style scoped></style>
