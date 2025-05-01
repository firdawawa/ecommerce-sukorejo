<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                    Produk
                    </div>
                    <div class="mr-8 mt-2">
                        <button @click="navigateTo('/dashboard/produk/add')" class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
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
                                            Nama Produk
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Harga
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Stok
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Terjual
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Tindakan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr  v-for="(produk, index) in produk" :key="index" class="bg-white border-b hover:bg-gray-100">
                                        <th scope="row" class="px-6 py-2 font-medium">
                                            <RouterLink :to="{ path: '/dashboard/produk/' + produk.id + '/detail' }" class="flex gap-4 items-center">
                                                {{ index + 1 }}
                                            </RouterLink>
                                        </th>
                                        <td class="px-6 py-2">
                                            <RouterLink :to="{ path: '/dashboard/produk/' + produk.id + '/detail' }" class="flex gap-4 items-center">
                                                <img :src="getImageUrl(produk.files)" id="fotoproduk" alt="Foto Produk" class="h-12 w-12 rounded-lg object-cover">
                                                <span id="namaproduk" class="font-md text-font font-semibold">{{ produk.name }}</span>
                                            </RouterLink>
                                        </td>
                                        <td class="px-6 py-2">
                                            <RouterLink :to="{ path: '/dashboard/produk/' + produk.id + '/detail' }" class="flex gap-4 items-center">
                                                {{ produk.price }}
                                            </RouterLink>
                                        </td>
                                        <td class="px-6 py-2">
                                            <RouterLink :to="{ path: '/dashboard/produk/' + produk.id + '/detail' }" class="flex gap-4 items-center">
                                                {{ produk.stock }}
                                            </RouterLink>
                                        </td>
                                        <td class="px-6 py-2">
                                            {{ produk.total_sold }}
                                        </td>
                                        <td class="pl-6 py-2 text-center">
                                            <div class="flex gap-2">
                                                <RouterLink :to="{ path: '/dashboard/produk/' + produk.id + '/edit' }">
                                                    <button class="flex gap-4 bg-primary content-center justify-center align-middle py-4 px-4 rounded-full">
                                                        <img src="../../../assets/images/icon-edit.png" alt="file" class="content-center w-4 h-4">
                                                    </button>
                                                </RouterLink>
                                                <button @click="deleteProduk(produk.id)" class="flex gap-4 bg-red-500 content-center justify-center align-middle py-4 px-4 rounded-full">
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
            produk: []
        }
    },
    mounted() {
        this.getProduk();
        // console.log('Success')
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        async getProduk() {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/product`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    console.log(res.data);
                    this.produk = res.data.data;
                } catch (error) {
                    console.error('Error fetching ads:', error);
                }
            },
            getImageUrl(files) {
                if (files && files.length > 0) {
                    return `http://127.0.0.1:8000/storage/${files[0].file}`;
                }
                return require('../../../assets/images/no-image.png'); // Placeholder jika gambar tidak tersedia
            },
            deleteProduk(idProduct) {
                if (confirm('Are you sure to delete this?')) {
                    axios
                        .delete(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/product/${idProduct}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        })
                        .then(res => {
                            alert(res.data.message);
                            alert('Produk berhasil dihapus')
                            this.getProduk(); // Refresh data setelah penghapusan
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
