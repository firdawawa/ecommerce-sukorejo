<template>

<div class="relative flex z-50">
    <!-- Sidebar Navigation -->
    <div class="bg-primary h-screen w-1/4 fixed">
        <div class="max-h-screen flex flex-wrap items-center align-middle justify-center mx-auto p-4">
            <div class="hidden h-full md:block md:h-auto" id="navbar-default">
                <!-- Logo -->
                <div class="logo text-6xl mt-6">
                    <RouterLink to="/dashboard" class="flex h-14 w-96 mx-auto justify-center items-center text-white rounded-3xl md:border-0 md:p-0">
                            LOGO
                        </RouterLink>
                </div>

                <!-- Akun -->
                    <div class="profile content-center mx-1 my-16">
                        <RouterLink to="/dashboard/profil" class="flex content-center gap-6">
                            <img :src="getImageUrl(user.profileImg)" alt="profile picture" class="rounded-full w-20 h-20 object-cover">
                            <div class="content-center">
                                <div id="user-name" class="text-white font-bold text-2xl content-center">{{ user.name }}</div>
                                <div class="flex content-center align-middle gap-3 mt-1">
                                    <div class="text-white text-lg font-light content-center tracking-wider">{{ user.email }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>

                <!-- Navigation -->
                <ul class="font-medium p-4 md:p-0 mt-4 border items-center border-gray-100 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 ">
                    <li>
                        <RouterLink to="/dashboard" class="flex gap-4 h-14 w-96 mx-auto items-center align-middle text-white rounded-3xl hover:border-l-4 md:hover:bg-hover-primary md:border-0 md:p-0">
                            <img class="h-6 ml-8" src="../../assets/images/profile-icon.png" alt="icon-profile">
                            Statistik
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dashboard/profil" class="flex gap-4 h-14 w-96 mx-auto mt-2 items-center align-middle text-white rounded-3xl hover:border-l-4 md:hover:bg-hover-primary md:border-0 md:p-0">
                            <img class="h-6 ml-8" src="../../assets/images/profile-icon.png" alt="icon-profile">
                            Toko & Profil
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dashboard/produk" class="flex gap-4 h-14 w-96 mx-auto mt-2 items-center align-middle text-white rounded-3xl hover:border-l-4 md:hover:bg-hover-primary md:border-0 md:p-0">
                            <img class="h-6 ml-8" src="../../assets/images/profile-icon.png" alt="icon-profile">
                            Produk
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dashboard/iklan" class="flex gap-4 h-14 w-96 mx-auto mt-2 items-center align-middle text-white rounded-3xl hover:border-l-4 md:hover:bg-hover-primary md:border-0 md:p-0">
                            <img class="h-6 ml-8" src="../../assets/images/profile-icon.png" alt="icon-profile">
                            Iklan
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/dashboard/history" class="flex gap-4 h-14 w-96 mx-auto mt-2 items-center align-middle text-white rounded-3xl hover:border-l-4 md:hover:bg-hover-primary md:border-0 md:p-0">
                            <img class="h-6 ml-8" src="../../assets/images/profile-icon.png" alt="icon-profile">
                            Riwayat
                        </RouterLink>
                    </li>
                </ul>

                <!-- Button Logout -->
                <div class="flex justify-center h-screen">
                    <button @click="logout" class="bg-secondary text-white px-4 py-2 rounded-md w-80 h-12 mt-32 text-center items-center content-center  hover:bg-red-600 transition duration-200">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Header -->
    <div class="flex-1 ml-1/4">
        <div class="bg-white px-2 py-4 m-5 rounded-xl h-24 content-center">
            <div class="font-bold text-3xl text-font ml-10">
                Dashboard
            </div>
        </div>
    </div>

</div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "DashboardSidebarNavigation",
        created() {
            this.userId = localStorage.getItem('userId');
        },
        data(){
            return {
                idUser: '',
                user: {},
            }
        },
        async mounted() {
            this.userId = localStorage.getItem('userId');
            if (this.userId) {
                await this.getUser(this.userId);
                if (this.user.idDistrict) {
                    this.getDistrict(this.user.idDistrict);
                }
                if (this.user.idSubDistrict) {
                    this.getSubDistrict(this.user.idSubDistrict);
                }
            } else {
                console.error("User ID tidak ditemukan di localStorage");
            }
        },
        methods: {
            getUser(idUser) {
                axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(res => {
                    this.user = res.data.data;
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            },
            logout() {
                // Ambil token dari localStorage atau tempat penyimpanan lain
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('Token tidak ditemukan');
                    return;
                }

                // Kirim permintaan logout dengan token di header Authorization
                axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}` // Kirim token dengan prefix 'Bearer'
                    }
                })
                .then(response => {
                    console.log('Logout berhasil:', response.data);
                    
                    // Hapus token dari localStorage setelah logout berhasil
                    localStorage.removeItem('token');
                    localStorage.removeItem('idStore');
                    localStorage.removeItem('userId');
                    
                    // Redirect ke halaman login setelah logout
                    this.$router.push('/login');
                })
                .catch(error => {
                    console.error('Terjadi kesalahan saat logout:', error.response ? error.response.data : error);
                });
            },
            getImageUrl(profileImg) {
                if (profileImg) {
                    return `http://127.0.0.1:8000/storage/${profileImg}`;
                }
                    return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
            },
        }
    };
</script>