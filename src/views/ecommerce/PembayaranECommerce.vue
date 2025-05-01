<template>
    <div>
        <Navbar/>
        <div class="flex mt-28 mx-48 mb-6 justify-center">

            <div class="bg-white w-1/2 h-full rounded-2xl p-10">
                <div class="flex items-center justify-center">
                    <div class="w-full border border-primary rounded-xl px-6 py-10">
                        <div class="text-font text-3xl font-bold">Pembayaran Pesanan</div>
                        <hr class="my-6">
                        <div class="text-gray-500">Lanjutkan ke proses pembayaran untuk menyelesaikan pesanan Anda. Pastikan nominal yang tertera di bawah ini sesuai dengan pesanan Anda!</div>
                        <div class="text-font text-lg mt-8 font-semibold">Jumlah yang perlu Anda bayar:</div>
                        <div class="flex justify-center items-center mt-32">
                            <div v-if="order && order.invoice" class="text-secondary text-4xl font-bold">
                                Rp {{ order.invoice.total_price }}
                            </div>
                        </div>
                        <button type="submit" @click="payment"  class="w-full text-white bg-primary hover:bg-secondary border focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-5 mt-32 mb-4 text-center">Bayar Sekarang</button>
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
            snapToken: null,
        };
    },
    components: {
        Navbar,
    },
    mounted() {
        //MIDTRANS
        let script = document.createElement('script');
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "SB-Mid-client-DQFPTdOvY51YbB4n");
        document.head.appendChild(script);

        // Mengambil order_id dan invoice_id dari URL
        this.order_id = this.$route.query.order_id;
        this.invoice_id = this.$route.query.invoice_id;

        this.user_id = localStorage.getItem('userId');
        if(this.user_id){
            this.fetchUserData(this.user_id);
        }

        if (this.order_id) {
            this.fetchOrderData(this.order_id);
        }
    },
    methods:{
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
                    console.log("Email User:", response.data.data.email)
                    console.log("Name User:", response.data.data.name)
                    console.log("Phone User:", response.data.data.phoneNumber)
                } catch (error) {
                    console.error("Gagal mengambil data invoice:", error.response ? error.response.data : error);
                }
        },
        async payment() {
            try {
                if (!this.order || !this.order.invoice) {
                    alert("Data order tidak ditemukan!");
                    return;
                }

                const response = await axios.post('http://127.0.0.1:8000/api/test-midtrans', {
                    amount: this.order.invoice.total_price,
                    order_id: this.order.id,
                    name: this.user.data.name,
                    email: this.user.data.email,
                    phone: this.user.data.phoneNumber,
                });

                this.snapToken = response.data.snap_token;

                // Panggil Snap Midtrans
                window.snap.pay(this.snapToken, {
                    onSuccess: () => {
                        this.$router.push(`/riwayat/detail/${this.order.id}`); // Langsung arahkan ke halaman riwayat
                    },
                    onPending: () => {
                        this.$router.push('/riwayat'); // Bisa tetap diarahkan ke halaman riwayat
                    },
                    onError: () => {
                        alert("Pembayaran gagal!");
                        this.$router.push('/riwayat');
                    }
                });

            } catch (error) {
                console.error("Gagal mendapatkan token pembayaran:", error.response ? error.response.data : error);
            }
        }
    }
}
</script>