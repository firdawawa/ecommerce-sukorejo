<template>
    <div>
        <DashboardSidebarNavigation />
        <div class="flex-1 ml-1/4">
            <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
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
                        <h2 class="font-bold text-2xl text-font">Ubah Data Diri</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="flex justify-center content-center items-center">
                            <input type="file" name="file" ref="file" @change="handleFileChange" id="photoprofile" alt="photo-profile" class="flex justify-center h-52 w-40 bg-secondary mb-4 rounded-xl object-cover">
                        </div>
                        <div class="flex justify-center content-center gap-2">
                                <img src="../../../assets/images/icon-upload.png" alt="upload-icon" class=" h-8 w-8">
                                <span class="text-secondary font-medium text-lg">Unggah Foto</span>
                            </div>
                        <!-- FORM -->
                        <div class="columns-2 mt-4">
                            <form class="" action="#">
                                <div>
                                    <label for="name" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Nama</label>
                                    <input type="text" v-model="model.user.name" name="name" id="name" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div>
                                <div>
                                    <label for="placebirth" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Tempat Lahir</label>
                                    <input type="text" v-model="model.user.birthPlace" name="placebirth" id="placebirth" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div>
                                <div>
                                    <label for="sex" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-font">Jenis Kelamin</label>
                                    <select id="sex" v-model="model.user.sex" class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-[500px] p-2.5">
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="dob" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Tanggal Lahir</label>
                                    <input type="date" v-model="model.user.birthDate" name="dob" id="dob" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-gray-400" placeholder="" required="">
                                </div>
                                <!-- <div>
                                    <label for="store-name" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Nama Toko</label>
                                    <input type="text" v-model="model.store.storeName" name="store-name" id="store-name" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div> -->
                            </form>
                        </div>
                        <form action="">
                            <div>
                                <label for="phone" class="block mb-2 mt-2 justify-start text-left text-xl font-medium text-gray-900">Nomor Telepon</label>
                                <input type="number" v-model="model.user.phoneNumber" name="phone" id="phone" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                            </div>
                        </form>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="columns-2 mt-4">
                            <form class="" action="#">
                                <div>
                                    <label for="address" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Detail Alamat</label>
                                    <input type="text" v-model="model.user.addressDetail" name="address" id="address" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div>
                                <div>
                                    <label for="kecamatan" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kecamatan</label>
                                    <select v-model="model.user.idDistrict" name="kecamatan" id="kecamatan" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                        <option v-for="district in districts" :key="district.id" :value="district.id">
                                            {{ district.districtName }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="kelurahan" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kelurahan</label>
                                    <select v-model="model.user.idSubDistrict" name="kelurahan" id="kelurahan" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                        <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.id">
                                            {{ subdistrict.subDistrictName }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="postalcode" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Kode Pos</label>
                                    <select v-model="model.user.postalCode" name="postalcode" id="postalcode" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                        <option v-for="code in postalCode" :key="code" :value="code">
                                            {{ code }}
                                        </option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <!-- <h2 class="font-bold text-2xl text-font mt-12">Rekening</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <div class="columns-2 mt-4">
                            <form class="" action="#">
                                <div>
                                    <label for="bank" class="block mb-2 justify-start text-left text-xl font-medium text-font">Nama Bank</label>
                                    <select v-model="model.store.idBank" id="bank" class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-[500px] p-2.5">
                                        <option v-for="bank in banks" :key="bank.id" :value="bank.id">
                                            {{ bank.bankName }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="bankowner" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Nama Pemilik</label>
                                    <input type="text" v-model="model.store.bankAccName" name="bankowner" id="bankowner" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div>
                            </form>
                        </div>
                        <form action="">
                            <div>
                                    <label for="norek" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Nomor Rekening</label>
                                    <input type="number" v-model="model.store.bankAccNumber" name="norek" id="norek" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                </div>
                        </form> -->
                        <h2 class="font-bold text-2xl text-font mt-12">Keamanan Akun</h2>
                        <hr class="h-px my-6 mr-8 bg-gray-400 border-1">
                        <form action="">
                                <div>
                                    <label for="email" class="block mb-2 justify-start text-left text-xl font-medium text-gray-900">Email</label>
                                    <div class="flex gap-6 content-center">
                                        <input type="email" v-model="model.user.email" name="email" id="email" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font" placeholder="" required="">
                                        <div class="">
                                            <button @click="navigateTo('/dashboard/profil/edit')" class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                                                <img src="../../../assets/images/icon-edit.png" alt="edit" class="content-center">
                                                <span class="font-medium text-lg text-white content-center">Ubah</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Password</label>
                                    <div class="flex gap-6 content-center">
                                        <div id="password" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-[500px] p-2.5 bg-white placeholder-font">
                                            *******
                                        </div>
                                        <div class="">
                                            <RouterLink :to="{ path: '/dashboard/profil/' + idUser + '/editpassword' }">
                                                <button class="flex gap-4 bg-secondary content-center justify-center align-middle h-12 py-2 px-10 rounded-xl">
                                                    <img src="../../../assets/images/icon-edit.png" alt="edit" class="content-center">
                                                    <span class="font-medium text-lg text-white content-center">Ubah</span>
                                                </button>
                                            </RouterLink>
                                        </div>
                                    </div>
                                </div>
                        </form>
                        <button type="submit" @click="updateData"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 mt-16 mb-10 text-center">Simpan Data</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    created() {
        this.idStore = localStorage.getItem('idStore');
        this.idUser = localStorage.getItem('userId');
    },
    data(){
        return {
            idUser: '',
            idStore: '',
            idDistrict: '',
            idSubDistrict: '',
            user: {},
            districts: [],
            subdistricts: [],
            postalCode: [],
            model: {
                user: {
                    name: '',
                    email: '',
                    birthDate: '',
                    birthPlace: '',
                    phoneNumber: '',
                    sex: '',
                    addressDetail: '',
                    idSubDistrict: '',
                    idDistrict: '',
                    postalCode: '',
                    profileImg: '',
                },
            }
        }
    },
    mounted(){
        const userId = localStorage.getItem('userId');
        console.log('userId from localStorage:', userId);  // Debug log
        this.userId = this.$route.params.id;
        console.log('userId from route params:', this.userId);
        if (userId) {
            this.getUserData(userId);
        }
        this.idStore = localStorage.getItem('idStore');
        this.fetchDistricts();
        // Check if idDistrict and idSubDistrict exist before calling fetchSubDistricts and fetchPostalCode
        if (this.model.user.idDistrict) {
            this.fetchSubDistricts(this.model.user.idDistrict);
        }
        if (this.model.user.idSubDistrict) {
            this.fetchPostalCode(this.model.user.idSubDistrict);
        }
    },
    components: {
        DashboardSidebarNavigation,
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route); // Navigasi ke route tertentu
        },
        fetchDistricts() {
            axios.get('http://127.0.0.1:8000/api/districts')
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('API Response:', res.data.data); // Debug log
                        this.districts = res.data.data;
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching districts:', err);
                });
        },
        fetchSubDistricts(idDistrict) {
            axios.get(`http://127.0.0.1:8000/api/subdistricts/${idDistrict}`)
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('Subdistricts API Response:', res.data.data); // Debug log
                        this.subdistricts = res.data.data; // Assign data to subdistricts array
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching subdistricts:', err);
                });
        },
        fetchPostalCode(idSubDistrict) {
            axios.get(`http://127.0.0.1:8000/api/postalCode/${idSubDistrict}`)
                .then(res => {
                    if (res.data && res.data.success) {
                        console.log('Postal Codes API Response:', res.data.postalCode); // Debug log
                        this.postalCode = [res.data.postalCode]; // Assign postal code data
                    } else {
                        console.error('Invalid API response:', res);
                    }
                })
                .catch(err => {
                    console.error('Error fetching postal code:', err);
                });
            },
            getUserData(idUser) {
                axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(res => {
                    if (res.data.data) {
                        this.model.user = res.data.data; // Populate the model with the response data
                        if (this.model.user.idDistrict) {
                            this.fetchSubDistricts(this.model.user.idDistrict); // Fetch subdistricts if a district is selected
                        }
                        if (this.model.user.idSubDistrict) {
                            this.fetchPostalCode(this.model.user.idSubDistrict); // Fetch postal codes if a subdistrict is selected
                        }
                    } else {
                        console.error('User data not found:', res);
                    }
                    console.log('Nama:', this.model.user.name);
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                });
            },
            handleFileChange(event) {
                const file = event.target.files[0]; // Ambil file pertama yang dipilih
                if (file) {
                    console.log('File selected:', file);
                    this.model.user.profileImg = file; // Simpan ke model
                }
            },
            uploadFile() {
                // Jika diperlukan, Anda dapat memproses file secara manual di sini
                console.log('File ready for upload:', this.model.user.profileImg);
            },
        updateData() {
            if (!this.model.user.name || !this.model.user.sex || !this.model.user.birthPlace || !this.model.user.birthDate || !this.model.user.phoneNumber || !this.model.user.idDistrict || !this.model.user.addressDetail || !this.model.user.idSubDistrict || !this.model.user.postalCode) {
                alert('Harap isi semua kolom yang diperlukan.');
                return;
            }
            const userFormData = new FormData();
            userFormData.append('name', this.model.user.name);
            userFormData.append('sex', this.model.user.sex);
            userFormData.append('birthPlace', this.model.user.birthPlace);
            userFormData.append('birthDate', this.model.user.birthDate);
            userFormData.append('phoneNumber', this.model.user.phoneNumber);
            userFormData.append('idDistrict', this.model.user.idDistrict);
            userFormData.append('addressDetail', this.model.user.addressDetail);
            userFormData.append('idSubDistrict', this.model.user.idSubDistrict);
            userFormData.append('postalCode', this.model.user.postalCode);

            if (this.model.user.profileImg) {
                userFormData.append('profileImg', this.model.user.profileImg);
            }

            console.log('Update request to:', `http://127.0.0.1:8000/api/update/${this.userId}`);
            console.log('User data to update:', userFormData);
            console.log('File yang dikirim:', this.model.user.profileImg);

            for (let pair of userFormData.entries()) {
                console.log(pair[0] + ':', pair[1]); // Debugging
            }

            // Update user data
            axios.post(`http://127.0.0.1:8000/api/update/${this.userId}`, userFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => {
                alert('Data berhasil diperbarui.');
                this.$router.push({ name: 'profilDashboard' });
            }).catch(error => {
                console.error('Error updating profile data:', error);
                if (error.response) {
                    console.error('Response Data:', error.response.data);
                    console.error('Response Status:', error.response.status);
                    alert(error.response.data?.message || 'Terjadi kesalahan saat memperbarui data profil.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('Server tidak merespons, periksa koneksi Anda.');
                } else {
                    console.error('Request setup error:', error.message);
                    alert('Terjadi kesalahan dalam mengirim permintaan.');
                }
            });
        }
            },
    watch: {
        'model.user.idDistrict': function (newDistrictId) {
            if (newDistrictId) {
                this.fetchSubDistricts(newDistrictId); // Fetch subdistricts for the selected district
            } else {
                this.subdistricts = []; // Reset subdistricts if no district is selected
            }
        },
        'model.user.idSubDistrict': function (newSubDistrictId) {
            if (newSubDistrictId) {
                this.fetchPostalCode(newSubDistrictId); // Fetch postal codes for the selected subdistrict
            } else {
                this.postalCode = []; // Reset postal codes if no subdistrict is selected
            }
        }
    },
};
</script>
