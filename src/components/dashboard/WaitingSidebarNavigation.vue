<template>
	<div class="relative flex z-50">
		<!-- Sidebar Navigation -->
		<div class="bg-primary h-screen w-1/4 fixed">
			<div
				class="max-h-screen flex flex-wrap items-center align-middle justify-center mx-auto p-4"
			>
				<div class="hidden h-full md:block md:h-auto" id="navbar-default">
					<!-- Logo -->
					<div class="logo text-6xl mt-6">
						<RouterLink
							to="/dashboard"
							class="flex h-14 w-96 mx-auto justify-center items-center text-white rounded-3xl md:border-0 md:p-0"
						>
							LOGO
						</RouterLink>
					</div>

					<!-- Akun -->
					<div class="w-96 h-20 m-12 text-center content-center bg-secondary">
						ini akun
					</div>

					<!-- Button Logout -->
					<div class="flex justify-center h-screen">
						<button
							@click="logout"
							class="bg-secondary text-white px-4 py-2 rounded-md w-80 h-12 mt-96 text-center items-center content-center hover:bg-red-600 transition duration-200"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Header -->
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 m-5 rounded-xl h-24 content-center">
				<div class="font-bold text-3xl text-font ml-10"> Dashboard </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WaitingDashboardSidebarNavigation',
	methods: {
		logout() {
			// Ambil token dari localStorage atau tempat penyimpanan lain
			const token = localStorage.getItem('token');

			if (!token) {
				console.error('Token tidak ditemukan');
				return;
			}

			// Kirim permintaan logout dengan token di header Authorization
			axios
				.post(
					'https://api.isnunas.my.id/api/logout',
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`, // Kirim token dengan prefix 'Bearer'
						},
					},
				)
				.then(response => {
					console.log('Logout berhasil:', response.data);

					// Hapus token dari localStorage setelah logout berhasil
					localStorage.removeItem('token');
					localStorage.removeItem('idStore');
					localStorage.removeItem('userId');

					// Redirect ke halaman login setelah logout
					this.$router.push('/login');
				})
				.catch(error => {
					console.error(
						'Terjadi kesalahan saat logout:',
						error.response ? error.response.data : error,
					);
				});
		},
	},
};
</script>
