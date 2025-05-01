<template>
    <div>
        <Navbar/>
        <div class="mt-28 mx-48 mb-6">

            <div class="bg-white w-full h-full rounded-2xl p-10">
                <div class="flex justify-between items-center">
                    <div class="text-4xl font-bold text-font ml-4">Checkout Produk</div>
                </div>

                <!-- PENGIRIMAN -->
                <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                <h2 class="font-bold text-2xl text-font mt-10">Informasi Pengiriman</h2>
                <div class="px-8 mt-4">
                    <div class="columns-2 mt-4 w-full">
                        <form class="" action="#">
                            <div>
                                <label for="name" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Nama</label>
                                <input v-model="model.address.name" type="text" name="name" id="name" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 p-2.5 w-full bg-white placeholder-font" placeholder="" required="">
                            </div>
                            <div>
                                <label for="phone" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Nomor Telepon</label>
                                <input v-model="model.address.phone" type="text" name="phone" id="phone" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 p-2.5 w-full bg-white placeholder-font" placeholder="" required="">
                            </div>
                        </form>
                    </div>
                </div>
                <h2 class="font-bold text-xl text-font mt-6">Alamat</h2>
                <div class="px-8 mt-4">
                    <div class="columns-2 mt-4 w-full">
                        <form class="" action="#">
                            <div>
                                <label for="addressDetail" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Detail Alamat</label>
                                <input v-model="model.address.detail_address" type="text" name="addressDetail" id="addressDetail" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 p-2.5 w-full bg-white placeholder-font" placeholder="" required="">
                            </div>
                            <div>
                                <label for="district" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kecamatan</label>
                                <select v-model="model.address.district" id="district" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 p-2.5 w-full bg-white placeholder-font" placeholder="" required="">
                                    <option v-for="district in districts" :key="district.id" :value="district.id">
                                        {{ district.districtName }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label for="subdistrict" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kelurahan</label>
                                <select v-model="model.address.subdistrict" id="postalCode" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="" required="">
                                    <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
                                        {{ subdistrict.subDistrictName }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label for="postalCode" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kode Pos</label>
                                <select v-model="model.address.postal_code" id="postalCode" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="" required="">
                                    <option v-for="code in postalCode" :key="code" :value="code">
                                        {{ code }}
                                    </option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- PRODUK DIPESAN -->
                <hr class="h-px mt-10 mb-6 mr-8 bg-gray-400 border-1">
                <h2 class="font-bold text-2xl text-font mt-10">Produk Dipesan</h2>
                <div v-if="selectedItems.length">
                    <div v-for="item in selectedItems" :key="item.id" class="border border-gray-400 w-full rounded-xl py-6 my-4">
                        <div class="flex justify-between items-center mx-12">
                            <div class="flex gap-8 items-center">
                                <img :src="getStoreImageUrl(item.product.store.shopProfileImg)"  alt="" class="h-14 w-14 object-cover rounded-full border border-gray-200">
                                <div class="text-lg text-font font-semibold">{{ item.product.store.storeName }}</div>
                            </div>
                        </div>
                        <hr class="h-px mt-4 mb-8 bg-gray-400 border-1">
                        <div class="flex mx-12 mt-4 items-center justify-between mb-8">
                            <div class="flex items-center">
                                <img v-if="item.product?.files?.length > 0" 
                                    :src="getImageUrl(item.product.files[0])" 
                                    alt="" 
                                    class="w-28 h-28 rounded-lg object-cover">
                                <div class="ml-10">
                                    <div class="text-lg text-font font-semibold">{{ item.product.name }}</div>
                                    <div class="text-lg text-font font-normal mt-2">x{{ item.quantity }}</div>
                                </div>
                            </div>
                            <div class="flex gap-64">
                                <div>
                                    <div class="text-font text-lg font-semibold">Rp {{ item.price }}</div>
                                </div>
                                <div>
                                    <div class="text-primary text-2xl font-semibold mr-12">Rp {{ item.price * item.quantity }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns-2 mt-8">
                    <div>
                        <h2 class="font-bold text-xl text-font">Pengiriman</h2>
                        <div>
                            <label for="deliverymethod" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font">Metode Pengiriman</label>
                            <select v-model="model.order.id" id="deliverymethod" class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 w-full block p-2.5">
                                <option v-for="order in order_delivery" :key="order.id" :value="order.id">
                                    {{ order.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h2 class="font-bold text-xl text-font mt-6">Catatan</h2>
                        <label for="deliverymethod" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font">Pesan ke Penjual</label>
                        <input type="string" name="message" id="message" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="*Opsional">
                    </div>
                </div>

                <!-- RINGKASAN PESANAN -->
                <hr class="h-px mt-10 mb-6 mr-8 bg-gray-400 border-1">
                <h2 class="font-bold text-2xl text-font mt-10">Ringkasan Pesanan</h2>
                <div>
                    <div class="flex justify-between mr-12 my-4">
                        <div class="font-semibold text-lg text-font">Jumlah Item</div>
                        <div id="itemquantity" class="font-normal text-md text-font">x{{ selectedItems.reduce((sum, item) => sum + item.quantity, 0) }}</div>
                    </div>
                    <div class="flex justify-between mr-12 my-4">
                        <div class="font-semibold text-lg text-font">Subtotal Harga</div>
                        <div id="subprice" class="font-normal text-md text-font">Rp {{ selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) }}</div>
                    </div>
                    <div class="flex justify-between mr-12 my-4">
                        <div class="font-semibold text-lg text-font">Potongan</div>
                        <div id="discount" class="font-normal text-md text-font">Rp 0</div>
                    </div>
                    <div class="flex justify-between mr-12 my-4">
                        <div class="font-semibold text-lg text-font">Ongkos Kirim</div>
                        <div id="ongkir" class="font-normal text-md text-font">Rp 0</div>
                    </div>
                    <div class="flex justify-between mr-12 my-4">
                        <div class="font-semibold text-2xl text-secondary">Total Harga</div>
                        <div id="totalprice" class="font-bold text-4xl text-secondary">Rp {{ selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) }}</div>
                    </div>
                </div>
                <button type="submit" @click="checkout"  class="w-full text-white bg-secondary hover:bg-primary border focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-5 mt-10 mb-4 text-center">Buat Pesanan</button>
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
            selectedItems: [],
            districts: [],
            subdistricts: [],
            postalCode: [],
            order_delivery: [],
            item: [],
            model: {
                address: {
                    name: '',
                    phone: '',
                    detail_address: '',
                    district: '',
                    subdistrict: '',
                    postal_code: '',
                },
                order: {
                    id: '',
                }
            },
        };
    },
    components: {
        Navbar,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        fetchDistricts() {
            axios.get('http://127.0.0.1:8000/api/districts')
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('API Response:', res.data.data); // Debug log
                        this.districts = res.data.data;
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching districts:', err);
                });
        },
        fetchSubDistricts(idDistrict) {
            axios.get(`http://127.0.0.1:8000/api/subdistricts/${idDistrict}`)
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('Subdistricts API Response:', res.data.data); // Debug log
                        this.subdistricts = res.data.data; // Assign data to subdistricts array
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching subdistricts:', err);
                });
        },
        fetchPostalCode(idSubDistrict) {
            axios.get(`http://127.0.0.1:8000/api/postalCode/${idSubDistrict}`)
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('Postal Codes API Response:', res.data.postalCode); // Debug log
                        this.postalCode = [res.data.postalCode]; // Assign postal code data
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching postal code:', err);
                });
            },
        async fetchCartData(cartItemId) {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`http://127.0.0.1:8000/api/cart/item/${cartItemId}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("id cart:", cartItemId)
                console.log("Full API Response:", response.data);
                this.selectedItems = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                console.log("Selected item:", this.selectedItems);
                console.log("Response Data:", response.data.data);
                console.log("Shop Profile Image:", response.data.data?.product?.store?.shopProfileImg);
            } catch (error) {
                console.error("Gagal mengambil data cart:", error.response ? error.response.data : error);
            }
        },
        fetchDeliveryMethod() {
            axios.get(`http://127.0.0.1:8000/api/order-delivery`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            })
            .then(res => {
                console.log('Raw Response:', res);
                
                // Cek apakah response memiliki status 200 dan data yang valid
                if (res.data && res.data.status === 200 && Array.isArray(res.data.data)) {
                    console.log('Delivery Method API Response:', res.data.data);
                    
                    // Simpan data ke variabel order_delivery
                    this.order_delivery = res.data.data;
                } else {
                    console.error('Invalid API response structure:', res);
                }
            })
            .catch(err => {
                console.error('Error fetching delivery methods:', err);
            });
        },
        getImageUrl(file) {
            if (file && file.file) {
                console.log("File object:", file);
                return `http://127.0.0.1:8000/storage/${file.file}`;
            }
            return '/assets/images/no-image.png';
        },
        getStoreImageUrl(filePath) {
            if (filePath) {
                const imageUrl = `http://127.0.0.1:8000/storage/${filePath}`;
                console.log("Generated Shop Profile Image URL:", imageUrl);
                return imageUrl;
            }
            return '/assets/images/no-image.png';
        },
        checkout() {
            const payload = {
                address: this.model.address,
                selectedItems: this.selectedItems.map(item => ({
                    cart_item_id: item.id,
                    product_id: item.product.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                delivery: this.model.order.id,
                // message: this.model.order.message || "",
            };

            console.log("Payload sebelum checkout:", payload);
            axios.post('http://127.0.0.1:8000/api/order', payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log("Full Response:", response);

                    if (response?.data?.success) {
                        console.log("Response Order Data:", response.data.order);
                        console.log("Response Invoice Data:", response.data.invoice);

                        alert("Pesanan berhasil dibuat!");
                        this.selectedItems.forEach(item => {
                            this.deleteCartItem(item.id);
                            console.log("Checkout berhasil:", response.data);
                        });
                        this.$router.push({
                            path: '/payment',
                            query: {
                                order_id: response.data.order.id,
                                invoice_id: response.data.invoice.id
                            }
                        });
                    } else {
                        alert("Gagal membuat pesanan.");
                        console.error("Gagal membuat pesanan:", response.data);
                    }
                })
                .catch(error => {
                    console.error("Error saat checkout:", error.response?.data || error);
                    alert("Terjadi kesalahan, coba lagi.");
                });
        },
        deleteCartItem(cartItemId) {
            axios.delete(`http://127.0.0.1:8000/api/cart/remove/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(response => {
                console.log(`Cart item ${cartItemId} deleted successfully`, response);
            })
            .catch(error => {
                console.error(`Error deleting cart item ${cartItemId}:`, error);
            });
        }
    },
    watch: {
        'model.address.district': function (newDistrictId) {
            if (newDistrictId) {
                this.fetchSubDistricts(newDistrictId); // Fetch subdistricts for the selected district
            } else {
                this.subdistricts = []; // Reset subdistricts if no district is selected
            }
        },
        'model.address.subdistrict': function (newSubDistrictId) {
            if (newSubDistrictId) {
                this.fetchPostalCode(newSubDistrictId); // Fetch postal codes for the selected subdistrict
            } else {
                this.postalCode = []; // Reset postal codes if no subdistrict is selected
            }
        }
    },
    mounted() {
        this.fetchDistricts(); // Panggil metode untuk mengambil data distrik
        this.fetchSubDistricts(); // Panggil metode untuk mengambil data sub distrik
        this.fetchPostalCode(); // Panggil metode untuk mengambil data kode pos
        this.fetchDeliveryMethod();
        const itemsQuery = this.$route.query.items; 
        if (itemsQuery) {
            try {
                let cartItemId = JSON.parse(itemsQuery);
                
                if (Array.isArray(cartItemId) && cartItemId.length > 0) {
                    this.fetchCartData(cartItemId[0]); // Kirim ID CartItem, bukan Cart
                } else if (typeof cartItemId === 'number') {
                    this.fetchCartData(cartItemId);
                } else {
                    console.error("Format ID CartItem tidak valid:", cartItemId);
                }
            } catch (e) {
                console.error("Error parsing items query:", e);
            }
        }
    },
};
</script>
