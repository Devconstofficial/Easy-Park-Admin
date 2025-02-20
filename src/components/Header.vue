<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { useRoute } from 'vue-router'
import NotificationTray from './NotificationTray.vue'

const isNotificationOpen = ref(false)
const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
const route = useRoute()

const notifications = ref([
  { id: 1, title: 'New User Registered', message: 'Alex has just registered on the app.', time: '25 min ago' },
  { id: 2, title: 'New Booking Confirmed', message: 'John booked a room.', time: '10 min ago' }
])

const pageTitle = computed(() => {
  switch (route.name) {
    case 'Dashboard':
      return 'Dashboard'
    case 'Users':
      return 'User'
    case 'Bookings':
      return 'Bookings'
    default:
      return 'Dashboard'
  }
})

const toggleNotifications = async () => {
  isNotificationOpen.value = false // Close first
  await nextTick() // Wait for Vue to process the DOM update
  isNotificationOpen.value = true // Reopen
}

const handleDropdownAction = (action: string) => {
  // Handle action based on dropdown item clicked
  console.log(`Action: ${action}`)
  dropdownOpen.value = false // Close dropdown after selection
}

// Close the dropdown if the user clicks outside
const closeDropdown = (event: MouseEvent) => {
  if (!event.target.closest('.profile-dropdown')) {
    dropdownOpen.value = false
  }
}

document.addEventListener('click', closeDropdown)
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white relative">
    <div class="flex items-center">
      <!-- Sidebar Toggle Button -->
      <button class="text-gray-500 focus:outline-none lg:hidden" @click="isOpen = true">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>

      <!-- Dynamic Page Title -->
      <h1 class="text-3xl font-medium text-[#3D3B73] ml-4">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center relative">
      <!-- Notifications Button -->
      <button @click="toggleNotifications" class="relative flex mx-4 text-gray-600 focus:outline-none">
        <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.519531" width="30" height="30" rx="8" fill="#7C77F6" fill-opacity="0.13" />
          <path
            d="M22.3511 20.1421C21.8958 19.7362 21.4971 19.2708 21.1658 18.7585C20.8042 18.0514 20.5875 17.2792 20.5283 16.4871V14.1544C20.5315 12.9103 20.0802 11.708 19.2594 10.7732C18.4385 9.83846 17.3046 9.23562 16.0706 9.07796V8.4688C16.0706 8.3016 16.0041 8.14125 15.8859 8.02302C15.7677 7.9048 15.6073 7.83838 15.4401 7.83838C15.273 7.83838 15.1126 7.9048 14.9944 8.02302C14.8762 8.14125 14.8097 8.3016 14.8097 8.4688V9.08741C13.5868 9.25643 12.4666 9.86292 11.6565 10.7945C10.8464 11.7262 10.4014 12.9198 10.4039 14.1544V16.4871C10.3448 17.2792 10.128 18.0514 9.7664 18.7585C9.44098 19.2696 9.04871 19.735 8.60001 20.1421C8.54964 20.1864 8.50927 20.2409 8.48158 20.3019C8.4539 20.363 8.43954 20.4292 8.43945 20.4963V21.1385C8.43945 21.2638 8.4892 21.3839 8.57776 21.4724C8.66632 21.561 8.78643 21.6107 8.91168 21.6107H22.0395C22.1647 21.6107 22.2848 21.561 22.3734 21.4724C22.4619 21.3839 22.5117 21.2638 22.5117 21.1385V20.4963C22.5116 20.4292 22.4972 20.363 22.4695 20.3019C22.4419 20.2409 22.4015 20.1864 22.3511 20.1421ZM9.42168 20.6663C9.86104 20.2419 10.2479 19.7662 10.5739 19.2496C11.0294 18.3956 11.2952 17.4533 11.3531 16.4871V14.1544C11.3343 13.6009 11.4272 13.0494 11.626 12.5326C11.8249 12.0158 12.1257 11.5443 12.5106 11.1462C12.8955 10.748 13.3565 10.4314 13.8663 10.2152C14.3761 9.99898 14.9242 9.88754 15.4779 9.88754C16.0317 9.88754 16.5798 9.99898 17.0895 10.2152C17.5993 10.4314 18.0604 10.748 18.4453 11.1462C18.8301 11.5443 19.131 12.0158 19.3298 12.5326C19.5287 13.0494 19.6215 13.6009 19.6028 14.1544V16.4871C19.6607 17.4533 19.9264 18.3956 20.382 19.2496C20.708 19.7662 21.0948 20.2419 21.5342 20.6663H9.42168Z"
            fill="#7C77F6" />
          <path
            d="M15.499 23.1879C15.7964 23.181 16.0819 23.0692 16.3048 22.8722C16.5278 22.6751 16.6739 22.4056 16.7173 22.1112H14.2334C14.278 22.4136 14.4309 22.6895 14.6637 22.8875C14.8965 23.0856 15.1933 23.1923 15.499 23.1879Z"
            fill="#7C77F6" />
          <path
            d="M24.5 12C26.433 12 28 10.433 28 8.5C28 6.567 26.433 5 24.5 5C22.567 5 21 6.567 21 8.5C21 10.433 22.567 12 24.5 12Z"
            fill="#7C77F6" />
        </svg>
      </button>

      <!-- Notification Tray (Fix: Properly reopens on click) -->
      <div v-if="isNotificationOpen" class="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-md z-20">
        <NotificationTray :notifications="notifications" />
      </div>

      <!-- User Profile Section -->
      <div class="relative profile-dropdown flex items-center" @click="dropdownOpen = !dropdownOpen">
        <img class="object-cover w-10 h-10 rounded-full"
          src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
          alt="User Avatar" />
        <div class="ml-4">
          <div class="text-lg font-semibold">John Doe</div>
          <div class="text-sm text-gray-500">Admin</div>
        </div>
        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform" leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0">


          <div v-show="dropdownOpen"
            class="absolute right-0 top-0 z-20 w-[400px] h-[270px] p-2 mt-2 bg-white rounded-md shadow-xl bg-red-100">
            <div class="flex justify-end">
              <button class="text-gray-500 text-xl w-10 h-10">&times;</button>
            </div>

            <!-- User Profile -->
            <div class="text-center">
              <img
                src='https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80'
                alt="User Avatar" class="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 class="text-xl font-semibold text-left">Name:</h2>
            </div>

          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
