<template>
    <div>
        <BumdesSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 text-font ml-10">
                    Detail Toko
                    </div>
                </div>
                <div class="mt-10 grid grid-cols-[17rem_1fr] divide-x-2">
                    <!-- MINI NAV -->
					<div class="block w-56 m-6 -mt-2">
						<RouterLink
							:to="{ path: '/bumdes/toko/' + idStore + '/detail' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Profil Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + idStore + '/profil' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Profil Pemilik Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + idStore + '/statistik' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Statistik Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + idStore + '/produk' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Produk Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + idStore + '/riwayat' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Riwayat Penjualan</RouterLink
						>
					</div>
                    <!-- CONTENT -->
                    <div class="pl-12 items-center">
                        <h2 class="font-bold text-2xl text-font mb-10">Riwayat Penjualan Toko</h2>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 mb-10">
                            <table class="w-full text-md text-left rtl:text-right text-font">
                                        <thead class="text-lg font-semibold text-white bg-primary ">
                                            <tr>
                                                <th scope="col" class="px-6 py-4">
                                                    No 
                                                </th>
                                                <th scope="col" class="px-6 py-4">
                                                    Produk
                                                </th>
                                                <th scope="col" class="px-6 py-4">
                                                    Status
                                                </th>
                                                <th scope="col" class="px-6 py-4">
                                                    Timestamp
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr v-for="(order, index) in filteredOrders" :key="index" class="bg-white border-b hover:bg-gray-100">
                                                    <th scope="row" class="p-6 font-medium">
                                                        {{ index + 1 }}
                                                    </th>
                                                    <td class="p-6 w-1/2">
                                                        {{ order.order_item[0].product.name }}
                                                    </td>
                                                    <td id="status" class="p-6">
                                                        {{ statusMap[order.status_id] }}
                                                    </td>
                                                    <td id="timestamp" class="p-6">
                                                        {{ formatDate(order.created_at) }}
                                                    </td>
                                                </tr>
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { watchEffect } from 'vue';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
	components: {
		BumdesSidebarNavigation,
	},
    data() {
		return {
			orders: [],
            store: [],
			idStore: '', 
			userId: '',
			statusMap: {
				1: "Belum Dibayar",
				2: "Diproses",
				3: "Selesai",
				4: "Dibatalkan"
			},
		};
	},
    computed: {
        filteredOrders() {
            return Array.isArray(this.orders) ? this.orders : [];
        }
    },
    async mounted() {
        this.idStore = this.$route.params.id;
        console.log("idStore diperbarui:", this.idStore);

        if (this.idStore) {
            await this.fetchOrderData();
        }
    },
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
        async fetchOrderData() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/bumdes/${this.idStore}/order`, {
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    }
                });

                console.log("Full API Response:", response.data);
                if (response.data && response.data.data) {
                    this.orders = response.data.data;
                    console.log("Data Order berhasil diperoleh:", this.orders);
                } else {
                    console.warn("Data Order kosong atau tidak sesuai format!");
                }
            } catch (error) {
                console.error("Gagal mengambil data orders:", error);
            }
        },
        formatDate(dateString) {
            if (!dateString) return ""; // Jika tidak ada tanggal, kembalikan string kosong

            const months = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];

            const date = new Date(dateString);
            
            const day = date.getDate(); // Tanggal
            const month = months[date.getMonth()]; // Nama bulan
            const year = date.getFullYear(); // Tahun
            const hours = date.getHours().toString().padStart(2, '0'); // Jam (2 digit)
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Menit (2 digit)

            return `${day} ${month} ${year} ${hours}:${minutes}`;
        },
	},
    watch: {
        orders: {
            handler(newOrders) {
                console.log("Orders diperbarui:", newOrders);
            },
            deep: true
        },
        idStore(newId) {
            console.log("idStore diperbarui:", newId);
        }
	}
};
</script>
