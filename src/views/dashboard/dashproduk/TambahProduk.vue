<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-12 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font">
						Tambah Data Produk
					</div>
				</div>
				<div class="flex justify-around">
					<div class="columns-2 gap-12 mt-6">
						<form class="" action="#">
							<div>
								<label
									for="productname"
									class="block mb-2 justify-start text-left text-xl font-medium text-gray-900"
									>Nama</label
								>
								<input
									type="text"
									v-model="model.produk.name"
									name="productname"
									id="productname"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
									placeholder="ex: Jaket Rajut"
									required
								/>
							</div>
							<div>
								<label
									for="price"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Harga</label
								>
								<input
									type="number"
									v-model="model.produk.price"
									name="price"
									id="price"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
									placeholder="ex: 100000"
									required
								/>
							</div>
							<br />
							<br />
							<br />
							<div>
								<label
									for="stok"
									class="block mb-2 justify-start text-left text-xl font-medium text-gray-900"
									>Stok</label
								>
								<input
									type="text"
									v-model="model.produk.stock"
									name="stok"
									id="stok"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
									placeholder="ex: ex 100"
									required
								/>
							</div>
							<div>
								<label
									for="file"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
								>
									Media
								</label>
								<input
									type="file"
									name="file"
									ref="file"
									multiple
									@change="handleFileChange"
									class="w-full text-primary bg-purple-200 border-dotted border-2 border-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-lg px-5 py-8 text-center"
								/>
								<span class="text-sm font-light text-gray-400">
									*Format media yang dapat diunggah adalah .jpeg, .jpg, .png,
									atau .pdf dengan ukuran maksimal 100MB.
								</span>
							</div>
						</form>
					</div>
				</div>
				<div>
					<form action="">
						<div class="mr-4">
							<label
								for="desc"
								class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
								>Deskripsi</label
							>
							<textarea
								type="text"
								v-model="model.produk.description"
								name="desc"
								id="desc"
								rows="6"
								class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-gray-400"
								placeholder="Tuliskan deskripsi produk"
								required
							></textarea>
						</div>
					</form>
				</div>
				<div class="flex items-center gap-4 my-5">
					<input type="checkbox" class="h-5 w-5" />
					<div class="">
						<h5 class="text-font text-lg font-semibold">Konfirmasi Data</h5>
						<h6 class="text-font text-md font-normal"
							>Informasi dan data yang dimasukkan ke dalam formulir ini telah
							sesuai.</h6
						>
					</div>
				</div>
				<button
					type="submit"
					@click="saveProduk"
					class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-10 text-center"
					>Simpan Data</button
				>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';
import axios from 'axios';

export default {
	name: 'produkCreate',
	created() {
		this.idStore = localStorage.getItem('idStore');
	},
	data() {
		return {
			idStore: '',
			model: {
				produk: {
					name: '',
					price: '',
					stock: '',
					description: '',
					files: '',
				},
			},
		};
	},
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},

		handleFileChange(event) {
			const files = event.target.files; // Mendapatkan file yang dipilih
			console.log('Files selected:', files);

			// Simpan file ke model jika diperlukan
			this.model.produk.files = files;
		},

		uploadFile() {
			// Jika diperlukan, Anda dapat memproses file secara manual di sini
			console.log('File ready for upload:', this.model.produk.files);
		},

		saveProduk() {
			if (
				!this.model.produk.name ||
				!this.model.produk.price ||
				!this.model.produk.stock ||
				!this.model.produk.description ||
				!this.$refs.file.files
			) {
				alert('Seluruh data wajib diisi!');
				return;
			}

			const formData = new FormData();

			// Tambahkan data produk
			formData.append('name', this.model.produk.name);
			formData.append('price', this.model.produk.price);
			formData.append('stock', this.model.produk.stock);
			formData.append('description', this.model.produk.description);

			// Tambahkan file (jika ada)
			const files = this.$refs.file.files;
			for (let i = 0; i < files.length; i++) {
				formData.append('files[]', files[i]); // Gunakan 'files[]' sesuai validasi di Laravel
			}

			axios
				.post(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}/product`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`, // Jika perlu token
						},
					},
				)
				.then(res => {
					console.log(res.data);
					alert('Produk berhasil disimpan');
					this.model.produk = {
						name: '',
						price: '',
						stock: '',
						description: '',
						files: '',
					};

					this.$router.push({ name: 'produkDashboard' });
				})
				.catch(error => {
					console.error('Terjadi kesalahan:', error.response?.data || error);
					alert('Gagal menyimpan produk. Pastikan semua data valid.');
				});
		},
	},
};
</script>
