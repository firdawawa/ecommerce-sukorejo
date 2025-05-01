<template>
	<div>
		<Navbar v-if="isLoggedIn" />
		<UnsignedNavbar v-else />
		<div class="mt-28 mx-48 mb-12">
			<!-- KATEGORI -->
			<div class="relative bg-white w-full h-full rounded-2xl py-6 px-6">
				<div class="text-4xl font-bold text-font">Iklan & Promosi</div>
				<div
					class="border border-gray-400 rounded-2xl w-full h-full pt-6 pb-16 px-32 my-8"
				>
					<div class="flex justify-center">
						<img
							:src="getImageUrl(advertisement.banner)"
							alt=""
							class="rounded-xl h-96"
						/>
					</div>
					<div class="flex font-bold text-3xl text-font justify-center mt-8">{{
						advertisement.title
					}}</div>
					<div class="flex justify-between mt-12">
						<div v-if="advertisement.store">
							<div class="flex gap-4 items-center">
								<img
									src="../../assets/images/icon-store.png"
									alt=""
									class="h-8"
								/>
								<div class="text-font text-xl">{{
									advertisement.store.storeName
								}}</div>
							</div>
							<div class="text-font text-xl mt-5 ml-12">
								{{
									categoryMap[advertisement.store.idCategory] ||
									'Kategori Tidak Diketahui'
								}}
							</div>
						</div>
						<div>
							<div class="flex gap-4 items-center">
								<img
									src="../../assets/images/icon-link.png"
									alt=""
									class="h-12"
								/>
								<div class="text-font text-xl">{{ advertisement.advurl }}</div>
							</div>
							<div class="text-font text-xl mt-2 ml-16"
								>Ditambahkan pada
								{{ formatDate(advertisement.created_at) }}</div
							>
						</div>
					</div>
					<div class="font-bold text-font text-2xl mt-6">Deskripsi</div>
					<div class="text-font text-xl mt-4 text-justify">{{
						advertisement.description
					}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
	data() {
		return {
			categories: {},
			advertisement: {},
			users: {}, // Objek untuk menyimpan biodata user berdasarkan idUser mereka
			categoryMap: {
				1: 'Makanan & Minuman',
				2: 'Kerajinan',
				3: 'Fashion',
				4: 'Agribisnis',
				5: 'Kecantikan',
				6: 'Peternakan',
				7: 'Otomotif',
				8: 'Elektronik',
				9: 'Toserba',
				10: 'Lainnya',
			},
		};
	},
	mounted() {
		const advId = this.$route.params.id; // Ambil advId dari route params dengan benar
		if (advId) {
			this.getAdvertisement(advId);
		} else {
			console.error('Error: advId tidak ditemukan di route params.');
		}
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
		getAdvertisement(advId) {
			axios
				.get(`https://api.isnunas.my.id/api/advertisement/${advId}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					this.advertisement = res.data.data;
					// this.advertisement.forEach(advertisement => {
					// 	this.getUser(advertisement.idUser); // Ambil data user pemilik toko
					// });
				})
				.catch(error => {
					console.error('Error fetching store data:', error);
				});
		},
		getImageUrl(banner) {
			if (banner) {
				return `https://api.isnunas.my.id/storage/${banner}`;
			}
			return '/assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
	},
};
</script>
