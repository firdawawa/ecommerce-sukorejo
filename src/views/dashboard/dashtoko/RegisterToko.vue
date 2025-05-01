<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
						Daftarkan Toko
					</div>
				</div>
				<!-- CONTENT -->
				<div class="px-10 items-center">
					<div class="flex w-full mt-4 gap-4">
						<form class="w-1/2">
							<div>
								<label
									for="store-name"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Nama Toko
								</label>
								<input
									type="text"
									v-model="model.registtoko.storeName"
									name="store-name"
									id="store-name"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
									placeholder="ex: ABC Store"
									required
								/>
							</div>
						</form>
						<form class="w-1/2">
							<div>
								<label
									for="category"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Kategori Toko
								</label>
								<select
									id="category"
									v-model="model.registtoko.idCategory"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
								>
									<option
										v-for="category in categories"
										:key="category.id"
										:value="category.id"
									>
										{{ category.categoryName }}
									</option>
								</select>
							</div>
						</form>
					</div>

					<!-- BANK ACCOUNT -->
					<h2 class="font-bold text-2xl text-font mt-12">Rekening</h2>
					<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
					<div class="flex flex-col w-full mt-4 gap-4">
						<div class="flex w-full gap-4">
							<form class="w-1/2">
								<div>
									<label
										for="bank"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
									>
										Bank
									</label>
									<select
										id="bank"
										v-model="model.registtoko.idBank"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font"
									>
										<option
											v-for="bank in banks"
											:key="bank.id"
											:value="bank.id"
										>
											{{ bank.bankName }}
										</option>
									</select>
								</div>
							</form>
							<form class="w-1/2">
								<div>
									<label
										for="bankowner"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
									>
										Nama Pemilik
									</label>
									<input
										type="text"
										v-model="model.registtoko.bankAccName"
										name="bankowner"
										id="bankowner"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
										placeholder="ex: Siti Zubaidah"
										required
									/>
								</div>
							</form>
						</div>
						<div class="flex w-full gap-4">
							<form class="w-1/2">
								<div>
									<label
										for="account-number"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
									>
										Nomor Rekening
									</label>
									<input
										type="text"
										v-model="model.registtoko.bankAccNumber"
										name="norek"
										id="norek"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
										placeholder="ex: 1234567890"
										required
									/>
								</div>
							</form>
						</div>
					</div>

					<!-- KONTAK TOKO -->
					<h2 class="font-bold text-2xl text-font mt-12">Kontak Toko</h2>
					<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
					<span
						class="block mb-2 mt-6 justify-start text-left text-2xl font-bold text-font"
					>
						Media Sosial
					</span>
					<div class="flex w-full gap-4">
						<form class="w-1/2">
							<div>
								<label
									for="medsos"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Media Sosial
								</label>
								<select
									id="medsos"
									v-model="model.registtoko.sosmedName"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
								>
									<option value="Instagram">Instagram</option>
									<option value="Facebook">Facebook</option>
									<option value="TikTok">TikTok</option>
									<option value="Twitter">Twitter</option>
								</select>
							</div>
						</form>
						<form class="w-1/2">
							<div>
								<label
									for="sosmed-url"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Tautan
								</label>
								<input
									type="url"
									v-model="model.registtoko.urlSosmed"
									name="sosmed-url"
									id="sosmed-url"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400"
									placeholder="Tautan"
									required
								/>
							</div>
						</form>
					</div>
					<!-- TENTANG TOKO -->
					<h2 class="font-bold text-2xl text-font mt-12">Tentang Toko</h2>
					<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
					<div class="flex w-full gap-4">
						<form class="w-1/2">
							<div>
								<label
									for="operationaltime-start"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Jam Buka Toko
								</label>
								<input
									type="time"
									v-model="model.registtoko.openTime"
									name="operationaltime-start"
									id="operationaltime-start"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font"
								/>
							</div>
						</form>
						<form class="w-1/2">
							<div>
								<label
									for="operationaltime-close"
									class="block mb-2 justify-start text-left text-xl font-medium text-font"
								>
									Jam Tutup Toko
								</label>
								<input
									type="time"
									v-model="model.registtoko.closeTime"
									name="operationaltime-close"
									id="operationaltime-close"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font"
								/>
							</div>
						</form>
					</div>
					<form action="">
						<div class="">
							<label
								for="desc"
								class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
								>Deskripsi</label
							>
							<textarea
								type="text"
								v-model="model.registtoko.description"
								name="desc"
								id="desc"
								rows="6"
								class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-gray-400"
								placeholder="Masukkan Deskripsi Toko"
								required=""
							></textarea>
						</div>
						<div class="">
							<label
								for="policy"
								class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
								>Kebijakan Toko</label
							>
							<textarea
								type="text"
								v-model="model.registtoko.policy"
								name="policy"
								id="policy"
								rows="6"
								class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-gray-400"
								placeholder="Masukkan Kebijakan Toko"
								required=""
							></textarea>
						</div>
					</form>
					<button
						type="submit"
						@click="daftarToko"
						class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 mt-16 mb-10 text-center"
						>Daftarkan Toko</button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';
