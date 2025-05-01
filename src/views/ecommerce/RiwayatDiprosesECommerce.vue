<template>
    <div>
        <Navbar/>
        <div class="mt-28 mx-48 mb-4">

            <div class="flex">
                <!-- MINI NAVBAR -->
                <div class="bg-white w-1/5 h-fit fixed rounded-2xl p-10 pb-28">
                    <div class="profile content-center object-cover">
                        <RouterLink to="/profil" class="flex content-center gap-6">
                            <img v-if="user && user.data" :src="getImage(user.data.profileImg)" alt="profile picture" class="rounded-full w-20 h-20 aspect-square object-cover">
                            <div class="content-center">
                                <div class="text-font font-bold text-2xl content-center" v-if="user && user.data">{{ user.data.name }}</div>
                                <div class="flex content-center align-middle gap-3 ">
                                    <div class="text-gray-400 text-lg font-light content-center tracking-wider" v-if="user && user.data">{{ user.data.email }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                    <div class="mt-14">
                        <ul class="font-medium p-4 md:p-0 mt-4 border items-center border-gray-100 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 ">
                            <li>
                                <RouterLink to="/profil" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Profil
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ path: '/profil/' + userId + '/password' }" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Ubah Password
                                </RouterLink>
                            </li>   
                            <li>
                                <RouterLink to="/riwayat" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Riwayat
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/cart" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Keranjang Saya
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Tentang Aplikasi
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Hubungi Bantuan
                                </RouterLink>
                            </li>   
                        </ul>
                    </div>
                    <!-- Button Logout -->
                    <div class="flex justify-center">
                        <button @click="logout" class="bg-secondary text-lg font-semibold text-white px-4 py-2 rounded-md w-80 h-12 mt-32 text-center items-center content-center  hover:bg-red-600 transition duration-200">
                            Keluar
                        </button>
                    </div>

                </div>

                <div class="w-3/4 ml-1/4">
                    <div class="bg-white h-fit rounded-2xl py-4 px-12 ml-4">
                        <div class="flex justify-between text-xl text-font font-semibold">
                            <RouterLink to="/riwayat" class="px-8 hover:bg-hover-primary hover:text-white rounded-full py-4">Semua Pesanan</RouterLink>
                            <RouterLink to="/riwayat/belumbayar" class="px-10 hover:bg-hover-primary hover:text-white rounded-full py-4">Belum Dibayar</RouterLink>
                            <RouterLink to="/riwayat/diproses" class="px-10 hover:bg-hover-primary hover:text-white rounded-full py-4">Diproses</RouterLink>
                            <RouterLink to="/riwayat/selesai" class="px-20 hover:bg-hover-primary hover:text-white rounded-full py-4">Selesai</RouterLink>
                            <RouterLink to="/riwayat/dibatalkan" class="px-10 hover:bg-hover-primary hover:text-white rounded-full py-4">Dibatalkan</RouterLink>
                        </div>
                    </div>
                    <div class="bg-white h-fit rounded-2xl pb-6 pt-2 px-14 mt-4 ml-4">
                        <!-- RIWAYAT BOX -->
                        <div v-if="filteredOrderData.length > 0">
                            <RouterLink v-for="(order, index) in filteredOrderData" :key="index" :to="`/riwayat/detail/${order.id}`" class="block border border-gray-400 w-full rounded-xl py-6 my-4">
                                    <div class="flex justify-between items-center mx-12">
                                        <div class="flex gap-8 items-center">
                                            <img  :src="getStoreImage(order.order_item[0].store.shopProfileImg)"  alt="fotoToko" class="h-14 w-14 object-cover rounded-full border border-gray-200">
                                            <div class="text-lg text-font font-semibold">{{ order.order_item[0].store.storeName }}</div>
                                        </div>
                                        <div class="text-lg text-font font-semibold mr-12">{{ order.status.label }}</div>
                                    </div>
                                    <hr class="h-px mt-4 mb-8 bg-gray-400 border-1">
                                    <div class="flex mx-12 mt-4 items-center justify-between">
                                        <div class="flex items-center">
                                            <img 
                                                :src="getImageUrl(order.order_item[0].product.files)" 
                                                alt="Foto Produk" 
                                                class="w-28 h-28 rounded-lg object-cover"
                                            />
                                            <div class="ml-10">
                                                <div id="namaproduk" class="text-lg text-font font-semibold">{{ order.order_item[0].product.name }}</div>
                                                <div id="quantityproduk" class="text-lg text-font font-normal mt-2">x{{ order.order_item[0].quantity }}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-primary text-2xl font-semibold mr-12">Rp {{ order.invoice.total_price }}</div>
                                        </div>
                                    </div>
                                    <hr class="h-px mt-8 mb-5 bg-gray-400 border-1">
                                    <div class="flex justify-between items-center mx-12">
                                        <div class="text-lg text-font">{{ formatDate(order.updated_at) }}</div>
                                        <div class="flex gap-4 items-center mr-10">
                                            <div text-font>Total</div>
                                            <div class="text-3xl text-primary font-bold">Rp {{ order.invoice.total_price }}</div>
                                        </div>
                                    </div>
                            </RouterLink>
                        </div>
                        <div v-else class="flex justify-center">
                            <div class="items-center justify-center align-middle py-6">
                                <img src="../../assets/images/grafik-empty.png" alt="">
                                <p class="text-center text-font text-2xl font-semibold mt-6">Tidak Ada Riwayat</p>
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

