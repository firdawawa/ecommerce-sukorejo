import { createRouter, createWebHistory } from 'vue-router';
import DashboardUMKM from '../views/dashboard/IndexDashboard.vue';
import Login from '../views/Login.vue';
import RegisterDashboard from '../views/dashboard/RegisterDashboard.vue';
import RegisterCust from '../views/ecommerce/RegisterCust.vue';
import Profil from '../views/dashboard/dashtoko/Profil.vue';
import EditProfil from '../views/dashboard/dashtoko/EditProfil.vue';
import UbahPassword from '../views/dashboard/dashtoko/UbahPassword.vue';
import Toko from '../views/dashboard/dashtoko/Toko.vue';
import EditToko from '../views/dashboard/dashtoko/EditToko.vue';
import ProdukList from '../views/dashboard/dashproduk/ProdukList.vue';
import ProdukDetail from '../views/dashboard/dashproduk/ProdukDetail.vue';
import TambahProduk from '../views/dashboard/dashproduk/TambahProduk.vue';
import EditProduk from '../views/dashboard/dashproduk/EditProduk.vue';
import IklanList from '../views/dashboard/dashiklan/IklanList.vue';
import IklanDetail from '../views/dashboard/dashiklan/IklanDetail.vue';
import TambahIklan from '../views/dashboard/dashiklan/TambahIklan.vue';
import EditIklan from '../views/dashboard/dashiklan/EditIklan.vue';
import ListPesananAktif from '../views/dashboard/dashriwayat/ListPesananAktif.vue';
import RiwayatPesanan from '../views/dashboard/dashriwayat/RiwayatPesanan.vue';
import DetailPesananAktif from '../views/dashboard/dashriwayat/DetailPesananAktif.vue';
import DetailRiwayatPesanan from '../views/dashboard/dashriwayat/DetailRiwayatPesanan.vue';
import ListToko from '../views/bumdes/bumdestoko/ListToko.vue';
import ProfilToko from '../views/bumdes/bumdestoko/ProfilToko.vue';
import ProfilPenjual from '../views/bumdes/bumdestoko/ProfilPenjual.vue';
import StatistikToko from '../views/bumdes/bumdestoko/StatistikToko.vue';
import ProdukToko from '../views/bumdes/bumdestoko/ProdukToko.vue';
import ProdukTokoDetail from '../views/bumdes/bumdestoko/ProdukTokoDetail.vue';
import RiwayatPenjualanToko from '../views/bumdes/bumdestoko/RiwayatPenjualanToko.vue';
import AllData from '../views/bumdes/bumdesoverview/AllData.vue';
import ThisMonth from '../views/bumdes/bumdesoverview/ThisMonth.vue';
import VerifikasiList from '../views/bumdes/bumdesverif/VerifikasiList.vue';
import VerifikasiDetail from '../views/bumdes/bumdesverif/VerifikasiDetail.vue';
import Home from '../views/ecommerce/Home.vue';
import WaitingPage from '../views/dashboard/WaitingPage.vue';
import EmptyToko from '../views/dashboard/dashtoko/EmptyToko.vue';
import RegisterToko from '../views/dashboard/dashtoko/RegisterToko.vue';
import ListTokoECommerce from '../views/ecommerce/ListTokoECommerce.vue';
import ListIklanECommerce from '../views/ecommerce/ListIklanECommerce.vue';
import ListIklanTokoECommerce from '../views/ecommerce/ListIklanTokoECommerce.vue';
import IklanDetailECommerce from '../views/ecommerce/IklanDetailECommerce.vue';
import ProdukDetailECommerce from '../views/ecommerce/ProdukDetailECommerce.vue';
import Cart from '../views/ecommerce/Cart.vue';
import RiwayatECommerce from '../views/ecommerce/RiwayatECommerce.vue';
import RiwayatSelesaiECommerce from '../views/ecommerce/RiwayatSelesaiECommerce.vue';
import RiwayatDiprosesECommerce from '../views/ecommerce/RiwayatDiprosesECommerce.vue';
import ProfilECommerce from '../views/ecommerce/ProfilECommerce.vue';
import EditProfilECommerce from '../views/ecommerce/EditProfilECommerce.vue';
import EditPasswordECommerce from '../views/ecommerce/EditPasswordECommerce.vue';
import DetailRiwayatECommerce from '../views/ecommerce/DetailRiwayatECommerce.vue';
import CheckoutOverviewECommerce from '../views/ecommerce/CheckoutOverviewECommerce.vue';
import TokoDetailECommerce from '../views/ecommerce/TokoDetailECommerce.vue';
import PembayaranECommerce from '../views/ecommerce/PembayaranECommerce.vue';
import RiwayatBelumBayarECommerce from '../views/ecommerce/RiwayatBelumBayarECommerce.vue';
import RiwayatDibatalkanECommerce from '../views/ecommerce/RiwayatDibatalkanECommerce.vue';
import SearchPageECommerce from '../views/ecommerce/SearchPageECommerce.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // GENERAL ------------------------------
        {
            path: '/login',
            name: 'login',
            component: Login,
        },

        // E-COMMERCE ---------------------------
        {
            path: '/register',
            name: 'registerEcommerce',
            component: RegisterCust,
        },
        {
            path: '/',
            name: 'homeEcommerce',
            component: Home,
        },
        {
            path: '/search',
            name: 'searchPage',
            component: SearchPageECommerce,
        },
        {
            path: '/toko',
            name: 'listTokoEcommerce',
            component: ListTokoECommerce,
        },
        {
            path: '/toko/:id/detail',
            name: 'tokoDetailEcommerce',
            component: TokoDetailECommerce,
        },
        {
            path: '/produk/:id/detail',
            name: 'produkDetailEcommerce',
            component: ProdukDetailECommerce,
        },
        {
            path: '/toko/:id/iklan',
            name: 'listIklanTokoECommerce',
            component: ListIklanTokoECommerce,
        },
        {
            path: '/iklan',
            name: 'listIklanEcommerce',
            component: ListIklanECommerce,
        },
        {
            path: '/iklan/:id/detail',
            name: 'iklanDetailEcommerce',
            component: IklanDetailECommerce,
        },
        {
            path: '/profil',
            name: 'profilEcommerce',
            component: ProfilECommerce,
        },
        {
            path: '/profil/:id/edit',
            name: 'editProfilEcommerce',
            component: EditProfilECommerce,
        },
        {
            path: '/profil/:id/password',
            name: 'editPasswordECommerce',
            component: EditPasswordECommerce,
        },
        {
            path: '/cart',
            name: 'cartEcommerce',
            component: Cart,
        },
        {
            path: '/checkout',
            name: 'checkoutOverviewEcommerce',
            component: CheckoutOverviewECommerce,
        },
        {
            path: '/payment',
            name: 'pembayaranEcommerce',
            component: PembayaranECommerce,
        },
        {
            path: '/riwayat',
            name: 'riwayatECommerce',
            component: RiwayatECommerce,
        },
        {
            path: '/riwayat/selesai',
            name: 'riwayatSelesaiECommerce',
            component: RiwayatSelesaiECommerce,
        },
        {
            path: '/riwayat/diproses',
            name: 'riwayatDiprosesECommerce',
            component: RiwayatDiprosesECommerce,
        },
        {
            path: '/riwayat/belumbayar',
            name: 'riwayatBelumBayarECommerce',
            component: RiwayatBelumBayarECommerce,
        },
        {
            path: '/riwayat/dibatalkan',
            name: 'riwayatDibatalkanECommerce',
            component: RiwayatDibatalkanECommerce,
        },
        {
            path: '/riwayat/detail/:id',
            name: 'detailRiwayatECommerce',
            component: DetailRiwayatECommerce,
        },
        // TOKO ---------------------------------
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardUMKM,
        },
        {
            path: '/dashboard/register',
            name: 'registerDashboard',
            component: RegisterDashboard,
        },
        {
            path: '/dashboard/waiting',
            name: 'waitingDashboard',
            component: WaitingPage,
        },
        {
            path: '/dashboard/profil',
            name: 'profilDashboard',
            component: Profil,
        },
        {
            path: '/dashboard/profil/:id/edit',
            name: 'editProfilDashboard',
            component: EditProfil,
        },
        {
            path: '/dashboard/profil/:id/editpassword',
            name: 'editPasswordDashboard',
            component: UbahPassword,
        },
        {
            path: '/dashboard/profil/emptytoko',
            name: 'EmptyTokoDashboard',
            component: EmptyToko,
        },
        {
            path: '/dashboard/profil/toko/register',
            name: 'RegisterTokoDashboard',
            component: RegisterToko,
        },
        {
            path: '/dashboard/profil/toko',
            name: 'TokoDashboard',
            component: Toko,
        },
        {
            path: '/dashboard/profil/toko/:id/edit',
            name: 'editTokoDashboard',
            component: EditToko,
        },
        {
            path: '/dashboard/produk',
            name: 'produkDashboard',
            component: ProdukList,
        },
        {
            path: '/dashboard/produk/:id/detail',
            name: 'produkDetailDashboard',
            component: ProdukDetail,
        },
        {
            path: '/dashboard/produk/add',
            name: 'produkTambahDashboard',
            component: TambahProduk,
        },
        {
            path: '/dashboard/produk/:id/edit',
            name: 'produkEditDashboard',
            component: EditProduk,
        },
        {
            path: '/dashboard/iklan',
            name: 'iklanDashboard',
            component: IklanList,
        },
        {
            path: '/dashboard/iklan/:id/detail',
            name: 'iklanDetailDashboard',
            component: IklanDetail,
        },
        {
            path: '/dashboard/iklan/add',
            name: 'iklanTambahDashboard',
            component: TambahIklan,
        },
        {
            path: '/dashboard/iklan/:id/edit',
            name: 'iklanEditDashboard',
            component: EditIklan,
        },
        {
            path: '/dashboard/history/aktif',
            name: 'PesananAktifDashboard',
            component: ListPesananAktif,
        },
        {
            path: '/dashboard/history',
            name: 'HistoryDashboard',
            component: RiwayatPesanan,
        },
        {
            path: '/dashboard/history/aktif/detail',
            name: 'detailPesananAktifDashboard',
            component: DetailPesananAktif,
        },
        {
            path: '/dashboard/history/detail/:id',
            name: 'detailRiwayatPesananDashboard',
            component: DetailRiwayatPesanan,
        },
        // BUMDES -------------------------------
        {
            path: '/bumdes/overview',
            name: 'overviewAllDataBumdes',
            component: AllData,
        },
        {
            path: '/bumdes/overview/month',
            name: 'overviewMonthBumdes',
            component: ThisMonth,
        },
        {
            path: '/bumdes/toko',
            name: 'listTokoBumdes',
            component: ListToko,
        },
        {
            path: '/bumdes/toko/:id/detail',
            name: 'profilTokoBumdes',
            component: ProfilToko,
        },
        {
            path: '/bumdes/toko/:id/profil',
            name: 'profilPenjualBumdes',
            component: ProfilPenjual,
        },
        {
            path: '/bumdes/toko/:id/statistik',
            name: 'statistikTokoBumdes',
            component: StatistikToko,
        },
        {
            path: '/bumdes/toko/:id/produk',
            name: 'produkTokoBumdes',
            component: ProdukToko,
        },
        {
            path: '/bumdes/toko/:id/produk/:idProduct/detail',
            name: 'detailProdukTokoBumdes',
            component: ProdukTokoDetail,
        },
        {
            path: '/bumdes/toko/:id/riwayat',
            name: 'riwayatTokoBumdes',
            component: RiwayatPenjualanToko,
        },
        {
            path: '/bumdes/verifikasi',
            name: 'verifikasiTokoBumdes',
            component: VerifikasiList,
        },
        {
            path: '/bumdes/verifikasi/:id/detail',
            name: 'detailVerifikasiTokoBumdes',
            component: VerifikasiDetail,
        },
    ],
});

export default router;