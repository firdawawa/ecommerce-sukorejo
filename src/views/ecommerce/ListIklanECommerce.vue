<template>
    <div>
        <Navbar v-if="isLoggedIn" />
        <UnsignedNavbar v-else />
        <div class="mt-28 mx-48 mb-12">

            <!-- KATEGORI -->
            <div class="relative bg-white w-full h-full rounded-2xl py-6 px-6">
                <div class="text-4xl font-bold text-font">Iklan & Promosi</div>
                <div class="flex gap-2 content-center mt-6">
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-food.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Makanan & Minuman</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-fashion.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Fashion</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-kerajinan.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Kerajinan</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-kosmetik.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Kecantikan</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-pertanian.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Agribisnis</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-peternakan.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Peternakan</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-elektronik.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Elektronik</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-otomotif.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Otomotif</div>
                    </RouterLink>
                </div>
                <div class="flex gap-2 content-center mt-4">
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-toserba.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Toserba</div>
                    </RouterLink>
                    <RouterLink to="" class="flex gap-4 px-6 py-2 border border-primary rounded-2xl items-center hover:text-white hover:bg-primary hover:bg-opacity-40">
                        <img src="../../assets/images/icon-lainnya.png" alt="icon-food" class="content-center">
                        <div class="text-lg text-font hover:text-white">Lainnya</div>
                    </RouterLink>
                </div>
            </div>

            <!-- LIST IKLAN -->
            <div class="bg-white w-full h-full rounded-2xl px-8 py-4 mt-4">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    <div v-for="(advertisement, index) in advertisement" :key="index" class="w-full">
                        <RouterLink :to="{ path: '/iklan/' + advertisement.id + '/detail' }" class="w-full border bg-white border-gray-300 px-4 py-4 rounded-xl shadow-sm flex flex-col">
                            <img :src="getImageUrl(advertisement.banner)" alt="" class="h-70 w-full object-cover rounded-xl">
                            <div class="flex flex-col items-center mt-4">
                                <div class="font-bold text-font text-xl text-center">{{ advertisement.title }}</div>
                            </div>
                            <div class="flex items-center gap-2 mt-3">
                                <img src="../../assets/images/icon-store.png" alt="" class="h-6 w-6">
                                <div class="text-gray-500 text-lg">{{ advertisement.store.storeName }}</div>
                            </div>
                            <div class="text-gray-500 text-md mt-1">{{ categoryMap[advertisement.store.idCategory] || "Kategori Tidak Diketahui" }}</div>
                        </RouterLink>
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
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
    data(){
        return {
			categories: {},
            advertisement: [],
            users: {}, // Objek untuk menyimpan biodata user berdasarkan idUser mereka
            categoryMap: {
                1: "Makanan & Minuman",
                2: "Kerajinan",
                3: "Fashion",
                4: "Agribisnis",
                5: "Kecantikan",
                6: "Peternakan",
                7: "Otomotif",
                8: "Elektronik",
                9: "Toserba",
                10: "Lainnya"
            }
        }
    },
    mounted() {
		// this.getCategories();
        this.getAdvertisement();
    },
    components: {
        Navbar,
        UnsignedNavbar,
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token');
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        // getUser(idUser) {
		// 	// Cek apakah user sudah ada di objek users untuk menghindari pemanggilan API berulang
		// 	if (this.users[idUser]) return;

		// 	axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${localStorage.getItem('token')}`,
		// 		},
		// 	})
		// 	.then(res => {
		// 		// Gunakan spread operator agar Vue tetap reaktif
		// 		this.users = { ...this.users, [idUser]: res.data.data };
		// 	})
		// 	.catch(error => {
		// 		console.error("Error fetching user data:", error);
		// 	});
		// },
        getAdvertisement() {    
			axios.get(`http://127.0.0.1:8000/api/advertisement`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				this.advertisement = res.data.data;
				// this.advertisement.forEach(advertisement => {
				// 	this.getUser(advertisement.idUser); // Ambil data user pemilik toko
				// });
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
		},
        getImageUrl(banner) {
            if (banner) {
                return `http://127.0.0.1:8000/storage/${banner}`;
            }
            return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
        },
    },
};
</script>
