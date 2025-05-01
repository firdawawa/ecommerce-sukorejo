<template>
	<div>
		<BumdesSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 text-font ml-10"> Statistik </div>
				</div>
				<div class="mt-10 grid grid-cols-[17rem_1fr] divide-x-2">
					<!-- MINI NAV -->
					<div class="block w-56 m-6 -mt-2">
						<RouterLink
							to="/bumdes/overview/month"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Bulan Ini</RouterLink
						>
						<RouterLink
							to="/bumdes/overview"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Seluruh Data</RouterLink
						>
					</div>
					<!-- CONTENT -->
					<div class="pl-12 items-center">
						<h2 class="font-bold text-2xl text-font">Statistik Toko</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<div class="flex justify-between">
							<div
								class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
							>
								<div class="text-font">Jumlah Toko</div>
								<div class="text-secondary font-bold text-4xl">{{
									totalStores
								}}</div>
							</div>
							<div
								class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
							>
								<select
									v-model="selectedYear"
									@change="fetchStoreData"
									class="border rounded px-4 py-2"
								>
									<option v-for="year in years" :key="year" :value="year">
										{{ year }}
									</option>
								</select>
							</div>
						</div>
						<div class="w-[90%] mx-auto mt-8 h-96">
							<BarChart v-if="chartDataStores" :chartData="chartDataStores" />
							<p v-else class="text-gray-500">Memuat data...</p>
						</div>

						<h2 class="font-bold text-2xl mt-16 text-font"
							>Statistik Penjualan</h2
						>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<div class="flex justify-between">
							<div
								class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
							>
								<div class="text-font">Jumlah Produk</div>
								<div class="text-secondary font-bold text-4xl">{{
									totalProducts
								}}</div>
							</div>
							<div
								class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
							>
								<select
									v-model="selectedYear"
									@change="fetchProductData"
									class="border rounded px-4 py-2"
								>
									<option v-for="year in years" :key="year" :value="year">
										{{ year }}
									</option>
								</select>
							</div>
						</div>
						<div class="w-[90%] mx-auto mt-8 h-96">
							<BarChart
								v-if="chartDataProducts"
								:chartData="chartDataProducts"
							/>
							<p v-else class="text-gray-500">Memuat data...</p>
						</div>

						<h2 class="font-bold text-2xl mt-16 text-font"
							>Statistik Pendapatan</h2
						>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<div class="flex justify-between">
							<div
								class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
							>
								<div class="text-font">Jumlah Pendapatan</div>
								<div class="text-secondary font-bold text-4xl">{{
									totalSales
								}}</div>
							</div>
							<div
								class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
							>
								<select
									v-model="selectedYear"
									@change="fetchSalesData"
									class="border rounded px-4 py-2"
								>
									<option v-for="year in years" :key="year" :value="year">
										{{ year }}
									</option>
								</select>
							</div>
						</div>
						<div class="w-[90%] mx-auto mt-8 h-96">
							<BarChart v-if="chartDataSales" :chartData="chartDataSales" />
							<p v-else class="text-gray-500">Memuat data...</p>
						</div>

						<h2 class="font-bold text-2xl mt-16 text-font"
							>Statistik Penjualan</h2
						>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<div class="flex justify-between">
							<div
								class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
							>
								<div class="text-font">Jumlah Penjualan</div>
								<div class="text-secondary font-bold text-4xl">{{
									salesDataQuantity
								}}</div>
							</div>
							<div
								class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
							>
								<select
									v-model="selectedYear"
									@change="getMonthlySalesQuantity"
									class="border rounded px-4 py-2"
								>
									<option v-for="year in years" :key="year" :value="year">
										{{ year }}
									</option>
								</select>
							</div>
						</div>
						<div class="w-[90%] mx-auto mt-8 h-96">
							<BarChart
								v-if="chartDataSalesQuantity"
								:chartData="chartDataSalesQuantity"
							/>
							<p v-else class="text-gray-500">Memuat data...</p>
						</div>

						<h2 class="font-bold text-2xl mt-16 text-font"
							>Statistik Kategori Toko</h2
						>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<div class="mx-auto mt-8 h-96">
							<PieChart
								v-if="chartDataCategory"
								:chartData="chartDataCategory"
							/>
							<p v-else class="text-gray-500">Memuat data...</p>
						</div>

						<h2 class="font-bold text-2xl mt-16 text-font">Paling Laris</h2>
						<hr class="h-px mt-4 mr-8 bg-gray-400 border-1" />
						<div class="flex gap-20 mt-8">
							<div>
								<h2 class="font-bold text-2xl text-font">Produk Terlaris</h2>
								<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
								<ul class="space-y-4">
									<li
										v-for="product in bestSellingProducts"
										:key="product.id"
										class="flex items-center space-x-4 px-14 py-6 border rounded-lg shadow"
									>
										<div>
											<h3 class="text-lg font-semibold">{{ product.name }}</h3>
											<p class="text-md text-gray-500">{{
												product.store_name
											}}</p>
											<p class="text-lg text-green-600"
												>Terjual: {{ product.total_sold }}</p
											>
										</div>
									</li>
								</ul>
							</div>

							<div>
								<h2 class="font-bold text-2xl text-font">Toko Terlaris</h2>
								<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
								<ul class="space-y-4">
									<li
										v-for="store in bestSellingStores"
										:key="store.id"
										class="flex items-center space-x-4 px-14 py-9 border rounded-lg shadow"
									>
										<div>
											<h3 class="text-lg font-semibold">{{
												store.store_name
											}}</h3>
											<p class="text-lg text-green-600"
												>Total Penjualan: {{ store.total_sold }}</p
											>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { PieChart } from 'vue-chart-3';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarController,
	PieController,
} from 'chart.js';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	ArcElement,
	CategoryScale,
	LinearScale,
	BarController,
	PieController,
);

