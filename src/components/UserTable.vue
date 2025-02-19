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

            <!-- Dropdown 1: User Name -->
            <div class="relative dropdown-container">
                <button @click="toggleDropdown('name')" class="px-3 py-1 border-l border-gray-300 flex items-center">
                    User Name <span class="ml-1">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.415 8.71094L12 13.2959L16.585 8.71094L18 10.1259L12 16.1259L6 10.1259L7.415 8.71094Z"
                                fill="black" />
                        </svg>

                    </span>
                </button>
                <div v-if="dropdowns.name"
                    class="absolute bg-white shadow-lg border border-gray-300 rounded-lg mt-2 w-48 z-10 p-2">
                    <div class="p-2 hover:bg-gray-100 cursor-pointer" @click="sortUsers('asc')">
                        <input type="radio" v-model="selectedSortOrder" value="asc" class="mr-2">
                        <label>A-Z</label>
                    </div>
                    <div class="p-2 hover:bg-gray-100 cursor-pointer" @click="sortUsers('desc')">
                        <input type="radio" v-model="selectedSortOrder" value="desc" class="mr-2">
                        <label>Z-A</label>
                    </div>
                </div>
            </div>

            <!-- Dropdown 2: User Status -->
            <div class="relative dropdown-container">
                <button @click="toggleDropdown('status')" class="px-3 py-1 border-l border-gray-300 flex items-center">
                    User Status <span class="ml-1">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.415 8.71094L12 13.2959L16.585 8.71094L18 10.1259L12 16.1259L6 10.1259L7.415 8.71094Z"
                                fill="black" />
                        </svg>

                    </span>
                </button>
                <div v-if="dropdowns.status"
                    class="absolute bg-white shadow-lg border border-gray-300 rounded-lg mt-2 w-48 z-10 p-2">
                    <div v-for="option in userStatusOptions" :key="option.value"
                        class="p-2 hover:bg-gray-100 cursor-pointer">
                        <input type="checkbox" v-model="selectedStatuses" :value="option.value" class="mr-2"
                            @change="resetPagination">
                        <label>{{ option.label }}</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Registered Users Heading -->
        <div class="mb-4">
            <h1 class="text-2xl font-bold text-gray-800 border-gray-300 pb-2">Registered Users</h1>
        </div>

        <!-- Table Wrapper -->
        <div class="overflow-hidden rounded-lg border border-gray-300">
            <table class="w-full border-collapse">
                <thead class="text-left">
                    <tr class="bg-[#7C77F6] text-white rounded-t-lg">
                        <th class="p-2">User ID</th>
                        <th class="p-2">Name</th>
                        <th class="p-2">Phone Number</th>
                        <th class="p-2">Status</th>
                        <th class="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in paginatedUsers" :key="user.id"
                        :class="{ 'border-b border-gray-300': index !== paginatedUsers.length - 1 }">
                        <td class="p-2">{{ user.id }}</td>
                        <td class="p-2">{{ user.name }}</td>
                        <td class="p-2">{{ user.phone }}</td>
                        <td class="p-2">
                            <span
                                :class="{ 'bg-red-200 text-[#DD0747] font-bold px-2 py-1 rounded': user.status === 'Deactivated', 'bg-blue-100 text-[#7C77F6] font-bold px-2 py-1 rounded': user.status === 'Active' }">
                                {{ user.status }}
                            </span>
                        </td>
                        <td class="p-2 flex">
                            <div class="flex border border-gray-300 rounded-lg bg-white">
                                <button
                                    class="p-2 flex items-center justify-center w-10 border-r border-gray-300 text-[#7C77F6]"
                                    @click="openEditModal(user)">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M9.69732 10.4239L7.22266 10.7779L7.57599 8.30261L13.94 1.93861C14.5258 1.35282 15.4755 1.35282 16.0613 1.93861C16.6471 2.5244 16.6471 3.47415 16.0613 4.05994L9.69732 10.4239Z"
                                            stroke="#7C77F6" stroke-width="1.2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M13.2305 2.64575L15.3518 4.76709" stroke="#7C77F6" stroke-width="1.2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M13.5 10.5V15.5C13.5 16.0523 13.0523 16.5 12.5 16.5H2.5C1.94772 16.5 1.5 16.0523 1.5 15.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H7.5"
                                            stroke="#7C77F6" stroke-width="1.2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                </button>
                                <button class="p-2 flex items-center justify-center w-10 text-[#7C77F6]"
                                    @click="openProfileModal(user)">
                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_2047_3141" style="mask-type:luminance"
                                            maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                                            <path d="M20 0.5H0V20.5H20V0.5Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask0_2047_3141)">
                                            <path
                                                d="M9.99967 13.0003C10.9201 13.0003 11.6663 12.2541 11.6663 11.3337C11.6663 10.4132 10.9201 9.66699 9.99967 9.66699C9.0792 9.66699 8.33301 10.4132 8.33301 11.3337C8.33301 12.2541 9.0792 13.0003 9.99967 13.0003Z"
                                                stroke="#7C77F6" stroke-width="1.2" stroke-linejoin="round" />
                                            <path
                                                d="M10.0004 6.75C6.41302 6.75 3.73052 9.73608 2.82932 10.8877C2.622 11.1527 2.622 11.514 2.82932 11.7789C3.73052 12.9306 6.41302 15.9167 10.0004 15.9167C13.5877 15.9167 16.2702 12.9306 17.1715 11.7789C17.3788 11.514 17.3788 11.1527 17.1715 10.8877C16.2702 9.73608 13.5877 6.75 10.0004 6.75Z"
                                                stroke="#7C77F6" stroke-width="1.2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
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

        <!-- Modal -->
        <Model v-model="isModalOpen" :statusOptions="userStatusOptions" :selectedStatus="selectedUserStatus"
            @updateStatus="updateUserStatus" />

        <UserProfileModal v-model="showModal" :user="userData" />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Model from './Model.vue';
