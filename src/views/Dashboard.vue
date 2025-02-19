<script setup lang="ts">
import { ref } from 'vue'
import RevenueCharts from '../components/RevenueCharts.vue'
import RevenueChart from '../components/RevenueChart.vue'

interface User {
  name: string
  email: string
  title: string
  title2: string
  status: string
  role: string
}

const testUser: User = {
  name: 'John Doe',
  email: 'john@example.com',
  title: 'Software Engineer',
  title2: 'Web dev',
  status: 'Active',
  role: 'Owner',
}

const users = ref<User[]>([...Array(10).keys()].map(() => ({ ...testUser })))

const cards = ref([
  { label: 'Total Users', value: '8,282', color: '#7C77F6' },
  { label: 'Revenue This Month', value: '200,521', color: '#454197' }
])
</script>

<template>
  <div>
    <div class="mt-4">
      <div class="flex flex-wrap gap-6">
        <div v-for="(card, index) in cards" :key="index" class="min-w-[240px]">
          <div class="flex items-center px-6 py-8 text-white rounded-xl shadow-md"
            :style="{ backgroundColor: card.color }">
            <div class="text-left">
              <div class="text-lg">{{ card.label }}</div>
              <h4 class=" mt-2 text-3xl font-bold">{{ card.value }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-8" />

    <RevenueChart />
  </div>
</template>
