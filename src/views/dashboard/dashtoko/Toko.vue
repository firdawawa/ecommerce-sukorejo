<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
						Profil & Toko
					</div>
					<div class="mr-8 mt-2">
						<RouterLink :to="{ path: '/dashboard/profil/toko/' + idStore + '/edit' }">
						<button
							class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
						>
							<img
								src="../../../assets/images/icon-edit.png"
								alt="edit"
								class="content-center"
							/>
							<span class="font-medium text-lg text-white content-center"
								>Edit Toko</span
							>
						</button>
					</RouterLink>
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
					<div v-if="loading"> ANIMASI LOADING </div>
					<div v-else class="pl-12 items-center">
						<h2 class="font-bold text-2xl text-font">Data Toko</h2>
						<hr class="h-px my-6 mr-8 bg-gray-400 border-1" />
                        <div class="flex justify-center">
                            <img :src="getImageUrl(store.shopProfileImg)" id="photoprofile" alt="photo-profile" class="h-52 w-40 mb-4 rounded-xl object-cover">
                        </div>
						<!-- DATA -->
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Tanggal Bergabung</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="date-join" class="py-2">{{ formatDate(store.created_at) }}</h4>
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
								<h4 id="category" class="py-2">{{ store.categoryName || 'Kategori Tidak Ditemukan' }}</h4>
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
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(licenceFile, show) in licenceFile" :key="show" class="bg-white border-b hover:bg-gray-100">
										<th scope="row" class="px-6 py-2 font-medium"> {{ show + 1 }} </th>
										<td class="px-6 py-2"> {{ licenceFile.licence_type ? licenceFile.licence_type.licenceName : 'Tidak ada lisensi' }} </td>
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
						<!-- REKENING -->
                        <h2 class="font-bold text-2xl text-font mt-12">Rekening</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Bank</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="bank" class="py-2">
                                    {{ store.bank ? store.bank.bankName : 'Data Bank Tidak Ditemukan' }}
                                </h4>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Nomor Rekening</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="norek" class="py-2">{{ store.bankAccNumber }}</h4>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Nama Pemilik</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="bankowner" class="py-2">{{ store.bankAccName }}</h4>
                            </div>
                        </div>
						<!-- KONTAK TOKO -->
						<h2 class="font-bold text-2xl text-font mt-12">Kontak Toko</h2>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Nomor Telepon</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="phone" class="py-2">{{ user.phoneNumber }}</h4>
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
										<h4 id="sosmed-link" class="py-2"
											>{{ store.urlSosmed }}</h4
										>
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
								<h4 id="address" class="py-2"
									>{{ user.addressDetail }}, {{ subDistrict.subDistrictName }}, {{ district }}</h4
								>
							</div>
						</div>
						<div class="flex">
							<div class="text-font w-60">
								<h4 class="text-md font-bold py-2">Jam Operasional</h4>
							</div>
							<div class="text-font text-md font-normal pr-6 w-[800px]">
								<h4 id="operationaltime" class="py-2">{{ store.openTime }} - {{ store.closeTime }}</h4>
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
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
	created() {
        this.idStore = localStorage.getItem('idStore');
        this.userId = localStorage.getItem('userId');
    },
	data(){
        return {
			loading: true,
            idUser: '',
            idStore: '',
            idDistrict: '',
            idSubDistrict: '',
            user: [],
            store: [],
            district: '',
            subDistrict: '',
			licenceFile: [],
        }
    },
	async mounted() {
        this.idStore = localStorage.getItem('idStore');
		if (this.idStore) {
			this.getStore(this.idStore);
		} else {
			console.error("idStore tidak ditemukan di localStorage");
		}
        this.userId = localStorage.getItem('userId');
        if (this.userId) {
            await this.getUser(this.userId);
            if (this.user.idDistrict) {
                this.getDistrict(this.user.idDistrict);
            }
            if (this.user.idSubDistrict) {
                this.getSubDistrict(this.user.idSubDistrict);
            }
        } else {
            console.error("User ID tidak ditemukan di localStorage");
        }
		this.getLicenceFile();
    },
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		formatDate(date) {
			const months = [
				"Januari", "Februari", "Maret", "April", "Mei", "Juni",
				"Juli", "Agustus", "September", "Oktober", "November", "Desember"
			];
			const d = new Date(date);
			const day = d.getDate().toString().padStart(2, '0');
			const month = months[d.getMonth()];  // Mendapatkan nama bulan dari array
			const year = d.getFullYear();
			
			return `${day} ${month} ${year}`;
    	},
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		getUser(idUser) {
            axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(res => {
                this.user = res.data.data;
                if (this.user.idDistrict) {
                    this.getDistrict(this.user.idDistrict); // Panggil getDistrict untuk mengambil data district
                }
                if (this.user.idSubDistrict) {
                    this.getSubDistrict(this.user.idSubDistrict);
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        },
		getDistrict(idDistrict) {
            axios.get(`http://127.0.0.1:8000/api/districts/${idDistrict}`)
                .then(response => {
                    console.log(response.data);  // Periksa output di browser console
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
            console.log("Fetching subdistrict with ID:", idSubDistrict);
            axios.get(`http://127.0.0.1:8000/api/subdistricts/data/${idSubDistrict}`)
                .then(res => {
                    console.log("Subdistrict API Response:", res.data);
                    if (res.data) {
                        this.subDistrict = res.data;  
                        console.log(this.subDistrict.subDistrictName);
                    } else {
                        this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
                    }
                })
                .catch(error => {
                    console.error("Error fetching subdistrict data:", error);
                    this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
                });
        },
		getStore(idStore){    
			axios.get(`http://127.0.0.1:8000/api/store/${idStore}`, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				console.log("Data store:", res.data);
				this.store = res.data.data;
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
		},
		getImageUrl(shopProfileImg) {
			if (shopProfileImg) {
				return `http://127.0.0.1:8000/storage/${shopProfileImg}`;
			}
				return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
		async getLicenceFile() {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/licenceStore/${this.idStore}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log(res.data);
                    this.licenceFile = res.data.data;
                } catch (error) {
                    console.error('Error fetching Licence File:', error);
                }
        },
		openLicenceFile(filePath) {
			if (!filePath) {
				alert("File tidak tersedia");
				return;
			}
			const fileUrl = `http://127.0.0.1:8000/storage/${filePath}`;
			window.open(fileUrl, '_blank'); // Buka file di tab baru
		},
	},
	// data() {
	// 	return {

	// 	};
	// },
	async beforeMount() {
    try {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/store/check', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('API response:', response);  // Menampilkan response dari API

        // Pastikan respons memiliki data yang valid
        if (response.data.status === 200 && response.data.data && response.data.data.length > 0) {
            const store = response.data.data[0];  // Ambil store pertama (jika ada lebih dari satu)
            if (store && store.id) {
                localStorage.setItem('idStore', store.id); // Simpan idStore ke localStorage
                console.log('idStore berhasil disimpan:', store.id);
            } else {
                console.error('Store tidak ditemukan atau id tidak tersedia');
            }
        }

        this.loading = false;  // Set loading menjadi false setelah mendapatkan data

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        this.$router.push({ name: 'EmptyTokoDashboard' });  // Arahkan jika terjadi error
        this.loading = false;
    }
}
};
</script>
