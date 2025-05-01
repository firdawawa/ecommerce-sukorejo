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
                <div class="flex gap-2 mr-32 ml-4">
                    <button @click="openModal" class="px-12 py-4 hover:bg-white text-white hover:text-primary text-lg font-semibold rounded-full ">
                        Registrasi
                    </button>
                    <button @click="login" class="px-10 py-4 bg-secondary hover:bg-white text-white hover:text-primary text-lg font-semibold rounded-full ">
                        Masuk
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
                                <img src="../../assets/images/grafik-regist-dashboard.png" alt="Option 1" class="w-40 h-40 mb-2">
                                <span class="text-lg font-bold">Penjual</span>
                                <p class="text-sm font-normal">Raih peluang penjualan lebih besar dengan <br> pasar yang lebih luas!</p>
                            </button>

                            <!-- Button 2 -->
                            <button @click="navigateTo('/register')" class="flex flex-col items-center justify-center p-4 border border-gray-300 hover:bg-primary hover:text-white rounded-lg">
                                <img src="../../assets/images/grafik-regist-cust.png" alt="Option 1" class="w-40 h-40 mb-2">
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
    </nav>
    
    </template>

<script>
import axios from 'axios';

    export default {
        name: "UnsignedNavbar",
        data() {
        return {
            isModalOpen: false,
            searchQuery: "",
        };
    },
        methods: {
            login(){
                this.$router.push('/login');
            },
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
            handleSearch() {
                if (this.searchQuery.trim() !== "") {
                    this.$router.push({ path: "/search", query: { q: this.searchQuery } });
                }
            },
        },
    }

</script>