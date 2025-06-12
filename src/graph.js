import ApexCharts from "apexcharts";
import Chart from "chart.js/auto";


// Response from Backend.........................
const incomeData = {
    "income_X_axis": [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      ""
    ],
    "income_Y_axis": [
      32000,
      15000,
      20000,
      16000,
      22000,
      25000,
      18000,
      21000,
      13000,
      19000,
      17000,
      14000,
      12000,
      18000
    ]
  }
  






const series = [
  {
    name: "PRODUCT A",
    data: [
      44, 38, 51, 62, 49, 40, 47, 56, 58, 61, 50, 45, 39, 55, 53, 48, 60, 62,
      59, 57, 54, 49, 45, 41, 52, 58, 60, 63, 59, 55,
    ],
  },
  {
    name: "PRODUCT B",
    data: [
      23, 28, 20, 25, 29, 22, 30, 31, 26, 20, 19, 24, 27, 29, 25, 26, 22, 21,
      23, 28, 30, 32, 29, 27, 25, 26, 24, 23, 22, 20,
    ],
  },
  {
    name: "PRODUCT C",
    data: [
      15, 17, 19, 20, 21, 18, 22, 19, 21, 20, 19, 18, 17, 21, 20, 22, 23, 25,
      26, 24, 22, 21, 23, 24, 25, 26, 27, 28, 26, 25,
    ],
  },
  {
    name: "PRODUCT D",
    data: [
      11, 14, 12, 13, 15, 10, 9, 12, 13, 15, 14, 12, 10, 11, 13, 15, 17, 18, 16,
      14, 15, 16, 14, 12, 11, 13, 14, 15, 16, 17,
    ],
  },
];

const dates = [
  "01/01/2011 GMT",
  "01/02/2011 GMT",
  "01/03/2011 GMT",
  "01/04/2011 GMT",
  "01/05/2011 GMT",
  "01/06/2011 GMT",
  "01/07/2011 GMT",
  "01/08/2011 GMT",
  "01/09/2011 GMT",
  "01/10/2011 GMT",
  "01/11/2011 GMT",
  "01/12/2011 GMT",
  "01/13/2011 GMT",
  "01/14/2011 GMT",
  "01/15/2011 GMT",
  "01/16/2011 GMT",
  "01/17/2011 GMT",
  "01/18/2011 GMT",
  "01/19/2011 GMT",
  "01/20/2011 GMT",
  "01/21/2011 GMT",
  "01/22/2011 GMT",
  "01/23/2011 GMT",
  "01/24/2011 GMT",
  "01/25/2011 GMT",
  "01/26/2011 GMT",
  "01/27/2011 GMT",
  "01/28/2011 GMT",
  "01/29/2011 GMT",
  "01/30/2011 GMT",
];

var options = {
  series: series,
  chart: {
    type: "bar",
    height: 300,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: false,
    },
  },
  grid: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 10,
      borderRadiusApplication: "end", // 'around', 'end'
      borderRadiusWhenStacked: "all", // 'all', 'last'
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: "13px",
            fontWeight: 500,
          },
        },
      },
    },
  },
  xaxis: {
    type: "datetime",
    categories: dates,
  },
  legend: {
    show: false,
    position: "right",
    offsetY: 0,
  },
  fill: {
    opacity: 1,
  },
};

var TotalInceomGraph = new ApexCharts(
  document.querySelector("#TotalInceomGraph"),
  options
);
TotalInceomGraph.render();

//   >>>>>>>>>




//  large Income Overview Charts ......................
var options = {
  chart: {
    type: "area",
    height: "100%",
    width: "100%",
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    padding: 0,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,

    padding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0.7,
      stops: [0, 90, 100],
    },
  },
  series: [
    {
      name: "Income",
      data: incomeData.income_Y_axis,
    },
  ],
  xaxis: {
    categories: incomeData.income_X_axis,
    crosshairs: {
      show: true,
      stroke: {
        color: "#e0e0e0", // light mode vertical line
        width: 1,
        dashArray: 3,
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

var IncomeChart = new ApexCharts(
  document.querySelector("#IncomeGraph"),
  options
);
IncomeChart.render();
