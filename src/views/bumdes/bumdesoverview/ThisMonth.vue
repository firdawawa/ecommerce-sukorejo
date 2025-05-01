<template>
    <div>
        <BumdesSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 text-font ml-10">
                    Statistik
                    </div>
                </div>
                <div class="mt-10 grid grid-cols-[17rem_1fr] divide-x-2">
                    <!-- MINI NAV -->
                    <div class="block w-56 m-6 -mt-2">
                        <RouterLink to="/bumdes/overview/month" class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold">Bulan Ini</RouterLink>
                        <RouterLink to="/bumdes/overview" class="block text-lg text-font font-normal rounded-xl pl-4 pr-18 py-5 hover:bg-primary hover:text-white hover:font-bold">Seluruh Data</RouterLink>
                    </div>
                    <!-- CONTENT -->
                    <div class="pl-12 items-center">
                        <div class="flex gap-8">
                            <div>
                                <h2 class="font-bold text-2xl text-font">Jumlah Toko</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                            <div>
                                <h2 class="font-bold text-2xl text-font">Jumlah Produk</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                        </div>
                        <div class="flex gap-8">
                            <div>
                                <h2 class="font-bold text-2xl text-font">Total Penjualan</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                            <div>
                                <h2 class="font-bold text-2xl text-font">Total Pendapatan</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                        </div>
                        <h2 class="font-bold text-2xl text-font">Statistik Kategori Toko</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <h2 class="font-bold text-2xl text-font">Paling Laris</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="flex gap-8">
                            <div>
                                <h2 class="font-bold text-2xl text-font">Statistik Penjualan</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                            <div>
                                <h2 class="font-bold text-2xl text-font">Statistik Penjualan</h2>
                                <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
	components: {
		BumdesSidebarNavigation,
	},
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
    },
};
</script>
