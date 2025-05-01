<template>
	<!-- Wrapper -->
	<div class="relative flex h-screen w-screen p-4 gap-4">
		<!-- Background Image -->
		<div
			class="absolute inset-0 bg-cover bg-center z-0"
			style="background-image: url('https://i.ibb.co.com/NN2fMCv/kepuh.png')"
		>
		</div>

		<!-- Landing Poster -->
		<div
			class="relative fixed z-10 bg-white bg-opacity-65 p-10 w-3/5 h-full text-center items-center content-center justify-center align-middle rounded-3xl shadow-lg flex flex-col"
		>
			<h1 class="text-4xl font-semibold text-white leading-snug"
				>Digital UMKM <br />
				Desa Sukorejo</h1
			>
			<img
				class="mx-auto mt-px"
				src="../../assets/images/grafik-regist-umkm.png"
				alt="grafik-regist"
			/>
			<div class="flex gap-4 mt-4">
				<p class="mt-4 text-white">2024</p>
				<p class="mt-4 text-white">•</p>
				<p class="mt-4 text-white"
					>BUMDes Mitra Sejati Desa Sukorejo, Kec. Gandusari, Kab. Trenggalek,
					Jawa Timur</p
				>
			</div>
		</div>

		<!-- Login Form -->
		<div
			class="relative z-10 bg-white w-2/5 h-full text-center items-center rounded-3xl shadow-lg flex flex-col overflow-y-auto"
		>
			<div>
				<h2 class="text-primary font-bold text-3xl mt-16">REGISTRASI TOKO</h2>
				<!-- Form Input -->
				<form class="" action="#">
					<div>
						<label
							for="name"
							class="block mb-2 mt-12 justify-start text-left text-xl font-medium text-font"
							>Nama Pemilik Toko</label
						>
						<input
							type="text"
							v-model="model.auth.name"
							name="nama-pemilik"
							id="name"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="ex: Susi Susanti"
							required
						/>
					</div>
					<div>
						<label
							for="phone"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Nomor Telepon</label
						>
						<input
							type="text"
							v-model="model.auth.phoneNumber"
							name="phone"
							id="phone"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="08xxxxxxxxxxx"
							required
						/>
					</div>
					<div class="max-w-sm mx-auto">
						<label
							for="sex"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Jenis Kelamin</label
						>
						<select
							id="sex"
							v-model="model.auth.sex"
							class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
						>
							<option value="male">Laki-Laki</option>
							<option value="female">Perempuan</option>
						</select>
					</div>
					<div>
						<label
							for="birthPlace"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Tempat Lahir</label
						>
						<input
							type="text"
							v-model="model.auth.birthPlace"
							name="birthPlace"
							id="birthPlace"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="ex: Trenggalek"
							required
						/>
					</div>
					<div>
						<label
							for="dob"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Tanggal Lahir</label
						>
						<input
							type="date"
							v-model="model.auth.birthDate"
							name="dob"
							id="dob"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="ex: Butik Sukorejo"
							required=""
						/>
					</div>
					<div class="max-w-sm mx-auto">
						<label
							for="district"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Kecamatan</label
						>
						<select
							id="district"
							v-model="model.auth.idDistrict"
							class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
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

					<div class="max-w-sm mx-auto">
						<label
							for="subdistrict"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Kelurahan</label
						>
						<select
							id="subdistrict"
							v-model="model.auth.idSubDistrict"
							class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
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
					<div class="max-w-sm mx-auto">
						<label
							for="postalcode"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Kode Pos</label
						>
						<select
							id="postalcode"
							v-model="model.auth.postalCode"
							class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
						>
							<option v-for="code in postalCode" :key="code" :value="code">
								{{ code }}
							</option>
						</select>
					</div>
					<div>
						<label
							for="address"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font"
							>Detail Alamat</label
						>
						<input
							type="text"
							v-model="model.auth.addressDetail"
							name="address"
							id="address"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="ex: Jalan Kartini no 11"
							required
						/>
					</div>
					<div>
						<label
							for="email"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
							>Email</label
						>
						<input
							type="email"
							v-model="model.auth.email"
							name="email"
							id="email"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							placeholder="email@example.com"
							required=""
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
							>Kata Sandi</label
						>
						<input
							type="password"
							v-model="model.auth.password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							required=""
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
							>Konfirmasi Kata Sandi</label
						>
						<input
							type="password"
							v-model="model.auth.password_confirmation"
							name="password"
							id="confirmpassword"
							placeholder="••••••••"
							class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400"
							required=""
						/>
					</div>
					<button
						type="button"
						@click="register"
						class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-2.5 mt-16 text-center"
						>Registrasi</button
					>
					<div class="inline-flex items-center mb-12 justify-center w-full">
						<hr class="w-full h-px my-8 bg-gray-300 border-0" />
						<span
							class="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2"
							>Sudah punya akun?
							<a href="/login" class="font-bold text-primary">Masuk</a></span
						>
					</div>
				</form>
			</div>
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
				<h2 class="text-3xl text-font font-bold mb-6">Registrasi Berhasil</h2>
				<hr class="h-px mb-6 bg-gray-400 border-1" />

				<!-- Content inside modal -->
				<div class="flex justify-center">
					<div class="text-xl text-font my-16 mx-4">
						Registrasi akun mu telah berhasil!
						<span class="font-bold">Login</span> untuk masuk ke akunmu dan mulai
						menjelajah!
					</div>
				</div>
				<RouterLink to="/login">
					<button
						type="submit"
						class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center"
						>Login</button
					>
				</RouterLink>
				<button
					@click="closeModal"
					class="w-full text-font border border-gray-300 hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center"
					>Kembali</button
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
		<!-- END MODAL -->
	</div>
