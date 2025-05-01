<template>

<nav class="border-gray-200 bg-primary fixed z-50 top-0 w-full">
    <div class="max-w-screen flex content-center items-center p-4">
        <RouterLink to="/" class="flex h-14 w-36 ml-6 justify-center items-center text-primary bg-white rounded-full md:border-0 md:p-0">
                    INI LOGO
        </RouterLink>
        
        <div class="w-full flex justify-end content-center">
            <form @submit.prevent="handleSearch" class="max-w-xl mr-4">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Pencarian</label>
                <div class="relative">
                    <input 
                            type="search" 
                            id="default-search" 
                            class="block w-[430px] p-4 ps-8 text-sm text-gray-400 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 bg-white" 
                            placeholder="Pencarian" 
                            v-model="searchQuery"
                            required
                        />
                    <button type="submit" class="text-white absolute end-0.5 top-0.5 bottom-0.5 bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-4">
                        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </form>

            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-16 justify-center text-sm text-white rounded-lg md:hidden hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-pink-700 dark:focus:ring-pink-900" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full content-center md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col justify-center content-center items-center p-4 md:p-0 border border-gray-100 rounded-lg md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 ">
                    <li>
                        <RouterLink to="/riwayat" class="flex h-14 w-14 justify-center items-center bg-primary hover:bg-secondary rounded-full md:border-0 md:p-0">
                            <img class="h-7" src="../../assets/images/icon-history.png" alt="icon-history">
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/cart" class="flex h-14 w-14 justify-center items-center bg-primary hover:bg-secondary rounded-full md:border-0 md:p-0">
                            <img class="h-7" src="../../assets/images/icon-cart.png" alt="icon-cart">
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="profile content-center mr-20 ml-4 group relative cursor-pointer">
                <button class="menu-hover flex content-center gap-4" onClick="">
                    <img :src="getImageUrl(user.profileImg)" alt="profile picture" class="rounded-full w-12 h-12 object-cover">
                    <div class="content-center">
                        <div id="user-name" class="text-white font-bold text-lg content-center">{{ user.name }}</div>
                        <div class="flex content-center align-middle gap-3 ">
                            <div class="underline text-white text-sm font-light content-center tracking-wider">Profil Saya</div>
                            <img class="h-2 mt-1.5 content-center" src="../../assets/images/icon-arrow.png" alt="icon-arrow">
                        </div>
                    </div>
                </button>
                <div class="invisible absolute mt-2 z-50 flex w-fit flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                    <RouterLink to="/profil" class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                        Profil
                    </RouterLink>
                    <RouterLink to="" class="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                        Hubungi Bantuan
                    </RouterLink>
                    <button @click="logout" class="my-2 block border-b border-gray-100 py-1 text-left font-semibold text-gray-500 hover:text-black md:mx-2">
                        Keluar
                    </button>
                </div>
            </div>
        </div>
    
    </div>
</nav>

</template>

<script>
import axios from 'axios';

    export default {
        name: "Navbar",
        created() {
            this.userId = localStorage.getItem('userId');
        },
        data(){
            return {
                idUser: '',
                user: {},
                searchQuery: "",
            }
        },
        async mounted() {
            this.userId = localStorage.getItem('userId');
            if (this.userId) {
                await this.getUser(this.userId);
            } else {
                console.error("User ID tidak ditemukan di localStorage");
            }
        },
        methods: {
            getUser(idUser) {
                axios.get(`https://api.isnunas.my.id/api/user/${idUser}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(res => {
                    this.user = res.data.data;
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            },
            handleSearch() {
                if (this.searchQuery.trim() !== "") {
                    this.$router.push({ path: "/search", query: { q: this.searchQuery } });
                }
            },
            getImageUrl(profileImg) {
                if (profileImg) {
                    return `https://api.isnunas.my.id/storage/${profileImg}`;
                }
                    return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
            },
            logout() {
                // Ambil token dari localStorage atau tempat penyimpanan lain
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('Token tidak ditemukan');
                    return;
                }

                // Kirim permintaan logout dengan token di header Authorization
                axios.post('https://api.isnunas.my.id/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}` // Kirim token dengan prefix 'Bearer'
                    }
                })
                .then(response => {
                    console.log('Logout berhasil:', response.data);
                    
                    // Hapus token dari localStorage setelah logout berhasil
                    localStorage.removeItem('token');
                    localStorage.removeItem('idStore');
                    localStorage.removeItem('userId');
                    
                    // Redirect ke halaman login setelah logout
                    this.$router.push('/').then(() => {
                        window.location.reload();
                    });
                })
                .catch(error => {
                    console.error('Terjadi kesalahan saat logout:', error.response ? error.response.data : error);
                });
            },
        }
    };
</script>