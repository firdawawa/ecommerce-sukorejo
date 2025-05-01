<template>
	<div>
		<Navbar v-if="isLoggedIn" />
		<UnsignedNavbar v-else />
		<div class="mt-28 mx-48 mb-12">
			<!-- KATEGORI -->
			<div class="relative bg-white w-full h-fit rounded-2xl py-6 px-6">
				<div class="text-4xl font-bold text-font">Toko</div>
				<div class="flex gap-2 content-center mt-6">
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-food.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white"
							>Makanan & Minuman</div
						>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-fashion.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Fashion</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-kerajinan.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Kerajinan</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-kosmetik.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Kecantikan</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-pertanian.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Agribisnis</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-peternakan.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Peternakan</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-elektronik.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Elektronik</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-otomotif.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Otomotif</div>
					</RouterLink>
				</div>
				<div class="flex gap-2 content-center mt-4">
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-toserba.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Toserba</div>
					</RouterLink>
					<RouterLink
						to=""
						class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40"
					>
						<img
							src="../../assets/images/icon-lainnya.png"
							alt="icon-food"
							class="content-center"
						/>
						<div class="text-lg text-font hover:text-white">Lainnya</div>
					</RouterLink>
				</div>
			</div>

			<!-- LIST TOKO -->
			<div class="bg-white w-full h-full rounded-2xl mt-4">
				<div class="grid grid-cols-2 px-8 gap-4 gap-y-0">
					<div
						v-for="(store, index) in store"
						:key="index"
						class="relative py-6 w-full"
					>
						<RouterLink
							:to="{ path: '/toko/' + store.id + '/detail' }"
							class="flex w-full border bg-white border-gray-300 px-8 py-6 rounded-xl"
						>
							<img
								:src="getImageUrl(store.shopProfileImg)"
								alt=""
								class="h-40 w-40 object-cover rounded-full border border-gray-200"
							/>
							<div class="block ml-6 w-full mt-2">
								<div class="flex w-full justify-between">
									<div class="font-bold text-font text-3xl">{{
										store.storeName
									}}</div>
									<div class="flex gap-2">
										<div
											class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg"
											>PIRT</div
										>
										<div
											class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg"
											>Halal</div
										>
									</div>
								</div>
								<div class="flex justify-between mt-4">
									<div class="text-light text-lg text-font">{{
										getCategoryName(store.idCategory)
									}}</div>
									<div class="flex gap-2">
										<img
											src="../../assets/images/icon-user-check.png"
											alt=""
											class="h-7 w-7"
										/>
										<div class="text-light text-lg text-font">{{
											formatDate(store.created_at)
										}}</div>
									</div>
								</div>
								<div class="flex mt-6 justify-between">
									<div class="flex gap-2 items-center justify-center">
										<img
											src="../../assets/images/icon-package.png"
											alt=""
											class="h-8 w-8"
										/>
										<div class="font-medium text-xl text-font"
											>{{ store.products_count }} Produk</div
										>
									</div>
									<div class="flex gap-2 items-center justify-center">
										<img
											src="../../assets/images/icon-cart-3.png"
											alt=""
											class="h-8 w-8"
										/>
										<div class="font-medium text-xl text-font"
											>{{
												store.totalSold !== undefined ? store.totalSold : '0'
											}}
											Terjual</div
										>
										<!-- TAMBAH KODE TOTAL TERJUAL TOKO DISINI -->
									</div>
									<div class="flex gap-2 items-center justify-center">
										<img
											src="../../assets/images/icon-clock.png"
											alt=""
											class="h-8 w-8"
										/>
										<div class="font-medium text-xl text-font"
											>{{ store.openTime }} - {{ store.closeTime }}</div
										>
									</div>
								</div>
							</div>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';
import placeholderImage from '../../assets/images/no-image.png';
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
	data() {
		return {
			categories: {},
			store: [],
			storesold: [],
			users: {}, // Objek untuk menyimpan biodata user berdasarkan idUser mereka
		};
	},
	mounted() {
		this.getCategories();
		this.getStore();
	},
	components: {
		Navbar,
		UnsignedNavbar,
	},
	computed: {
		isLoggedIn() {
			return !!localStorage.getItem('token');
		},
	},
	methods: {
		formatDate(date) {
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

			const d = new Date(date);
			const day = d.getDate().toString().padStart(2, '0');
			const month = months[d.getMonth()]; // Mendapatkan nama bulan dari array
			const year = d.getFullYear();

			return `${day} ${month} ${year}`;
		},
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		getCategories() {
			axios
				.get(`https://api.isnunas.my.id/api/categories`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					// Simpan daftar kategori dalam objek, key = idCategory, value = categoryName
					this.categories = res.data.data.reduce((acc, category) => {
						acc[category.id] = category.categoryName;
						return acc;
					}, {});
				})
				.catch(error => {
					console.error('Error fetching categories:', error);
				});
		},
		getCategoryName(idCategory) {
			return this.categories[idCategory] || 'Memuat...';
		},
		getUser(idUser) {
			// Cek apakah user sudah ada di objek users untuk menghindari pemanggilan API berulang
			if (this.users[idUser]) return;

			axios
				.get(`https://api.isnunas.my.id/api/user/${idUser}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					// Gunakan spread operator agar Vue tetap reaktif
					this.users = { ...this.users, [idUser]: res.data.data };
				})
				.catch(error => {
					console.error('Error fetching user data:', error);
				});
		},
		getStore() {
			axios
				.get(`https://api.isnunas.my.id/api/store`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					this.store = res.data.data;
					this.store.forEach(store => {
						this.getTotalSold(store.id);
						this.getUser(store.idUser); // Ambil data user pemilik toko
					});
				})
				.catch(error => {
					console.error('Error fetching store data:', error);
				});
		},
		getTotalSold(idStore) {
			axios
				.get(`https://api.isnunas.my.id/api/store/${idStore}/totalsold`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					console.log(`Total sold for store ${idStore}:`, res.data); // Debugging

					// Cari index store yang sesuai
					const storeIndex = this.store.findIndex(
						store => store.id === idStore,
					);
					if (storeIndex !== -1) {
						this.store[storeIndex].totalSold = res.data.total_sold;
					}
				})
				.catch(error => {
					console.error(
						`Error fetching total sold for store ${idStore}:`,
						error,
					);
				});
		},

		getImageUrl(shopProfileImg) {
			if (shopProfileImg) {
				return `https://api.isnunas.my.id/storage/${shopProfileImg}`;
			}
			return placeholderImage; // Gunakan import statis
		},
	},
};
</script>
