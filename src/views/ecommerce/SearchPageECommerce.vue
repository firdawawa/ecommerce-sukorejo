<template>
    <div>
        <Navbar v-if="isLoggedIn" />
        <UnsignedNavbar v-else />
        <div class="mt-28 mx-48 mb-12">

            <div class="bg-white w-full h-full rounded-2xl mt-4 py-8">

                <!-- LIST TOKO -->
                <div class="text-4xl font-bold text-font px-8">Toko</div> 
                <div v-if="stores?.length > 0" class="grid grid-cols-2 px-8 gap-4 gap-y-0">
                    <div v-for="(store, index) in stores" :key="index" class="relative py-6 w-full">
                        <RouterLink :to="{ path: '/toko/' + store.id + '/detail'}" class="flex w-full border bg-white border-gray-300 px-8 py-6 rounded-xl">
                            <img :src="getStoreImageUrl(store.shopProfileImg)" alt="" class="h-40 w-40 object-cover rounded-full border border-gray-200">
                            <div class="block ml-6 w-full mt-2">
                                <div class="flex w-full justify-between">
                                    <div class="font-bold text-font text-3xl">{{ store.storeName }}</div>
                                    <div class="flex gap-2">
                                        <div class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg">PIRT</div>
                                        <div class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg">Halal</div>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-4">
                                    <div class="text-light text-lg text-font">{{ getCategoryName(store.idCategory) }}</div>
                                    <div class="flex gap-2">
                                        <img src="../../assets/images/icon-user-check.png" alt="" class="h-7 w-7">
                                        <div class="text-light text-lg text-font">{{ formatDate(store.created_at) }}</div>
                                    </div>
                                </div>
                                <div class="flex mt-6 justify-between">
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-package.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-font">{{ store.products_count }} Produk</div>
                                    </div>
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-cart-3.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-font">{{ store.totalSold !== undefined ? store.totalSold : '0' }} Terjual</div> 
                                        <!-- TAMBAH KODE TOTAL TERJUAL TOKO DISINI -->
                                    </div>
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-clock.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-font">{{ store.openTime }} - {{ store.closeTime }}</div>
                                    </div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div v-else class="flex justify-center px-8 my-8 text-lg text-gray-500">Tidak ada toko yang sesuai dengan pencarian.</div>

                <!-- LIST IKLAN -->
                <div class="text-4xl font-bold text-font px-8">Iklan</div>
                <div v-if="ads?.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-4">
                    <div v-for="(ad, index) in ads" :key="index" class="w-full px-8">
                        <RouterLink :to="{ path: '/iklan/' + ad.id + '/detail' }" class="w-full border bg-white border-gray-300 px-4 py-4 rounded-xl shadow-sm flex flex-col">
                            <img :src="getAdImageUrl(ad.banner)" alt="" class="h-70 w-full object-cover rounded-xl">
                            <div class="flex flex-col items-center mt-4">
                                <div class="font-bold text-font text-xl text-center">{{ ad.title }}</div>
                            </div>
                            <div class="flex items-center gap-2 mt-3">
                                <img src="../../assets/images/icon-store.png" alt="" class="h-6 w-6">
                                <div class="text-gray-500 text-lg">{{ ad.store.storeName }}</div>
                            </div>
                            <div class="text-gray-500 text-md mt-1">{{ categoryMap[ad.store.idCategory] || "Kategori Tidak Diketahui" }}</div>
                        </RouterLink>
                    </div>
                </div>
                <div v-else class="flex justify-center px-8 my-8 text-lg text-gray-500">Tidak ada iklan yang sesuai dengan pencarian.</div>

                <!-- LIST PRODUK -->
                <div class="text-4xl font-bold text-font px-8">Produk</div>
                <div v-if="products?.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    <div v-for="(product, getAll) in products" :key="getAll" class="w-full px-8">
                        <RouterLink :to="{ path: '/produk/' + product.id + '/detail' }" class="border border-gray-400 rounded-3xl w-full relative flex flex-col">
                            <img :src="getProductImageUrl(product)" alt="" class="w-full rounded-t-3xl h-72 object-cover">
                            <button @click.stop.prevent="addToCart(product.id)" class="absolute top-60 right-4">
                                <div class="flex h-20 w-20 bg-secondary rounded-full items-center content-center justify-center">
                                    <img src="../../assets/images/icon-cart-produk.png" alt="" class="h-10 justify-center">
                                </div>
                            </button>
                            <div class="mt-4 px-7">
                                <div class="text-2xl font-bold text-font">{{ product.name }}</div>
                                <div class="text-gray-400 mt-1 font-light">{{ categoryMap[product.store.idCategory] || "Kategori Tidak Diketahui" }}</div>
                                <div class="flex justify-between my-6">
                                    <div class="text-4xl text-primary font-bold">{{ product.price }}</div>
                                    <div class="font-light text-gray-400">{{ product.total_sold }} Terjual</div>
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
                <div v-else class="flex justify-center px-8 my-8 text-lg text-gray-500">Tidak ada produk yang sesuai dengan pencarian.</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';
