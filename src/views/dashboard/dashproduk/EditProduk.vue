<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-12 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font">
                    Ubah Data Produk
                    </div>
                    <div class="mr-8 mt-2">
                        <button v-if="produkId" @click="deleteProduk()" class="flex gap-4 bg-red-500 content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                            <img src="../../../assets/images/icon-delete.png" alt="edit" class="content-center h-5">
                            <span class="font-medium text-lg text-white content-center">Hapus Data</span>
                        </button>
                    </div>
                </div>
                <div class="flex justify-around">
                    <div class="columns-2 gap-12 mt-6">
                        <form class="" action="#">
                        <div>
                            <label for="productname" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Nama</label>
                            <input type="text" v-model="model.produk.name" name="productname" id="productname" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font" placeholder="Bento Cake 10cm" required="">
                        </div>
                        <div>
                            <label for="price" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Harga</label>
                            <input type="number" v-model="model.produk.price" name="price" id="price" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font" placeholder="35000" required="">
                        </div>
                        <br>
                        <br>
                        <br>
                        <div>
                            <label for="stok" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Stok</label>
                            <input type="text" v-model="model.produk.stock" name="stok" id="stok" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font" placeholder="1000" required="">
                        </div>
                        <div>
                            <label for="media" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Media</label>
                            <input 
                                type="file" 
                                id="media" 
                                accept=".jpeg,.jpg,.png,.pdf" 
                                class="hidden" 
                                multiple
                                @change="handleFileUpload"
                            />
                            <button type="button" @click="triggerFileInput" class="w-full text-primary bg-purple-200 border-dotted border-2 border-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-lg px-5 py-8 text-center cursor-pointer">
                                {{ selectedFileName || 'Unggah Media' }}
                            </button>
                            <span class="text-sm font-light text-gray-400">*Format media yang dapat diunggah adalah .jpeg, .jpg, .png, atau .pdf dengan ukuran maksimal 100MB.</span>
                        </div>
                        </form>
                    </div>
                </div>
                <div>
                    <form action="">
                            <div class="mr-4">
                                <label for="desc" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Deskripsi</label>
                                <textarea type="text" v-model="model.produk.description" name="desc" id="desc" rows="6" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-font" placeholder="Tuliskan deskripsi produk" required=""></textarea>
                            </div>
                        </form>
                </div>
                <div class="flex items-center gap-4 my-5">
                    <input type="checkbox" class="h-5 w-5" required="">
                    <div class="">
                        <h5 class="text-font text-lg font-semibold">Konfirmasi Data</h5>
                        <h6 class="text-font text-md font-normal">Informasi dan data yang dimasukkan ke dalam formulir ini telah sesuai.</h6>
                    </div>
                </div>
                <button type="submit" @click="updateProduk"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-10 text-center">Simpan Data</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    name: 'produkEdit',
    created() {
        this.idStore = localStorage.getItem('idStore');
    },
    data(){
        return {
            idProduct: '',
            produkId: '',
            selectedFileName: '',
            model: {
                produk: {
                    name: '',
                    stock: '',
                    price: '',
                    description: '',
                    files: null
                }
            }
        }
    },
    mounted(){
        // console.log(this.$route.params.id);
        this.produkId = this.$route.params.id;
        this.getProdukData(this.$route.params.id);
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        triggerFileInput() {
            document.getElementById('media').click();
        },
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        handleFileUpload(event) {
            const files = Array.from(event.target.files); // ✅ Ubah FileList ke Array
            if (files.length > 0) {
                // Filter file sesuai batasan ukuran
                const validFiles = files.filter(file => file.size <= 100 * 1024 * 1024);

                if (validFiles.length < files.length) {
                    alert("Beberapa file tidak diunggah karena melebihi batas ukuran 100MB.");
                }

                this.model.produk.files = validFiles; // ✅ Simpan dalam array
                this.selectedFileName = validFiles.map(file => file.name).join(", ");
            } else {
                this.model.produk.files = [];
            }
        },
        getProdukData(idProduct) {
            axios.get(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/product/${idProduct}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                if (res.data.data) {
                    this.model.produk = {
                        name: res.data.data.name || '',
                        price: res.data.data.price || '',
                        stock: res.data.data.stock || '',
                        description: res.data.data.description || '',
                        files: res.data.data.files || null  // Pastikan banner bisa null jika tidak diubah
                    };
                    this.selectedFileName = res.data.data.files ? 'File telah diunggah' : '';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert(error.response?.data?.message || 'Terjadi kesalahan dalam mengambil data');
            });
        },
        updateProduk() {
            if (!this.model.produk.name || !this.model.produk.price|| !this.model.produk.stock || !this.model.produk.description) {
                alert('Harap isi semua kolom yang diperlukan.');
                return;
            }

            const formData = new FormData();
            formData.append('name', this.model.produk.name);
            formData.append('price', this.model.produk.price);
            formData.append('stock', this.model.produk.stock);
            formData.append('description', this.model.produk.description);

            console.log("File input:", this.model.produk.files);

            if (Array.isArray(this.model.produk.files) && this.model.produk.files.length > 0) {
                this.model.produk.files.forEach((file, index) => {
                    formData.append("files[]", file);
                    console.log(`File ${index}:`, file); // Debug
                });
            } else {
                console.log("Tidak ada file yang dikirim.");
            }

            axios.post(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/product/${this.produkId}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    alert('Data berhasil diperbarui.');
                    this.$router.push({ name: 'produkDashboard' });
                })
                .catch(error => {
                    console.error('Error:', error.response);
                    alert(error.response?.data?.message || 'Terjadi kesalahan saat memperbarui data.');
                });
        },
        deleteProduk() {
            if (!this.produkId) {
                alert('ID produk tidak ditemukan.');
                return;
            }

            if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                axios
                    .delete(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/product/${this.produkId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then(res => {
                        alert(res.data.message || 'Produk berhasil dihapus.');
                        this.$router.push({ name: 'produkDashboard' });  // Redirect setelah penghapusan
                    })
                    .catch(error => {
                        if (error.response) {
                            alert(error.response.data.message || 'Gagal menghapus produk.');
                        } else {
                            alert('Terjadi kesalahan dalam proses penghapusan.');
                        }
                    });
            }
        }
    },
};
</script>
