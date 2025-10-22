<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    class="bg-white! w-11/12 rounded-2xl! p-5"
    dismissableMask
    :pt="{ mask: { class: 'backdrop-brightness-70 bg-black/40' } }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Register Moderator
        </h3>
      </div>
    </template>

    <form @submit.prevent="submitForm" class="flex-col flex gap-1">
      <FwbInput
        v-model="fullName"
        type="text"
        :validation-status="fullNameError ? 'error' : undefined"
        label="Full name"
        placeholder="Full name"
      >
        <template #suffix>
          <span class="pi pi-user"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ fullNameError }} </span>
        </template>
      </FwbInput>

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
        v-model="birthDate"
        :validation-status="birthDateError ? 'error' : undefined"
        label="Birth date"
        type="date"
      >
        <template #validationMessage>
          <span class="font-medium">{{ birthDateError }}</span>
        </template>
      </FwbInput>

      <FwbInput
        v-model="email"
        type="email"
        :validation-status="emailError ? 'error' : undefined"
        label="Email"
        placeholder="mod@globalng.com"
      >
        <template #suffix>
          <span class="pi pi-at"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ emailError }} </span>
        </template>
      </FwbInput>

      <FwbInput
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Your password"
        v-model="password"
        :validation-status="passwordError ? 'error' : undefined"
      >
        <template #suffix>
          <span
            v-if="!showPassword"
            @click="changeShowPassword(true)"
            class="pi pi-eye hover:text-blue-600 cursor-pointer"
          ></span>
          <span
            v-else
            @click="changeShowPassword(false)"
            class="pi pi-eye-slash hover:text-blue-600 cursor-pointer"
          ></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ passwordError }} </span>
        </template>
      </FwbInput>
    </form>

    <template #footer>
      <div class="flex justify-between items-center w-full mt-4">
        <FwbButton
          color="light"
          @click="$emit('update:visible', false)"
          class="text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Cancel
        </FwbButton>

        <FwbButton
          color="green"
          :loading="isPending"
          @click="submitForm"
          class="text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Register
        </FwbButton>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { FwbButton, FwbInput } from "flowbite-vue";
import { computed, ref, watch } from "vue";
import { rules } from "../../../../Core/validators/rules";
import { useField, useForm } from "vee-validate";
import { countries } from "../../../../Core/CountriesArray";
import { Dialog } from "primevue";
import {
  UseRegisterModerator,
  type RegisterForm,
} from "../../Hooks/UseRegisterModerador";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["update:visible"]);
const localVisible = ref(props.visible);

const MAX_INITIAL = 5;

const filteredCountries = computed(() => {
  if (!country.value) {
    return countries.slice(0, MAX_INITIAL);
  }

  return countries
    .filter((c) => c.name.toLowerCase().includes(country.value.toLowerCase()))
    .slice(0, MAX_INITIAL);
});

const showPassword = ref<boolean>(false);
function changeShowPassword(show: boolean) {
  showPassword.value = show;
}

const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach((fn) => fn());

const { handleSubmit } = useForm<RegisterForm>();

const { value: password, errorMessage: passwordError } = useField<
  RegisterForm["password"]
>("password", "required|min:6");

const { value: email, errorMessage: emailError } = useField<
  RegisterForm["email"]
>("email", "required|email");

const { value: fullName, errorMessage: fullNameError } = useField<
  RegisterForm["fullName"]
>("fullName", "required");

const { value: birthDate, errorMessage: birthDateError } = useField<
  RegisterForm["birthDate"]
>("birthDate", "required");

const { value: country, errorMessage: countryError } = useField<
  RegisterForm["country"]
>("country", "required");

const { mutate, isPending } = UseRegisterModerator();

const submitForm = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => emit("update:visible", false),
  });
});

watch(
  () => props.visible,
  (val) => {
    localVisible.value = val;
  }
);

//Usar con
//const visible = ref<boolean>(false); Script
//Template
//    <div class="flex justify-end w-11/12">
//      <FwbButton @click="visible = true" color="green"
//        >Register a Moderator</FwbButton
//      >
//    </div>
//
//  <RegisterModeradorMForm v-model:visible="visible"/>

//En main.ts
//import PrimeVue from 'primevue/config';
// const app = createApp(App).use(PrimeVue).use(router).use(VueQueryPlugin);
</script>
