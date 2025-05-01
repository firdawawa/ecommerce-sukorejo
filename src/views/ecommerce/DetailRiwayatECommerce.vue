<template>
    <div>
        <Navbar/>
        <div class="mt-28 mx-48 mb-4">

            <div class="flex">
                <!-- MINI NAVBAR -->
                <div class="bg-white w-1/5 h-fit fixed rounded-2xl p-10 pb-28">
                    <div class="profile content-center mr-20 ml-4 ">
                        <RouterLink to="/profil" class="flex content-center gap-6">
                            <img v-if="user && user.data" :src="getImage(this.user.data.profileImg)" alt="profile picture" class="rounded-full w-20 h-20 aspect-square object-cover">
                            <div class="content-center">
                                <div id="user-name" class="text-font font-bold text-2xl content-center" v-if="user && user.data">{{ this.user.data.name }}</div>
                                <div class="flex content-center align-middle gap-3 ">
                                    <div class="text-gray-400 text-lg font-light content-center tracking-wider" v-if="user && user.data">{{ this.user.data.email }}</div>
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
                                <RouterLink to="/profil/password" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
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
                    <div class="bg-white h-fit rounded-2xl pb-6 pt-2 px-14 ml-4">
                        <!-- RIWAYAT BOX -->
                        <div class="flex justify-between items-center mt-10 mx-8">
                            <div class="text-2xl text-font font-bold">Informasi Riwayat Pesanan</div>
                            <div class="mr-8 text-2xl text-primary font-bold" v-if="order && order.status">{{ order.status.label }}</div>
                            <!-- {{ this.order.status.label }} -->
                        </div>
                        <hr class="h-px mt-5 mb-8 bg-gray-400 border-1">
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6 mr-6">
							<table class="w-full text-md text-left rtl:text-right text-font">
								<thead class="text-lg font-semibold text-white bg-primary">
									<tr>
										<th scope="col" class="px-6 py-4"> No </th>
										<th scope="col" class="py-4"> Produk </th>
                                        <th scope="col" class="px-6 py-4"> Jumlah </th>
										<th scope="col" class="px-6 py-4"> Harga </th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in mergedOrderData" :key="item.product_id" class="bg-white border-b hover:bg-gray-100">
										<th scope="row" class="p-6 font-medium"> {{ index + 1 }} </th>
										<td class="py-6 w-3/6">
											<div class="flex gap-4 items-center">
                                                <img v-if="item.files?.length > 0" 
                                                :src="getImageUrl(item.files[0])" alt="" class="h-12 w-12 object-cover rounded-lg">
												<div id="namaproduk" class="font-md text-font font-semibold">{{ item.name }}</div>
											</div>
										</td>
                                        <td id="quantity" class="p-6">x{{ item.quantity }}</td>
										<td id="price" class="p-6">Rp{{ item.price }}</td>
									</tr>
								</tbody>
							</table>
						</div>
                        <h2 class="font-bold text-2xl text-font mt-12">Ringkasan Pesanan</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Jumlah Item</div>
                                <div id="itemquantity" class="font-normal text-md text-font">x{{ this.orderData.quantity }}</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Subtotal Harga</div>
                                <div id="subprice" class="font-normal text-md text-font" v-if="order && order.invoice">Rp {{ this.order.invoice.subtotal_price }}</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Potongan</div>
                                <div id="discount" class="font-normal text-md text-font" v-if="order && order.invoice">Rp {{ this.order.invoice.discount }}</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Ongkos Kirim</div>
                                <div id="ongkir" class="font-normal text-md text-font">Rp 0</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-2xl text-secondary">Total Harga</div>
                                <div id="totalprice" class="font-bold text-2xl text-secondary" v-if="order && order.invoice">Rp {{ this.order.invoice.total_price }}</div>
                            </div>
                        </div>
                        <h2 class="font-bold text-2xl text-font mt-12">Informasi Pengiriman</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div class="flex gap-24">
                            <div class="w-1/2">
                                <div class="text-font font-semibold text-lg">Pengiriman</div>
                                <div id="buyername" class="text-font font-normal text-md my-4" v-if="order && order.order_address">{{ this.order.order_address.name }}</div>
                                <div id="buyerphone" class="text-font font-normal text-md my-4" v-if="order && order.order_address">{{ this.order.order_address.phone }}</div>
                                <div id="buyeraddress" class="text-font font-normal text-md my-4" v-if="order && order.order_address">{{ this.order.order_address.detail_address }}, {{ subDistrict.subDistrictName }}, {{ district }}, {{ this.order.order_address.postal_code }}</div>
                            </div>
                            <div class="w-1/2">
                                <div class="text-font font-semibold text-lg">Pengantaran</div>
                                <div id="deliverymethod" class="text-font font-normal text-md my-4" v-if="deliveryLabel">{{ deliveryLabel }}</div>
                            </div>
                        </div>
                        <h2 class="font-bold text-2xl text-font mt-12">Informasi Pesanan</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Pesanan Dibuat</div>
                                <div id="timestamp-order" class="font-normal text-md text-font" v-if="order">{{ formatDate(order?.created_at) }}</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Pesanan Dibayar</div>
                                <div id="timestamp-paid" class="font-normal text-md text-font" v-if="order">{{ formatDate(order?.invoice.updated_at) }}</div>
                            </div>
                            <div  v-if="order && order.status.id == 3" class="flex justify-between mr-12 my-4">
                                <div class="font-semibold text-lg text-font">Pesanan Selesai</div>
                                <div id="timestamp-done" class="font-normal text-md text-font" v-if="order">{{ formatDate(order?.updated_at) }}</div>
                            </div>
                        </div>
                        <button v-if="order && order.status.id == 1" @click="handlePayment"
                            class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 mb-4 mt-10 text-center">
                            Bayar Pesanan
                        </button>
                        <button type="submit" @click="navigateTo('')"  class="w-full text-gray-400 hover:bg-primary-700 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 mb-10 text-center">Hubungi Bantuan</button>
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
    data() {
        return {
            order_id: null,
            invoice_id: null,
            order: null,
            user: null,
            product: null,
            orderData: '',
            district: '',
            subDistrict: '',
            idDistrict: '',
            idSubDistrict: '',
            deliveryLabel: '',
            // productId: '',
        };
    },
    components: {
        Navbar,
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
        }
    },
    mounted(){
        this.order_id = this.$route.params.id;

        this.user_id = localStorage.getItem('userId');
        if(this.user_id){
            this.fetchUserData(this.user_id);
        }

        if (this.order_id) {
            this.fetchOrderData(this.order_id);
            this.fetchOrderData(this.order_id).then(() => {
                // Setelah order diambil, ambil delivery label berdasarkan delivery_id
                if (this.order?.delivery_id) {
                    this.fetchDeliveryLabel(this.order.delivery_id);
                }
            });
        }

        if(this.productId){
            this.fetchProductData();
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return ""; // Jika tidak ada tanggal, kembalikan string kosong

            const months = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];

            const date = new Date(dateString);
            
            const day = date.getDate(); // Tanggal
            const month = months[date.getMonth()]; // Nama bulan
            const year = date.getFullYear(); // Tahun
            const hours = date.getHours().toString().padStart(2, '0'); // Jam (2 digit)
            const minutes = date.getMinutes().toString().padStart(2, '0'); // Menit (2 digit)

            return `${day} ${month} ${year} ${hours}:${minutes}`;
        },
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        async fetchOrderData(order_id) {
                try {
                    const token = localStorage.getItem('token'); 
                    const response = await axios.get(`http://127.0.0.1:8000/api/order/${order_id}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Data Order:", response.data);
                    this.order = response.data.data;

                    this.orderData = this.order.order_item[0];
                    this.productId = this.order.order_item[0].product_id;
                    console.log("ID Product:", this.productId)

                    if(this.productId){
                        this.fetchProductData(this.productId);
                    }

                    if (this.order.order_address.district) {
                        this.getDistrict(this.order.order_address.district);
                    }
                    if (this.order.order_address.subdistrict) {
                        this.getSubDistrict(this.order.order_address.subdistrict);
                    }

                } catch (error) {
                    console.error("Gagal mengambil data invoice:", error.response ? error.response.data : error);
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
        getDistrict(idDistrict) {
            axios.get(`http://127.0.0.1:8000/api/districts/${idDistrict}`)
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
        getSubDistrict(idSubDistrict) {
            console.log("Fetching subdistrict with ID:", idSubDistrict);
            axios.get(`http://127.0.0.1:8000/api/subdistricts/data/${idSubDistrict}`)
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

        async fetchProductData(productId) {
                try {
                    const token = localStorage.getItem('token'); 
                    const response = await axios.get(`http://127.0.0.1:8000/api/product/${productId}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log("Data Produk:", response.data);
                    this.product = response.data.data;
                    console.log("Nama Produk:", this.product.name);
                } catch (error) {
                    console.error("Gagal mengambil data invoice:", error.response ? error.response.data : error);
                }
        },
        async fetchDeliveryLabel(delivery_id) {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`http://127.0.0.1:8000/api/order-delivery/${delivery_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Data Delivery:", response.data);
                this.deliveryLabel = response.data.data.label; // Simpan label dari API ke variabel
            } catch (error) {
                console.error("Gagal mengambil data delivery:", error.response ? error.response.data : error);
            }
        },
        getImageUrl(file) {
            if (file && file.file) {
                console.log("File object:", file);
                return `http://127.0.0.1:8000/storage/${file.file}`;
            }
            return '/assets/images/no-image.png';
        },
        getImage(profileImg) {
            if (profileImg) {
                return `http://127.0.0.1:8000/storage/${profileImg}`;
            }
                return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
        },
    },
};
</script>