import axios from 'axios';

export default {
	data() {
		return {
			categories: [],
			banks: [],
			model: {
				registtoko: {
					storeName: '',
					idCategory: '',
					idBank: '',
					bankAccName: '',
					bankAccNumber: '',
					sosmedName: '',
					urlSosmed: '',
					openTime: '',
					closeTime: '',
					description: '',
					policy: '',
				},
			},
			isModalOpen: false,
		};
	},
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		fetchCategories() {
			axios
				.get('https://api.isnunas.my.id/api/categories')
				.then(res => {
					if (res.data && res.data.success) {
						console.log('API Response:', res.data.data); // Debug log
						this.categories = res.data.data;
					} else {
						console.error('Invalid API response:', res);
					}
				})
				.catch(err => {
					console.error('Error fetching category:', err);
				});
		},
		fetchBanks() {
			axios
				.get('https://api.isnunas.my.id/api/banks')
				.then(res => {
					if (res.data && res.data.success) {
						console.log('API Response:', res.data.data); // Debug log
						this.banks = res.data.data;
					} else {
						console.error('Invalid API response:', res);
					}
				})
				.catch(err => {
					console.error('Error fetching banks:', err);
				});
		},
		daftarToko() {
			if (
				!this.model.registtoko.storeName ||
				!this.model.registtoko.idCategory ||
				!this.model.registtoko.idBank ||
				!this.model.registtoko.bankAccName ||
				!this.model.registtoko.bankAccNumber ||
				!this.model.registtoko.openTime ||
				!this.model.registtoko.closeTime ||
				!this.model.registtoko.description ||
				!this.model.registtoko.policy
			) {
				alert('Seluruh data wajib diisi!');
				return;
			}

			const formData = new FormData();

			// Tambahkan data produk
			formData.append('storeName', this.model.registtoko.storeName);
			formData.append('idCategory', this.model.registtoko.idCategory);
			formData.append('idBank', this.model.registtoko.idBank);
			formData.append('bankAccName', this.model.registtoko.bankAccName);
			formData.append('bankAccNumber', this.model.registtoko.bankAccNumber);
			formData.append('sosmedName', this.model.registtoko.sosmedName);
			formData.append('urlSosmed', this.model.registtoko.urlSosmed);
			formData.append('openTime', this.model.registtoko.openTime);
			formData.append('closeTime', this.model.registtoko.closeTime);
			formData.append('description', this.model.registtoko.description);
			formData.append('policy', this.model.registtoko.policy);

			axios
				.post(`https://api.isnunas.my.id/api/dashboard/store`, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`, // Jika perlu token
					},
				})
				.then(res => {
					this.model.registtoko = {
						storeName: '',
						idCategory: '',
						idBank: '',
						bankAccName: '',
						bankAccNumber: '',
						sosmedName: '',
						urlSosmed: '',
						openTime: '',
						closeTime: '',
						description: '',
						policy: '',
					};

					this.$router.push({ name: 'TokoDashboard' });
				})
				.catch(error => {
					console.error('Terjadi kesalahan:', error.response?.data || error);
					alert('Gagal mendaftarkan toko. Pastikan semua data valid.');
				});
		},
	},
	mounted() {
		this.fetchCategories();
		this.fetchBanks();
	},
};
</script>
