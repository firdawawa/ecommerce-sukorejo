<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-12 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font">
                    Ubah Data Iklan & Promosi
                    </div>
                    <div class="mr-8 mt-2">
                        <button v-if="iklanId" @click="deleteIklan()" class="flex gap-4 bg-red-500 content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                            <img src="../../../assets/images/icon-delete.png" alt="edit" class="content-center h-5">
                            <span class="font-medium text-lg text-white content-center">Hapus Data</span>
                        </button>
                    </div>
                </div>
                <div class="flex justify-around">
                    <div class="columns-2 gap-12 mt-6">
                        <form class="" action="#">
                        <div>
                            <label for="iklanname" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Judul</label>
                            <input type="text" v-model="model.iklan.title" name="iklanname" id="iklanname" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font" placeholder="" required="">
                        </div>
                        <div>
                            <label for="iklanlink" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Tautan</label>
                            <input type="url" v-model="model.iklan.advurl" name="iklanlink" id="iklanlink" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-font" placeholder="" required="">
                        </div>
                        <div>
                            <label for="media" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Media</label>
                            <input 
                                type="file" 
                                id="media" 
                                accept=".jpeg,.jpg,.png,.pdf" 
                                class="hidden" 
                                @change="handleFileUpload($event)"
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
                                <textarea type="text" v-model="model.iklan.description" name="desc" id="desc" rows="6" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white placeholder-font" placeholder="" required=""></textarea>
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
                <button type="submit" @click="updateIklan"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-10 text-center">Simpan Data</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    name: 'iklanEdit',
    created() {
        this.idStore = localStorage.getItem('idStore');
    },
    data(){
        return {
            idAds: '',
            iklanId: '',
            selectedFileName: '',
            model: {
                iklan: {
                    title: '',
                    advurl: '',
                    description: '',
                    banner: null
                }
            }
        }
    },
    mounted(){
        // console.log(this.$route.params.id);
        this.iklanId = this.$route.params.id;
        this.getIklanData(this.$route.params.id);
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
            const file = event.target.files[0];
            if (file) {
                if (file.size > 100 * 1024 * 1024) {
                    alert('Ukuran file maksimal 100MB.');
                    return;
                }
                this.model.iklan.banner = file;
                this.selectedFileName = file.name;
            } else {
                this.model.iklan.banner = null;
            }
        },
        getIklanData(idAds) {
            axios.get(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement/${idAds}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                if (res.data.data) {
                    this.model.iklan = {
                        title: res.data.data.title || '',
                        advurl: res.data.data.advurl || '',
                        description: res.data.data.description || '',
                        banner: res.data.data.banner || null  // Pastikan banner bisa null jika tidak diubah
                    };
                    this.selectedFileName = res.data.data.banner ? 'File telah diunggah' : '';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert(error.response?.data?.message || 'Terjadi kesalahan dalam mengambil data');
            });
        },

        updateIklan() {
            if (!this.model.iklan.title || !this.model.iklan.advurl || !this.model.iklan.description) {
                alert('Harap isi semua kolom yang diperlukan.');
                return;
            }

            const formData = new FormData();
            formData.append('title', this.model.iklan.title);
            formData.append('advurl', this.model.iklan.advurl);
            formData.append('description', this.model.iklan.description);

            // Periksa apakah ada file baru yang diunggah
            if (this.model.iklan.banner instanceof File) {
                formData.append('banner', this.model.iklan.banner);
            }

            axios.post(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement/${this.iklanId}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    alert('Data berhasil diperbarui.');
                    this.$router.push({ name: 'iklanDashboard' });
                })
                .catch(error => {
                    console.error('Error:', error.response);
                    alert(error.response?.data?.message || 'Terjadi kesalahan saat memperbarui data.');
                });
        },
        deleteIklan() {
            if (!this.iklanId) {
                alert('ID iklan tidak ditemukan.');
                return;
            }

            if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                axios
                    .delete(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}/advertisement/${this.iklanId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    .then(res => {
                        alert(res.data.message || 'Iklan berhasil dihapus.');
                        this.$router.push({ name: 'iklanDashboard' });  // Redirect setelah penghapusan
                    })
                    .catch(error => {
                        if (error.response) {
                            alert(error.response.data.message || 'Gagal menghapus iklan.');
                        } else {
                            alert('Terjadi kesalahan dalam proses penghapusan.');
                        }
                    });
            }
        }
    },
};
</script>
