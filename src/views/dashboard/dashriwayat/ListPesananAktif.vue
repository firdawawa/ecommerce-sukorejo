<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-2 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 text-font ml-10"> Riwayat </div>
				</div>
				<div class="mt-10 grid grid-cols-[17rem_1fr] divide-x-2">
					<!-- MINI NAV -->
					<div class="block w-56 m-6 -mt-2">
						<RouterLink
							to="/dashboard/history/aktif"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Pesanan Aktif</RouterLink
						>
						<RouterLink
							to="/dashboard/history"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Riwayat Pesanan</RouterLink
						>
					</div>
					<!-- CONTENT -->
					<div class="pl-8 items-center">
						<h2 class="font-bold text-2xl text-font">Pesanan Aktif</h2>
						<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6 mr-6">
							<table class="w-full text-md text-left rtl:text-right text-font">
								<thead class="text-lg font-semibold text-white bg-primary">
									<tr>
										<th scope="col" class="px-6 py-4"> No </th>
										<th scope="col" class="px-6 py-4"> Produk </th>
										<th scope="col" class="px-6 py-4"> Pembelian </th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(order, index) in filteredOrders" :key="index" class="bg-white border-b hover:bg-gray-100">
										<th scope="row" class="p-6 font-medium"> 
											<RouterLink :to="{ path: '/dashboard/history/detail/' + order.id }">
												{{ index + 1 }}
											</RouterLink>
										</th>
										<td class="p-6 w-4/6">
											<RouterLink :to="{ path: '/dashboard/history/detail/' + order.id }">
												{{ order.order_item[0].product.name }}
											</RouterLink>
										</td>
										<td class="p-6"> 
											<RouterLink :to="{ path: '/dashboard/history/detail/' + order.id }">
												{{ formatDate(order.created_at) }}
											</RouterLink>
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
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
	created() {
		this.idStore = Number(localStorage.getItem('idStore'));
		this.userId = localStorage.getItem('userId');
	},
	data() {
		return {
			orders: [],
			lastOrderCount: 0,
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
			console.log("idStore yang dicari:", this.idStore);
			console.log("Orders saat ini:", this.orders);

			if (!this.orders || this.orders.length === 0) {
				console.warn("Orders masih kosong!");
				return [];
			}

			return this.orders.filter(order => 
				order.status_id === 2 && 
				Array.isArray(order.order_item) && 
				order.order_item.some(item => item?.store_id === this.idStore)
			);
		}
	},
	async mounted() {
		this.lastOrderCount = this.orders.length;
        this.polling = setInterval(this.checkNewOrders, 3000);
		await this.fetchOrderData();
	},
	beforeUnmount() {
        clearInterval(this.polling);
    },
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
		async checkNewOrders() {
			try {
				const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/${this.idStore}/order/count/active`, {
					headers: { 'Authorization': `Bearer ${token}` }
                });
				
                const newOrderCount = response.data.count;
				if (newOrderCount !== this.lastOrderCount) {
					console.log("Pesanan baru terdeteksi!");
					await this.fetchOrderData();
					this.lastOrderCount = newOrderCount;
					this.$forceUpdate(); // Paksa Vue untuk memperbarui tampilan
				}
            } catch (error) {
				console.error("Gagal mengecek jumlah pesanan:", error);
            }
        },
		async fetchOrderData() {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/order`, {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				this.orders = response.data.data || [];
				console.log("Data Order:", this.orders);

				this.$nextTick(() => {
					this.$forceUpdate();
				});
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
		orders(newOrders) {
			console.log("Data orders diperbarui:", newOrders);
		}
	}
};
</script>
