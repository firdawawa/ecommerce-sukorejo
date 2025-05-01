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
						<h2 class="font-bold text-2xl text-font">Data Toko</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<!-- <div class="flex justify-center">
							<img
								src="../../../assets/images/toko-pict.jpg"
								id="photoprofile"
								alt="photo-profile"
								class="h-52 w-40 mb-4 rounded-xl border object-cover"
							/>
						</div> -->
						<!-- DATA -->
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Tanggal Bergabung</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="date-join" class="py-2">{{
									formatDate(store.created_at)
								}}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Nama Toko</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="name-toko" class="py-2">{{ store.storeName }}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Kategori</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="category" class="py-2">{{
									store.categoryName || 'Kategori Tidak Ditemukan'
								}}</h4>
							</div>
						</div>
						<!-- IZIN USAHA -->
						<h2 class="font-bold text-2xl text-font mt-12">Izin Usaha</h2>
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
										<td class="px-6 py-2"> {{ licenceFile.licenceNumber }} </td>
										<td class="px-6 py-2"> {{ licenceFile.ownerName }} </td>
										<td class="px-6 py-2 text-center">
											<div class="">
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
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- KONTAK TOKO -->
						<h2 class="font-bold text-2xl text-font mt-12">Kontak Toko</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Nomor Telepon</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="name-toko" class="py-2">{{
									user.phoneNumber || 'Nomor Telepon tidak tersedia'
								}}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Media Sosial</h4>
							</div>
							<div class="flex">
								<div class="flex">
									<div class="text-font text-md font-bold pr-6">
										<h4 id="type" class="py-2">{{ store.sosmedName }}</h4>
									</div>
									<div class="text-font text-md font-normal pr-6">
										<h4 id="sosmed-link" class="py-2">{{ store.urlSosmed }}</h4>
									</div>
								</div>
							</div>
						</div>
						<!-- TENTANG TOKO -->
						<h2 class="font-bold text-2xl text-font mt-12">Tentang Toko</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Alamat</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="name-toko" class="py-2"
									>{{ user.addressDetail || 'Alamat tidak tersedia' }},
									{{ district || 'District tidak ditemukan' }}</h4
								>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Jam Operasional</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="operationaltime" class="py-2"
									>{{ store.openTime }} - {{ store.closeTime }}</h4
								>
							</div>
						</div>
						<div class="">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Deskripsi</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-full">
								<h4 id="storedesc" class="py-2">
									{{ store.description }}
								</h4>
							</div>
						</div>
						<div class="">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Kebijakan Toko</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-full">
								<h4 id="storepolice" class="py-2">
									{{ store.policy }}
								</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';
import axios from 'axios';

export default {
	components: {
		BumdesSidebarNavigation,
	},
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
		this.getLicenceFile();
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
		async getLicenceFile() {
			try {
				const res = await axios.get(
					`https://api.isnunas.my.id/api/licenceStore/${this.idStore}`,
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
			const fileUrl = `https://api.isnunas.my.id/storage/${filePath}`;
			window.open(fileUrl, '_blank'); // Buka file di tab baru
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
