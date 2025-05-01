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
							:to="{ path: '/bumdes/toko/' + store.id + '/detail' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Profil Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + store.id + '/profil' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Profil Pemilik Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + store.id + '/statistik' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Statistik Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + store.id + '/produk' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Produk Toko</RouterLink
						>
						<RouterLink
							:to="{ path: '/bumdes/toko/' + store.id + '/riwayat' }"
							class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold"
							>Riwayat Penjualan</RouterLink
						>
					</div>
					<!-- CONTENT -->
					<div class="pl-12 items-center">
						<h2 class="font-bold text-2xl text-font">Detail Produk</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<!-- DATA -->
						<div>
							<div class="flex mt-6 justify-between">
								<div
									class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-8"
								>
									<div
										v-for="(file, index) in produk.files"
										:key="index"
										class="m-1"
									>
										<img
											:src="getImageUrl(file)"
											id="fotoproduk"
											alt="Foto Produk"
											class="h-36 w-36 rounded-lg object-cover"
										/>
									</div>
								</div>
								<div class="ml-auto text-right mr-8">
									<span class="text-font font-normal"
										>Ditambahkan pada {{ formatDate(produk.created_at) }}</span
									>
									<div class="flex mt-4 items-center gap-2 justify-end">
										<img src="../../../assets/images/icon-cart-2.png" alt="" />
										<div class="flex gap-1">
											<span id="totalsell" class="text-font font-normal"
												>{{ produk.total_sold }}
											</span>
											<span class="text-font font-normal">Terjual</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ml-10">
							<div class="flex">
								<div class="text-font w-60">
									<h4 class="text-md font-bold py-2">Nama</h4>
								</div>
								<div class="text-font text-md font-normal pr-6 w-[800px]">
									<h4 id="name-produk" class="py-2">{{ produk.name }}</h4>
								</div>
							</div>
							<div class="flex">
								<div class="text-font w-60">
									<h4 class="text-md font-bold py-2">Harga</h4>
								</div>
								<div class="text-font text-md font-normal pr-6 w-[800px]">
									<h4 id="produk-price" class="py-2">{{ produk.price }}</h4>
								</div>
							</div>
							<div class="flex">
								<div class="text-font w-60">
									<h4 class="text-md font-bold py-2">Stok</h4>
								</div>
								<div class="text-font text-md font-normal pr-6 w-[800px]">
									<h4 id="avail-stok" class="py-2">{{ produk.stock }}</h4>
								</div>
							</div>
							<div class="">
								<div class="text-font w-60">
									<h4 class="text-md font-bold py-2">Deskripsi</h4>
								</div>
								<div class="text-font text-md font-normal pr-6 w-full">
									<h4 id="produk-desc" class="py-2">{{
										produk.description
									}}</h4>
								</div>
							</div>
						</div>
						<hr class="h-px mx-10 my-8 bg-gray-400 border-1" />

						<!-- ULASAN -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
	data() {
		return {
			loading: true,
			store: [],
			licenceFile: [],
			produk: [],
			user: {},
			idUserToko: '',
			idProduct: '',
		};
	},
	mounted() {
		this.idStore = this.$route.params.id; // Ambil id dari URL
		this.getStore(this.idStore);
		if (this.idUserToko) {
			this.getUser(this.idUserToko);
		}
		this.produkId = this.$route.params.idProduct;
		this.getProduk(this.$route.params.idProduct);
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
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		},
		async getProduk(idProduct) {
			try {
				const res = await axios.get(
					`https://api.isnunas.my.id/api/store/${this.idStore}/product/${idProduct}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				console.log(res.data);
				this.produk = res.data.data;
			} catch (error) {
				console.error('Error fetching ads:', error);
			}
		},
		getImageUrl(file) {
			if (file && file.file) {
				return `https://api.isnunas.my.id/storage/${file.file}`;
			}
			return '/assets/images/no-image.png'; // Placeholder jika gambar tidak tersedia
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
