<template>
    <div>
        <WaitingDashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="relative justify-center justify-items-center text-center content-center align-middle ">
                    <img src="../../assets/images/grafik-waiting.png" alt="Waiting for Verification">
                    <h3 class="font-bold text-primary text-3xl ">PROSES VERIFIKASI</h3>
                    <div class="font-normal text-font text-lg w-1/2 mt-4 mb-32">Akun toko mu sedang dalam proses verifikasi oleh pihak BUMDes, tunggu hingga verifikasi selesai untuk dapat membuka dan menggunakan akun!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WaitingDashboardSidebarNavigation from '../../components/dashboard/WaitingSidebarNavigation.vue';

export default {
    components: {
        WaitingDashboardSidebarNavigation,
    },
};
</script>