import placeholderImage from '../../assets/images/no-image.png';
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
    data(){
        return {
            searchQuery: '',
            stores: [],
            ads: [],
            products: [],
            categories: {},
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
        };
    },
    created() {
        this.searchQuery = this.$route.query.q || "";
        this.fetchSearchResults();
    },
    mounted() {
        this.fetchSearchResults();
        this.getCategories();
    },
    watch: {
        '$route.query.q': 'fetchSearchResults',
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
			// Cek apakah user sudah ada di objek users untuk menghindari pemanggilan API berulang
			if (this.users[idUser]) return;

			axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(res => {
				// Gunakan spread operator agar Vue tetap reaktif
				this.users = { ...this.users, [idUser]: res.data.data };
			})
			.catch(error => {
				console.error("Error fetching user data:", error);
			});
		},
        async fetchSearchResults() {
            this.searchQuery = this.$route.query.q || '';
            if (!this.searchQuery) return;

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/search`, {
                    params: { keyword: this.searchQuery }
                })
                console.log("Full Response:", response.data);
                this.stores = response.data.stores || [];
                console.log("Response Store:", response.data.stores);
                this.ads = response.data.ads || [];
                this.products = response.data.products || [];

                // Ambil gambar pertama untuk setiap produk
                this.products = this.products.map(product => ({
                    ...product,
                    firstImage: product.files && Array.isArray(product.files) && product.files.length > 0
                        ? product.files[0].file
                        : 'default-image.png',
                }));
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        },
        getCategories() {
			axios.get(`http://127.0.0.1:8000/api/categories`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(res => {
				// Simpan daftar kategori dalam objek, key = idCategory, value = categoryName
				this.categories = res.data.data.reduce((acc, category) => {
					acc[category.id] = category.categoryName;
					return acc;
				}, {});
			})
			.catch(error => {
				console.error("Error fetching categories:", error);
			});
		},
		getCategoryName(idCategory) {
			return this.categories[idCategory] || "Memuat...";
		},
        addToCart(productId) {
            const token = localStorage.getItem('token'); 
            if (!token) {
                this.showLoginModal = true; // Tampilkan modal jika user belum login
                return;
            } else {
            console.log("Menambahkan produk ke keranjang, ID:", productId); // Debugging
            
            axios.post('http://127.0.0.1:8000/api/cart/add', {
                idProduct: productId,
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
        },
        getStoreImageUrl(image) {
            return image ? `http://127.0.0.1:8000/storage/${image}` : placeholderImage;
        },
        getAdImageUrl(image) {
            return image ? `http://127.0.0.1:8000/storage/${image}` : placeholderImage;
        },
        getProductImageUrl(product) {
            return product.first_image && product.first_image.file 
                ? `http://127.0.0.1:8000/storage/${product.first_image.file}`
                : placeholderImage;
        },
        getCategoryName(idCategory) {
            return this.categoryMap[idCategory] || 'Kategori Tidak Diketahui';
        }
    },
};
</script>
