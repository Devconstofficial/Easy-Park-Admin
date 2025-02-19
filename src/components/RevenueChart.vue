<template>
    <div class="chart-card">
        <div class="chart-header">
            <h3>Revenue</h3>
            <button class="menu-btn">⋮</button>
        </div>
        <div class="chart-container">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<style scoped>
.chart-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 100%;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
    padding-bottom: 8px;
}

.menu-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #718096;
    /* Muted gray */
}

.chart-container {
    height: 300px;
}
</style>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart Data
const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Revenue",
            data: [450, 200, 300, 150, 350, 270, 400], // Example data
            backgroundColor: "rgba(103, 114, 229, 1)", // Solid blue color
            borderWidth: 0, // No borders
            borderRadius: 20, // Rounded bars
            barThickness: 15, // Adjusted bar width
        },
    ],
};

// Chart Options (Fixed Y-axis Title)
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Revenue Amount", // Y-Axis Title
                color: "#2D3748", // Darker text color
                font: { size: 14, weight: "bold" },
                padding: { top: 10, bottom: 10 }, // Adds spacing
            },
            ticks: {
                color: "#A0AEC0", // Soft grey text
                font: { size: 12 },
            },
            grid: {
                drawBorder: false,
                color: "rgba(160, 174, 192, 0.1)", // Light grid
            },
        },
        x: {
            ticks: {
                color: "#2D3748", // Darker text
                font: { size: 12 },
            },
            grid: {
                display: false, // Remove X grid
            },
        },
    },
    plugins: {
        legend: {
            display: false, // Hide legend for minimal UI
        },
        tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker tooltips
            titleFont: { size: 14 },
            bodyFont: { size: 12 },
        },
    },
};
</script>