export default {
    created() {
        this.userId = localStorage.getItem('userId');
    },
    data(){
        return {
            idUser: '',
            order_id: null,
            invoice_id: null,
            order: null,
            user: null,
            product: null,
            orderData: '',
            products: '',
        }
    },
    computed: {
        mergedOrderData() {
            if (!this.order || !this.order.order_item) {
                return []; // Pastikan tidak error jika order masih kosong
            }
            return this.order.order_item.map(orderItem => {
                const product = this.product && this.product.id === orderItem.product_id ? this.product : null;
                return {
                    ...orderItem,
                    name: product ? product.name : 'Produk Tidak Ditemukan',
                    files: product ? product.files : [], // Jika ada gambar
                };
            });
        },
        filteredOrderData() {
            if (!this.orderData || this.orderData.length === 0) {
                return []; // Pastikan tidak ada error jika orderData masih kosong
            }else{
                return this.orderData.filter(order => order.status.id === 2);
            }
        }
    },
    async mounted() {
        this.order_id = this.$route.params.id; // Ambil id dari URL jika ada

        // Mendapatkan user_id dari localStorage
        this.user_id = localStorage.getItem('userId');
        if (this.user_id) {
            // Jika user_id tersedia, panggil fetchUserData
            this.fetchUserData(this.user_id);
        }

        // Memanggil fetchOrderData untuk mendapatkan data pesanan
        await this.fetchOrderData();

        // Memanggil fetchProductData setelah order data diterima
        if (this.orderData && this.orderData.length > 0) {
            this.fetchProductData(this.orderData); // Pastikan data order sudah diterima
        }
    },
    components: {
        Navbar,
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
        async fetchOrderData() {
            try {
                const token = localStorage.getItem('token'); 
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://127.0.0.1:8000/api/order`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        user_id: userId // Kirim userId sebagai parameter untuk mendapatkan semua order
                    }
                });

                console.log("Data Order:", response.data);

                if (response.data && response.data.data) {
                    this.orderData = response.data.data;
                    console.log("Struktur orderData:", this.orderData);

                    if (this.orderData.length > 0) {
                        this.fetchProductData(this.orderData); // Pastikan hanya dipanggil jika ada data orders

                        this.productIds = this.orderData.flatMap(order => 
                            order.order_item.map(item => item.product_id)
                        );

                        console.log("productIds:", this.productIds);

                    } else {
                        console.error("Tidak ada data orders yang valid.");
                    }
                } else {
                    console.error("Tidak ada data order yang diterima");
                }
            } catch (error) {
                console.error("Gagal mengambil data orders:", error.response ? error.response.data : error);
            }
        },
        async fetchUserData(user_id) {
                try {
                    const token = localStorage.getItem('token'); 
                    const response = await axios.get(`http://127.0.0.1:8000/api/user/${user_id}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Data User:", response.data);
                    this.user = response.data;
                    console.log("Nama User:", this.user.data.name);
                } catch (error) {
                    console.error("Gagal mengambil data invoice:", error.response ? error.response.data : error);
                }
        },
        async fetchProductData(orders) {
            try {
                const token = localStorage.getItem('token');

                // Kumpulkan semua product_id dari orders dan buat unik
                const uniqueProductIds = [...new Set(orders.flatMap(order => 
                    order.order_item.map(item => item.product_id)
                ))];

                if (uniqueProductIds.length === 0) {
                    console.warn("Tidak ada product_id yang ditemukan.");
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/product', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        ids: uniqueProductIds.join(',') // Mengirimkan ID produk yang unik
                    }
                });

                // Menyimpan data produk
                this.products = response.data.data;
                console.log("Products data:", this.products);
            } catch (error) {
                console.error("Gagal mengambil data produk:", error.response ? error.response.data : error);
            }
        },
        getImageUrl(files) {
            if (files && files.length > 0) {
                return `http://127.0.0.1:8000/storage/${files[0].file}` // Ambil gambar pertama dari array
            }
            return '/assets/images/no-image.png'; // Gambar default jika tidak ada gambar
        },
        getImage(profileImg) {
            if (profileImg) {
                return `http://127.0.0.1:8000/storage/${profileImg}`;
            }
                return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
        },
        getStoreImage(shopProfileImg){
            if (shopProfileImg){
                return `http://127.0.0.1:8000/storage/${shopProfileImg}`
            }
            return '../../../assets/images/no-image.png';
        }
    },
};
</script>
