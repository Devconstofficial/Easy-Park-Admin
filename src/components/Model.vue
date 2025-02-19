<script setup lang="ts">
import { CloudCog } from 'lucide-vue-next';
import { ref, defineProps, defineEmits } from 'vue'
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps<{
    modelValue: boolean
    statusOptions: { label: string; value: string }[]
    selectedStatus: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'updateStatus', status: string): void
}>()

const localStatus = ref(props.selectedStatus)

const closeModal = () => {
    emit('update:modelValue', false)
}

const updateStatus = () => {
    emit('updateStatus', localStatus.value)
    closeModal()
}
</script>

<template>
    <VueFinalModal v-model="props.modelValue" class="flex justify-center items-center"
        content-class="bg-white p-6 rounded-lg shadow-lg w-96"
        overlay-class="bg-black/50 flex justify-center items-center">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Update User Status</h2>
            <button @click="closeModal" class="text-gray-500 text-xl">&times;</button>
        </div>

        <label class="block text-sm font-medium text-gray-700 mb-2">User Status</label>
        <select v-model="localStatus" class="w-full p-2 border rounded">
            <option v-for="status in statusOptions" :key="status.value" :value="status">
                {{ status.label }}
            </option>
        </select>

        <div class="flex justify-between mt-4">
            <button @click="closeModal" class="px-4 py-2 border rounded mr-2">Cancel</button>
            <button @click="updateStatus" class="px-4 py-2 bg-[#7C77F6] text-white rounded">Update Status</button>
        </div>
    </VueFinalModal>
</template>