import UserProfileModal from './UserProfileModal.vue';

const dropdowns = ref({ name: false, status: false });
const selectedSortOrder = ref('asc');
const selectedStatuses = ref([]);
const currentPage = ref(1);
const perPage = 3;
const isModalOpen = ref(false);
const selectedUserStatus = ref('');
const selectedUserId = ref(null);

const users = ref([
    { id: '00001', name: 'Christine Brooks', phone: '213151610', status: 'Active' },
    { id: '00002', name: 'Rosie Pearson', phone: '213151610', status: 'Deactivated' },
    { id: '00003', name: 'John Doe', phone: '213151610', status: 'Active' },
    { id: '00004', name: 'Sarah Parker', phone: '213151610', status: 'Active' },
    { id: '00005', name: 'James Smith', phone: '213151610', status: 'Deactivated' },
    { id: '00006', name: 'Lisa White', phone: '213151610', status: 'Active' }
]);

const userData = {
    name: "Yasir Nawaz",
    phone: "+91712351276",
    email: "abc@gmaial.com",
    avatar: "https://i.pravatar.cc/150", // Replace with actual user image
    cars: [
        { name: "Lamborghini", plate: "abc1233", image: "https://s3-alpha-sig.figma.com/img/5e52/8401/8262d5ab9e78d2e983e2070a1ca3f9d7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gOGQulUnW1EuCcJf~tBS7pGD0T8TAwNwhJYLF0Kq8KQpb~4Vry-dYJO6lFhNZ5GkHCebs50UjltlIziTfKPRNoVM1b4KUMd2ST1-4pUbw~g2q-uuHNEF9nZwbxSgRvh-k7LL36kgzf81eu~oupEnh80Bx1xcaPa7iQsao4XVpERuFAVq03SwDN6B9wNXQInCyP-smSEwccHa~BnnAfjT-LWG5MWcp643ifCiMZhJZumSMydXKGA88tDscttD9yyRRxK-uRuI6YkBQE-VytspgdGsgubTccK5RByjkvmhV9ULliGYD9tD6af-uvwB17vro2yszs1c2KZJlJK-DGuAbQ__" },
        { name: "Prestige", plate: "abc1234", image: "https://s3-alpha-sig.figma.com/img/d4f0/b37d/7ba818a4b8bed200e28c19a47a3f9779?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s3mNGteqeokqPQl2MlxZ~tFZDIfODLiGP7vALg1eSaKRx9uijpkLbY617BSnVQTuX2ITnG85jU~YujD4khwI3B5Ue44nbHzT5NCJVw89gQQs0HoJaVbTva-~FGNv2vSxtNG8JEnDkJoqKnGqwwc3tw9~-zRIl1bT9doYvaICZ6L9h5bXLdFA2uB9hqv4H7vmjkky5iBuVQOTUUTCZhrG0S~Z56PJQDzBFYzBtN6gUA-P2dmCf-ExdF2yg9q9N47uA6KiUyctDhWJFMOt8CRYOYvRi-HFuADeVSCxEkjYZtlT9A84~2hCH7XXlukeVmWMz8rajl4M2BkWHCVein9Y4g__" },
        { name: "SUV", plate: "abc1235", image: "https://s3-alpha-sig.figma.com/img/6225/11a6/62d13ae2d3ab85b9c91849dc38667e3f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VGpGriCnhC72wqelSK4n~1i1qNge2qgZKvKVfHXpEOW3~e5uq-ppAdDa~jS3yb56qpQp2F59Sbns1O1ZuBvjdBxXgEPPEsPkNLhzQQdAsWfTcDwL3F0naxtV-1rS6497BRDuCHRzHPA7qInwhRK5VCCKsSuXKYX02GdqLzfEvTv2NrgdSVSkdvCy38j8DZZHhbVDr1EfukEbm7JS2bIOot0TzZN4u~2Im5yYUuNyQBn8zzIRLzPobuPA66dUhK3AOVw-oMEYuPTbo7FSyK~XNbM7pap18LLvxNLDYkkvP4UbzFm~ivOuqNqdf6l3AgqZtktLhSP5TSR23q2O3uAe8g__" }
    ]
};

