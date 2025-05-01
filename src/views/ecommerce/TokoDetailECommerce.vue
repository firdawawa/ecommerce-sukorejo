<template>
    <div>
        <Navbar v-if="isLoggedIn" />
        <UnsignedNavbar v-else />
        <div class="mt-28 mx-48 mb-12">

            <div class="bg-white w-full h-full rounded-2xl p-10">
                <!-- BIO TOKO -->
                <div class="bg-toko flex h-full rounded-xl p-10">
                    <img src="../../assets/images/toko-pict.jpg" alt="" class="h-40 w-40 object-cover rounded-full border border-gray-200">
                    <RouterLink :to="{ path: '/toko/' + store.id + '/detail'}" class="ml-10">
                        <div class="text-white font-bold text-2xl">{{ store.storeName }}</div>
                        <div class="text-white text-lg mt-3">{{ store.categoryName || 'Kategori Tidak Ditemukan' }}</div>
                        <div class="flex gap-2 mt-6">
                            <img src="../../assets/images/icon-location-white.png" alt="" class="h-6 w-6">
                            <div class="text-white w-80">{{ user.addressDetail || 'Alamat tidak tersedia' }}, {{ subDistrict.subDistrictName || 'Subdistrict tidak ditemukan' }}, {{ district || 'District tidak ditemukan' }}</div>
                        </div>
                    </RouterLink>
                    <div class="ml-40">
                        <div class="flex gap-6 items-center mt-6">
                            <img src="../../assets/images/icon-package-white.png" alt="" class="h-8 w-8">
                            <div class="text-white text-xl">10 Produk</div>
                        </div>
                            <div class="flex gap-6 items-center mt-5">
                            <img src="../../assets/images/icon-cart.png" alt="" class="h-8 w-8">
                            <div class="text-white text-xl">300 Terjual</div>
                        </div>
                        <div class="flex gap-6 items-center mt-5">
                            <img src="../../assets/images/icon-clock-white.png" alt="" class="h-8 w-8">
                            <div class="text-white text-xl">{{ store.openTime }} - {{ store.closeTime }}</div>
                        </div>
                    </div>
                    <div class="ml-40">
                        <div class="flex gap-6 mt-6">
                            <img src="../../assets/images/icon-user-check-white.png" alt="" class="h-7 w-7">
                            <div class="text-white text-lg">Bergabung {{ formatDate(store.created_at) }}</div>
                        </div>
                        <div class="flex gap-8 mt-6">
                            <div class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg">PIRT</div>
                            <div class="text-white text-md font-light bg-secondary px-5 py-1 rounded-lg">Halal</div>
                        </div>
                        <div class="flex gap-6 mt-6">
                            <img src="../../assets/images/icon-phone-white.png" alt="" class="h-8 w-8">
                            <div class="text-white text-xl">Kontak Toko</div>
                        </div>
                    </div>
                </div>

                <!-- LIST IKLAN -->
                <div class="flex justify-between items-center mt-12">
                    <div class="text-3xl font-bold text-font ml-4">Iklan & Promosi</div>
                    <RouterLink :to="{ path: '/toko/' +store.id + '/iklan'}" class="flex items-center gap-3 mr-8 underline">
                        <div class="text-gray-500 font-semibold">Lihat Semua</div>
                        <img src="../../assets/images/icon-arrow-gray.png" alt="" class="h-3">
                    </RouterLink>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-6">
                    <div v-for="(iklan, index) in iklan" :key="index" class="w-full border bg-white border-gray-300 px-4 py-2 rounded-xl">
                        <RouterLink :to="{ path: '/iklan/' +iklan.id + '/detail'}">
                            <img :src="getBannerImageUrl(iklan.banner)" alt="" class="h-70 w-full object-cover rounded-xl border border-gray-200">
                            <div class="w-full my-2">
                                <div class="w-full justify-between">
                                    <div class="font-bold text-font text-2xl text-center">{{ iklan.title }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>   
                </div>

                <!-- DESKRIPSI TOKO -->
                <div class="py-6">
                    <div class="text-3xl font-bold text-font ml-4">Deskripsi Toko</div>
                    <div class="border border-gray-300 rounded-xl p-4 mt-4">{{ store.description }}</div>
                </div>

                <!-- KEBIJAKAN TOKO -->
                <div class="py-6">
                    <div class="text-3xl font-bold text-font ml-4">Kebijakan Toko</div>
                    <div class="border border-gray-300 rounded-xl p-4 mt-4">{{ store.policy }}</div>
                </div>

                <!-- KATALOG PRODUK -->
                <div class="py-6">
                    <div class="text-3xl font-bold text-font ml-4">Katalog Produk</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-6">
                        <div v-for="(produk, index) in produk" :key="index" class="border border-gray-400 rounded-3xl w-full relative">
                            <RouterLink :to="{ path: '/produk/' + produk.id + '/detail'}">
                                <img :src="getFileImageUrl(produk.files)" alt="" class="w-full rounded-t-3xl h-72 object-cover">
                                <button @click.stop.prevent="addToCart(produk.id)" class="absolute top-60 right-4">
                                    <div class="flex h-20 w-20 bg-secondary rounded-full items-center content-center justify-center">
                                        <img src="../../assets/images/icon-cart-produk.png" alt="" class="h-10 justify-center">
                                    </div>
                                </button>
                                <div class="mt-4 px-7">
                                    <div class="text-2xl font-bold text-font">{{ produk.name }}</div>
                                    <div class="text-gray-400 mt-1 font-light">{{ store.categoryName || 'Kategori Tidak Ditemukan' }}</div>
                                    <div class="flex justify-between my-6">
                                        <div class="text-4xl text-primary font-bold">{{ produk.price }}</div>
                                        <div class="font-light text-gray-400">{{ produk.total_sold }} terjual</div>
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
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';
import UnsignedNavbar from '../../components/ecommerce/UnsignedNavbar.vue';

export default {
    components: {
        Navbar,
        UnsignedNavbar
    },
    data(){
        return {
			loading: true,
            idDistrict: '',
            idSubDistrict: '',
            store: [],
            district: '',
            subDistrict: '',
			licenceFile: [],
            produk: [],
            iklan: [],
			user: {},
			idUserToko: '',
            showLoginModal: false,
        }
    },
    async mounted() {
        this.idStore = this.$route.params.id; // Ambil id dari URL
    	this.getStore(this.idStore);
		if (this.idUserToko) {
            await this.getUser(this.idUserToko);
            if (this.user.idDistrict) {
                this.getDistrict(this.user.idDistrict);
            }
            if (this.user.idSubDistrict) {
                this.getSubDistrict(this.user.idSubDistrict);
            }
        } else {
            console.error("User ID tidak ditemukan di localStorage");
        }
        this.getProduk();
        this.getIklan();
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
        getStore() {    
			axios.get(`https://api.isnunas.my.id/api/store/${this.idStore}`, {
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
						this.getUser(this.idUserToko);
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
				const response = await axios.get(`https://api.isnunas.my.id/api/user/${idUserToko}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					}
				});

				this.user = response.data.data;
				console.log("Data User:", this.user);
				if (this.user.idDistrict) {
					this.getDistrict(this.user.idDistrict); // Panggil getDistrict untuk mengambil data district
				} if (this.user.idSubDistrict) {
                    this.getSubDistrict(this.user.idSubDistrict);
                }
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		},
		getDistrict(idDistrict) {
            axios.get(`https://api.isnunas.my.id/api/districts/${idDistrict}`)
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
            axios.get(`https://api.isnunas.my.id/api/subdistricts/data/${idSubDistrict}`)
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
        async getProduk() {
                try {
                    const res = await axios.get(`https://api.isnunas.my.id/api/store/${this.idStore}/product`, {
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
            },
            async getIklan() {
                try {
                    const res = await axios.get(`https://api.isnunas.my.id/api/store/${this.idStore}/advertisement`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log(res.data);
                    this.iklan = res.data.data;
                } catch (error) {
                    console.error('Error fetching ads:', error);
                }
            },
            getFileImageUrl(files) {
                if (files && files.length > 0) {
                    return `https://api.isnunas.my.id/storage/${files[0].file}`;
                }
                return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
            },

            getBannerImageUrl(banner) {
                if (banner) {
                    return `https://api.isnunas.my.id/storage/${banner}`;
                }
                return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
            },
    },
    watch: {
		idUserToko(newVal) {
			if (newVal) {
				this.getUser(newVal);
			}
		}
	},
};
</script>
