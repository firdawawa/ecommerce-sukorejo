<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                <div class="flex justify-between">
                    <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                    Profil & Toko
                    </div>
                    <div class="mr-8 mt-2">
                        <RouterLink :to="{ path: '/dashboard/profil/' + userId + '/edit' }">
                            <button class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                                <img src="../../../assets/images/icon-edit.png" alt="edit" class="content-center">
                                <span class="font-medium text-lg text-white content-center">Edit Profil</span>
                            </button>
                        </RouterLink>
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
                        <h2 class="font-bold text-2xl text-font">Data Diri</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="flex justify-center">
                            <img :src="getImageUrl(user.profileImg)" id="photoprofile" alt="photo-profile" class="h-52 w-40 mb-4 rounded-xl object-cover">
                        </div>
                        <!-- DATA -->
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
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Nama Toko</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="name-toko" class="py-2">{{ store.storeName }}</h4>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Alamat</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="address" class="py-2">{{ user.addressDetail }}</h4>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Kelurahan</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="subdistrict" class="py-2">
                                    <div v-if="subDistrict">{{ subDistrict.subDistrictName }}</div>
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
                                <h4 id="postalcode" class="py-2">{{ user.postalCode }}</h4>
                            </div>
                        </div>
                        <!-- KEAMANAN AKUN -->
                        <h2 class="font-bold text-2xl text-font mt-12">Keamanan Akun</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Email</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="email" class="py-2">{{ user.email }}</h4>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-font w-60">
                                <h4 class="text-md font-bold py-2">Password</h4>
                            </div>
                            <div class="text-font text-md font-normal pr-6 w-[800px]">
                                <h4 id="password" class="py-2">*******</h4>
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
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    created() {
        this.idStore = localStorage.getItem('idStore');
        this.userId = localStorage.getItem('userId');
    },
    data(){
        return {
            idUser: '',
            idStore: '',
            idDistrict: '',
            idSubDistrict: '',
            user: [],
            store: [],
            district: '',
            subDistrict: '',
        }
    },
    async mounted() {
        this.idStore = localStorage.getItem('idStore');
        this.getStore(this.idStore);
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
        DashboardSidebarNavigation,
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
    getStore(idStore){    
        axios.get(`http://127.0.0.1:8000/api/store/${idStore}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
        })
        .then(res => {
            this.store = res.data.data;
        })
        .catch(error => {
            console.error("Error fetching store data:", error);
        });
    },
    getImageUrl(profileImg) {
        if (profileImg) {
            return `http://127.0.0.1:8000/storage/${profileImg}`;
        }
            return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
    },
}
}
</script>
