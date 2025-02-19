<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { X } from 'lucide-vue-next';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

const props = defineProps<{ notifications: Notification[] }>();
const isVisible = ref(true);
</script>

<template>
  <div v-if="isVisible && notifications.length" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="px-4 py-2 border-b text-lg font-semibold flex justify-between items-center">
      <span>Notifications</span>
      <button @click="isVisible = false" class="text-gray-500 hover:text-gray-700">
        <X :size="18" />
      </button>
    </div>
    <div class="max-h-60 overflow-y-auto">
      <div v-for="notification in notifications" :key="notification.id" class="px-4 py-3 border-b last:border-none">
        <p class="font-medium">{{ notification.title }}</p>
        <p class="text-sm text-gray-600">{{ notification.message }}</p>
        <p class="text-xs text-gray-400">{{ notification.time }}</p>
      </div>
    </div>
  </div>
</template>