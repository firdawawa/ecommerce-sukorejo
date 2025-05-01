<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                    Iklan & Promosi
                    </div>
                    <div class="mr-8 mt-2">
                        <button @click="navigateTo('/dashboard/iklan/add')" class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                            <span class="font-extrabold text-3xl text-white content-center -mt-2">+</span>
                            <span class="font-medium text-lg text-white content-center">Tambah Data</span>
                        </button>
                    </div>
                </div>
                <!-- TABEL -->
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
                    <table class="w-full text-md text-left rtl:text-right text-font">
                        <thead class="text-lg font-semibold text-white bg-primary ">
                            <tr>
                                <th scope="col" class="px-6 py-4">
                                    No 
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Nama Iklan
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Tautan
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Tindakan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(iklan, index) in iklan" :key="index" class="bg-white border-b hover:bg-gray-100">
                                <th scope="row" class="px-6 py-2 font-medium">
                                    <RouterLink :to="{ path: '/dashboard/iklan/' + iklan.id + '/detail' }" class="flex gap-4 items-center">
                                        {{ index + 1 }}
                                    </RouterLink>
                                </th>
                                <td class="px-6 py-2">
                                    <RouterLink :to="{ path: '/dashboard/iklan/' + iklan.id + '/detail' }" class="flex gap-4 items-center">
                                        <img :src="getImageUrl(iklan.banner)" alt="Foto Produk" class="h-12 w-12 rounded-lg object-cover">
                                        <span class="font-md text-font font-semibold">{{ iklan.title }}</span>
                                    </RouterLink>
                                </td>
                                <td class="px-6 py-2">
                                    <RouterLink :to="{ path: '/dashboard/iklan/' + iklan.id + '/detail' }" class="flex gap-4 items-center">
                                        {{ iklan.advurl }}
                                    </RouterLink>
                                </td>
                                <td class="pl-6 py-2 text-center">
                                    <div class="flex gap-2">
                                        <RouterLink :to="{ path: '/dashboard/iklan/' + iklan.id + '/edit' }">
                                            <button class="flex gap-4 bg-primary content-center justify-center align-middle py-4 px-4 rounded-full">
                                                <img src="../../../assets/images/icon-edit.png" alt="file" class="content-center w-4 h-4">
                                            </button>
                                        </RouterLink>
                                        <button @click="deleteIklan(iklan.id)" class="flex gap-4 bg-red-500 content-center justify-center align-middle py-4 px-4 rounded-full">
                                            <img src="../../../assets/images/icon-delete.png" alt="file" class="content-center w-4 h-4">
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    created() {
        this.idStore = localStorage.getItem('idStore');
    },
    data(){
        return {
            idStore: '',
            iklan: []
        }
    },
    mounted() {
        this.getIklan();
        // console.log('Success')
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
                this.$router.push(route); // Navigasi ke route tertentu
            },
            async getIklan() {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log(res.data);
                    this.iklan = res.data.data;
                } catch (error) {
                    console.error('Error fetching ads:', error);
                }
            },
            getImageUrl(banner) {
                if (banner) {
                    return `http://127.0.0.1:8000/storage/${banner}`;
                }
                return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
            },
            deleteIklan(idAds) {
                if (confirm('Are you sure to delete this?')) {
                    axios
                        .delete(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement/${idAds}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        })
                        .then(res => {
                            alert(res.data.message);
                            this.getIklan(); // Refresh data setelah penghapusan
                        })
                        .catch(function (error) {
                            if (error.response) {
                                if (error.response.status == 404) {
                                    alert(error.response.data.message);
                                } else {
                                    alert('Failed to delete advertisement.');
                                }
                            }
                        });
                }
            },


    },
};
</script>