</template>

<script>
import axios from 'axios';
import router from '../../router';

export default {
	name: 'auth',
	data() {
		return {
			districts: [],
			subdistricts: [],
			postalCode: [],
			isModalOpen: false,
			model: {
				auth: {
					name: '',
					email: '',
					phoneNumber: '',
					addressDetail: '',
					password: '',
					password_confirmation: '',
					sex: '',
					birthPlace: '',
					birthDate: '',
					idDistrict: '',
					idSubDistrict: '',
					postalCode: '',
					idUserType: 2,
				},
			},
		};
	},
	methods: {
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
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

		register() {
			console.log('Data yang dikirim:', this.model.auth);
			if (
				!this.model.auth.name ||
				!this.model.auth.email ||
				!this.model.auth.password ||
				!this.model.auth.idDistrict ||
				!this.model.auth.idSubDistrict ||
				!this.model.auth.postalCode
			) {
				alert('Harap lengkapi semua data!');
				return;
			}

			var $this = this;
			axios
				.post('https://api.isnunas.my.id/api/register', this.model.auth, {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(res => {
					(this.model.auth = {
						name: '',
						email: '',
						phoneNumber: '',
						addressDetail: '',
						password: '',
						password_confirmation: '',
						sex: '',
						birthPlace: '',
						birthDate: '',
						idDistrict: '',
						idSubDistrict: '',
						postalCode: '',
						idUserType: 2,
					}),
						(this.isModalOpen = true); // Modal terbuka setelah registrasi berhasil

					const token = res.data.token;
					const user = res.data.user;

					if (token) {
						localStorage.setItem('token', token); // Simpan token ke localStorage
						console.log('Token berhasil disimpan di localStorage');
					}

					if (user && user.id) {
						localStorage.setItem('userId', user.id); // Simpan userId ke localStorage
						console.log('User ID berhasil disimpan di localStorage:', user.id);
					} else {
						console.error('User ID tidak ditemukan dalam respons');
					}
				})
				.catch(function (error) {
					if (error.response) {
						if (error.response.status == 422) {
							this.errorList = error.response.data.errors;
						}
						// console.log(error.response.data);
						// console.log(error.response.status);
						// console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
				});
		},
	},
	watch: {
		'model.auth.idDistrict': function (newDistrictId) {
			if (newDistrictId) {
				this.fetchSubDistricts(newDistrictId); // Fetch subdistricts for the selected district
			} else {
				this.subdistricts = []; // Reset subdistricts if no district is selected
			}
		},
		'model.auth.idSubDistrict': function (newSubDistrictId) {
			if (newSubDistrictId) {
				this.fetchPostalCode(newSubDistrictId); // Fetch postal codes for the selected subdistrict
			} else {
				this.postalCode = []; // Reset postal codes if no subdistrict is selected
			}
		},
	},
	mounted() {
		this.fetchDistricts(); // Panggil metode untuk mengambil data distrik
		this.fetchSubDistricts(); // Panggil metode untuk mengambil data sub distrik
		this.fetchPostalCode(); // Panggil metode untuk mengambil data kode pos
	},
};
</script>
