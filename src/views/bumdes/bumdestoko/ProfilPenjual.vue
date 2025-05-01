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
						<h2 class="font-bold text-2xl text-font">Data Pemilik</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
						<!-- <div class="flex justify-center">
                            <img src="../../../assets/images/background-secondary.png" id="photoprofile" alt="photo-profile" class="h-52 w-40 mb-4 rounded-xl object-cover">
                        </div> -->
						<!-- DATA -->
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Tanggal Bergabung</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="date-join" class="py-2">{{
									formatDate(user.created_at)
								}}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Nama</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="name" class="py-2">{{ user.name }}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Tempat, Tanggal Lahir</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="dob" class="py-2"
									>{{ user.birthPlace }}, {{ user.birthDate }}</h4
								>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Jenis Kelamin</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="sex" class="py-2">{{ user.sex }}</h4>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Nomor Telepon</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="phone" class="py-2">{{ user.phoneNumber }}</h4>
							</div>
						</div>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
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
								<h4 class="text-md font-bold py-2">Alamat</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="address" class="py-2"
									>{{ user.addressDetail }}, {{ district }}</h4
								>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Kode Pos</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="postalcode" class="py-2">{{ user.postalCode }}</h4>
							</div>
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
				.get(`http://127.0.0.1:8000/api/store/${this.idStore}`, {
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
					`http://127.0.0.1:8000/api/user/${idUserToko}`,
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
				.get(`http://127.0.0.1:8000/api/districts/${idDistrict}`)
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
