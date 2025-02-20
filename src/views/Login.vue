<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

// Importing the SVG files
import eyeSlashIcon from '../assets/eye-slash.svg';
import closeCircleIcon from '../assets/close-circle.svg';
import loginImage from '../assets/Image.png';

const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

function login() {
  router.push("/dashboard");
}

function redirectToForgetPassword() {
  router.push("/forget-password");
}

function clearEmail() {
  email.value = "";
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left Section -->
    <div class="flex flex-col w-1/2 px-12 py-10">
      <div class="mb-10">
        <div class="flex items-center space-x-2">
          <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M30.642 0C19.4167 0 10.2845 9.07649 10.2845 20.2334V34.521V40.4667V56H22.2503V40.4667H30.642C41.8678 40.4667 51 31.3902 51 20.2334C51 9.07649 41.8678 0 30.642 0ZM30.642 28.5744C35.2696 28.5744 39.0347 24.8327 39.0347 20.2334C39.0347 15.6345 35.2696 11.8924 30.642 11.8924C26.015 11.8924 22.2503 15.6345 22.2503 20.2334V28.5744H30.642ZM0 34.6651C0 37.9488 2.67839 40.6113 5.98266 40.6113H10.2842V28.7184H5.98266C2.67839 28.7184 0 31.381 0 34.6651ZM30.6087 22.3907C31.8259 22.3907 32.8125 21.41 32.8125 20.2003C32.8125 18.9905 31.8259 18.0099 30.6087 18.0099C29.3916 18.0099 28.4049 18.9905 28.4049 20.2003C28.4049 21.41 29.3916 22.3907 30.6087 22.3907Z"
              fill="#7C77F6" />
          </svg>
          <span class="text-3xl font-semibold text-[#3D3B73]">Park</span>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center flex-grow">
        <div class="w-full max-w-sm">
          <h2 class="text-[40px] font-bold text-[#7C77F6] leading-[60px] tracking-[1%] text-left">
            Sign In
          </h2>
          <p class="text-[#A4A9B2] text-[16px] mb-6 font-normal leading-[19.2px] tracking-[0%] text-left">
            Please fill your detail to access your account.
          </p>

          <form class="w-full space-y-4" @submit.prevent="login">
            <!-- Email Input with Clear Button -->
            <label class="block text-left w-full relative">
              <span class="text-sm text-gray-700">Email</span>
              <div class="relative">
                <input v-model="email" type="email"
                  class="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 pr-10" />
                <button v-if="email" @click="clearEmail" type="button"
                  class="absolute inset-y-0 right-2 flex items-center">
                  <img :src="closeCircleIcon" alt="Clear" class="w-5 h-5 cursor-pointer">
                </button>
              </div>
            </label>

            <!-- Password Input with Visibility Toggle -->
            <label class="block text-left w-full relative">
              <span class="text-sm text-gray-700">Password</span>
              <div class="relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="password"
                  class="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 pr-10" />
                <button @click="togglePasswordVisibility" type="button"
                  class="absolute inset-y-0 right-2 flex items-center">
                  <img :src="showPassword ? eyeSlashIcon : eyeSlashIcon" 
                       alt="Toggle Password" class="w-5 h-5 cursor-pointer">
                </button>
              </div>
            </label>

            <div class="flex items-center justify-between w-full">
              <label class="inline-flex items-center">
                <input type="checkbox" class="text-indigo-600 border-gray-300 rounded-md" />
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <router-link to="/forget-password">
                <span class="text-sm hover:underline text-black">Forgot Password?</span>
              </router-link>
            </div>

            <button type="submit" class="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="w-1/2 flex justify-center p-8">
      <img :src="loginImage" alt="Login Image" class="w-full h-auto rounded-[1.5rem] shadow-md" />
    </div>
  </div>
</template>