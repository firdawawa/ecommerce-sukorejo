<template>
    <div>
        <Navbar />
        <div class="mt-28 mx-48 mb-12">
            <div class="bg-white w-full h-full rounded-2xl p-10">
                <div class="flex justify-between items-center">
                    <div class="text-3xl font-bold text-font ml-4">Keranjang Saya</div>
                </div>

                <!-- KERANJANG PRODUK -->
                <div v-if="cartItems.length > 0">
                    <div v-for="(store, index) in groupedCartItems" :key="index" class="border border-gray-400 w-full rounded-xl mt-10">
                        <RouterLink :to="{ path: '/toko/' + store.store_id + '/detail'}" class="flex mx-12 items-center gap-6 py-4">
                            <img :src="store.store_image" alt="" class="rounded-full border border-gray-200 h-14 w-14 object-cover">
                            <div class="text-font font-semibold text-lg">{{ store.storeName }}</div>
                        </RouterLink>
                        <hr class="h-px w-full bg-gray-500 border-2">
                        <div v-for="item in store.items" :key="item.id" class="flex mx-12 py-6 items-center w-full mb-6">
                            <input type="checkbox" class="h-5 w-5" v-model="selectedItems" :value="item.id" />
                            <img :src="item.image" alt="" class="h-28 w-28 rounded-xl object-cover ml-6">
                            <div class="ml-12 mr-6">
                                <div class="text-font font-semibold text-xl">{{ item.name }}</div>
                                <div class="flex items-center gap-8 rounded-lg border border-gray-400 px-3 w-fit h-12 mt-4">
                                    <button @click="updateQuantity(item.id, item.quantity - 1)">
                                        <img src="../../assets/images/icon-minus.png" alt="" class="h-8 w-8">
                                    </button>
                                    <div>{{ item.quantity }}</div>
                                    <button @click="updateQuantity(item.id, item.quantity + 1)">
                                        <img src="../../assets/images/icon-add.png" alt="" class="h-8 w-8">
                                    </button>
                                </div>
                            </div>
                            <div class="text-font font-semibold text-xl ml-52">Rp {{ formatPrice(item.price) }}</div>
                            <div class="text-primary font-bold text-2xl ml-32">Rp {{ formatPrice(item.price * item.quantity) }}</div>
                            <div class="flex bg-red-600 rounded-full px-12 py-5 gap-4 items-center ml-36 cursor-pointer" @click="removeItem(item.id)">
                                <img src="../../assets/images/icon-delete.png" alt="">
                                <div class="text-white text-xl">Hapus</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-xl font-semibold mt-10">Keranjang Anda kosong</div>

                <!-- CHECKOUT -->
                <div class="border border-gray-400 rounded-xl bg-white fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-24rem)] px-12 " v-if="cartItems.length > 0">
                    <div class="flex mx-12 py-6 items-center justify-between">
                        <div class="flex gap-4">
                            <img src="../../assets/images/icon-cart-2.png" alt="" class="h-8 w-8 rounded-xl object-cover">
                            <div class="text-font font-semibold text-xl">{{ selectedItems.length }} Produk</div>
                        </div>
                        <div class="flex items-center gap-8">
                            <div class="flex gap-6">
                                <div class="text-font font-semibold text-lg">Total</div>
                                <div class="text-secondary font-bold text-4xl">Rp {{ formatPrice(totalPrice) }}</div>
                            </div>
                            <div class="flex bg-secondary rounded-xl px-28 py-5 gap-4 items-center cursor-pointer" @click="checkout">
                                <div class="text-white font-bold text-3xl">Checkout</div>
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
import Navbar from '../../components/ecommerce/Navbar.vue';
import { RouterLink } from 'vue-router';

export default {
    components: { Navbar },
    data() {
        return {
            store_id: '',
            cartItems: [],
            selectedItems: [],
            selectedStores: [],
            user: {},
        };
    },
    computed: {
        groupedCartItems() {
            const stores = {};
            this.cartItems.forEach(item => {
                if (!stores[item.store_id]) {
                    stores[item.store_id] = {
                        store_id: item.store_id,
                        storeName: item.storeName,
                        store_image: item.store_image,
                        items: []
                    };
                }
                stores[item.store_id].items.push(item);
            });
            return Object.values(stores);
        },
        totalPrice() {
            return this.cartItems.reduce((total, item) => {
                return this.selectedItems.includes(item.id) ? total + (item.price * item.quantity) : total;
            }, 0);
        }
    },
    methods: {
        async fetchCart() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cart`, {
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
                console.log("Cart Data:", response.data);
                const cartArray = Array.isArray(response.data.data[""]) ? response.data.data[""] : [];

                console.log("Formatted Cart Items:", cartArray);
                this.cartItems = cartArray.map(item => ({
                    id: item.id,
                    store_id: item.store_id,
                    storeName: item.product?.store?.storeName ?? "Toko Tidak Diketahui",
                    store_image: item.product?.store?.shopProfileImg
                        ? `http://127.0.0.1:8000/storage/${item.product.store.shopProfileImg}`
                        : "default-image.jpg",
                    name: item.product?.name ?? "Produk Tidak Diketahui",
                    image: Array.isArray(item.product?.files) && item.product.files.length > 0
                        ? `http://127.0.0.1:8000/storage/${item.product.files[0].file}`
                        : "default-image.jpg",
                    price: Number(item.product?.price) || 0,
                    quantity: item.quantity || 1
                }));
                console.log("Final Cart Items:", this.cartItems);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        },
        async updateQuantity(itemId, quantity) {
            if (quantity < 1) return;
            try {
                await axios.patch(`http://127.0.0.1:8000/api/cart/update/${itemId}`, 
                    { quantity }, // Data yang dikirim
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                this.fetchCart(); // Memperbarui data cart setelah berhasil update
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        },
        async removeItem(itemId) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${itemId}`, {
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
                this.fetchCart();
            } catch (error) {
                console.error('Error removing item:', error);
            }
        },
        formatPrice(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value).replace('Rp', '').trim();
        },
        async fetchUser() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                console.log("User Data:", response.data); // Cek data dari API
                this.user = response.data; // Pastikan data diisi sesuai dengan respons API
                console.log("Stored user data:", this.user); // Pastikan properti yang diperlukan ada
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        },
        checkout() {
            if (this.selectedItems.length === 0) {
                alert("Pilih minimal satu produk untuk checkout!");
                return;
            }
            this.$router.push({
                path: '/checkout',
                query: { items: JSON.stringify(this.selectedItems) }
            });
        },
    },
    mounted() {
        this.fetchCart();
        this.fetchUser();
    },
    watch: {
        selectedItems(newVal) {
            console.log("Selected Items:", newVal);
        }
    }
};
</script>
