const myChart = new Chart(document.getElementById('traffic'), {
  type: "line",
  data: {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [
      {
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1800, 2250, 1500, 2500],
        label: "Unfilled",
        backgroundColor: "rgba(213, 214, 236, 0.5)",
        fill: true,
        lineTension: 0.4,
      },
    //   {
    //     data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
    //     label: "Asia",
    //     borderColor: "#8e5ea2",
    //     fill: false
    //   },
    //   {
    //     data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
    //     label: "Europe",
    //     borderColor: "#3cba9f",
    //     fill: false
    //   },
    //   {
    //     data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
    //     label: "Latin America",
    //     borderColor: "#e8c3b9",
    //     fill: false
    //   },
    //   {
    //     data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
    //     label: "North America",
    //     borderColor: "#c45850",
    //     fill: false
    //   }
    ]
  },
  options: {
    plugins: {
        title: {
            display: true,
            color:'#000000',
            text: "TRAFFIC",
            align:'start',
        },
        legend: {
            display: false,
        }
    },
    scaleShowValues: true,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                autoSkip: false,
            },
        },
    },
  }
});
