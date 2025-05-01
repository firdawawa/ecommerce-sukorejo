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
					<div class="flex-1">
						<!-- Statistik Penjualan -->
						<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
							<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
								Statistik Penjualan
							</div>
							<hr class="h-px mb-2 mr-8 bg-gray-400 border-1" />
							<div class="flex justify-between">
								<div
									class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
								>
									<div class="text-font">Produk Terjual</div>
									<div class="text-secondary font-bold text-4xl">{{
										totalSold
									}}</div>
								</div>
								<div
									class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
								>
									<select
										v-model="selectedMonth"
										@change="fetchSalesData"
										class="border rounded px-4 py-2"
									>
										<option
											v-for="(month, index) in months"
											:key="index"
											:value="index + 1"
										>
											{{ month }}
										</option>
									</select>
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
								<BarChart v-if="chartData" :chartData="chartData" />
								<p v-else class="text-gray-500">Memuat data...</p>
							</div>
							<!-- Statistik Pendapatan -->
							<div class="font-bold text-2xl mt-20 mb-4 text-font ml-10">
								Statistik Pendapatan
							</div>
							<hr class="h-px mb-2 mr-8 bg-gray-400 border-1" />
							<div class="flex justify-between">
								<div
									class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4"
								>
									<div class="text-font">Total Pendapatan</div>
									<div class="text-secondary font-bold text-4xl"
										>Rp {{ totalIncome }}</div
									>
								</div>
								<div
									class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4"
								>
									<select
										v-model="selectedMonth"
										@change="fetchIncomeData"
										class="border rounded px-4 py-2"
									>
										<option
											v-for="(month, index) in months"
											:key="index"
											:value="index + 1"
										>
											{{ month }}
										</option>
									</select>
									<select
										v-model="selectedYear"
										@change="fetchIncomeData"
										class="border rounded px-4 py-2"
									>
										<option v-for="year in years" :key="year" :value="year">
											{{ year }}
										</option>
									</select>
								</div>
							</div>
							<div class="w-[90%] mx-auto mt-8 h-96">
								<BarChart v-if="incomeChartData" :chartData="incomeChartData" />
								<p v-else class="text-gray-500">Memuat data...</p>
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
import { watchEffect } from 'vue';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
	data() {
		return {
			store: [],
			userId: '',
			idStore: '',
			selectedMonth: new Date().getMonth() + 1,
			selectedYear: new Date().getFullYear(),
			months: [
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
			],
			years: Array.from({ length: 11 }, (_, i) => 2020 + i),
			totalSold: 0,
			totalIncome: 0,
			chartData: null,
			incomeChartData: null,
			navItems: [
				{ label: 'Profil Toko', path: '/detail' },
				{ label: 'Profil Pemilik Toko', path: '/profil' },
				{ label: 'Statistik Toko', path: '/statistik' },
				{ label: 'Produk Toko', path: '/produk' },
				{ label: 'Riwayat Penjualan', path: '/riwayat' },
			],
		};
	},
	components: {
		BumdesSidebarNavigation,
		BarChart,
	},
	mounted() {
		this.idStore = this.$route.params.id;
		this.fetchSalesData();
		this.fetchIncomeData();
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		async fetchSalesData() {
			try {
				const response = await axios.get(
					`https://api.isnunas.my.id/api/statistic-dailysales/${this.idStore}`,
					{
						params: { month: this.selectedMonth, year: this.selectedYear },
					},
				);
				this.totalSold = response.data.reduce(
					(sum, item) => sum + Number(item.total_sold),
					0,
				);
				this.chartData = {
					labels: response.data.map(item => item.date),
					datasets: [
						{
							label: 'Total Produk Terjual',
							backgroundColor: '#4A21C4',
							data: response.data.map(item => item.total_sold),
						},
					],
				};
			} catch (error) {
				console.error(error);
			}
		},
		async fetchIncomeData() {
			try {
				const response = await axios.get(
					`https://api.isnunas.my.id/api/statistic-dailyincome/${this.idStore}`,
					{
						params: { month: this.selectedMonth, year: this.selectedYear },
					},
				);
				this.totalIncome = response.data.reduce(
					(sum, item) => sum + Number(item.total_income),
					0,
				);
				this.incomeChartData = {
					labels: response.data.map(item => item.date),
					datasets: [
						{
							label: 'Total Pendapatan',
							backgroundColor: '#21C45A',
							data: response.data.map(item => item.total_income),
						},
					],
				};
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
