<template>
    <div>
        <Navbar/>
        <div class="mt-28 mx-48 mb-4">
            <div class="flex">
                <!-- MINI NAVBAR -->
                <div class="bg-white w-1/5 h-fit fixed rounded-2xl p-10 pb-28">
                    <div class="profile content-center object-cover">
                        <RouterLink to="/profil" class="flex content-center gap-6">
                            <img :src="getImageUrl(user.profileImg)" alt="profile picture" class="rounded-full w-20 h-20 aspect-square object-cover">
                            <div class="content-center">
                                <div class="text-font font-bold text-2xl content-center">{{ user.name }}</div>
                                <div class="flex content-center align-middle gap-3 ">
                                    <div class="text-gray-400 text-lg font-light content-center tracking-wider">{{ user.email }}</div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                    <div class="mt-14">
                        <ul class="font-medium p-4 md:p-0 mt-4 border items-center border-gray-100 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 ">
                            <li>
                                <RouterLink to="/profil" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Profil
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ path: '/profil/' + userId + '/password' }" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Ubah Password
                                </RouterLink>
                            </li>   
                            <li>
                                <RouterLink to="/riwayat" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Riwayat
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/cart" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Keranjang Saya
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Tentang Aplikasi
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="" class="group flex gap-4 h-14 w-80 mx-auto items-center align-middle text-font rounded-3xl hover:border-l-8 hover:border-primary md:hover:bg-hover-primary hover:text-white md:border-0 md:p-0">
                                    <div class="ml-8 w-6 h-6">
                                        <img class="w-full h-full group-hover:hidden" src="../../assets/images/profile-icon-gray.png" alt="icon-profile">
                                        <img class="w-full h-full hidden group-hover:block" src="../../assets/images/profile-icon.png" alt="icon-profile">
                                    </div>
                                    Hubungi Bantuan
                                </RouterLink>
                            </li>   
                        </ul>
                    </div>
                    <!-- Button Logout -->
                    <div class="flex justify-center">
                        <button @click="logout" class="bg-secondary text-lg font-semibold text-white px-4 py-2 rounded-md w-80 h-12 mt-32 text-center items-center content-center  hover:bg-red-600 transition duration-200">
                            Keluar
                        </button>
                    </div>

                </div>

                <!-- CONTENT -->
                <div class="w-3/4 ml-1/4">
                    <div class="bg-white h-fit rounded-2xl pb-6 pt-2 px-6 ml-4">
                        <div class="flex justify-between items-center mt-4 mx-8">
                            <div class="text-3xl text-font font-bold">Data Diri</div>
                            <div class="mr-8">
                                <RouterLink :to="{ path: '/profil/' + userId + '/edit' }">
                                    <button class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-12 rounded-xl">
                                        <img src="../../assets/images/icon-edit.png" alt="edit" class="content-center">
                                        <span class="font-medium text-lg text-white content-center">Edit Profil</span>
                                    </button>
                                </RouterLink>
                            </div>
                        </div>
                        <hr class="h-px mt-5 mb-8 bg-gray-400 border-1">
                        <div class="flex justify-center">
                            <img :src="getImageUrl(user.profileImg)" id="photoprofile" alt="photo-profile" class="h-52 w-40 mb-4 rounded-xl object-cover">
                        </div>
                        <!-- DATA -->
                        <div class="px-16 mt-10">
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Tanggal Bergabung</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="date-join" class="py-2">{{ formatDate(user.created_at) }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Nama</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="name" class="py-2">{{ user.name }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Tempat, Tanggal Lahir</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="dob" class="py-2">{{ user.birthPlace }}, {{ user.birthDate }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Jenis Kelamin</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="sex" class="py-2">{{ user.sex }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Nomor Telepon</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="phone" class="py-2">{{ user.phoneNumber }}</h4>
                                </div>
                            </div>
                        </div>
                        <hr class="h-px mt-5 mb-4 bg-gray-400 border-1">
                        <div class="px-16 mt-4">
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Alamat</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="name" class="py-2">{{ user.addressDetail }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Kelurahan</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="subdistrict" class="py-2">
                                        <div v-if="subDistrict">{{ subDistrict.subDistrictName }} </div>
                                    </h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Kecamatan</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="district" class="py-2"> 
                                        <div v-if="district">{{ district }}</div>
                                    </h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Kode Pos</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="dob" class="py-2">{{ user.postalCode }}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="text-3xl text-font font-bold px-6 ml-4 mt-12">Keamanan Akun</div>
                        <hr class="h-px mt-5 mb-6 bg-gray-400 border-1">
                        <div class="px-16 mt-2 mb-8">
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Email</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="name" class="py-2">{{ user.email }}</h4>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-font w-60">
                                    <h4 class="text-md font-bold py-2">Password</h4>
                                </div>
                                <div class="text-font text-md font-normal pr-6 w-[800px]">
                                    <h4 id="dob" class="py-2">********</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import Navbar from '../../components/ecommerce/Navbar.vue';

export default {
    created() {
        this.userId = localStorage.getItem('userId');
    },
    data(){
        return {
            idUser: '',
            idDistrict: '',
            idSubDistrict: '',
            user: {},
            district: '',
            subDistrict: '',
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
    components: {
        Navbar,
    },
    methods: {
        formatDate(date) {
            const months = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ];

            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = months[d.getMonth()];  // Mendapatkan nama bulan dari array
            const year = d.getFullYear();
            
            return `${day} ${month} ${year}`;
        },
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        getUser(idUser) {
            axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then(res => {
                this.user = res.data.data;
                if (this.user.idDistrict) {
                    this.getDistrict(this.user.idDistrict); // Panggil getDistrict untuk mengambil data district
                }
                if (this.user.idSubDistrict) {
                    this.getSubDistrict(this.user.idSubDistrict);
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        },
        getDistrict(idDistrict) {
            axios.get(`http://127.0.0.1:8000/api/districts/${idDistrict}`)
                .then(response => {
                    console.log(response.data);  // Periksa output di browser console
                    if (response.data.success) {
                        this.district = response.data.district;
                        console.log(this.district);
                        if (this.district && this.district.idSubDistrict) {
                        this.getSubDistrict(this.district.idSubDistrict);
                    } 
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.district = 'Data Kecamatan Tidak Ditemukan';
                });
        },

        // Menambahkan metode untuk mendapatkan data subDistrict
        getSubDistrict(idSubDistrict) {
            console.log("Fetching subdistrict with ID:", idSubDistrict);
            axios.get(`http://127.0.0.1:8000/api/subdistricts/data/${idSubDistrict}`)
                .then(res => {
                    console.log("Subdistrict API Response:", res.data);
                    if (res.data) {
                        this.subDistrict = res.data;  
                        console.log(this.subDistrict.subDistrictName);
                    } else {
                        this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
                    }
                })
                .catch(error => {
                    console.error("Error fetching subdistrict data:", error);
                    this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
                });
        },
        getImageUrl(profileImg) {
            if (profileImg) {
                return `http://127.0.0.1:8000/storage/${profileImg}`;
            }
                return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
        },
    },
};
</script>
