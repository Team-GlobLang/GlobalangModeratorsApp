<template>
  <FwbInput
    list="countries"
    v-model="country"
    type="text"
    :validation-status="countryError ? 'error' : undefined"
    label="Contry"
    placeholder="Ej: Costa Rica"
  >
    <template #suffix>
      <span class="pi pi-home"></span>
    </template>
    <template #validationMessage>
      <span class="font-medium">{{ countryError }} </span>
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

  <fwb-select v-model="selected" :options="status" label="Choose a status" />
</template>

<script setup lang="ts">
import { countries } from "@core/CountriesArray";
import { FwbInput } from "flowbite-vue";
import { FwbSelect } from "flowbite-vue";
import { useField } from "vee-validate";
import { computed, ref, watch } from "vue";

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
  useField<{country:string}["country"]>("country");

const emit = defineEmits<{
  filterCountryChange: [country: string];
  filterStatusChange: [status: boolean];
}>();

watch(
  country,
  (newCountry) => {
    emit("filterCountryChange", newCountry || "");
  },
  { immediate: true }
);

const selected = ref("");
const statusResult = ref<boolean>(true);

const status = [
  { value: "1", name: "Approved" },
  { value: "0", name: "Rejected" },
];

watch(
  selected,
  (newStatus) => {
    statusResult.value = newStatus === "1";
    emit("filterStatusChange", statusResult.value);
  },
  { immediate: true }
);
</script>

<style scoped></style>