export default {
	components: {
		BumdesSidebarNavigation,
		BarChart,
		PieChart,
	},
	setup() {
		const chartDataSales = ref(null);
		const chartDataStores = ref(null);
		const chartDataProducts = ref(null);
		const chartDataSalesQuantity = ref(null);
		const chartDataCategory = ref(null);
		const selectedYear = ref(new Date().getFullYear());
		const years = ref([]);
		const totalStores = ref(0);
		const totalProducts = ref(0);
		const totalSales = ref(0);
		const salesDataQuantity = ref(0);
		const storesByCategory = ref([]);
		const bestSellingProducts = ref([]);
		const bestSellingStores = ref([]);

		const defaultCategories = [
			{ id: 1, name: 'Makanan dan Minuman' },
			{ id: 2, name: 'Kerajinan' },
			{ id: 3, name: 'Fashion' },
			{ id: 4, name: 'Agribisnis' },
			{ id: 5, name: 'Kecantikan' },
			{ id: 6, name: 'Peternakan' },
			{ id: 7, name: 'Otomotif' },
			{ id: 8, name: 'Elektronik' },
			{ id: 9, name: 'Toserba' },
			{ id: 10, name: 'Lainnya' },
		];

		// Generate daftar tahun dari 2020 - 2030
		for (let i = 2020; i <= 2030; i++) {
			years.value.push(i);
		}

		const fetchStoreData = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/all-stores',
					{
						params: { year: selectedYear.value },
					},
				);

				const storeData = response.data;

				const months = [
					'Januari',
					'Februari',
					'Maret',
					'April',
					'Mei',
					'Juni',
					'Juli',
					'Agustus',
					'September',
					'Oktober',
					'November',
					'Desember',
				];

				const formattedData = new Array(12).fill(0);
				storeData.forEach(item => {
					formattedData[item.month - 1] = item.total_stores;
				});

				chartDataStores.value = {
					labels: months,
					datasets: [
						{
							label: 'Jumlah Toko Terdaftar',
							backgroundColor: '#4A90E2',
							data: formattedData,
						},
					],
				};

				totalStores.value = formattedData.reduce((acc, val) => acc + val, 0);
			} catch (error) {
				console.error('Gagal mengambil data:', error);
			}
		};

		const fetchProductData = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/all-products',
					{
						params: { year: selectedYear.value },
					},
				);

				const productData = response.data;
				const formattedData = new Array(12).fill(0);

				productData.forEach(item => {
					formattedData[item.month - 1] = item.total_products;
				});

				chartDataProducts.value = {
					labels: [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'Mei',
						'Jun',
						'Jul',
						'Agu',
						'Sep',
						'Okt',
						'Nov',
						'Des',
					],
					datasets: [
						{
							label: 'Jumlah Produk',
							backgroundColor: '#E26A4A',
							data: formattedData,
						},
					],
				};

				totalProducts.value = formattedData.reduce((acc, val) => acc + val, 0);
			} catch (error) {
				console.error('Gagal mengambil data produk:', error);
			}
		};

		const fetchSalesData = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/all-income',
					{
						params: { year: selectedYear.value },
					},
				);

				const salesData = response.data;

				const months = [
					'Januari',
					'Februari',
					'Maret',
					'April',
					'Mei',
					'Juni',
					'Juli',
					'Agustus',
					'September',
					'Oktober',
					'November',
					'Desember',
				];

				const formattedData = new Array(12).fill(0);
				salesData.forEach(item => {
					formattedData[item.month - 1] = item.total_sales;
				});

				chartDataSales.value = {
					labels: months,
					datasets: [
						{
							label: 'Total Penjualan (Rp)',
							backgroundColor: '#4CAF50',
							data: formattedData,
						},
					],
				};

				totalSales.value = formattedData.reduce((acc, val) => acc + val, 0);
			} catch (error) {
				console.error('Gagal mengambil data penjualan:', error);
			}
		};

		const getMonthlySalesQuantity = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/all-sales',
					{
						params: { year: selectedYear.value },
					},
				);

				const salesData = response.data;
				const months = [
					'Januari',
					'Februari',
					'Maret',
					'April',
					'Mei',
					'Juni',
					'Juli',
					'Agustus',
					'September',
					'Oktober',
					'November',
					'Desember',
				];
				const formattedData = new Array(12).fill(0);

				salesData.forEach(item => {
					formattedData[item.month - 1] = Number(item.total_sold) || 0;
				});

				chartDataSalesQuantity.value = {
					labels: months,
					datasets: [
						{
							label: 'Jumlah Produk Terjual',
							backgroundColor: '#FF6384',
							data: formattedData,
						},
					],
				};

				// **Update salesDataQuantity dengan total jumlah produk terjual**
				salesDataQuantity.value = formattedData.reduce(
					(acc, val) => acc + val,
					0,
				);
			} catch (error) {
				console.error('Gagal mengambil data penjualan per bulan:', error);
			}
		};

		const fetchStoresByCategory = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/stores-category',
				);
				storesByCategory.value = response.data;

				// Buat array kategori dan jumlah toko
				const labels = storesByCategory.value.map(
					item => `Kategori ${item.category_id}`,
				);
				const data = storesByCategory.value.map(item => item.total_stores);

				chartDataCategory.value = {
					labels: [
						'Makanan dan Minuman',
						'Kerajinan',
						'Fashion',
						'Agribisnis',
						'Kecantikan',
						'Peternakan',
						'Otomotif',
						'Elektronik',
						'Toserba',
						'Lainnya',
					],
					datasets: [
						{
							label: 'Jumlah Toko per Kategori',
							backgroundColor: [
								'#FF6384',
								'#36A2EB',
								'#FFCE56',
								'#4CAF50',
								'#E26A4A',
								'#8E44AD',
								'#2ECC71',
								'#F39C12',
								'#3498DB',
								'#D35400',
							],
							data: data,
						},
					],
				};
			} catch (error) {
				console.error('Gagal mengambil data kategori toko:', error);
			}
		};

		const fetchBestSellingProducts = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/best-selling',
				);
				bestSellingProducts.value = response.data.data;
			} catch (error) {
				console.error('Error fetching best-selling products:', error);
			}
		};

		const fetchBestSellingStores = async () => {
			try {
				const response = await axios.get(
					'https://api.isnunas.my.id/api/statistics/best-selling-stores',
				);
				bestSellingStores.value = response.data.data;
			} catch (error) {
				console.error('Error fetching best-selling stores:', error);
			}
		};

		const fetchData = async () => {
			await fetchStoreData();
			await fetchProductData();
			await fetchSalesData();
			await getMonthlySalesQuantity();
			await fetchStoresByCategory();
			await fetchBestSellingProducts();
			await fetchBestSellingStores();
		};

		onMounted(() => {
			fetchData();
		});

		return {
			chartDataSales,
			chartDataStores,
			chartDataProducts,
			chartDataSalesQuantity,
			chartDataCategory,
			selectedYear,
			years,
			totalStores,
			totalProducts,
			totalSales,
			salesDataQuantity,
			fetchStoreData,
			fetchProductData,
			fetchSalesData,
			getMonthlySalesQuantity,
			fetchStoresByCategory,
			bestSellingProducts,
			bestSellingStores,
		};
	},
};
</script>
