<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  modelValue: boolean;
  user: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    cars: { name: string; plate: string; image: string }[];
  };
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// Sync modal open state
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const closeModal = () => {
  isOpen.value = false;
};

// Track selected car index instead of plate
const selectedIndex = ref<number | null>(null);

const selectCar = (index: number) => {
  selectedIndex.value = selectedIndex.value === index ? null : index;
};
</script>

<template>
  <VueFinalModal v-model="isOpen" class="flex justify-center items-center"
    content-class="bg-white p-6 rounded-lg shadow-lg w-[500px]"
    overlay-class="bg-black/50 flex justify-center items-center">

    <!-- Close Button -->
    <div class="flex justify-end">
      <button @click="closeModal" class="text-gray-500 text-xl">&times;</button>
    </div>

    <!-- User Profile -->
    <div class="text-center">
      <img :src="user.avatar" alt="User Avatar"
        class="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300 p-1" />
      <h2 class="text-xl font-semibold text-left">Name: {{ user.name }}</h2>
      <p class="text-gray-600 text-left"><strong>Phone Number: </strong> {{ user.phone }}</p>
      <p class="text-gray-600 text-left"><strong>Email: </strong> {{ user.email }}</p>
    </div>

    <!-- Divider -->
    <div class="border-t my-4"></div>

    <!-- Registered Cars -->
    <h3 class="text-lg font-semibold mb-2">Registered Cars</h3>
    <div class="grid grid-cols-3 gap-3">
      <div v-for="(car, index) in user.cars" :key="car.plate" @click="selectCar(index)"
        class="p-2 rounded-[20px] max-w-[120px] text-center cursor-pointer transition-colors"
        :class="selectedIndex === index ? 'bg-[#7C77F6] text-white' : 'bg-gray-100 text-black'">
        <img :src="car.image" alt="Car Image" class="w-full h-20 ml-[-17px] object-cover rounded-md mb-2" />
        <p class="font-semibold">{{ car.name }}</p>
        <p :class="selectedIndex === index ? 'text-white' : 'text-gray-500'">{{ car.plate }}</p>
      </div>


    </div>

  </VueFinalModal>
</template>
