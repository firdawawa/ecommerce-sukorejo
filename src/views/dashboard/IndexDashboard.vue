    <template>
        <div>
            <DashboardSidebarNavigation />
            <div class="flex-1 ml-1/4">
                <div class="bg-white px-2 py-4 mx-5 -mt-2 mb-4 rounded-xl h-full">
                    <div class="flex justify-between">
                        <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                            Statistik Penjualan
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4">
                            <div class="text-font">Produk Terjual</div>
                            <!-- INI YANG DIUBAH -->
                            <div class="text-secondary font-bold text-4xl">{{ totalSold }}</div>
                        </div>
                        <div class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4">
                            <select v-model="selectedMonth" @change="fetchSalesData" class="border rounded px-4 py-2">
                                <option v-for="(month, index) in months" :key="index" :value="index + 1">
                                    {{ month }}
                                </option>
                            </select>
    
                            <select v-model="selectedYear" @change="fetchSalesData" class="border rounded px-4 py-2">
                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="w-[90%] mx-auto mt-8 h-96">
                        <BarChart v-if="chartData" :chartData="chartData" />
                        <p v-else class="text-gray-500">Memuat data...</p>
                    </div>
                    <div class="flex justify-between mt-12">
                        <div class="font-bold text-2xl mt-4 mb-4 text-font ml-10">
                            Statistik Pendapatan
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex gap-8 ml-10 mt-4 border-2 rounded-xl w-fit px-8 py-4">
                            <div class="text-font">Total Pendapatan</div>
                            <div class="text-secondary font-bold text-4xl">Rp {{ totalIncome }}</div>
                        </div>
                        <div class="flex gap-4 ml-10 mr-8 border-2 rounded-xl w-fit px-8 py-4">
                            <select v-model="selectedMonth" @change="fetchIncomeData" class="border rounded px-4 py-2">
                                <option v-for="(month, index) in months" :key="index" :value="index + 1">
                                    {{ month }}
                                </option>
                            </select>
        
                            <select v-model="selectedYear" @change="fetchIncomeData" class="border rounded px-4 py-2">
                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="w-[90%] mx-auto mt-8 h-96">
                        <BarChart v-if="incomeChartData" :chartData="incomeChartData" />
                        <p v-else class="text-gray-500">Memuat data...</p>
                    </div>
                </div>
            </div>

        </div>
    </template>

    <script>
    import axios from 'axios';
    import { defineComponent, ref, onMounted } from 'vue';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';
    import { BarChart } from "vue-chart-3";
    import DashboardSidebarNavigation from '../../components/dashboard/SidebarNavigation.vue';

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);

    export default defineComponent({
        components: {
            DashboardSidebarNavigation,
            BarChart
        },
        setup() {
        const chartData = ref(null);
        const incomeChartData = ref(null);
        const bestSellingProducts = ref([]);
        const selectedMonth = ref(new Date().getMonth() + 1); // Default: bulan saat ini
        const selectedYear = ref(new Date().getFullYear()); // Default: tahun saat ini
        const months = ref([
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]);
        const years = ref([]);
        const totalSold = ref(0);
        const totalIncome = ref(0);
        const idStore = localStorage.getItem("idStore");
        
        // Generate tahun dari 2020 - 2030
        for (let i = 2020; i <= 2030; i++) {
            years.value.push(i);
        }

        const fetchSalesData = async () => {
            try {
                const token = localStorage.getItem("token");
                const idStore = localStorage.getItem("idStore");

                if (!idStore) {
                    console.error("idStore tidak ditemukan di localStorage");
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:8000/api/statistic-dailysales/${idStore}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { month: selectedMonth.value, year: selectedYear.value }
                });

                const sales = response.data;

                totalSold.value = sales.reduce((sum, item) => sum + Number(item.total_sold), 0);

                chartData.value = {
                    labels: sales.map(item => item.date),
                    datasets: [
                        {
                            label: "Total Produk Terjual",
                            backgroundColor: "#4A21C4",
                            data: sales.map(item => item.total_sold)
                        }
                    ]
                };
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        const fetchIncomeData = async () => {
            try {
                const token = localStorage.getItem("token");
                const idStore = localStorage.getItem("idStore");

                if (!idStore) {
                    console.error("idStore tidak ditemukan di localStorage");
                    return;
                }   

                const response = await axios.get(`http://127.0.0.1:8000/api/statistic-dailyincome/${idStore}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { month: selectedMonth.value, year: selectedYear.value }
                });

                const income = response.data;

                totalIncome.value = income.reduce((sum, item) => sum + Number(item.total_income), 0);

                incomeChartData.value = {
                    labels: income.map(item => item.date),
                    datasets: [
                        {
                            label: "Total Pendapatan (Rp)",
                            backgroundColor: "#21C45A",
                            data: income.map(item => item.total_income)
                        }
                    ]
                };
            } catch (error) {
                console.error("Gagal mengambil data pendapatan:", error);
            }
        };

        const fetchBestSellingProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/statistic-best-selling/${idStore}`);
                bestSellingProducts.value = response.data.data;
            } catch (error) {
                console.error("Error fetching best-selling products:", error);
            }
        };

        onMounted(() => {
            fetchSalesData();
            fetchIncomeData();
            fetchBestSellingProducts();
        });

        return {
            chartData,
            incomeChartData,
            selectedMonth,
            selectedYear,
            months,
            years,
            totalSold,
            totalIncome, 
            fetchSalesData,
            fetchIncomeData,
            fetchBestSellingProducts
        };
    }
});
</script>