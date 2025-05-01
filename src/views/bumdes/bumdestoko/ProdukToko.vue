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
						<h2 class="font-bold text-2xl text-font mb-10">Produk Toko</h2>
						<div
							class="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 mb-10"
						>
							<table class="w-full text-md text-left rtl:text-right text-font">
								<thead class="text-lg font-semibold text-white bg-primary">
									<tr>
										<th scope="col" class="px-6 py-4"> No </th>
										<th scope="col" class="px-6 py-4"> Nama Produk </th>
										<th scope="col" class="px-6 py-4"> Harga </th>
										<th scope="col" class="px-6 py-4"> Stok </th>
										<th scope="col" class="px-6 py-4"> Terjual </th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(produk, index) in produk"
										:key="index"
										class="bg-white border-b hover:bg-gray-100"
									>
										<th scope="row" class="px-6 py-4 font-medium">
											<RouterLink
												:to="{
													path:
														'/bumdes/toko/' +
														store.id +
														'/produk/' +
														produk.id +
														'/detail',
												}"
												class="flex gap-4 items-center"
											>
												{{ index + 1 }}
											</RouterLink>
										</th>
										<td class="px-6 py-4 w-1/2">
											<RouterLink
												:to="{
													path:
														'/bumdes/toko/' +
														store.id +
														'/produk/' +
														produk.id +
														'/detail',
												}"
												class="flex gap-4 items-center"
											>
												<div class="flex gap-4 items-center">
													<img
														:src="getImageUrl(produk.files)"
														id="fotoproduk"
														alt="Foto Produk"
														class="h-12 w-12 rounded-lg object-cover"
													/>
													<span
														id="namaproduk"
														class="font-md text-font font-semibold"
														>{{ produk.name }}</span
													>
												</div>
											</RouterLink>
										</td>
										<td id="price" class="px-6 py-4">
											<RouterLink
												:to="{
													path:
														'/bumdes/toko/' +
														store.id +
														'/produk/' +
														produk.id +
														'/detail',
												}"
												class="flex gap-4 items-center"
											>
												{{ produk.price }}
											</RouterLink>
										</td>
										<td id="stok" class="px-6 py-4">
											<RouterLink
												:to="{
													path:
														'/bumdes/toko/' +
														store.id +
														'/produk/' +
														produk.id +
														'/detail',
												}"
												class="flex gap-4 items-center"
											>
												{{ produk.stock }}
											</RouterLink>
										</td>
										<td id="sold" class="px-6 py-4">
											{{ produk.total_sold }}
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
			idStore: '',
		};
	},
	mounted() {
		this.idStore = this.$route.params.id; // Ambil id dari URL
		this.getStore(this.idStore);
		if (this.idUserToko) {
			this.getUser(this.idUserToko);
		}
		this.getProduk();
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
		async getProduk() {
			try {
				const res = await axios.get(
					`https://api.isnunas.my.id/api/store/${this.idStore}/product`,
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
		getImageUrl(files) {
			if (files && files.length > 0) {
				return `https://api.isnunas.my.id/storage/${files[0].file}`;
			}
			return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
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
