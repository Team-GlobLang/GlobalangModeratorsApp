<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] w-full pb-3" :class="stickyTopPading">
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
        />
      </div>
    </div>
   <section
    class="w-full p-2 flex flex-col gap-2 justify-center items-center rounded-lg"
    >
      <Quiz_Registered_Card_Container 
      :country="country" 
      :selected="selected" 
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import Quiz_Registered_Card_Container from "../components/Quiz_Registered_Card_Container.vue";
import { computed, ref } from "vue";
import { countries } from "@core/CountriesArray";
import { useField } from "vee-validate";
import { Capacitor } from "@capacitor/core";
import { FwbInput, FwbSelect } from "flowbite-vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Quizzes",
    route: "Quizzes",
  },
  {
    label: "Registers",
  },
];

const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
  if (!country.value) {
    return countries.slice(0, MAX_INITIAL);
  }
  return countries.filter((c) =>
    c.name.toLowerCase().includes(country.value.toLowerCase())
  );
});

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const selected = ref("1");
const status = [
  { value: "1", name: "Approved" },
  { value: "0", name: "Rejected" },
];

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (!isNative ? "top-[5dvh]" : "top-0"));
</script>

<style scoped></style>
