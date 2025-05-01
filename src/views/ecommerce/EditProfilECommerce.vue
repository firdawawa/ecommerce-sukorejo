<template>
	<div>
		<Navbar />
		<div class="mt-28 mx-48 mb-4">
			<div class="flex">
				<!-- MINI NAVBAR -->
				<div
					class="bg-white w-1/5 h-fit fixed rounded-2xl p-10 pb-28 object-cover"
				>
					<div class="profile content-center object-cover">
						<RouterLink to="/profil" class="flex content-center gap-6">
							<img
								:src="getImageUrl(model.user.profileImg)"
								alt="profile picture"
								class="rounded-full w-20 h-20 aspect-square object-cover"
							/>
							<div class="content-center">
								<div class="text-font font-bold text-2xl content-center">{{
									model.user.name
								}}</div>
								<div class="flex content-center align-middle gap-3">
									<div
										class="text-gray-400 text-lg font-light content-center tracking-wider"
										>{{ model.user.email }}</div
									>
								</div>
							</div>
						</RouterLink>
					</div>
					<div class="mt-14">
						<ul
							class="font-medium p-4 md:p-0 mt-4 border items-center border-gray-100 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0"
						>
							<li>
								<RouterLink
									to="/profil"
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Profil
								</RouterLink>
							</li>
							<li>
								<RouterLink
									:to="{ path: '/profil/' + idUser + '/password' }"
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Ubah Password
								</RouterLink>
							</li>
							<li>
								<RouterLink
									to="/riwayat"
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Riwayat
								</RouterLink>
							</li>
							<li>
								<RouterLink
									to="/cart"
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Keranjang Saya
								</RouterLink>
							</li>
							<li>
								<RouterLink
									to=""
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Tentang Aplikasi
								</RouterLink>
							</li>
							<li>
								<RouterLink
									to=""
									class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0"
								>
									<div class="ml-8 w-6 h-6">
										<img
											class="w-full h-full group-hover:hidden"
											src="../../assets/images/profile-icon-gray.png"
											alt="icon-profile"
										/>
										<img
											class="w-full h-full hidden group-hover:block"
											src="../../assets/images/profile-icon.png"
											alt="icon-profile"
										/>
									</div>
									Hubungi Bantuan
								</RouterLink>
							</li>
						</ul>
					</div>
					<!-- Button Logout -->
					<div class="flex justify-center">
						<button
							@click="logout"
							class="bg-secondary text-lg font-semibold text-white px-4 py-2 rounded-md w-80 h-12 mt-32 text-center items-center content-center hover:bg-red-600 transition duration-200"
						>
							Keluar
						</button>
					</div>
				</div>

				<!-- CONTENT -->
				<div class="w-3/4 ml-1/4">
					<div class="bg-white h-fit rounded-2xl pb-6 pt-2 px-6 ml-4">
						<div class="flex justify-between items-center mt-5 mx-8">
							<div class="text-3xl text-font font-bold">Ubah Data Diri</div>
						</div>
						<hr class="h-px mt-7 mb-8 bg-gray-400 border-1" />
						<div class="flex justify-center content-center items-center">
							<input
								type="file"
								name="file"
								ref="file"
								@change="handleFileChange"
								id="photoprofile"
								alt="photo-profile"
								class="flex justify-center h-52 w-40 bg-secondary mb-4 rounded-xl object-cover"
							/>
						</div>
						<div class="flex justify-center content-center gap-2">
							<img
								src="../../../assets/images/icon-upload.png"
								alt="upload-icon"
								class="h-8 w-8"
							/>
							<span class="text-secondary font-medium text-lg"
								>Unggah Foto</span
							>
						</div>
						<!-- DATA -->
						<div class="px-16 mt-10">
							<div class="columns-2 mt-4">
								<form class="" action="#">
									<div>
										<label
											for="name"
											class="block mb-2 justify-start text-left text-xl font-medium text-gray-900"
											>Nama</label
										>
										<input
											type="text"
											v-model="model.user.name"
											name="name"
											id="name"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										/>
									</div>
									<div>
										<label
											for="placebirth"
											class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
											>Tempat Lahir</label
										>
										<input
											type="text"
											v-model="model.user.birthPlace"
											name="placebirth"
											id="placebirth"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										/>
									</div>
									<div>
										<label
											for="sex"
											class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
											>Jenis Kelamin</label
										>
										<select
											id="sex"
											v-model="model.user.sex"
											class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-[500px] p-2.5"
										>
											<option value="male">Laki-laki</option>
											<option value="female">Perempuan</option>
										</select>
									</div>
									<div>
										<label
											for="dob"
											class="block mb-2 mt-8 justify-start text-left text-xl font-medium text-gray-900"
											>Tanggal Lahir</label
										>
										<input
											type="date"
											v-model="model.user.birthDate"
											name="dob"
											id="dob"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400"
											placeholder=""
											required=""
										/>
									</div>
								</form>
							</div>
							<div class="">
								<form action="">
									<div>
										<label
											for="phone"
											class="block my-2 justify-start text-left text-xl font-medium text-gray-900"
											>Nomor Telepon</label
										>
										<input
											type="text"
											v-model="model.user.phoneNumber"
											name="phone"
											id="phone"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										/>
									</div>
								</form>
							</div>
						</div>
						<hr class="h-px mt-10 mb-8 bg-gray-400 border-1" />
						<div class="px-16 mt-4">
							<div class="columns-2 mt-4">
								<form class="" action="#">
									<div>
										<label
											for="addressDetail"
											class="block mb-2 justify-start text-left text-xl font-medium text-gray-900"
											>Detail Alamat</label
										>
										<input
											type="text"
											v-model="model.user.addressDetail"
											name="addressDetail"
											id="addressDetail"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										/>
									</div>
									<div>
										<label
											for="district"
											class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
											>Kecamatan</label
										>
										<select
											v-model="model.user.idDistrict"
											name="kecamatan"
											id="district"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										>
											<option
												v-for="district in districts"
												:key="district.id"
												:value="district.id"
											>
												{{ district.districtName }}
											</option>
										</select>
									</div>
									<div>
										<label
											for="subdistrict"
											class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
											>Kelurahan</label
										>
										<select
											v-model="model.user.idSubDistrict"
											name="kelurahan"
											id="subdistrict"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										>
											<option
												v-for="subdistrict in subdistricts"
												:key="subdistrict.id"
												:value="subdistrict.id"
											>
												{{ subdistrict.subDistrictName }}
											</option>
										</select>
									</div>
									<div>
										<label
											for="postalCode"
											class="block mb-2 mt-8 justify-start text-left text-xl font-medium text-gray-900"
											>Kode Pos</label
										>
										<select
											v-model="model.user.postalCode"
											name="postalcode"
											id="postalCode"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										>
											<option
												v-for="code in postalCode"
												:key="code"
												:value="code"
											>
												{{ code }}
											</option>
										</select>
									</div>
								</form>
							</div>
						</div>
						<div class="text-3xl text-font font-bold px-6 ml-4 mt-12"
							>Keamanan Akun</div
						>
						<hr class="h-px mt-5 mb-6 bg-gray-400 border-1" />
						<div class="px-16 mt-2 mb-8">
							<div class="">
								<form action="">
									<div class="">
										<label
											for="email"
											class="block my-2 justify-start text-left text-xl font-medium text-gray-900"
											>Email</label
										>
										<input
											type="email"
											v-model="model.user.email"
											name="email"
											id="email"
											class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
											placeholder=""
											required=""
										/>
									</div>
								</form>
							</div>
							<div>
								<label
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Password</label
								>
								<div class="flex gap-6 content-center">
									<div
										class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font"
									>
										*******
									</div>
									<div class="">
										<RouterLink
											:to="{ path: '/profil/' + idUser + '/password' }"
										>
											<button
												class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
											>
												<img
													src="../../assets/images/icon-edit.png"
													alt="edit"
													class="content-center"
												/>
												<span
													class="font-medium text-lg text-white content-center"
													>Ubah</span
												>
											</button>
										</RouterLink>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							@click="updateData"
							class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 mt-6 mb-10 text-center"
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
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';

