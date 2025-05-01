<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-screen">
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
                    <div class="pl-12 items-center">
                        <h2 class="font-bold text-2xl text-font">Ubah Kata Sandi</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <!-- FORM -->
                        <form @submit.prevent="changePassword" class="relative text-center items-center flex flex-col" action="#">
                            <div>
                                <label for="oldpassword" class="block mb-2 mt-px justify-start text-left text-xl font-medium text-gray-900">Kata Sandi Lama</label>
                                <input type="password" v-model="oldPassword" name="oldemail" id="oldemail" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400" placeholder="••••••••" required="">
                            </div>
                            <div>
                                <label for="newpassword" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kata Sandi Baru</label>
                                <input type="password" v-model="newPassword" name="newpassword" id="newpassword" placeholder="••••••••" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400" required="">
                            </div>
                            <div>
                                <label for="konfirmnewpassword" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Konfirmasi Kata Sandi Baru</label>
                                <input type="password" v-model="newPasswordConfirmation" name="konfirmnewpassword" id="konfirmnewpassword" placeholder="••••••••" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400" required="">
                            </div>
                            <p class="mt-3 w-[500px] text-left text-gray-600">! Minimal terdiri dari 8 karakter</p>
                            <button type="submit" @click="changePassword" :disabled="isLoading" class="w-[500px] text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-2.5 mt-10 text-center">Simpan Data</button>
                        </form>
                    </div>
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
        this.idUser = localStorage.getItem('userId');
    },
    data() {
        return {
            userId: '',
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
            isLoading: false,
        };
    },
    mounted() {
        const userId = localStorage.getItem('userId');
        console.log('userId from localStorage:', userId);  // Debug log
        this.userId = this.$route.params.id;
        console.log('userId from route params:', this.userId);
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        changePassword() {
            // Jangan lakukan apa-apa jika permintaan sedang diproses
            if (this.isLoading) return;

            // Set status loading menjadi true
            this.isLoading = true;

            const formData = {
                old_password: this.oldPassword,
                new_password: this.newPassword,
                new_password_confirmation: this.newPasswordConfirmation,
            };

            axios.put(`http://127.0.0.1:8000/api/update-password/${this.userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(response => {
                alert('Password berhasil diperbarui');
                this.$router.push({ name: 'profilDashboard' });
            })
            .catch(error => {
                console.error('Error updating store data:', error.response);
                alert('Gagal memperbarui password');
            })
            .finally(() => {
                // Set status loading kembali ke false
                this.isLoading = false;
            });
        },
    }
};
</script>
