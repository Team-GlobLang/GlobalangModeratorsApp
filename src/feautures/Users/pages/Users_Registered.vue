<template>
  <div>
    <div class="sticky z-40 bg-[#F1F4FB] w-full pb-3" :class="stickyTopPading">
      <div class="w-full p-2">
        <BreadCrumb :items="breadCrumbItems" />
      </div>

      <div class="w-11/12 mx-auto flex flex-col gap-3">
        <div class="flex justify-end">
          <FwbButton @click="visible = true" color="green">
            Register a Moderator
          </FwbButton>
        </div>
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
        <FwbInput
          v-model="email"
          type="email"
          :validation-status="emailError ? 'error' : undefined"
          @blur="emailBlur"
          label="Email"
          placeholder="example@email.com"
        />
      </div>
    </div>
  <section class="w-full p-2 flex flex-col gap-2 items-center rounded-lg">
    <div class="flex justify-end w-11/12">
      <FwbButton @click="visible = true" color="green"
        >Register a Moderator</FwbButton
      >
    </div>

    <User_Registered_Card_Container :country="country" :email="email"/>

    <RegisterModeradorMForm v-model:visible="visible" />
  </section>
  </div>
</template>

<script setup lang="ts">
import { FwbButton, FwbInput } from "flowbite-vue";
import User_Registered_Card_Container from "../components/User_Registered_Card_Container.vue";
import { computed, ref } from "vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import RegisterModeradorMForm from "../../Auth/Components/Modals/RegisterModeradorMForm.vue";
import { useField } from "vee-validate";
import { Capacitor } from "@capacitor/core";
import { countries } from "@core/CountriesArray";
const breadCrumbItems = [
  {
    label: "Home",
    route: "Home_Moderator",
    isHome: true,
  },
  {
    label: "Registers",
  },
  {
    label: "Users",
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

const isNative = Capacitor.isNativePlatform();
const stickyTopPading = computed(() => (!isNative ? "top-[5dvh]" : "top-0"));

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField<string>("email");

const visible = ref<boolean>(false);
</script>

<style scoped></style>
