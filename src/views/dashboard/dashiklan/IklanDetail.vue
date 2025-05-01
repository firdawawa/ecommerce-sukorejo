<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full\">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
						Detail Iklan & Promosi
					</div>
					<div class="flex">
						<div class="mr-8 mt-2">
							<button
								@click="navigateTo('/dashboard/iklan/edit')"
								class="flex gap-4 bg-primary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
							>
								<span class="font-medium text-lg text-white content-center"
									>Matikan Iklan</span
								>
							</button>
						</div>
						<div class="mr-8 mt-2">
							<RouterLink
								:to="{ path: '/dashboard/iklan/' + iklan.id + '/edit' }"
							>
								<button
									class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl"
								>
									<img
										src="../../../assets/images/icon-edit.png"
										alt="edit"
										class="content-center"
									/>
									<span class="font-medium text-lg text-white content-center"
										>Edit Data</span
									>
								</button>
							</RouterLink>
						</div>
					</div>
				</div>
				<!-- FOTO PRODUK -->
				<div>
					<div class="flex mt-6 justify-between">
						<div class="m-1 ml-8">
							<img
								:src="getImageUrl(iklan.banner)"
								id="fotoiklan"
								alt="Foto Iklan"
								class="w-36 rounded-md mx-1 object-cover"
							/>
						</div>
						<!-- <div class="ml-auto text-right mr-8">
                            <span class="text-font font-normal">Ditambahkan pada 1 Agustus 2024</span>
                        </div> -->
					</div>
				</div>
				<div class="ml-10 mb-10">
					<div class="flex">
						<div class="text-font w-60">
							<h4 class="text-md font-bold py-2">Judul</h4>
						</div>
						<div class="text-font text-md font-normal pr-6 w-[800px]">
							<h4 id="name-produk" class="py-2">{{ iklan.title }}</h4>
						</div>
					</div>
					<div class="flex">
						<div class="text-font w-60">
							<h4 class="text-md font-bold py-2">Tautan Produk</h4>
						</div>
						<div class="text-font text-md font-normal pr-6 w-[800px]">
							<h4 id="produk-price" class="py-2">{{ iklan.advurl }}</h4>
						</div>
					</div>
					<div class="">
						<div class="text-font w-60">
							<h4 class="text-md font-bold py-2">Deskripsi</h4>
						</div>
						<div class="text-font text-md font-normal pr-6 w-full">
							<h4 id="produk-desc" class="py-2">{{ iklan.description }}</h4>
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
	},
	data() {
		return {
			idAds: '',
			idStore: '',
			iklan: [],
		};
	},
	mounted() {
		this.iklanId = this.$route.params.id;
		this.getIklan(this.$route.params.id);
		// console.log('Success')
	},
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		getIklan(idAds) {
			axios
				.get(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}/advertisement/${idAds}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`, // Jika perlu token
						},
					},
				)
				.then(res => {
					console.log(res.data.data);

					this.iklan = res.data.data;
				})
				.catch(function (error) {
					if (error.response) {
						if (error.response.status == 404) {
							alert(error.response.data.message);
						}
					}
				});
		},
		getImageUrl(banner) {
			if (banner) {
				return `https://api.isnunas.my.id/storage/${banner}`;
			}
			return '/assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
	},
};
</script>