export default {
	created() {
		this.idUser = localStorage.getItem('userId');
	},
	data() {
		return {
			userId: '',
			idUser: '',
			idDistrict: '',
			idSubDistrict: '',
			user: {},
			districts: [],
			subdistricts: [],
			postalCode: [],
			model: {
				user: {
					name: '',
					email: '',
					birthDate: '',
					birthPlace: '',
					phoneNumber: '',
					sex: '',
					addressDetail: '',
					idSubDistrict: '',
					idDistrict: '',
					postalCode: '',
					profileImg: '',
				},
			},
		};
	},
	mounted() {
		const userId = localStorage.getItem('userId');
		console.log('userId from localStorage:', userId); // Debug log
		this.userId = this.$route.params.id;
		console.log('userId from route params:', this.userId);
		if (userId) {
			this.getUserData(userId);
		}
		this.fetchDistricts();
		// Check if idDistrict and idSubDistrict exist before calling fetchSubDistricts and fetchPostalCode
		if (this.model.user.idDistrict) {
			this.fetchSubDistricts(this.model.user.idDistrict);
		}
		if (this.model.user.idSubDistrict) {
			this.fetchPostalCode(this.model.user.idSubDistrict);
		}
	},
	components: {
		Navbar,
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		fetchDistricts() {
			axios
				.get('https://api.isnunas.my.id/api/districts')
				.then(res => {
					if (res.data && res.data.success) {
						console.log('API Response:', res.data.data); // Debug log
						this.districts = res.data.data;
					} else {
						console.error('Invalid API response:', res);
					}
				})
				.catch(err => {
					console.error('Error fetching districts:', err);
				});
		},
		fetchSubDistricts(idDistrict) {
			axios
				.get(`https://api.isnunas.my.id/api/subdistricts/${idDistrict}`)
				.then(res => {
					if (res.data && res.data.success) {
						console.log('Subdistricts API Response:', res.data.data); // Debug log
						this.subdistricts = res.data.data; // Assign data to subdistricts array
					} else {
						console.error('Invalid API response:', res);
					}
				})
				.catch(err => {
					console.error('Error fetching subdistricts:', err);
				});
		},
		fetchPostalCode(idSubDistrict) {
			axios
				.get(`https://api.isnunas.my.id/api/postalCode/${idSubDistrict}`)
				.then(res => {
					if (res.data && res.data.success) {
						console.log('Postal Codes API Response:', res.data.postalCode); // Debug log
						this.postalCode = [res.data.postalCode]; // Assign postal code data
					} else {
						console.error('Invalid API response:', res);
					}
				})
				.catch(err => {
					console.error('Error fetching postal code:', err);
				});
		},
		getUserData(idUser) {
			axios
				.get(`https://api.isnunas.my.id/api/user/${idUser}`, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					if (res.data.data) {
						this.model.user = res.data.data; // Populate the model with the response data
						if (this.model.user.idDistrict) {
							this.fetchSubDistricts(this.model.user.idDistrict); // Fetch subdistricts if a district is selected
						}
						if (this.model.user.idSubDistrict) {
							this.fetchPostalCode(this.model.user.idSubDistrict); // Fetch postal codes if a subdistrict is selected
						}
					} else {
						console.error('User data not found:', res);
					}
					console.log('UserId yang dikirim:', this.userId);
				})
				.catch(err => {
					console.error('Error fetching user data:', err);
				});
		},
		handleFileChange(event) {
			const file = event.target.files[0]; // Ambil file pertama yang dipilih
			if (file) {
				console.log('File selected:', file);
				this.model.user.profileImg = file; // Simpan ke model
			}
		},
		uploadFile() {
			// Jika diperlukan, Anda dapat memproses file secara manual di sini
			console.log('File ready for upload:', this.model.user.profileImg);
		},
		updateData() {
			if (
				!this.model.user.name ||
				!this.model.user.sex ||
				!this.model.user.birthPlace ||
				!this.model.user.birthDate ||
				!this.model.user.phoneNumber ||
				!this.model.user.idDistrict ||
				!this.model.user.addressDetail ||
				!this.model.user.idSubDistrict ||
				!this.model.user.postalCode
			) {
				alert('Harap isi semua kolom yang diperlukan.');
				return;
			}
			const userFormData = new FormData();
			userFormData.append('name', this.model.user.name);
			userFormData.append('sex', this.model.user.sex);
			userFormData.append('birthPlace', this.model.user.birthPlace);
			userFormData.append('birthDate', this.model.user.birthDate);
			userFormData.append('phoneNumber', this.model.user.phoneNumber);
			userFormData.append('idDistrict', this.model.user.idDistrict);
			userFormData.append('addressDetail', this.model.user.addressDetail);
			userFormData.append('idSubDistrict', this.model.user.idSubDistrict);
			userFormData.append('postalCode', this.model.user.postalCode);

			if (this.model.user.profileImg) {
				userFormData.append('profileImg', this.model.user.profileImg);
			}

			console.log(
				'Update request to:',
				`https://api.isnunas.my.id/api/update/${this.userId}`,
			);
			console.log('User data to update:', userFormData);
			console.log('File yang dikirim:', this.model.user.profileImg);

			for (let pair of userFormData.entries()) {
				console.log(pair[0] + ':', pair[1]); // Debugging
			}

			// Update user data
			axios
				.post(
					`https://api.isnunas.my.id/api/update/${this.userId}`,
					userFormData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				)
				.then(res => {
					alert('Data berhasil diperbarui.');
					this.$router.push({ name: 'profilEcommerce' });
				})
				.catch(error => {
					console.error('Error updating profile data:', error);
					if (error.response) {
						console.error('Response Data:', error.response.data);
						console.error('Response Status:', error.response.status);
						alert(
							error.response.data?.message ||
								'Terjadi kesalahan saat memperbarui data profil.',
						);
					} else if (error.request) {
						console.error('No response received:', error.request);
						alert('Server tidak merespons, periksa koneksi Anda.');
					} else {
						console.error('Request setup error:', error.message);
						alert('Terjadi kesalahan dalam mengirim permintaan.');
					}
				});
		},
		getImageUrl(profileImg) {
			if (profileImg) {
				return `https://api.isnunas.my.id/storage/${profileImg}`;
			}
			return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
	},
	watch: {
		'model.user.idDistrict': function (newDistrictId) {
			if (newDistrictId) {
				this.fetchSubDistricts(newDistrictId); // Fetch subdistricts for the selected district
			} else {
				this.subdistricts = []; // Reset subdistricts if no district is selected
			}
		},
		'model.user.idSubDistrict': function (newSubDistrictId) {
			if (newSubDistrictId) {
				this.fetchPostalCode(newSubDistrictId); // Fetch postal codes for the selected subdistrict
			} else {
				this.postalCode = []; // Reset postal codes if no subdistrict is selected
			}
		},
	},
};
</script>
