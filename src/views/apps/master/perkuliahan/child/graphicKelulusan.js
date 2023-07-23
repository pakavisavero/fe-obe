import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
} from 'chart.js';

import { Doughnut, Pie } from 'react-chartjs-2';
import { CogSyncOutline } from 'mdi-material-ui';
import { Scatter } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { options } from 'numeral';

const GraphicKelulusan = ({
    title,
    nilai,
    nilai2 = [],
    labels,
    type = 'doughnut',
    color = 0,
    colorBar = []
}) => {
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        Title,
        ChartDataLabels,
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement
    );

    function getRandomColor(size) {
        var colors = []
        var letters = 'ABCDEF'.split('');

        for (var a = 0; a < size; a++) {
            var color = '#'
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            if (colors.includes(color)) {
                i -= 1
            } else {
                colors.push(color)
            }
            color = '#'
        }

        return colors;
    }

    const listOfColor = getRandomColor(color)

    const data = {
        labels: labels,
        datasets: [
            {
                data: nilai,
                backgroundColor: listOfColor,
                borderColor: listOfColor,
                borderWidth: 1,
            },
        ],
    };

    if (type == 'bar-multiple') {
        const barColorExtra = getRandomColor(color)
        data.datasets[0].backgroundColor = colorBar[0]
        data.datasets[0].borderColor = colorBar[0]
        data.datasets[0].label = 'Lulus'
        data.datasets.push(
            {
                data: nilai2,
                backgroundColor: colorBar[1],
                borderColor: colorBar[1],
                borderWidth: 1,
                label: 'Remidi CPMK'
            },
        )
    }

    const plugins = {
        title: {
            display: true,
            text: title,
            color: '#526D82',
            font: {
                size: 24,
            }
        },
    }

    if (type !== 'bar') {
        plugins.datalabels = {
            display: false,
            formatter: (value) => {
                if (type !== 'bar') {
                    const amount = nilai.reduce((a, b) => a + b, 0)
                    if (value != 0) {
                        return parseFloat(value / amount * 100).toFixed(2) + '%';
                    }
                    return ''
                }
                return ''
            },
            align: 'center',
            font: {
                size: 18,
                family: 'Josefin Sans',
            }
        }

        plugins.legend = {
            labels: {
                boxHeight: 18,
                boxWidth: 18,
                font: {
                    size: 14,
                },
            },
        }
    }

    const getTypeChart = () => {
        if (type === 'doughnut') {
            return (
                <Doughnut
                    data={data}
                    options={{
                        responsive: true,
                        plugins: plugins,
                        maintainAspectRatio: false
                    }}
                />
            )
        } else if (type === 'pie') {
            return (
                <Pie
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            ...plugins,
                            plugins: plugins,
                        },
                        maintainAspectRatio: false
                    }}
                />
            )
        } else if (type === 'bar') {
            return (
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                ticks: {
                                    font: {
                                        size: 15,
                                    },
                                    max: 100
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 15
                                    }
                                }
                            }
                        },
                        plugins: {
                            ...plugins,
                            legend: {
                                display: false,
                            },
                            labels: {
                                font: {
                                    size: 18,
                                    family: 'Josefin Sans',
                                }
                            },
                            datalabels: {
                                display: false,
                                font: {
                                    size: 18,
                                    family: 'Josefin Sans',
                                }
                            },
                        },
                        maintainAspectRatio: false
                    }}
                />
            )
        } else if (type === 'bar-multiple') {
            return (
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                ticks: {
                                    font: {
                                        size: 15,
                                    },
                                    max: 100
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 15
                                    }
                                }
                            }
                        },
                        plugins: {
                            ...plugins,
                            datalabels: {
                                display: false,
                            },
                        },
                        maintainAspectRatio: false
                    }}
                />
            )
        } else if (type === 'scatter') {
            return (
                <Scatter
                    data={{
                        datasets: [
                            {
                                label: 'Persebaran Nilai',
                                data: nilai,
                                backgroundColor: '#F8B67B',
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        elements: {
                            point: {
                                radius: 6
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    font: {
                                        size: 15,
                                    },
                                },
                                title: {
                                    display: true,
                                    text: 'Nilai UTS',
                                    font: {
                                        size: 15
                                    },
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 15
                                    },
                                    suggestedMin: 0,
                                    beginAtZero: true
                                },
                                title: {
                                    display: true,
                                    text: 'Nilai UAS',
                                    font: {
                                        size: 15
                                    },
                                }
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: title,
                                color: '#526D82',
                                font: {
                                    size: 24,
                                }
                            },
                            datalabels: {
                                display: false,
                            },
                        }
                    }}
                />
            )
        }
    }

    return getTypeChart()
}


export default GraphicKelulusan