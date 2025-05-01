<template>
    <div>
        <Navbar v-if="isLoggedIn" />
        <UnsignedNavbar v-else />
        <div class="mt-28 mx-48 mb-12">

            <div class="bg-white w-full h-full rounded-2xl p-10">
                <!-- PRODUK -->
                <div class="flex w-full">
                    <div class="w-1/3">
                        <img v-if="produk?.files?.length > 0" :src="getImageUrl(produk.files[0])" alt="" class="rounded-2xl aspect-square w-full object-cover">
                    </div>
                    <div class="ml-20 mt-4 w-2/3 mr-12">
                        <div class="text-3xl font-bold text-font ">
                            {{ produk.name }}
                        </div>
                        <div class="flex mt-6 w-full justify-between">
                            <div class="text-secondary text-5xl font-bold">{{ produk.price }}</div>
                            <div class="flex gap-3 items-center mr-6">
                                <img src="../../assets/images/icon-cart-3.png" alt="" class="h-6 w-6">
                                <div class="text-font">{{ produk.total_sold }} terjual</div>
                            </div>
                        </div>
                        <div class="flex border bg-white border-gray-300 px-10 py-6 rounded-xl mt-10">
                            <img :src="getStoreImageUrl(store.shopProfileImg)" alt="" class="h-28 w-28 object-cover rounded-full border border-gray-200">
                            <div class="block ml-10 w-full mt-2">
                                <div class="flex w-full justify-between">
                                    <div class="font-bold text-font text-3xl">{{ store.storeName }}</div>
                                    <RouterLink :to="{ path: '/toko/' + idStore + '/detail'}" class="flex gap-2">
                                        <div class="text-font text-xl font-semibold border border-secondary px-7 py-2 rounded-xl">Kunjungi Toko</div>
                                    </RouterLink>
                                </div>
                                <div class="flex justify-between mt-2">
                                    <div class="text-light text-lg text-gray-400">{{ store.categoryName || 'Kategori Tidak Ditemukan' }}</div>
                                </div>
                                <div class="flex mt-6 justify-between">
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-package.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-gray-400">{{ store.totalProducts !== undefined ? store.totalProducts : '0' }} Produk</div>
                                    </div>
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-cart-3.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-gray-400">{{ store.totalSold !== undefined ? store.totalSold : '0' }} Terjual</div>
                                    </div>
                                    <div class="flex gap-2 items-center justify-center">
                                        <img src="../../assets/images/icon-clock.png" alt="" class="h-8 w-8">
                                        <div class="font-medium text-xl text-gray-400">{{ store.openTime }} - {{ store.closeTime }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex mt-6 gap-8 items-center">
                            <button @click="addToCart(produk.id)" class="flex bg-secondary rounded-xl px-9 py-5 gap-4 items-center">
                                <div class="text-white text-3xl font-bold -mt-2">+</div>
                                <div class="text-white text-xl">Tambah ke Keranjang</div>
                            </button>
                            <div class="flex items-center gap-10 rounded-lg border border-gray-400 px-3 h-12">
                                <button>
                                    <img src="../../assets/images/icon-minus.png" alt="" class="">
                                </button>
                                <div>1</div>
                                <button>
                                    <img src="../../assets/images/icon-add.png" alt="">
                                </button>
                            </div>
                        </div>
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
                <div v-if="produk.files?.length > 0" class="flex gap-6 mt-8">
                    <div v-for="(file, index) in produk.files" :key="index" class="flex gap-6 mt-8">
                        <img :src="getImageUrl(file)" alt="" class="w-24 h-24 object-cover rounded-md">
                    </div>
                </div>

                <!-- DESKRIPSI PRODUK -->
                <div class="py-6 mt-10">
                    <div class="text-3xl font-bold text-font ml-4">Deskripsi Produk</div>
                    <div class="border border-gray-300 rounded-xl p-4 mt-4">{{ produk.description }}</div>
                </div>

                <!-- ULASAN PRODUK -->
                <!-- <div class="py-6">
                    <div class="text-3xl font-bold text-font ml-4">Ulasan Produk</div>
                    <div class="border border-gray-300 rounded-xl p-4 mt-4"></div>
                </div> -->

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
			loading: true,
            store: [],
			licenceFile: [],
            produk: [],
			user: {},
			idUserToko: '',
            idStore: '',
            produkId: '',
            produk: {
                files: [],
            },
            showLoginModal: false
        }
    },
    mounted() {
        this.produkId = this.$route.params.id;
        console.log("ID Produk:", this.produkId);
        this.getAllProduk(this.produkId);
        console.log("ID Store sebelum getStore dipanggil:", this.idStore);
    },
    components: {
        Navbar,
        UnsignedNavbar,
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token'); // Cek apakah token ada
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        getAllProduk(){
            axios.get(`http://127.0.0.1:8000/api/product/${this.produkId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				this.produk = res.data.data;
                if (this.produk && this.produk.idStore) {
    					this.idStore = this.produk.idStore;
                        console.log("ID Toko:", this.idStore);

                        // Setelah mendapatkan idUserPemilikToko, panggil getUser
                        this.$nextTick(() => {
                            this.getStore(this.idStore);
                        });
                        console.log("ID Store:", this.idStore )
                    }
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
        },
        async getProduk() {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/store/${this.idStore}/product/${this.produkId}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log(res.data);
                    this.produk = res.data.data;
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            },
        getStore() {    
			axios.get(`http://127.0.0.1:8000/api/store/${this.idStore}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				this.store = res.data.data;
				console.log("Data store:", this.store);
				if (this.store && this.store.idUser) {
					this.idUserToko = this.store.idUser; // Simpan idUser pemilik toko
					console.log("ID User Pemilik Toko:", this.idUserToko);

					// Setelah mendapatkan idUserPemilikToko, panggil getUser
					this.$nextTick(() => {
                        this.getTotalSold(this.store.id);
						this.getUser(this.idUserToko);
                        this.getTotalProduct(this.store.id);
					});
				} else {
					console.warn("idUser Pemilik Toko tidak ditemukan dalam store.");
				}
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
		},
		async getUser(idUserToko) {
			console.log("🚀 getUser dipanggil dengan:", idUserToko, typeof idUserToko);

			try {
				const response = await axios.get(`http://127.0.0.1:8000/api/user/${idUserToko}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					}
				});

				this.user = response.data.data;
				console.log("Data User:", this.user);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		},
            getImageUrl(file) {
            if (file && file.file) {
                return `http://127.0.0.1:8000/storage/${file.file}`;
            }
            return '/assets/images/no-image.png'; // Placeholder jika gambar tidak tersedia
        },
        addToCart(productId) {
            const token = localStorage.getItem('token'); 
            if (!token) {
                this.showLoginModal = true; // Tampilkan modal jika user belum login
                return;
            } else {
            console.log("Menambahkan produk ke keranjang, ID:", productId); // Debugging
            
            axios.post('http://127.0.0.1:8000/api/cart/add', {
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
        },
        getTotalSold(idStore) {
            axios.get(`http://127.0.0.1:8000/api/store/${idStore}/totalsold`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(res => {
                console.log(`Total sold for store ${idStore}:`, res.data); // Debugging

                // Langsung update `totalSold` pada objek store
                this.store.totalSold = res.data.total_sold;
            })
            .catch(error => {
                console.error(`Error fetching total sold for store ${idStore}:`, error);
            });
        },
        getTotalProduct() {
            axios.get(`http://127.0.0.1:8000/api/store/${this.idStore}/total-products`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(res => {
                console.log(`Total products for store ${this.idStore}:`, res.data); // Debugging

                this.store.totalProducts = res.data.total_products;
            })
            .catch(error => {
                console.error(`Error fetching total products for store ${this.idStore}:`, error);
            });
        },
        getStoreImageUrl(shopProfileImg) {
            if (shopProfileImg) {
                return `http://127.0.0.1:8000/storage/${shopProfileImg}`;
            }
            return placeholderImage; // Gunakan import statis
        }

    },
    watch: {
		idUserToko(newVal) {
			if (newVal) {
				this.getUser(newVal);
			}
		},
        idStore(newVal) {
            if (newVal) {
                this.getProduk();
                this.getTotalSold(newVal);
                this.getTotalProduct();
            }
        }
	},
};
</script>
