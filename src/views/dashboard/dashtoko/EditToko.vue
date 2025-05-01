<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
						Profil & Toko
					</div>
				</div>
				<div class="mt-12 grid grid-cols-[17rem_1fr] divide-x-2">
					<!-- MINI NAV -->
					<div class="block w-56 m-6 -mt-2">
						<RouterLink
							to="/dashboard/profil"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Profil Penjual</RouterLink
						>
						<RouterLink
							to="/dashboard/profil/toko"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Toko</RouterLink
						>
						<RouterLink
							to=""
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Tentang Aplikasi</RouterLink
						>
						<RouterLink
							to=""
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Hubungi Bantuan</RouterLink
						>
					</div>
					<!-- CONTENT -->
					<div class="pl-12 items-center">
						<h2 class="font-bold text-2xl text-font">Ubah Data Toko</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
                        <div class="flex justify-center content-center items-center">
                            <input type="file" name="file" ref="file" @change="handleFileChange" id="photoprofile" alt="photo-profile" class="flex justify-center h-52 w-40 bg-secondary mb-4 rounded-xl object-cover">
                        </div>
                        <div class="flex justify-center content-center gap-2">
                            <img src="../../../assets/images/icon-upload.png" alt="upload-icon" class=" h-8 w-8">
                            <span class="text-secondary font-medium text-lg">Unggah Foto</span>
                        </div>
						<!-- DATA -->
						<div class="columns-2 mt-4">
							<form class="" action="#">
								<div>
									<label
										for="store-name"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Nama Toko</label
									>
									<input
										type="text"
										v-model="model.store.storeName"
										name="store-name"
										id="store-name"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
								<div class="">
									<label
										for="category"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Kategori Toko</label
									>
									<select
										v-model="model.store.idCategory"
										id="category"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
									>
										<option
											v-for="category in categories"
											:key="category.id"
											:value="category.id"
											:selected="category.id === model.store.idCategory"
										>
											{{ category.categoryName }}
										</option>
									</select>
								</div>
							</form>
						</div>
						<!-- IZIN USAHA -->
						<div class="flex justify-between mt-12">
							<div class="font-bold text-2xl mt-4 text-font"> Izin Usaha </div>
							<div class="mr-8">
								<button
									@click="openModal"
									class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
								>
									<span
										class="font-extrabold text-3xl text-white content-center -mt-2"
										>+</span
									>
									<span class="font-medium text-lg text-white content-center"
										>Tambah</span
									>
								</button>
							</div>
							<!-- Modal -->
							<div
								v-if="isModalOpen"
								class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
							>
								<div
									class="bg-white rounded-3xl shadow-lg py-14 px-10 w-[900px] relative"
								>
									<!-- Modal header -->
									<h2 class="text-3xl text-font font-bold mb-6"
										>Tambah Data Izin Usaha</h2
									>
									<hr class="h-px mb-6 bg-gray-400 border-1" />

									<!-- Content inside modal -->
									<div class="flex justify-around">
										<div class="columns-2">
											<form class="" action="#">
												<div>
													<label
														for="sosmed"
														class="block mb-2 justify-start text-left text-xl font-medium text-font"
														>Kategori Izin Usaha</label
													>
													<select
														id="sosmed"
														v-model="model.licence.idLicenceType"
														class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
													>
														<option
															v-for="licenceFile in licenceFiles"
															:key="licenceFile.id"
															:value="licenceFile.id"
														>
															{{ licenceFile.licenceName }}
														</option>
													</select>
												</div>
												<div>
													<label
														for="licencenumber"
														class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
														>Nomor Izin Usaha</label
													>
													<input
														type="text"
														v-model="model.licence.licenceNumber"
														name="licencenumber"
														id="licencenumber"
														class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font"
														placeholder=""
														required=""
													/>
												</div>
												<br />
												<br />
												<br />
												<div>
													<label
														for="ownername"
														class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
														>Nama Pemilik</label
													>
													<input
														type="text"
														v-model="model.licence.ownerName"
														name="ownername"
														id="ownername"
														class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font"
														placeholder=""
														required=""
													/>
												</div>
												<div>
													<label
														for="ownername"
														class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
														>Sertifikat</label
													>
													<input type="file" name="file" ref="file" multiple @change="handleFileChange" class="w-full text-primary bg-purple-200 border-dotted border-2 border-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-lg px-5 py-8 text-center"/>
													<span class="text-sm font-light text-gray-400"
														>*Format media yang dapat diunggah adalah .jpeg,
														.jpg, .png, atau .pdf dengan ukuran maksimal
														100MB.</span
													>
												</div>
											</form>
										</div>
									</div>
									<div class="flex items-center gap-4 my-4">
										<input type="checkbox" class="h-5 w-5" />
										<div class="">
											<h5 class="text-font text-lg font-semibold"
												>Konfirmasi Data</h5
											>
											<h6 class="text-font text-md font-normal"
												>Informasi dan data yang dimasukkan ke dalam formulir
												ini telah sesuai.</h6
											>
										</div>
									</div>
									<button
										type="submit"
										@click="addLicence"
										class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center"
										>Simpan Data</button
									>
									<button
										@click="closeModal"
										class="w-full text-font border border-gray-300 hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center"
										>Batal</button
									>

									<!-- Close button -->
									<button
										@click="closeModal"
										class="absolute top-2 right-2 w-10 h-10 text-gray-500 text-xl hover:text-gray-700"
									>
										x
									</button>
								</div>
							</div>
						</div>
						<!-- END MODAL -->

						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="relative overflow-x-auto mr-10 shadow-md sm:rounded-lg">
							<table class="w-full text-md text-left rtl:text-right text-font">
								<thead class="text-lg font-semibold text-white bg-primary">
									<tr>
										<th scope="col" class="px-6 py-4"> No </th>
										<th scope="col" class="px-6 py-4"> Jenis </th>
										<th scope="col" class="px-6 py-4"> Nomor Izin </th>
										<th scope="col" class="px-6 py-4"> Nama Pemilik </th>
										<th scope="col" class="px-6 py-4">
											Tindakan
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(licenceFile, show) in licenceFile"
										:key="show"
										class="bg-white border-b hover:bg-gray-100"
									>
										<th scope="row" class="px-6 py-2 font-medium">
											{{ show + 1 }}
										</th>
										<td class="px-6 py-2">
											{{
												licenceFile.licence_type
													? licenceFile.licence_type.licenceName
													: 'Tidak ada lisensi'
											}}
										</td>
										<td class="px-6 py-2">
											{{ licenceFile.licenceNumber }}
										</td>
										<td class="px-6 py-2">
											{{ licenceFile.ownerName }}
										</td>
										<td class="pl-6 py-2 text-center">
											<div class="flex gap-2">
												<button
													@click="openLicenceFile(licenceFile.licenceFile)"
													class="flex gap-4 bg-green-500 content-center justify-center align-middle py-4 px-4 rounded-full"
												>
													<img
														src="../../../assets/images/icon-file.png"
														alt="file"
														class="content-center w-4 h-4"
													/>
												</button>
												<button
													@click="deleteLicence(licenceFile.id)"
													class="flex gap-4 bg-red-500 content-center justify-center align-middle py-4 px-4 rounded-full"
												>
													<img
														src="../../../assets/images/icon-delete.png"
														alt="file"
														class="content-center w-4 h-4"
													/>
												</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- REKENING -->
						<h2 class="font-bold text-2xl text-font mt-12">Rekening</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="columns-2 mt-4">
							<form class="" action="#">
								<div class="">
									<label
										for="category"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Bank</label
									>
									<select
										v-model="model.store.idBank"
										id="category"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
									>
										<option
											v-for="bank in banks"
											:key="bank.id"
											:value="bank.id"
											:selected="bank.id === model.store.idBank"
										>
											{{ bank.bankName }}
										</option>
									</select>
								</div>
								<div>
									<label
										for="store-name"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Nama Pemilik</label
									>
									<input
										type="text"
										v-model="model.store.bankAccName"
										name="store-name"
										id="store-name"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
							</form>
						</div>
						<div>
							<form action="">
								<div class="mt-6">
									<label
										for="store-name"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Nomor Rekening</label
									>
									<input
										type="text"
										v-model="model.store.bankAccNumber"
										name="store-name"
										id="store-name"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
							</form>
						</div>
						<!-- KONTAK TOKO -->
						<h2 class="font-bold text-2xl text-font mt-12">Kontak Toko</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<span
							class="block mb-2 mt-6 justify-start text-left text-2xl font-bold text-font"
						>
							Media Sosial
						</span>
						<div class="columns-2 mt-4">
							<form class="" action="#">
								<div>
									<label
										for="sosmed"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Media Sosial</label
									>
									<select
										v-model="model.store.sosmedName"
										id="sosmed"
										class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-[500px] p-2.5"
									>
										<option value="Instagram">Instagram</option>
										<option value="Facebook">Facebook</option>
										<option value="TikTok">TikTok</option>
										<option value="Twitter">Twitter</option>
									</select>
								</div>
								<div>
									<label
										for="sosmed-url"
										class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
										>Tautan</label
									>
									<input
										type="url"
										v-model="model.store.urlSosmed"
										name="sosmed-url"
										id="sosmed-url"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
							</form>
						</div>
						<!-- TENTANG TOKO -->
						<h2 class="font-bold text-2xl text-font mt-12">Tentang Toko</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="columns-2 mt-4">
							<form action="">
								<div>
									<label
										for="operationaltime-start"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Jam Buka Toko</label
									>
									<input
										type="time"
										v-model="model.store.openTime"
										name="operationaltime-start"
										id="operationaltime-start"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
								<div>
									<label
										for="operationaltime-close"
										class="block mb-2 justify-start text-left text-xl font-medium text-font"
										>Jam Tutup Toko</label
									>
									<input
										type="time"
										v-model="model.store.closeTime"
										name="operationaltime-close"
										id="operationaltime-close"
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
										placeholder=""
										required=""
									/>
								</div>
							</form>
						</div>
						<form action="">
							<div class="mr-4">
								<label
									for="desc"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Deskripsi</label
								>
								<textarea
									type="text"
									v-model="model.store.description"
									name="desc"
									id="desc"
									rows="6"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-font"
									placeholder=""
									required=""
								></textarea>
							</div>
							<div class="mr-4">
								<label
									for="desc"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Kebijakan Toko</label
								>
								<textarea
									type="text"
									v-model="model.store.policy"
									name="desc"
									id="desc"
									rows="6"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-font"
									placeholder=""
									required=""
								></textarea>
							</div>
						</form>
						<button
							type="submit"
							@click="updateStore"
							class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 mt-16 mb-10 text-center"
							>Simpan Data</button
						>
					</div>
				</div>
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
		this.idUser = localStorage.getItem('userId');
	},
	data() {
		return {
			idUser: '',
			idStore: '',
			store: [],
			user: [],
			categories: [],
			licenceFiles: [],
			licenceFile: [],
			banks: [],
			isModalOpen: false,
			model: {
				store: {
					storeName: '',
					idUser: '',
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
					shopProfileImg: '',
				},
				licence: {
					idLicenceType: '',
					idStore: '',
					licenceFile: '',
					licenceNumber: '',
					idCategory: '',
					ownerName: '',
				},
			},
		};
	},
	mounted() {
		const userId = localStorage.getItem('userId'); // Pastikan key benar
		if (userId) {
			this.model.licence.idUser = userId;
		} else {
			console.error('User ID tidak ditemukan di localStorage');
		}
		this.idStore = localStorage.getItem('idStore');
		console.log('ID Store dari localStorage:', this.idStore); // Debugging
		const idStore = localStorage.getItem('idStore');
		if (idStore) {
			this.getStoreData(idStore);
		}
		if (idStore) {
			this.model.licence.idStore = idStore; // Assign idStore ke model
		} else {
			console.error('ID Store tidak ditemukan di localStorage.');
		}
		this.fetchCategories();
		this.getLicenceFile();
		this.fetchLicenceTypes();
		this.fetchBanks();
	},
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		openModal() {
			if (this.model.store.idCategory) {
				this.model.licence.idCategory = this.model.store.idCategory; // Set nilai idCategory ke model.licence
			}
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
		async addLicence() {
			const formData = new FormData();
			const idStore = localStorage.getItem('idStore');
			if (idStore) {
				formData.append('idStore', idStore); // Menambahkan idStore dari localStorage
			} else {
				console.error('idStore tidak ditemukan di localStorage.');
				alert('ID Store tidak ditemukan. Harap pastikan Anda sudah login.');
				return;
			}
			if (!this.model.licence.idLicenceType || 
				!this.model.licence.licenceNumber || 
				!this.model.licence.ownerName || 
				!this.$refs.file.files) {
				alert('Seluruh data wajib diisi!');
				return;
			}
			formData.append('idLicenceType', this.model.licence.idLicenceType);
			formData.append('licenceNumber', this.model.licence.licenceNumber);
			formData.append('ownerName', this.model.licence.ownerName);

			if (this.$refs.file.files.length > 0) {
				formData.append('licenceFile', this.$refs.file.files[0]); // File yang di-upload
			}
			formData.append('idCategory', this.model.licence.idCategory);

			try {
				const response = await axios.post(
					'http://127.0.0.1:8000/api/licenceStore',
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							'Content-Type': 'multipart/form-data', // Pastikan menggunakan multipart/form-data untuk mengirim file
						},
					},
				);

				if (response.data.success) {
					alert('Lisensi berhasil ditambahkan!');
					this.closeModal(); // Tutup modal setelah berhasil
					this.getLicenceFile();
				}
				// console.log('Data yang akan dikirim ke server:', data);
			} catch (error) {
				console.error('Error adding licence:', error);
				alert('Gagal menambahkan lisensi. Silakan coba lagi.');
			}
		},
		async fetchLicenceTypes() {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/licenceTypes',
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				this.licenceFiles = response.data.data; // Set data licenceTypes ke licenceFiles
			} catch (error) {
				console.error('Error fetching Licence Types:', error);
			}
		},
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		async fetchCategories() {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/categories',
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				this.categories = response.data.data;
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		},
		fetchBanks() {
			axios
				.get('http://127.0.0.1:8000/api/banks')
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
		getStoreData(idStore) {
			console.log('Mengambil data toko untuk ID:', idStore); // Debugging

			axios.get(`http://127.0.0.1:8000/api/dashboard/store/${idStore}`, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					console.log('Respons dari server:', res.data.data); // Debugging
					// Pastikan data yang diterima adalah objek store yang benar
					if (res.data.data && res.data.data.store) {
						this.model.store = res.data.data.store; // Assign data store ke model.store
						console.log('Data toko berhasil dimuat:', this.model.store); // Debugging
						if (this.model.store.idCategory) {
							this.model.licence.idCategory = this.model.store.idCategory;
						}
					} else {
						console.error('Data toko tidak ditemukan dalam respons:', res);
					}
					console.log('Nama Toko:', this.model.store.storeName); // Pastikan nama toko tampil dengan benar
				})
				.catch(err => {
					console.error('Gagal mengambil data toko:', err);
				});
		},
		handleFileChange(event) {
                const file = event.target.files[0]; // Ambil file pertama yang dipilih
                if (file) {
                    console.log('File selected:', file);
                    this.model.store.shopProfileImg = file; // Simpan ke model
                }
            },
            uploadFile() {
                // Jika diperlukan, Anda dapat memproses file secara manual di sini
                console.log('File ready for upload:', this.model.store.shopProfileImg);
            },
		updateStore() {
			const idUser = localStorage.getItem('userId');
			if (idUser) {
				// Assign idUser ke model.store sebelum melakukan update
				this.model.store.idUser = idUser;
			} else {
				console.error('User ID tidak ditemukan di localStorage.');
				alert('User ID tidak ditemukan. Harap pastikan Anda sudah login.');
				return;
			}
            if (this.model.store.openTime) {
                this.model.store.openTime = this.formatTime(this.model.store.openTime);
            }
            if (this.model.store.closeTime) {
                this.model.store.closeTime = this.formatTime(this.model.store.closeTime);
            }
			axios.post(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}`,
					this.model.store,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							'Content-Type': 'multipart/form-data',
						},
					},
				)
				.then(response => {
					alert('Toko berhasil diperbarui');
					this.$router.push({ name: 'TokoDashboard' });
				})
				.catch(error => {
					console.error('Error updating store:', error);
					alert('Gagal memperbarui toko.');
				});
		},
        formatTime(time) {
            // Jika waktu sudah dalam format yang benar, langsung kembalikan
            if (!time) return time;

            const [hours, minutes] = time.split(':');
            return `${hours}:${minutes}`;
        },
		async getLicenceFile() {
			try {
				const res = await axios.get(`http://127.0.0.1:8000/api/licenceStore/${this.idStore}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				console.log(res.data);
				this.licenceFile = res.data.data;
			} catch (error) {
				console.error('Error fetching Licence File:', error);
			}
		},
		openLicenceFile(filePath) {
			if (!filePath) {
				alert('File tidak tersedia');
				return;
			}
			const fileUrl = `http://127.0.0.1:8000/storage/${filePath}`;
			window.open(fileUrl, '_blank'); // Buka file di tab baru
		},
		deleteLicence(idLicence) {
			if (confirm('Are you sure to delete this?')) {
				axios
					.delete(`http://127.0.0.1:8000/api/licenceStore/${idLicence}`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					})
					.then(res => {
						alert(res.data.message);
						this.getLicenceFile(); // Refresh data setelah penghapusan
					})
					.catch(function (error) {
						if (error.response) {
							if (error.response.status == 404) {
								alert(error.response.data.message);
							} else {
								alert('Failed to delete licence data.');
							}
						}
					});
			}
		},
	},
	watch: {
		'model.store.idCategory': function (newVal) {
			console.log('Updated selected category:', newVal); // Debugging
		},
	},
};
</script>
