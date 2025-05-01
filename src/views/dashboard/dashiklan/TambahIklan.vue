<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-12 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font">
                    Tambah Data Iklan & Promosi
                    </div>
                </div>
                <div class="flex justify-around">
                    <div class="columns-2 gap-12 mt-6">
                        <form class="" action="#">
                        <div>
                            <label for="iklanname" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Judul</label>
                            <input type="text" v-model="model.iklan.title" name="iklanname" id="iklanname" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="ex: Diskon 50% Baju Anak Motif Kartun" required="">
                        </div>
                        <div>
                            <label for="iklanlink" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Tautan</label>
                            <input type="url" v-model="model.iklan.advurl" name="iklanlink" id="iklanlink" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="ex : https://loremipsum.com/tautanproduk" required="">
                        </div>
                        <div>
                            <label for="media" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Media</label>
                            <input 
                                type="file" 
                                name="file" 
                                ref="file" 
                                multiple 
                                @change="handleFileChange" 
                                class="w-full text-primary bg-purple-200 border-dotted border-2 border-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-lg px-5 py-8 text-center"
                            >
                            <span class="text-sm font-light text-gray-400">*Format media yang dapat diunggah adalah .jpeg, .jpg, .png, atau .pdf dengan ukuran maksimal 100MB.</span>
                        </div>
                        </form>
                    </div>
                </div>
                <div>
                    <form action="">
                            <div class="mr-4">
                                <label for="desc" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Deskripsi</label>
                                <textarea type="text" v-model="model.iklan.description" name="desc" id="desc" rows="6" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-gray-400" placeholder="Tuliskan deskripsi iklan & promosi" required=""></textarea>
                            </div>
                        </form>
                </div>
                <div class="flex items-center gap-4 my-5">
                    <input type="checkbox" class="h-5 w-5">
                    <div class="">
                        <h5 class="text-font text-lg font-semibold">Konfirmasi Data</h5>
                        <h6 class="text-font text-md font-normal">Informasi dan data yang dimasukkan ke dalam formulir ini telah sesuai.</h6>
                    </div>
                </div>
                <button type="submit" @click="saveIklan"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-10 text-center">Simpan Data</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    name: 'iklanCreate',
    created() {
        this.idStore = localStorage.getItem('idStore');
    },
    data(){
        return {
            idStore: '',
            model: {
                iklan: {
                    title: '',
                    advurl: '',
                    description: '',
                    banner: ''
                }
            }
        }
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        handleFileChange(event) {
            const files = event.target.files; // Mendapatkan file yang dipilih
            console.log('Files selected:', files);

            // Simpan file ke model jika diperlukan
            this.model.iklan.banner = files; 
        },

        uploadFile() {
            // Jika diperlukan, Anda dapat memproses file secara manual di sini
            console.log('File ready for upload:', this.model.iklan.banner);
        },

        saveIklan() {

            const formData = new FormData();

            // Tambahkan data iklan
            formData.append('title', this.model.iklan.title);
            formData.append('advurl', this.model.iklan.advurl);
            formData.append('description', this.model.iklan.description);

            // Tambahkan file (jika ada)
            if (this.$refs.file.files.length > 0) {
                formData.append('banner', this.$refs.file.files[0]); // Pastikan hanya satu file jika diperlukan
            }

            axios.post(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Jika perlu token
                },
            })
                .then(res => {
                    console.log(res.data);
                    alert('Iklan berhasil disimpan');
                    this.model.iklan = {
                        title: '',
                        advurl: '',
                        banner: '',
                        description: '',
                    };

                    this.$router.push({ name: 'iklanDashboard' });
                })
                .catch(error => {
                    console.error('Terjadi kesalahan:', error.response?.data || error);
                    alert('Gagal menyimpan iklan. Pastikan semua data valid.');
                });
        },

    },
};
</script>