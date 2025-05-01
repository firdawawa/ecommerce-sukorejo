<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                    Profil & Toko
                    </div>
                </div>
                <div class="mt-12 grid grid-cols-[17rem_1fr] divide-x-2">
                    <!-- MINI NAV -->
                    <div class="block w-56 m-6 -mt-2">
                        <RouterLink to="/dashboard/profil" class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold">Profil Penjual</RouterLink>
                        <RouterLink to="/dashboard/profil/toko" class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold">Toko</RouterLink>
                        <RouterLink to="" class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold">Tentang Aplikasi</RouterLink>
                        <RouterLink to="" class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold">Hubungi Bantuan</RouterLink>
                    </div>
                    <!-- CONTENT -->
                    <div class="relative justify-center justify-items-center text-center content-center align-middle -mt-16 mb-4">
                        <img src="../../../assets/images/grafik-empty.png" alt="Data Store Empty">
                        <h3 class="font-bold text-primary text-3xl ">BELUM MEMILIKI TOKO</h3>
                        <div class="font-normal text-font text-lg w-1/2 mt-4 mb-12">Akunmu belum memiliki toko yang terdaftar!</div>
                        <div class="mr-8 mt-2">
                            <button @click="navigateTo('/dashboard/profil/toko/register')" class="flex bg-secondary content-center justify-center align-middle py-4 px-16 rounded-xl">
                                <span class="font-medium text-2xl text-white content-center">Daftarkan Toko</span>
                            </button>
                        </div>
                    </div> 
                </div>     
            </div>
        </div>
    </div>
</template>

<script>
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
    },
};
</script>
