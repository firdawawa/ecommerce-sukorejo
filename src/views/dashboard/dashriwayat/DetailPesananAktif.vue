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
						<h2 class="font-bold text-2xl text-font">Detail Pesanan Aktif</h2>
                        <div class="flex mt-6 justify-between">
                            <div>
                                <span class="font-bold text-font text-lg mr-2">ID PESANAN:</span>
                                <span id="idpesanan" class="font-bold text-font text-lg">XXXXXXXXX</span>
                                <br>
                                <span id="timestamppesanan" class="text-md text-gray-500">1 November 2024 12.30</span>
                            </div>
                            <div>
                                <div class="flex border border-red-600 rounded-xl px-6 py-2 content-center justify-center items-center mr-8">
                                    <img src="../../../assets/images/icon-warning.png" alt="Warning" class="h-6 mr-2">
                                    <span class="text-red-600 text-lg mr-1">Kirim Sebelum</span>
                                    <span id="maxkirim" class="text-red-600 text-lg">5 November 2024</span>
                                </div>
                            </div>
                        </div>
						<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6 mr-6">
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
									<tr class="bg-white border-b hover:bg-gray-100">
										<th scope="row" class="p-6 font-medium"> 1 </th>
										<td class="p-6 w-3/6">
											<div class="flex gap-4 items-center">
												<span
													id="namaproduk"
													class="font-md text-font font-semibold"
													>Bento Cake 10cm</span
												>
											</div>
										</td>
                                        <td id="quantity" class="p-6">x1</td>
										<td id="price" class="p-6">Rp 35.000</td>
									</tr>
								</tbody>
							</table>
						</div>
                        <h2 class="font-bold text-2xl text-font mt-12">Informasi Pembeli</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div class="flex gap-10">
                            <div class="w-1/2">
                                <div class="text-font font-semibold text-lg">Pengiriman</div>
                                <div id="buyername" class="text-font font-normal text-md my-4">Siti Khadijah</div>
                                <div id="buyerphone" class="text-font font-normal text-md my-4">0811234567890</div>
                                <div id="buyeraddress" class="text-font font-normal text-md my-4">Perempatan Kartini, Jl Raya Gandusari - Kampak, Dusun Tugu RT 18 RW 09, Desa Sukorejo, Kec. Gandusari, Kab. Trrenggalek, Jawa Timur 66372</div>
                            </div>
                            <div class="w-1/2">
                                <div class="text-font font-semibold text-lg">Pembayaran</div>
                                <div id="transfermethod" class="text-font font-normal text-md my-4">Bank Rakyat Indonesia (BRI)</div>
                                <div id="buyerreknumber" class="text-font font-normal text-md my-4">6559 ********** 01</div>
                                <div class="text-font font-semibold text-lg mt-8">Pengantaran</div>
                                <div id="deliverymethod" class="text-font font-normal text-md my-4">Kurir Toko</div>
                            </div>
                        </div>
                        <h2 class="font-bold text-2xl text-font mt-12">Ringkasan Pesanan</h2>
                        <hr class="h-px my-4 mr-8 bg-gray-400 border-1">
                        <div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-bold text-lg text-font">Jumlah Item</div>
                                <div id="itemquantity" class="font-normal text-md text-font">x1</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-bold text-lg text-font">Subtotal Harga</div>
                                <div id="subprice" class="font-normal text-md text-font">Rp 35.000</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-bold text-lg text-font">Potongan</div>
                                <div id="discount" class="font-normal text-md text-font">Rp 0</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-bold text-lg text-font">Ongkos Kirim</div>
                                <div id="ongkir" class="font-normal text-md text-font">Rp 0</div>
                            </div>
                            <div class="flex justify-between mr-12 my-4">
                                <div class="font-bold text-2xl text-secondary">Total Harga</div>
                                <div id="totalprice" class="font-bold text-2xl text-secondary">Rp 35.000</div>
                            </div>
                        </div>
                        <button @click="openModal"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 my-6 text-center">Pesanan Dikirim</button>
                        <button type="submit" @click="navigateTo('')"  class="w-full text-gray-400 hover:bg-primary-700 border border-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-xl px-5 py-4 mb-10 text-center">Hubungi Bantuan</button>

                            <!-- Modal -->
                            <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div class="bg-white rounded-3xl shadow-lg py-14 px-10 w-[900px] relative">
                    
                                    <!-- Modal header -->
                                    <h2 class="text-3xl text-font font-bold mb-6">Konfirmasi Pengiriman Pesanan</h2>
                                    <hr class="h-px mb-6 bg-gray-400 border-1">

                                    <!-- Content inside modal -->
                                    <div class="flex justify-around">
                                        <div class="columns-2 w-full">
                                            <form class="" action="#">
                                                <div>
                                                    <label for="deliverymethod" class="block mb-2 justify-start text-left text-xl font-medium text-font">Metode Pengantaran</label>
                                                    <select id="deliverymethod" class="border border-gray-400 text-font placeholder-gray-400 text-md rounded-lg focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5">
                                                        <option selected>Pilih Metode</option>
                                                        <option value="Laki-laki">Kurir Toko</option>
                                                        <option value="Perempuan">Ekspedisi</option>
                                                        <option value="Perempuan">Diambil Pembeli</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label for="resi" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Nomor Resi</label>
                                                    <input type="text" name="resi" id="resi" class="border border-gray-400 text-font rounded-lg focus:ring-primary-600 focus:border-primary-600 block h-12 w-full p-2.5 bg-white placeholder-gray-400" placeholder="Masukkan Nomor Resi/Seri Pengiriman" required="">
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                            <form action="">
                                                <div class="w-1/2 pr-2">
                                                    <label for="buktikirim" class="block mb-2 mt-6 justify-start text-left text-xl font-medium text-gray-900">Bukti Pengiriman</label>
                                                    <button type="button" @click="up"  class="w-full text-primary bg-purple-200 border-dotted border-2 border-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-normal rounded-lg text-lg px-5 py-8 text-center">Unggah Media</button>
                                                    <span class="text-sm font-light text-gray-400">*Format media yang dapat diunggah adalah .jpeg, .jpg, .png, atau .pdf dengan ukuran maksimal 100MB.</span>
                                                </div>
                                            </form>
                                        </div>
                                    <div class="flex items-center gap-4 my-4">
                                        <input type="checkbox" class="h-5 w-5">
                                        <div class="">
                                            <h5 class="text-font text-lg font-semibold">Konfirmasi Data</h5>
                                            <h6 class="text-font text-md font-normal">Informasi dan data yang dimasukkan ke dalam formulir ini telah sesuai.</h6>
                                        </div>
                                    </div>
                                    <button type="submit" @click="navigateTo('/dashboard/history')"  class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center">Simpan Data</button>
                                    <button @click="closeModal"  class="w-full text-font border border-gray-300 hover:bg-primary hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-lg px-5 py-4 my-2 text-center">Batal</button>

                                    <!-- Close button -->
                                    <button @click="closeModal" class="absolute top-2 right-2 w-10 h-10 text-gray-500 text-xl hover:text-gray-700"> x
                                    </button>
                                </div>
                            </div>
                        </div>
					</div>
                    
				</div>
			</div>
		</div>
</template>

<script>
import DashboardSidebarNavigation from '../../../components/dashboard/SidebarNavigation.vue';

export default {
    data() {
    return {
        isModalOpen: false,
    };
    },
	components: {
		DashboardSidebarNavigation,
	},
	methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
		navigateTo(route) {
			this.$router.push(route); // Navigasi ke route tertentu
		},
	},
};
</script>
