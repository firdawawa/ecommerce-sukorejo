<template>
    <!-- Wrapper -->
    <div class="relative flex h-screen w-screen p-4 gap-4">
        <!-- Background Image -->
        <div 
            class="absolute inset-0 bg-cover bg-center z-0"
            style="background-image: url('https://i.ibb.co.com/NN2fMCv/kepuh.png');">
        </div>

        <!-- Landing Poster -->
        <div class="relative z-10 bg-white bg-opacity-65 p-10 w-3/5 h-full text-center items-center content-center justify-center align-middle rounded-3xl shadow-lg flex flex-col">
            <h1 class="text-4xl font-semibold text-white leading-snug">Digital UMKM <br> Desa Sukorejo</h1>
            <img class="mx-auto mt-10" src="../assets/images/grafik-login.png" alt="grafik-login">
            <div class="flex gap-4 mt-4">
                <p class="mt-4 text-white">2024</p>
                <p class="mt-4 text-white">•</p>
                <p class="mt-4 text-white">BUMDes Mitra Sejati Desa Sukorejo, Kec. Gandusari, Kab. Trenggalek, Jawa Timur</p>
            </div>
        </div>

        <!-- Login Form -->
        <div class="relative z-10 bg-white w-2/5 h-full text-center items-center rounded-3xl rounded-tr-[270px] shadow-lg flex flex-col">
            <div>
                <img class="h-32 mt-16 mx-auto justify-center items-center" src="../assets/images/icon-key-login.png" alt="icon-key-login">
                <h2 class="text-primary font-bold text-3xl mt-6">MASUK</h2>
                <!-- Form Input -->
                <form class="" action="#">
                    <div>
                        <label for="email" class="block mb-2 mt-12 justify-start text-left text-xl font-medium text-gray-900">Email</label>
                        <input type="email"  v-model="model.login.email" name="email" id="email" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400" placeholder="email@example.com" required="">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kata Sandi</label>
                        <input type="password"  v-model="model.login.password" name="password" id="password" placeholder="••••••••" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-96 p-2.5 bg-white placeholder-gray-400" required="">
                    </div>
                    <div class="flex items-end justify-end">
                        <a href="#" class="text-md font-bold mt-2 text-primary underline">Lupa Kata Sandi?</a>
                    </div>
                    <button type="submit" @click.prevent="login" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-2.5 mt-10 text-center">Masuk</button>
                    <div class="inline-flex items-center justify-center w-full">
                        <hr class="w-full h-px my-8 bg-gray-300 border-0">
                        <span class="absolute px-3 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2">Belum punya akun?</span>
                    </div>
                </form>
                <!-- Button to trigger modal -->
                <button class="block w-full text-primary bg-white hover:bg-primary-700 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-2.5 mt-1 text-center" @click="openModal">
                    Daftar
                </button>
            
                <!-- Modal -->
                <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div class="bg-white rounded-3xl shadow-lg py-14 px-6 w-[700px] relative">
        
                        <!-- Modal header -->
                        <h2 class="text-3xl text-primary font-bold text-center mb-10">Ingin Membuat Akun Sebagai?</h2>

                        <!-- Buttons inside modal -->
                        <div class="flex justify-around">
                            
                            <!-- Button 1 -->
                            <button @click="navigateTo('/dashboard/register')" class="flex flex-col items-center justify-center p-4 border border-gray-300 hover:bg-primary hover:text-white rounded-lg">
                                <img src="../assets/images/grafik-regist-dashboard.png" alt="Option 1" class="w-40 h-40 mb-2">
                                <span class="text-lg font-bold">Penjual</span>
                                <p class="text-sm font-normal">Raih peluang penjualan lebih besar dengan <br> pasar yang lebih luas!</p>
                            </button>

                            <!-- Button 2 -->
                            <button @click="navigateTo('/register')" class="flex flex-col items-center justify-center p-4 border border-gray-300 hover:bg-primary hover:text-white rounded-lg">
                                <img src="../assets/images/grafik-regist-cust.png" alt="Option 1" class="w-40 h-40 mb-2">
                                <span class="text-lg font-bold">Pembeli</span>
                                <p class="text-sm font-normal">Temukan dan beli berbagai produk unggulan <br> UMKM Desa Sukorejo dengan mudah!</p>
                            </button>
                        </div>

                        <!-- Close button -->
                        <button @click="closeModal" class="absolute top-2 right-2 w-10 h-10 text-gray-500 text-xl hover:text-gray-700"> x
                        </button>
                    </div>
                </div>
            </div>    
            </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            model: {
                login: {
                    email: '',
                    password: ''
                }
            },
            isModalOpen: false,
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
            this.closeModal(); // Menutup modal setelah navigasi
        },
        login() {
            axios.post('https://api.isnunas.my.id/api/login', this.model.login)
                .then(res => {
                    console.log('Login berhasil', res);
                    
                    // Simpan token ke localStorage
                    const token = res.data.token;
                    const user = res.data.user;
                    const idStore = res.data.idStore;

                    if (token) {
                        localStorage.setItem('token', token); // Simpan token ke localStorage
                        console.log('Token berhasil disimpan di localStorage');
                    }
                    
                    if (user && user.id) {
                        localStorage.setItem('userId', user.id);  // Simpan userId ke localStorage
                        console.log('User ID berhasil disimpan di localStorage:', user.id);
                    }                     
                    
                    if (idStore) {
                        localStorage.setItem('idStore', idStore);
                        console.log('idStore berhasil disimpan di localStorage:', idStore);
                
                    } else {
                        console.error('User ID tidak ditemukan dalam respons');
                    }

                    // Reset form setelah berhasil login
                    this.model.login = {
                        email: '',
                        password: '',
                    };

                    if(res.data.user.idUserType == 1){
                        this.$router.push({ name: 'overviewAllDataBumdes' });
                    }else if(res.data.user.idUserType == 2){
                        this.$router.push({ name: 'dashboard' });
                    }else if(res.data.user.idUserType == 3){
                        this.$router.push({ name: 'homeEcommerce' });
                    }

                })
                .catch(err => {
                    if (err.response) {
                        console.error('Login gagal:', err.response.data.message || err.response.data.errors);
                        alert('Login gagal, periksa kembali email dan kata sandi Anda.');
                    } else {
                        console.error('Terjadi kesalahan:', err);
                    }
                });
        }
    },
};
</script>