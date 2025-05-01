<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
						Detail Produk
					</div>
					<div class="mr-8 mt-2">
						<RouterLink
							:to="{ path: '/dashboard/produk/' + produk.id + '/edit' }"
						>
							<button
								class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
							>
								<img
									src="../../../assets/images/icon-edit.png"
									alt="edit"
									class="content-center"
								/>
								<span class="font-medium text-lg text-white content-center"
									>Edit Data</span
								>
							</button>
						</RouterLink>
					</div>
				</div>
				<!-- FOTO PRODUK -->
				<div>
					<div class="flex mt-6 justify-between">
						<div
							class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ml-8"
						>
							<div
								v-for="(file, index) in produk.files"
								:key="index"
								class="m-1"
							>
								<img
									:src="getImageUrl(file)"
									alt="Foto Produk"
									class="h-28 w-28 rounded-lg object-cover"
								/>
							</div>
						</div>
						<div class="ml-auto text-right mr-8">
							<!-- <span class="text-font font-normal">Ditambahkan pada 1 Agustus 2024</span> -->
							<div class="flex mt-4 items-center gap-2 justify-end">
								<img src="../../../assets/images/icon-cart-2.png" alt="" />
								<div class="flex gap-1">
									<span id="totalsell" class="text-font font-normal"
										>{{ produk.total_sold }}
									</span>
									<span class="text-font font-normal">Terjual</span>
								</div>
							</div>
							<div class="mt-4">
								<span id="createdat" class="text-font font-normal"
									>Ditambahkan pada {{ formatDate(produk.created_at) }}
								</span>
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
							<h4 id="produk-desc" class="py-2">{{ produk.description }}</h4>
						</div>
					</div>
				</div>
				<hr class="h-px mx-10 my-8 bg-gray-400 border-1" />

				<!-- ULASAN -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
	created() {
		this.idStore = localStorage.getItem('idStore');
	},
	data() {
		return {
			idProduct: '',
			idStore: '',
			produk: [],
		};
	},
	mounted() {
		this.produkId = this.$route.params.id;
		this.getProduk(this.$route.params.id);
		// console.log('Success')
	},
	components: {
		DashboardSidebarNavigation,
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
		getProduk(idProduct) {
			axios
				.get(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}/product/${idProduct}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`, // Jika perlu token
						},
					},
				)
				.then(res => {
					console.log(res.data.data);

					this.produk = res.data.data;
				})
				.catch(function (error) {
					if (error.response) {
						if (error.response.status == 404) {
							alert(error.response.data.message);
						}
					}
				});
		},
		getImageUrl(file) {
			if (file && file.file) {
				return `https://api.isnunas.my.id/storage/${file.file}`;
			}
			return '/assets/images/no-image.png'; // Placeholder jika gambar tidak tersedia
		},
	},
};
</script>
