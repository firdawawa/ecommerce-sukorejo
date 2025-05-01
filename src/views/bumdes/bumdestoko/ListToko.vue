<template>
	<div>
		<BumdesSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-12 py-4 mx-5 -mt-2 mb-2 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl my-4 text-font"> Daftar Toko </div>
					<!-- <div class="flex border border-gray-400 rounded-xl py-2 px-10 gap-3 mr-12 items-center">
						<img src="../../../assets/images/icon-filter.png" alt="Icon Filter">
						<span class="text-primary font-semibold text-xl">Filter</span>
					</div> -->
				</div>
				<!-- TOKO CARD -->
				<div class="relative" v-for="(store, index) in store" :key="index">
					<RouterLink
						:to="{ path: '/bumdes/toko/' + store.id + '/detail' }"
						class="relative border border-gray-300 rounded-3xl w-full my-4 px-8 py-4 h-32 flex items-center"
					>
						<!-- <img :src="getImageUrl(toko.banner)" alt="Toko" class="rounded-full h-20 w-20 object-cover border border-gray-400"> -->
						<div class="ml-8">
							<div id="storeName" class="text-font font-bold text-xl">
								{{ store.storeName }}
							</div>
							<div id="sellerName" class="text-font font-normal text-xl mt-2">
								{{
									users[store.idUser] ? users[store.idUser].name : 'Memuat...'
								}}
							</div>
						</div>
						<div
							id="category"
							class="text-gray-500 font-light text-xl absolute top-8 right-16"
						>
							{{ getCategoryName(store.idCategory) }}
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
	data() {
		return {
			categories: {},
			store: [],
			users: {}, // Objek untuk menyimpan biodata user berdasarkan idUser mereka
		};
	},
	mounted() {
		this.getCategories();
		this.getStore();
	},
	components: {
		BumdesSidebarNavigation,
	},
	methods: {
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
						this.getUser(store.idUser); // Ambil data user pemilik toko
					});
				})
				.catch(error => {
					console.error('Error fetching store data:', error);
				});
		},
	},
};
</script>