const userNameOptions = computed(() => users.value.map(user => ({ label: user.name, value: user.name })));

const userStatusOptions = [{ label: 'Active', value: 'Active' }, { label: 'Deactivated', value: 'Deactivated' }];

const filteredUsers = computed(() => {
    let sortedUsers = [...users.value];
    if (selectedSortOrder.value === 'asc') {
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedUsers.filter(user =>
        (selectedStatuses.value.length === 0 || selectedStatuses.value.includes(user.status))
    );
});

const paginatedUsers = computed(() => filteredUsers.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage));
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage));

const openEditModal = (user) => {
    selectedUserId.value = user.id;
    selectedUserStatus.value = user.status;
    isModalOpen.value = true;
};

const showModal = ref(false);

const openProfileModal = (user) => {
    userData.name = user.name;
    userData.phone = user.phone;
    userData.email = `${user.name.toLowerCase().replace(/\s/g, '')}@example.com`; // Dummy email
    userData.avatar = "https://i.pravatar.cc/150"; // Placeholder, replace with actual avatar
    userData.cars = [
        { name: "Lamborghini", plate: "abc1233", image: "https://s3-alpha-sig.figma.com/img/5e52/8401/8262d5ab9e78d2e983e2070a1ca3f9d7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gOGQulUnW1EuCcJf~tBS7pGD0T8TAwNwhJYLF0Kq8KQpb~4Vry-dYJO6lFhNZ5GkHCebs50UjltlIziTfKPRNoVM1b4KUMd2ST1-4pUbw~g2q-uuHNEF9nZwbxSgRvh-k7LL36kgzf81eu~oupEnh80Bx1xcaPa7iQsao4XVpERuFAVq03SwDN6B9wNXQInCyP-smSEwccHa~BnnAfjT-LWG5MWcp643ifCiMZhJZumSMydXKGA88tDscttD9yyRRxK-uRuI6YkBQE-VytspgdGsgubTccK5RByjkvmhV9ULliGYD9tD6af-uvwB17vro2yszs1c2KZJlJK-DGuAbQ__" },
        { name: "Prestige", plate: "abc1233", image: "https://s3-alpha-sig.figma.com/img/d4f0/b37d/7ba818a4b8bed200e28c19a47a3f9779?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s3mNGteqeokqPQl2MlxZ~tFZDIfODLiGP7vALg1eSaKRx9uijpkLbY617BSnVQTuX2ITnG85jU~YujD4khwI3B5Ue44nbHzT5NCJVw89gQQs0HoJaVbTva-~FGNv2vSxtNG8JEnDkJoqKnGqwwc3tw9~-zRIl1bT9doYvaICZ6L9h5bXLdFA2uB9hqv4H7vmjkky5iBuVQOTUUTCZhrG0S~Z56PJQDzBFYzBtN6gUA-P2dmCf-ExdF2yg9q9N47uA6KiUyctDhWJFMOt8CRYOYvRi-HFuADeVSCxEkjYZtlT9A84~2hCH7XXlukeVmWMz8rajl4M2BkWHCVein9Y4g__" },
        { name: "SUV", plate: "abc1233", image: "https://s3-alpha-sig.figma.com/img/6225/11a6/62d13ae2d3ab85b9c91849dc38667e3f?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VGpGriCnhC72wqelSK4n~1i1qNge2qgZKvKVfHXpEOW3~e5uq-ppAdDa~jS3yb56qpQp2F59Sbns1O1ZuBvjdBxXgEPPEsPkNLhzQQdAsWfTcDwL3F0naxtV-1rS6497BRDuCHRzHPA7qInwhRK5VCCKsSuXKYX02GdqLzfEvTv2NrgdSVSkdvCy38j8DZZHhbVDr1EfukEbm7JS2bIOot0TzZN4u~2Im5yYUuNyQBn8zzIRLzPobuPA66dUhK3AOVw-oMEYuPTbo7FSyK~XNbM7pap18LLvxNLDYkkvP4UbzFm~ivOuqNqdf6l3AgqZtktLhSP5TSR23q2O3uAe8g__" }
    ]
    showModal.value = true;
};

const updateUserStatus = (newStatus) => {
    const user = users.value.find(u => u.id === selectedUserId.value);
    if (user) {
        user.status = newStatus;
    }
    isModalOpen.value = false;
};

const toggleDropdown = (type) => dropdowns.value[type] = !dropdowns.value[type];
const resetPagination = () => currentPage.value = 1;
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

watch(filteredUsers, () => currentPage.value = 1);
</script>
