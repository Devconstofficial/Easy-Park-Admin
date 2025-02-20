<script setup lang="ts">
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindValue = ref("");

const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
  console.log("OTP changed: ", value);
};

const verify = (value: string) => {
  // api call
};
</script>

<template>
  <div class="otp-container">
    <v-otp-input ref="otpInput" class="otp-box mt-10" input-classes="otp-input" separator="-" inputType="letter-numeric"
      :num-inputs="5" v-model:value="bindValue" :should-auto-focus="true" :should-focus-order="true"
      @on-change="handleOnChange" @on-complete="handleOnComplete" :placeholder="['*', '*', '*', '*', '*']" />
    <button class="w-full px-4 py-2 mt-20 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      @click="verify('2929')">Verify OTP</button>
  </div>
</template>

<style>

.otp-box {
  display: flex;
  gap: 25px;
}

.otp-input {
  width: 50px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-bottom: 3px solid black; /* Only bottom border */
  background-color: transparent;
  transition: all 0.3s ease-in-out;
}

.otp-input:focus {
  border-bottom: 3px solid #4f46e5; /* Change bottom border on focus */
  outline: none;
}

.otp-box .otp-input:not(:last-child)::after {
  content: "-";
  margin-left: 5px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

</style>

