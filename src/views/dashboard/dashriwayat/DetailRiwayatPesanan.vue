<template>
	<div>
		<DashboardSidebarNavigation />
		<div class="flex-1 ml-1/4">
			<div class="bg-white px-2 py-4 mx-5 -mt-2 mb-2 rounded-xl h-full">
				<div class="flex justify-between">
					<div class="font-bold text-2xl mt-4 text-font ml-10"> Riwayat </div>
				</div>
				<div class="mt-10 grid grid-cols-[17rem_1fr] divide-x-2">
					<!-- MINI NAV -->
					<div class="block w-56 m-6 -mt-2">
						<RouterLink
							to="/dashboard/history/aktif"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Pesanan Aktif</RouterLink
						>
						<RouterLink
							to="/dashboard/history"
							class="block text-lg text-font font-medium rounded-xl pl-4 pr-18 py-4 hover:bg-primary hover:text-white hover:font-bold"
							>Riwayat Pesanan</RouterLink
						>
					</div>

					<!-- CONTENT -->
					<div class="pl-8 items-center">
						<h2 class="font-bold text-2xl text-font">Detail Pesanan</h2>
						<div class="flex mt-6 justify-between">
							<div>
								<div class="text-2xl text-font font-bold"
									>Informasi Riwayat Pesanan</div
								>
								<span
									id="timestamppesanan"
									class="text-md text-gray-500"
									v-if="order"
									>{{ formatDate(order?.created_at) }}</span
								>
							</div>
							<div>
								<div
									id="orderstatus"
									class="text-font font-bold text-xl mr-10"
									v-if="order && order.status"
								>
									{{ order.status.label }}
								</div>
							</div>
						</div>
						<div
							class="relative overflow-x-auto shadow-md sm:rounded-lg my-6 mr-6"
						>
							<table class="w-full text-md text-left rtl:text-right text-font">
								<thead class="text-lg font-semibold text-white bg-primary">
									<tr>
										<th scope="col" class="px-6 py-4"> No </th>
										<th scope="col" class="px-6 py-4"> Produk </th>
										<th scope="col" class="px-6 py-4"> Jumlah </th>
										<th scope="col" class="px-6 py-4"> Harga </th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(item, index) in mergedOrderData"
										:key="item.product_id"
										class="bg-white border-b hover:bg-gray-100"
									>
										<th scope="row" class="p-6 font-medium">
											{{ index + 1 }}
										</th>
										<td class="p-6 w-3/6">
											<div class="flex gap-4 items-center">
												<img
													v-if="item.files?.length > 0"
													:src="getImageUrl(item.files[0])"
													alt=""
													class="h-12 w-12 object-cover rounded-lg"
												/>
												<div
													id="namaproduk"
													class="font-md text-font font-semibold"
													>{{ item.name }}</div
												>
											</div>
										</td>
										<td id="quantity" class="p-6">x{{ item.quantity }}</td>
										<td id="price" class="p-6" v-if="order && order.invoice"
											>Rp {{ this.order.invoice.subtotal_price }}</td
										>
									</tr>
								</tbody>
							</table>
						</div>
						<h2 class="font-bold text-2xl text-font mt-12"
							>Informasi Pembeli</h2
						>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div class="flex gap-10">
							<div class="w-1/2">
								<div class="text-font font-semibold text-lg">Pengiriman</div>
								<div
									id="buyername"
									class="text-font font-normal text-md my-4"
									v-if="order && order.order_address"
									>{{ maskText(this.order.order_address.name) }}</div
								>
								<div
									id="buyerphone"
									class="text-font font-normal text-md my-4"
									v-if="order && order.order_address"
									>{{ maskText(this.order.order_address.phone) }}</div
								>
								<div
									id="buyeraddress"
									class="text-font font-normal text-md my-4"
									v-if="order && order.order_address"
									>{{ maskText(this.order.order_address.detail_address) }},
									{{ maskText(subDistrict.subDistrictName) }},
									{{ maskText(district) }},
									{{ maskText(this.order.order_address.postal_code) }}</div
								>
							</div>
							<div class="w-1/2">
								<div class="text-font font-semibold text-lg">Pengantaran</div>
								<div
									id="deliverymethod"
									class="text-font font-normal text-md my-4"
									v-if="deliveryLabel"
									>{{ deliveryLabel }}</div
								>
							</div>
						</div>
						<h2 class="font-bold text-2xl text-font mt-12"
							>Ringkasan Pendapatan</h2
						>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font"
									>Subtotal Pendapatan</div
								>
								<div
									id="subprice"
									class="font-normal text-md text-font"
									v-if="order && order.invoice"
									>Rp {{ this.order.invoice.total_price }}</div
								>
							</div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font">Biaya Layanan</div>
								<div id="discount" class="font-normal text-md text-font"
									>Rp 0</div
								>
							</div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font">Potongan</div>
								<div id="discount" class="font-normal text-md text-font"
									>Rp 0</div
								>
							</div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font">Ongkos Kirim</div>
								<div id="ongkir" class="font-normal text-md text-font"
									>Rp 0</div
								>
							</div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-2xl text-secondary"
									>Total Pendapatan</div
								>
								<div
									id="totalprice"
									class="font-bold text-2xl text-secondary"
									v-if="order && order.invoice"
									>Rp {{ this.order.invoice.total_price }}</div
								>
							</div>
						</div>
						<h2 class="font-bold text-2xl text-font mt-12"
							>Informasi Pesanan</h2
						>
						<hr class="h-px my-4 mr-8 bg-gray-400 border-1" />
						<div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font">Pesanan Dibuat</div>
								<div
									id="timestamp-order"
									class="font-normal text-md text-font"
									v-if="order"
									>{{ formatDate(order?.created_at) }}</div
								>
							</div>
							<div class="flex justify-between mr-12 my-4">
								<div class="font-bold text-lg text-font">Pesanan Dibayar</div>
								<div
									id="timestamp-paid"
									class="font-normal text-md text-font"
									v-if="order"
									>{{ formatDate(order?.invoice.updated_at) }}</div
								>
							</div>
							<div
								v-if="order && order.status.id == 3"
								class="flex justify-between mr-12 my-4"
							>
								<div class="font-bold text-lg text-font">Pesanan Selesai</div>
								<div
									id="timestamp-done"
									class="font-normal text-md text-font"
									v-if="order"
									>{{ formatDate(order?.updated_at) }}</div
								>
							</div>
						</div>
						<button
							v-if="order && order.status.id == 2"
							@click="orderDelivered"
							class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 mb-4 mt-10 text-center"
						>
							Pesanan Telah Dikirim
						</button>
						<button
							type="submit"
							@click="navigateTo('')"
							class="w-full text-gray-400 hover:bg-primary-700 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 mb-10 text-center"
							>Hubungi Bantuan</button
						>
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
	created() {},
	data() {
		return {
			order_id: null,
			idStore: '',
			userId: '',
			invoice_id: null,
			order: null,
			user: null,
			product: null,
			orderData: '',
			district: '',
			subDistrict: '',
			idDistrict: '',
			idSubDistrict: '',
			deliveryLabel: '',
			// productId: '',
		};
	},
	components: {
		DashboardSidebarNavigation,
	},
	computed: {
		mergedOrderData() {
			if (!this.order || !this.order.order_item) {
				return []; // Pastikan tidak error jika order masih kosong
			}
			return this.order.order_item.map(orderItem => {
				const product =
					this.product && this.product.id === orderItem.product_id
						? this.product
						: null;
				return {
					...orderItem,
					name: product ? product.name : 'Produk Tidak Ditemukan',
					files: product ? product.files : [], // Jika ada gambar
				};
			});
		},
	},
	mounted() {
		this.order_id = this.$route.params.id;
		this.idStore = localStorage.getItem('idStore');

		this.user_id = localStorage.getItem('userId');
		if (this.user_id) {
			this.fetchUserData(this.user_id);
		}

		if (this.order_id) {
			this.fetchOrderData(this.order_id);
			this.fetchOrderData(this.order_id).then(() => {
				// Setelah order diambil, ambil delivery label berdasarkan delivery_id
				if (this.order?.delivery_id) {
					this.fetchDeliveryLabel(this.order.delivery_id);
				}
			});
		}

		if (this.productId) {
			this.fetchProductData();
		}
	},
	methods: {
		formatDate(dateString) {
			if (!dateString) return ''; // Jika tidak ada tanggal, kembalikan string kosong

			const months = [
				'Januari',
				'Februari',
				'Maret',
				'April',
				'Mei',
				'Juni',
				'Juli',
				'Agustus',
				'September',
				'Oktober',
				'November',
				'Desember',
			];

			const date = new Date(dateString);

			const day = date.getDate(); // Tanggal
			const month = months[date.getMonth()]; // Nama bulan
			const year = date.getFullYear(); // Tahun
			const hours = date.getHours().toString().padStart(2, '0'); // Jam (2 digit)
			const minutes = date.getMinutes().toString().padStart(2, '0'); // Menit (2 digit)

			return `${day} ${month} ${year} ${hours}:${minutes}`;
		},
		maskText(text) {
			if (this.order.status_id === 3) {
				return text.substring(0, 2) + '******';
			}
			return text;
		},
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
		async fetchOrderData(order_id) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}/order/${order_id}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${token}`,
						},
					},
				);
				console.log('Data Order:', response.data);
				this.order = response.data.data;

				this.orderData = this.order.order_item[0];
				this.productId = this.order.order_item[0].product_id;
				console.log('ID Product:', this.productId);

				if (this.productId) {
					this.fetchProductData(this.productId);
				}

				if (this.order.order_address.district) {
					this.getDistrict(this.order.order_address.district);
				}
				if (this.order.order_address.subdistrict) {
					this.getSubDistrict(this.order.order_address.subdistrict);
				}
			} catch (error) {
				console.error(
					'Gagal mengambil data invoice:',
					error.response ? error.response.data : error,
				);
			}
		},
		async fetchUserData(user_id) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					`https://api.isnunas.my.id/api/user/${user_id}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${token}`,
						},
					},
				);
				console.log('Data User:', response.data);
				this.user = response.data;
				console.log('Nama User:', this.user.data.name);
			} catch (error) {
				console.error(
					'Gagal mengambil data invoice:',
					error.response ? error.response.data : error,
				);
			}
		},
		getDistrict(idDistrict) {
			axios
				.get(`https://api.isnunas.my.id/api/districts/${idDistrict}`)
				.then(response => {
					console.log(response.data); // Periksa output di browser console
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
		getSubDistrict(idSubDistrict) {
			console.log('Fetching subdistrict with ID:', idSubDistrict);
			axios
				.get(`https://api.isnunas.my.id/api/subdistricts/data/${idSubDistrict}`)
				.then(res => {
					console.log('Subdistrict API Response:', res.data);
					if (res.data) {
						this.subDistrict = res.data;
						console.log(this.subDistrict.subDistrictName);
					} else {
						this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
					}
				})
				.catch(error => {
					console.error('Error fetching subdistrict data:', error);
					this.subDistrict = 'Data Kelurahan Tidak Ditemukan';
				});
		},
		async orderDelivered() {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					alert('Token tidak ditemukan. Silakan login ulang.');
					return;
				}
				if (!this.idStore) {
					alert(
						'idStore tidak ditemukan. Pastikan Anda sudah login sebagai seller.',
					);
					return;
				}
				console.log('Token:', token);
				const response = await axios.put(
					`https://api.isnunas.my.id/api/dashboard/store/${this.idStore}/order/${this.order_id}/status`,
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);

				alert(response.data.message);
				this.$router.push('/dashboard/history');
			} catch (error) {
				console.error('Error verifying store:', error);
				alert(
					error.response?.data?.message || 'Gagal mengubah status pesanan.',
				);
			}
		},
		async fetchProductData(productId) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					`https://api.isnunas.my.id/api/product/${productId}`,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${token}`,
						},
					},
				);
				console.log('Data Produk:', response.data);
				this.product = response.data.data;
				console.log('Nama Produk:', this.product.name);
			} catch (error) {
				console.error(
					'Gagal mengambil data invoice:',
					error.response ? error.response.data : error,
				);
			}
		},
		async fetchDeliveryLabel(delivery_id) {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					`https://api.isnunas.my.id/api/order-delivery/${delivery_id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				console.log('Data Delivery:', response.data);
				this.deliveryLabel = response.data.data.label; // Simpan label dari API ke variabel
			} catch (error) {
				console.error(
					'Gagal mengambil data delivery:',
					error.response ? error.response.data : error,
				);
			}
		},
		getImageUrl(file) {
			if (file && file.file) {
				console.log('File object:', file);
				return `https://api.isnunas.my.id/storage/${file.file}`;
			}
			return '/assets/images/no-image.png';
		},
		getImage(profileImg) {
			if (profileImg) {
				return `https://api.isnunas.my.id/storage/${profileImg}`;
			}
			return '../../../assets/images/no-image.png'; // Gunakan path relatif yang sesuai di folder public
		},
	},
};
</script>
