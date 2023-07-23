import React, { useEffect, useState } from "react";
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
} from "chart.js";

import { Doughnut, Pie } from "react-chartjs-2";
import { CogSyncOutline } from "mdi-material-ui";
import { Scatter } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { options } from "numeral";

const GraphicAssessment = ({
  title,
  nilai,
  labels,
  legends,
  type = "bar-multiple",
  color = 0,
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

  const [colors, setColors] = useState([]);

  function getRandomColor() {
    var letters = "ABC".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
  }

  const data = {
    labels: labels,
    datasets: [],
  };

  const getListOfColor = () => {
    let list_colors = [];
    for (const x of Array(color).keys()) {
      const col = getRandomColor();
      list_colors.push(col);
    }

    setColors(list_colors);
  };

  useEffect(() => {
    getListOfColor();
    console.log(colors);
  }, []);

  if (type == "bar-multiple") {
    let i = 0;
    for (const n of nilai) {
      data.datasets.push({
        data: n,
        backgroundColor: colors[i],
        borderColor: colors[i],
        borderWidth: 1,
        label: labels[i],
      });

      i++;
    }
  }

  const plugins = {
    title: {
      display: true,
      text: title,
      color: "black",
      padding: {
        bottom: 35,
        top: 15,
      },
      font: {
        size: 20,
      },
    },
  };

  const getTypeChart = () => {
    if (type === "bar-multiple") {
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
                  max: 100,
                },
              },
              x: {
                ticks: {
                  font: {
                    size: 15,
                  },
                },
              },
            },
            plugins: {
              ...plugins,
              datalabels: {
                display: false,
              },
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  font: {
                    size: 15,
                  },
                  padding: 40,
                  generateLabels: () => {
                    return legends.map((data, i) => ({
                      text: `${data}`,
                      fillStyle: colors[i],
                      lineWidth: 0,
                    }));
                  },
                },
                onClick: function (event) {},
              },
            },
            maintainAspectRatio: false,
          }}
        />
      );
    }
  };

  return getTypeChart();
};

export default GraphicAssessment;
