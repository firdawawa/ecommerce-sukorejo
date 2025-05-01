<template>
	<div>
		<Navbar />
		<div class="mt-28 mx-48 mb-4">
			<div class="flex">
				<!-- MINI NAVBAR -->
				<div class="bg-white w-1/5 h-fit fixed rounded-2xl p-10 pb-28">
					<div class="profile content-center object-cover">
						<RouterLink to="/profil" class="flex content-center gap-6">
							<img
								:src="getImageUrl(user.profileImg)"
								alt="profile picture"
								class="rounded-full w-20 h-20 aspect-square object-cover"
							/>
							<div class="content-center">
								<div class="text-font font-bold text-2xl content-center">{{
									user.name
								}}</div>
								<div class="flex content-center align-middle gap-3">
									<div
										class="text-gray-400 text-lg font-light content-center tracking-wider"
										>{{ user.email }}</div
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
							<div class="text-3xl text-font font-bold">Ubah Kata Sandi</div>
						</div>
						<hr class="h-px mt-7 mb-8 bg-gray-400 border-1" />
						<!-- FORM -->
						<form
							@submit.prevent="changePassword"
							class="relative text-center items-center flex flex-col"
							action="#"
						>
							<div>
								<label
									for="oldpassword"
									class="block mb-2 mt-px justify-start text-left text-xl font-medium text-gray-900"
									>Kata Sandi Lama</label
								>
								<input
									type="password"
									v-model="oldPassword"
									name="oldemail"
									id="oldemail"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400"
									placeholder="••••••••"
									required=""
								/>
							</div>
							<div>
								<label
									for="newpassword"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Kata Sandi Baru</label
								>
								<input
									type="password"
									v-model="newPassword"
									name="newpassword"
									id="newpassword"
									placeholder="••••••••"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400"
									required=""
								/>
							</div>
							<div>
								<label
									for="konfirmnewpassword"
									class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900"
									>Konfirmasi Kata Sandi Baru</label
								>
								<input
									type="password"
									v-model="newPasswordConfirmation"
									name="konfirmnewpassword"
									id="konfirmnewpassword"
									placeholder="••••••••"
									class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400"
									required=""
								/>
							</div>
							<p class="mt-3 w-[500px] text-left text-gray-600"
								>! Minimal terdiri dari 8 karakter</p
							>
							<button
								type="submit"
								@click="changePassword"
								:disabled="isLoading"
								class="w-[500px] text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-2.5 mt-14 mb-52 text-center"
								>Simpan Data</button
							>
						</form>
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
			oldPassword: '',
			newPassword: '',
			newPasswordConfirmation: '',
			user: {},
			isLoading: false,
		};
	},
	mounted() {
		const userId = localStorage.getItem('userId');
		console.log('userId from localStorage:', userId); // Debug log
		this.userId = this.$route.params.id;
		console.log('userId from route params:', this.userId);
		if (this.userId) {
			this.getUser(this.userId);
		}
	},
	components: {
		Navbar,
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		getUser(userId) {
			axios
				.get(`https://api.isnunas.my.id/api/user/${userId}`, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then(res => {
					this.user = res.data.data;
				})
				.catch(error => {
					console.error('Error fetching user data:', error);
				});
		},
		changePassword() {
			// Jangan lakukan apa-apa jika permintaan sedang diproses
			if (this.isLoading) return;

			// Set status loading menjadi true
			this.isLoading = true;

			const formData = {
				old_password: this.oldPassword,
				new_password: this.newPassword,
				new_password_confirmation: this.newPasswordConfirmation,
			};

			axios
				.put(
					`https://api.isnunas.my.id/api/update-password/${this.userId}`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				)
				.then(response => {
					alert('Password berhasil diperbarui');
					this.$router.push({ name: 'profilEcommerce' });
				})
				.catch(error => {
					console.error('Error updating store data:', error.response);
					alert('Gagal memperbarui password');
				})
				.finally(() => {
					// Set status loading kembali ke false
					this.isLoading = false;
				});
		},
		getImageUrl(profileImg) {
			if (profileImg) {
				return `https://api.isnunas.my.id/storage/${profileImg}`;
			}
			return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
	},
};
</script>
