<template>
	<div>
		<BumdesSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-12 py-4 mx-5 -mt-2 mb-2 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl my-4 text-font"> Antrian Verifikasi Toko Baru</div>
					<!-- <div class="flex border border-gray-400 rounded-xl py-2 px-10 gap-3 mr-12 items-center">
						<img src="../../../assets/images/icon-filter.png" alt="Icon Filter">
						<span class="text-primary font-semibold text-xl">Filter</span>
					</div> -->
				</div>
				<!-- TOKO TABLE -->
                <div class="relative overflow-x-auto mr-8 shadow-md sm:rounded-lg">
                            <table class="w-full text-md text-left rtl:text-right text-font">
                                <thead class="text-lg font-semibold text-white bg-primary ">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">
                                            No 
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Nama Toko
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Nama Pemilik
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Kategori
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Tanggal Pendaftaran
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Tindakan
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(store, index) in store" :key="index" class="bg-white border-b hover:bg-gray-100">
                                        <th scope="row" class="px-6 py-2 font-medium">
                                            <RouterLink :to="{ path: '/bumdes/verifikasi/' + store.id + '/detail' }">
                                                {{ index + 1 }}
                                            </RouterLink>
                                        </th>
                                        <td id="store-name" class="px-6 py-2">
                                            <RouterLink :to="{ path: '/bumdes/verifikasi/' + store.id + '/detail' }">
                                                {{ store.storeName }}
                                            </RouterLink>
                                        </td>
                                        <td id="seller-name" class="px-6 py-2">
                                            <RouterLink :to="{ path: '/bumdes/verifikasi/' + store.id + '/detail' }">
                                                {{ users[store.idUser] ? users[store.idUser].name : 'Memuat...' }}
                                            </RouterLink>
                                        </td>
                                        <td id="category" class="px-6 py-2">
                                            <RouterLink :to="{ path: '/bumdes/verifikasi/' + store.id + '/detail' }">
                                                {{ getCategoryName(store.idCategory) }}
                                            </RouterLink>
                                        </td>
                                        <td id="regist-date" class="px-6 py-2">
                                            <RouterLink :to="{ path: '/bumdes/verifikasi/' + store.id + '/detail' }">
                                                {{ formatDate(store.created_at) }}
                                            </RouterLink>
                                        </td>
                                        <td class="px-6 py-2 text-center">
                                            <div class="flex gap-4">
                                                <button @click="verifStore" class="flex gap-4 bg-green-500 content-center justify-center align-middle py-4 px-4 rounded-full">
                                                    <img src="../../../assets/images/icon-check.png" alt="file" class="content-center w-4 h-4">
                                                </button>
                                                <button @click="deleteStore" class="flex gap-4 bg-red-500 content-center justify-center align-middle py-4 px-4 rounded-full">
                                                    <img src="../../../assets/images/icon-close.png" alt="file" class="content-center w-4 h-4">
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div id="noVerif" v-if="store.length === 0" class="text-2xl font-bold text-primary text-center align-middle my-72"> 
                                TIDAK ADA ANTRIAN VERIFIKASI TOKO
                            </div>
                        </div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import BumdesSidebarNavigation from '../../../components/bumdes/SidebarNavigation.vue';

export default {
    data(){
        return {
			categories: {},
            store: [],
            users: {}, // Objek untuk menyimpan biodata user berdasarkan idUser mereka
        }
    },
	mounted() {
		this.getCategories();
        this.getStore();
    },
	components: {
		BumdesSidebarNavigation,
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
        getCategories() {
			axios.get(`http://127.0.0.1:8000/api/categories`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(res => {
				// Simpan daftar kategori dalam objek, key = idCategory, value = categoryName
				this.categories = res.data.data.reduce((acc, category) => {
					acc[category.id] = category.categoryName;
					return acc;
				}, {});
			})
			.catch(error => {
				console.error("Error fetching categories:", error);
			});
		},
		getCategoryName(idCategory) {
			return this.categories[idCategory] || "Memuat...";
		},
		getUser(idUser) {
			// Cek apakah user sudah ada di objek users untuk menghindari pemanggilan API berulang
			if (this.users[idUser]) return;

			axios.get(`http://127.0.0.1:8000/api/user/${idUser}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(res => {
				// Gunakan spread operator agar Vue tetap reaktif
				this.users = { ...this.users, [idUser]: res.data.data };
			})
			.catch(error => {
				console.error("Error fetching user data:", error);
			});
		},
		getStore() {    
			axios.get(`http://127.0.0.1:8000/api/store`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`, 
				},
			})
			.then(res => {
				this.store = res.data.data.filter(store => store.verification === 0);
				this.store.forEach(store => {
					this.getUser(store.idUser); // Ambil data user pemilik toko
				});
			})
			.catch(error => {
				console.error("Error fetching store data:", error);
			});
		},
        async verifStore() {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/verification/${this.idStore}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                alert(response.data.message); // Menampilkan pesan sukses
                this.$router.push('/bumdes/verifikasi'); // Navigasi setelah verifikasi berhasil
            } catch (error) {
                console.error("Error verifying store:", error);
                alert("Gagal melakukan verifikasi toko.");
            }
        },
        async deleteStore() {
            if (!confirm("Apakah Anda yakin ingin menghapus toko ini?")) return;

            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/dashboard/store/${this.idStore}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                alert(response.data.message); // Menampilkan pesan sukses
                this.$router.push('/bumdes/verifikasi'); // Navigasi setelah toko dihapus
            } catch (error) {
                console.error("Error deleting store:", error);
                alert("Gagal menghapus toko.");
            }
        },
	},
};
</script>