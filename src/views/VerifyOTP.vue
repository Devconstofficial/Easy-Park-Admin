<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import OtpInput from "../components/OtpInput.vue";

const router = useRouter();
const email = ref("");
const password = ref("");

function login() {
  router.push("/dashboard");
}

function redirectToForgetPassword() {
  router.push("/forget-password");
}
</script>

<template>
  <div class="flex h-screen bg-white-100">
    <!-- Left Section -->
    <div class="flex flex-col w-1/2 px-12 py-10">
      <!-- Logo & Title (Fixed at the Top) -->
      <div class="mb-10">
        <div class="flex items-center space-x-2">
          <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M30.642 0C19.4167 0 10.2845 9.07649 10.2845 20.2334V34.521V40.4667V56H22.2503V40.4667H30.642C41.8678 40.4667 51 31.3902 51 20.2334C51 9.07649 41.8678 0 30.642 0ZM30.642 28.5744C35.2696 28.5744 39.0347 24.8327 39.0347 20.2334C39.0347 15.6345 35.2696 11.8924 30.642 11.8924C26.015 11.8924 22.2503 15.6345 22.2503 20.2334V28.5744H30.642ZM0 34.6651C0 37.9488 2.67839 40.6113 5.98266 40.6113H10.2842V28.7184H5.98266C2.67839 28.7184 0 31.381 0 34.6651ZM30.6087 22.3907C31.8259 22.3907 32.8125 21.41 32.8125 20.2003C32.8125 18.9905 31.8259 18.0099 30.6087 18.0099C29.3916 18.0099 28.4049 18.9905 28.4049 20.2003C28.4049 21.41 29.3916 22.3907 30.6087 22.3907Z"
              fill="#7C77F6" />
          </svg>
          <span class="text-3xl font-semibold text-gray-800">PARK</span>
        </div>
      </div>

      <!-- Centered Form Section -->
      <div class="flex flex-col items-center justify-center flex-grow">
        <div class="w-full max-w-sm">
          <!-- Left-aligned Title & Subtitle -->
          <h2 class="text-[40px] font-bold text-black leading-[60px] tracking-[1%] text-left">
            Verify OTP
          </h2>
          <p class="text-[#A4A9B2] text-[16px] mb-6 font-normal leading-[19.2px] tracking-[0%] text-left">
            Please enter the 5 digit OTP to confirm verification.
          </p>

          <!-- Login Form (Centered) -->
          <OtpInput />
        </div>
      </div>
    </div>

    <!-- Right Section (Image) -->
    <div class="w-1/2 flex justify-center p-8">
      <img src="../assets/Image.png" alt="Login Image" class="w-full h-auto rounded-[1.5rem] shadow-md" />
    </div>
  </div>
</template>
