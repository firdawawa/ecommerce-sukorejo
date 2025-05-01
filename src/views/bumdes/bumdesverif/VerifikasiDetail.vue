<template>
	<div>
		<BumdesSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-12 py-4 mx-5 -mt-2 mb-2 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 text-font">
						Antrian Verifikasi Toko Baru</div
					>
					<!-- <div class="flex border border-gray-400 rounded-xl py-2 px-10 gap-3 mr-12 items-center">
						<img src="../../../assets/images/icon-filter.png" alt="Icon Filter">
						<span class="text-primary font-semibold text-xl">Filter</span>
					</div> -->
				</div>
				<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
				<!-- DATA -->
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Tanggal Pendaftaran</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="date-regist" class="py-2">{{
							formatDate(store.created_at)
						}}</h4>
					</div>
				</div>
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Nama</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="name" class="py-2">{{ user.name || 'Memuat...' }}</h4>
					</div>
				</div>
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Nomor Telepon</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="phone" class="py-2">{{
							user.phoneNumber || 'Nomor Telepon tidak tersedia'
						}}</h4>
					</div>
				</div>
				<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Nama Toko</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="store-name" class="py-2">{{ store.storeName }}</h4>
					</div>
				</div>
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Kategori Toko</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="category" class="py-2">{{
							store.categoryName || 'Kategori Tidak Ditemukan'
						}}</h4>
					</div>
				</div>
				<div class="flex">
					<div class="text-font w-60">
						<h4 class="text-md font-bold py-2">Alamat</h4>
					</div>
					<div class="text-font text-md font-normal pr-6 w-[800px]">
						<h4 id="address" class="py-2"
							>{{ user.addressDetail || 'Alamat tidak tersedia' }},
							{{ district || 'District tidak ditemukan' }}</h4
						>
					</div>
				</div>
				<!-- ACTION BUTTON -->
				<div class="flex gap-6 mt-20 mb-12">
					<button
						@click="deleteStore"
						class="flex gap-4 bg-red-500 content-center justify-center align-middle w-1/2 py-4 px-4 rounded-lg"
					>
						<span class="text-white font-medium text-lg">Tolak</span>
					</button>
					<button
						@click="verifStore"
						class="flex gap-4 bg-green-500 content-center justify-center align-middle w-1/2 py-4 px-4 rounded-lg"
					>
						<span class="text-white font-medium text-lg">Verifikasi</span>
					</button>
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
			loading: true,
			idDistrict: '',
			// idSubDistrict: '',
			store: [],
			district: '',
			// subDistrict: '',
			licenceFile: [],
			user: {},
			idUserToko: '',
		};
	},
	mounted() {
		this.idStore = this.$route.params.id; // Ambil id dari URL
		this.getStore(this.idStore);
		if (this.idUserToko) {
			this.getUser(this.idUserToko);
		}
		if (this.idDistrict) {
			this.getDistrict(this.idDistrict);
		}
		this.idSubDistrict = this.user.idSubDistrict;
		if (this.idSubDistrict) {
			this.getSubDistrict(this.idSubDistrict);
		}
	},
	components: {
		BumdesSidebarNavigation,
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
					}
				})
				.catch(error => {
					console.error(error);
					this.district = 'Data Kecamatan Tidak Ditemukan';
				});
		},
		async verifStore() {
			try {
				const response = await axios.put(
					`https://api.isnunas.my.id/api/verification/${this.idStore}`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);

				alert(response.data.message); // Menampilkan pesan sukses
				this.$router.push('/bumdes/verifikasi'); // Navigasi setelah verifikasi berhasil
			} catch (error) {
				console.error('Error verifying store:', error);
				alert('Gagal melakukan verifikasi toko.');
			}
		},
		async deleteStore() {
			if (!confirm('Apakah Anda yakin ingin menghapus toko ini?')) return;

			try {
				const response = await axios.delete(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);

				alert(response.data.message); // Menampilkan pesan sukses
				this.$router.push('/bumdes/verifikasi'); // Navigasi setelah toko dihapus
			} catch (error) {
				console.error('Error deleting store:', error);
				alert('Gagal menghapus toko.');
			}
		},
	},
	watch: {
		idUserToko(newVal) {
			if (newVal) {
				this.getUser(newVal);
			}
		},
	},
};
</script>
