import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import styles from './PlantGrowthChart.module.css';

const PlantGrowthChart = () => {
    const daysInMonth = 30;
    const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

    const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const rotatingOptions = [
        { label: 'แท่นปลูกแบบหมุน 1', value: 1 },
        { label: 'แท่นปลูกแบบหมุน 2', value: 2 },
    ];

    const normalOptions = [
        { label: 'แท่นปลูกแบบปกติ 1', value: 1 },
        { label: 'แท่นปลูกแบบปกติ 2', value: 2 },
    ];

    const dataByTray = {
        rotating: {
            length: Array.from({ length: daysInMonth }, (_, i) => 10 + i * 12),
            width: Array.from({ length: daysInMonth }, (_, i) => 5 + i * 6),
        },
        normal: {
            length: Array.from({ length: daysInMonth }, (_, i) => 8 + i * 9),
            width: Array.from({ length: daysInMonth }, (_, i) => 4 + i * 4),
        }
    };

    const [rotatingCount, setRotatingCount] = useState(1);
    const [normalCount, setNormalCount] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const chartTitleSuffix = `${monthNames[selectedMonth]} ${selectedYear}`;

    const sumData = (baseArray, count) =>
        baseArray.map(value => value * count);

    const lengthDatasets = [
        {
            label: `แท่นปลูกแบบหมุน ${rotatingCount}`,
            data: sumData(dataByTray.rotating.length, rotatingCount),
            fill: false,
            borderColor: '#29b6f6', 
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
        },
        {
            label: `แท่นปลูกแบบปกติ ${normalCount}`,
            data: sumData(dataByTray.normal.length, normalCount),
            fill: false,
            borderColor: '#ff9100', 
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
        }
    ];

    const widthDatasets = [
        {
            label: `แท่นปลูกแบบหมุน ${rotatingCount}`,
            data: sumData(dataByTray.rotating.width, rotatingCount),
            fill: false,
            borderColor: '#29b6f6', 
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
        },
        {
            label: `แท่นปลูกแบบปกติ ${normalCount}`,
            data: sumData(dataByTray.normal.width, normalCount),
            fill: false,
            borderColor: '#ff9100',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 5,
        }
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                onClick: null,
                labels: {
                    color: '#495057',
                    font: { size: 12, weight: '400', family: "'Kanit', sans-serif" }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'วันที่',
                    color: '#495057',
                    font: { size: 12, weight: '400', family: "'Kanit', sans-serif" }
                },
                ticks: {
                    color: '#495057',
                    font: { size: 11, family: "'Kanit', sans-serif" }
                },
                grid: { color: '#ebedef' }
            },
            y: {
                title: {
                    display: true,
                    text: 'ขนาด (มม.)',
                    color: '#495057',
                    font: { size: 12, weight: '400', family: "'Kanit', sans-serif" }
                },
                ticks: {
                    color: '#495057',
                    stepSize: 50,
                    beginAtZero: true,
                    font: { size: 11, family: "'Kanit', sans-serif" }
                },
                grid: { color: '#ebedef' }
            }
        }
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>กราฟการเจริญเติบโตของใบพืช</h3>

            {/* Tray Selection */}
            <div className={styles.dropdownContainer}>
                <div className={styles.dropdownWrapper}>
                    <div className={styles.dropdownItem}>
                        <Dropdown
                            value={rotatingCount}
                            options={rotatingOptions}
                            onChange={(e) => setRotatingCount(e.value)}
                            placeholder="เลือกแท่นปลูกแบบหมุน"
                        />
                    </div>
                    <div className={styles.dropdownItem}>
                        <Dropdown
                            value={normalCount}
                            options={normalOptions}
                            onChange={(e) => setNormalCount(e.value)}
                            placeholder="เลือกแท่นปลูกแบบปกติ"
                        />
                    </div>
                </div>
            </div>

            {/* Month & Year Picker */}
            <div className={styles.calendarWrapper}>
                <div className={styles.calendarItem}>
                    <Calendar
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.value)}
                        view="month"
                        dateFormat="MM yy"
                        placeholder="เลือกเดือนและปี"
                        className={styles.calendar}
                        readOnlyInput
                        showIcon
                    />

                </div>
            </div>

            {/* Charts */}
            <h4 className={styles.chartTitle}>ความยาวใบพืช - {chartTitleSuffix}</h4>
            <div className={styles.chartContainer}>
                <Chart type="line" data={{ labels, datasets: lengthDatasets }} options={chartOptions} />
            </div>

            <h4 className={styles.chartTitle}>ความกว้างใบพืช - {chartTitleSuffix}</h4>
            <div className={styles.chartContainer}>
                <Chart type="line" data={{ labels, datasets: widthDatasets }} options={chartOptions} />
            </div>
        </div>
    );
};

export default PlantGrowthChart;
