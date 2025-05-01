<template>
    <div>
        <Navbar v-if="isLoggedIn" />
        <UnsignedNavbar v-else />
        <div class="mt-28 mx-48 mb-12">
            <img src="../../assets/images/banner-home.png" alt="Banner-Home" class="w-full rounded-3xl">

            <!-- JELAJAHI -->
            <div class="mt-12 relative z-10">
                <div class="text-3xl font-bold text-font ml-10">Jelajahi</div>
                <div class="flex gap-6 mt-4">
                    <div class="relative w-full">
                        <div class="w-full absolute top-0 left-0 z-0">
                            <img src="../../assets/images/banner-store.png" alt="banner-store" class="w-full">
                        </div>
                        <RouterLink to="/toko" class="flex justify-between mx-8 relative z-10 mt-10">
                            <div class="bg-white text-font text-2xl font-bold px-20 py-3 rounded-3xl">Toko</div>
                            <div class="bg-white py-3 px-5 rounded-full flex items-center">
                                <img src="../../assets/images/icon-arrow-2.png" alt="icon-arrow" class="w-5 h-5">
                            </div>
                        </RouterLink>
                    </div>
                    <div class="relative w-full">
                        <div class="w-full absolute top-0 left-0 z-0">
                            <img src="../../assets/images/banner-adv.png" alt="banner-adv" class="w-full">
                        </div>
                        <RouterLink to="/iklan" class="flex justify-between mx-8 relative z-10 mt-10">
                            <div class="bg-white text-font text-2xl font-bold px-10 py-3 rounded-3xl">Iklan & Promosi</div>
                            <div class="bg-white py-3 px-5 rounded-full flex items-center">
                                <img src="../../assets/images/icon-arrow-2.png" alt="icon-arrow" class="w-5 h-5">
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- KATEGORI -->
            <div class="mt-72 relative z-0">
                <div class="text-3xl font-bold text-font ml-10">Kategori</div>
                <div class="flex gap-2 content-center mt-4">
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

            <!-- REKOMENDASI PRODUK -->
            <div class="mt-12">
                <div class="text-3xl font-bold text-font ml-10">Rekomendasi Produk</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    <div v-for="(produk, getAll) in produk" :key="getAll" class="w-full">
                        <RouterLink :to="{ path: '/produk/' + produk.id + '/detail' }" class="border border-gray-400 rounded-3xl w-full relative flex flex-col">
                            <img :src="getImageUrl(produk.files)" alt="" class="w-full rounded-t-3xl h-72 object-cover">
                            <button @click.stop.prevent="addToCart(produk.id)" class="absolute top-60 right-4">
                                <div class="flex h-20 w-20 bg-secondary rounded-full items-center content-center justify-center">
                                    <img src="../../assets/images/icon-cart-produk.png" alt="" class="h-10 justify-center">
                                </div>
                            </button>
                            <div class="mt-4 px-7">
                                <div class="text-2xl font-bold text-font">{{ produk.name }}</div>
                                <div class="text-gray-400 mt-1 font-light">{{ categoryMap[produk.store.idCategory] || "Kategori Tidak Diketahui" }}</div>
                                <div class="flex justify-between my-6">
                                    <div class="text-4xl text-primary font-bold">{{ produk.price }}</div>
                                    <div class="font-light text-gray-400">{{ produk.total_sold }} Terjual</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                    <!-- Modal Peringatan -->
                    <div v-if="showLoginModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div class="bg-white px-10 py-24 rounded-lg shadow-lg w-1/3 text-center">
                            <h2 class="text-2xl font-bold text-red-600">Anda belum login!</h2>
                            <p class="text-font mt-12 text-lg">Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.</p>
                            <div class="mt-10 flex justify-center gap-4">
                                <button @click="navigateTo('/login')" class="text-lg font-semibold px-12 py-4 bg-blue-500 text-white rounded-lg">Login</button>
                                <button @click="showLoginModal = false" class="text-lg font-semibold px-12 py-4 bg-gray-400 text-white rounded-lg">Tutup</button>
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
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
    name: "homeEcommerce",
    data(){
        return {
			categories: {},
            produk: [],
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
            },
            showLoginModal: false
        }
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
    mounted() {
		// this.getCategories();
        this.getProduk();
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        getProduk() {    
			axios.get(`https://api.isnunas.my.id/api/product`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				this.produk = res.data.data;
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
		},
        getImageUrl(files) {
                if (files && files.length > 0) {
                    return `https://api.isnunas.my.id/storage/${files[0].file}`;
                }
                return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
        },
        addToCart(productId) {
            const token = localStorage.getItem('token'); 
            if (!token) {
                this.showLoginModal = true; // Tampilkan modal jika user belum login
                return;
            } else {
            console.log("Menambahkan produk ke keranjang, ID:", productId); // Debugging
            
            axios.post('https://api.isnunas.my.id/api/cart/add', {
                idProduct: productId, // Pastikan ini benar
                quantity: 1
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                }
            })
            .then(response => {
                alert('Produk berhasil ditambahkan ke keranjang!');
            })
            .catch(error => {
                console.error("Error adding to cart:", error.response.data);
                alert('Gagal menambahkan ke keranjang.');
            });
        }
        }
    },
};
</script>
