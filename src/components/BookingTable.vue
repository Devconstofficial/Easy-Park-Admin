<template>
    <div>
        <!-- Filter Section -->
        <div class="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white p-2 w-fit mb-5">
            <span class="text-lg">
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z"
                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25"
                        stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span> <!-- Filter Icon -->
            <span class="font-medium">Filter By</span>

            <!-- Dropdown: Booking Status -->
            <div class="relative dropdown-container">
                <button @click="toggleDropdown('status', $event)"
                    class="px-3 py-1 border-l border-gray-300 flex items-center">
                    Booking Status <span class="ml-1">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.415 8.71094L12 13.2959L16.585 8.71094L18 10.1259L12 16.1259L6 10.1259L7.415 8.71094Z"
                                fill="black" />
                        </svg>
                    </span>
                </button>
                <div v-if="dropdowns.status"
                    class="absolute bg-white shadow-lg border border-gray-300 rounded-lg mt-2 w-48 z-10 p-2"
                    @click.stop>
                    <div v-for="option in bookingStatusOptions" :key="option.value"
                        class="p-2 hover:bg-gray-100 cursor-pointer">
                        <input type="checkbox" v-model="selectedStatuses" :value="option.value" class="mr-2"
                            @change="resetPagination">
                        <label>{{ option.label }}</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Wrapper -->
        <div class="overflow-hidden rounded-lg border border-gray-300">
            <table class="w-full border-collapse">
                <thead class="text-left">
                    <tr class="bg-[#7C77F6] text-white rounded-t-lg">
                        <th class="p-4">Booking ID</th>
                        <th class="p-4">Username</th>
                        <th class="p-4">Parking Zone</th>
                        <th class="p-4">Amount</th>
                        <th class="p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(booking, index) in paginatedBookings" :key="booking.id"
                        :class="{ 'border-b border-gray-300': index !== paginatedBookings.length - 1 }">
                        <td class="p-4">{{ booking.id }}</td>
                        <td class="p-4">{{ booking.username }}</td>
                        <td class="p-4">{{ booking.parkingZone }}</td>
                        <td class="p-4">${{ booking.amount }}</td>
                        <td class="p-4">
                            <span
                                :class="{ 'bg-red-100 text-white px-3 py-1 rounded': booking.status === 'In Progress', 'bg-blue-100 px-3 py-1 rounded': booking.status === 'Completed' }">
                                {{ booking.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center space-x-2 mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-2 border rounded">&lt; Back</button>
            <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                :class="{ 'bg-[#7C77F6] text-white': currentPage === page, 'border px-2 rounded': true }">{{ page
                }}</button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-2 border rounded">Next
                &gt;</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dropdowns: { status: false },
            selectedStatuses: [],
            currentPage: 1,
            perPage: 3,
            bookings: [
                { id: '00001', username: 'Christine Brooks', parkingZone: '213151610', amount: '99.99', status: 'In Progress' },
                { id: '00002', username: 'Rosie Pearson', parkingZone: '213151610', amount: '99.99', status: 'Completed' },
                { id: '00003', username: 'John Doe', parkingZone: '213151610', amount: '99.99', status: 'In Progress' },
                { id: '00004', username: 'Sarah Parker', parkingZone: '213151610', amount: '99.99', status: 'Completed' },
                { id: '00005', username: 'James Smith', parkingZone: '213151610', amount: '99.99', status: 'In Progress' },
                { id: '00006', username: 'Lisa White', parkingZone: '213151610', amount: '99.99', status: 'Completed' }
            ],
            bookingStatusOptions: [
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Completed', value: 'Completed' }
            ]
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.filteredBookings.length / this.perPage);
        },
        filteredBookings() {
            return this.bookings.filter(booking =>
                this.selectedStatuses.length === 0 || this.selectedStatuses.includes(booking.status)
            );
        },
        paginatedBookings() {
            return this.filteredBookings.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
        }
    },

    watch: {
        filteredBookings() {
            this.currentPage = 1; // Reset pagination when filters change
        }
    },

    methods: {
        toggleDropdown(type, event) {
            event.stopPropagation();
            this.dropdowns[type] = !this.dropdowns[type];
        },
        resetPagination() {
            this.currentPage = 1; // Reset to first page on filter change
        },
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        closeDropdownsOnOutsideClick(event) {
            if (!event.target.closest(".dropdown-container")) {
                this.dropdowns.status = false;
            }
        }
    },

    mounted() {
        document.addEventListener("click", this.closeDropdownsOnOutsideClick);
    },

    beforeUnmount() {
        document.removeEventListener("click", this.closeDropdownsOnOutsideClick);
    }
};
</script>
