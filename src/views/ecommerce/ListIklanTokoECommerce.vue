<template>
	<div>
		<Navbar v-if="isLoggedIn" />
		<UnsignedNavbar v-else />
		<div class="mt-28 mx-48 mb-12">
			<div class="bg-white w-full h-fit rounded-2xl p-10">
				<!-- BIO TOKO -->
				<div class="bg-toko flex h-full rounded-xl p-10">
					<img
						src="../../assets/images/toko-pict.jpg"
						alt=""
						class="h-40 w-40 object-cover rounded-full border border-gray-200"
					/>
					<RouterLink
						:to="{ path: '/toko/' + store.id + '/detail' }"
						class="ml-10"
					>
						<div class="text-white font-bold text-2xl">{{
							store.storeName
						}}</div>
						<div class="text-white text-lg mt-3">{{
							store.categoryName || 'Kategori Tidak Ditemukan'
						}}</div>
						<div class="flex gap-2 mt-6">
							<img
								src="../../assets/images/icon-location-white.png"
								alt=""
								class="h-6 w-6"
							/>
							<div class="text-white w-80"
								>{{ user.addressDetail || 'Alamat tidak tersedia' }},
								{{
									subDistrict.subDistrictName || 'Subdistrict tidak ditemukan'
								}}, {{ district || 'District tidak ditemukan' }}</div
							>
						</div>
					</RouterLink>
					<div class="ml-40">
						<div class="flex gap-6 items-center mt-6">
							<img
								src="../../assets/images/icon-package-white.png"
								alt=""
								class="h-8 w-8"
							/>
							<div class="text-white text-xl">10 Produk</div>
						</div>
						<div class="flex gap-6 items-center mt-5">
							<img
								src="../../assets/images/icon-cart.png"
								alt=""
								class="h-8 w-8"
							/>
							<div class="text-white text-xl">300 Terjual</div>
						</div>
						<div class="flex gap-6 items-center mt-5">
							<img
								src="../../assets/images/icon-clock-white.png"
								alt=""
								class="h-8 w-8"
							/>
							<div class="text-white text-xl"
								>{{ store.openTime }} - {{ store.closeTime }}</div
							>
						</div>
					</div>
					<div class="ml-40">
						<div class="flex gap-6 mt-6">
							<img
								src="../../assets/images/icon-user-check-white.png"
								alt=""
								class="h-7 w-7"
							/>
							<div class="text-white text-lg"
								>Bergabung {{ formatDate(store.created_at) }}</div
							>
						</div>
						<div class="flex gap-8 mt-6">
							<div
								class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg"
								>PIRT</div
							>
							<div
								class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg"
								>Halal</div
							>
						</div>
						<div class="flex gap-6 mt-6">
							<img
								src="../../assets/images/icon-phone-white.png"
								alt=""
								class="h-8 w-8"
							/>
							<div class="text-white text-xl">Kontak Toko</div>
						</div>
					</div>
				</div>

				<!-- LIST IKLAN -->
				<div class="flex justify-between items-center mt-12">
					<div class="text-3xl font-bold text-font ml-4">Iklan & Promosi</div>
				</div>
				<div
					class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6"
				>
					<div
						v-for="(iklan, index) in iklan"
						:key="index"
						class="w-full border bg-white border-gray-300 px-4 py-2 rounded-xl"
					>
						<RouterLink :to="{ path: '/iklan/' + iklan.id + '/detail' }">
							<img
								:src="getBannerImageUrl(iklan.banner)"
								alt=""
								class="h-70 w-full object-cover rounded-xl border border-gray-200"
							/>
							<div class="w-full my-2">
								<div class="w-full justify-between">
									<div class="font-bold text-font text-2xl text-center">{{
										iklan.title
									}}</div>
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
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
	data() {
		return {
			loading: true,
			store: [],
			iklan: [],
			idUserToko: '',
			loading: true,
			idDistrict: '',
			idSubDistrict: '',
			district: '',
			subDistrict: '',
			licenceFile: [],
			user: {},
		};
	},
	async mounted() {
		this.idStore = this.$route.params.id; // Ambil id dari URL
		this.getStore(this.idStore);
		if (this.idUserToko) {
			await this.getUser(this.idUserToko);
			if (this.user.idDistrict) {
				this.getDistrict(this.user.idDistrict);
			}
			if (this.user.idSubDistrict) {
				this.getSubDistrict(this.user.idSubDistrict);
			}
		}
		this.getIklan();
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
		getStore() {
			axios
				.get(`https://api.isnunas.my.id/api/store/${this.idStore}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					this.store = res.data.data;
					console.log('Data store:', this.store);
					if (this.store && this.store.idUser) {
						this.idUserToko = this.store.idUser; // Simpan idUser pemilik toko
						console.log('ID User Pemilik Toko:', this.idUserToko);

						// Setelah mendapatkan idUserPemilikToko, panggil getUser
						this.$nextTick(() => {
							this.getUser(this.idUserToko);
						});
					} else {
						console.warn('idUser Pemilik Toko tidak ditemukan dalam store.');
					}
				})
				.catch(error => {
					console.error('Error fetching store data:', error);
				});
		},
		async getUser(idUserToko) {
			console.log(
				'🚀 getUser dipanggil dengan:',
				idUserToko,
				typeof idUserToko,
			);

			try {
				const response = await axios.get(
					`https://api.isnunas.my.id/api/user/${idUserToko}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);

				this.user = response.data.data;
				console.log('Data User:', this.user);
				if (this.user.idDistrict) {
					this.getDistrict(this.user.idDistrict); // Panggil getDistrict untuk mengambil data district
				}
				if (this.user.idSubDistrict) {
					this.getSubDistrict(this.user.idSubDistrict);
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		},
		getDistrict(idDistrict) {
			axios
				.get(`https://api.isnunas.my.id/api/districts/${idDistrict}`)
				.then(response => {
					console.log(response.data); // Periksa output di browser console
					if (response.data.success) {
						this.district = response.data.district;
						console.log(this.district);
						if (this.district && this.district.idSubDistrict) {
							this.getSubDistrict(this.district.idSubDistrict);
						}
					}
				})
				.catch(error => {
					console.error(error);
					this.district = 'Data Kecamatan Tidak Ditemukan';
				});
		},
		// Menambahkan metode untuk mendapatkan data subDistrict
		getSubDistrict(idSubDistrict) {
			console.log('Fetching subdistrict with ID:', idSubDistrict);
			axios
				.get(`https://api.isnunas.my.id/api/subdistricts/data/${idSubDistrict}`)
				.then(res => {
					console.log('Subdistrict API Response:', res.data);
					if (res.data) {
						this.subDistrict = res.data;
						console.log(this.subDistrict.subDistrictName);
					} else {
						this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
					}
				})
				.catch(error => {
					console.error('Error fetching subdistrict data:', error);
					this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
				});
		},
		async getIklan() {
			try {
				const res = await axios.get(
					`https://api.isnunas.my.id/api/store/${this.idStore}/advertisement`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				console.log(res.data);
				this.iklan = res.data.data;
			} catch (error) {
				console.error('Error fetching ads:', error);
			}
		},
		getBannerImageUrl(banner) {
			if (banner) {
				return `https://api.isnunas.my.id/storage/${banner}`;
			}
			return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
		},
	},
};
</script>
