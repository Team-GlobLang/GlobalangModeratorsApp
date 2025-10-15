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

  <FwbInput
    v-model="email"
    type="email"
    :validation-status="emailError ? 'error' : undefined"
    @blur="emailBlur"
    label="Email"
    placeholder="example@email.com"
  />
</template>

<script setup lang="ts">
import { FwbInput } from "flowbite-vue";
import { useField } from "vee-validate";
import { countries } from "../../../Core/CountriesArray";
import { computed, watch } from "vue";
import type { RegisterForm } from "../../Auth/Interfaces";

const MAX_INITIAL = 10;

const emit = defineEmits<{
  filterchangeCountry: [country: string | undefined];
  filterchangeEmail: [email: string | undefined];
}>();

const filteredCountries = computed(() => {
  if (!country.value) {
    return countries.slice(0, MAX_INITIAL);
  }
  return countries.filter((c) =>
    c.name.toLowerCase().includes(country.value.toLowerCase())
  );
});

const { value: country, errorMessage: countryError } =
  useField<RegisterForm["country"]>("country");

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField<string>("email");

watch(
  country,
  (newCountry) => {
    const valueToEmit = newCountry === "" ? undefined : newCountry;
    emit("filterchangeCountry", valueToEmit);
  },
  { immediate: true }
);

watch(
  email,
  (newEmail) => {
    const valueToEmit = newEmail === "" ? undefined : newEmail;
    emit("filterchangeEmail", valueToEmit);
  },
  { immediate: true }
);
</script>

<style scoped></style>
