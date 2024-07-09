// default options for charts
let options = {
    default: {
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            }
        },
    },
    legendRight : {
        plugins: {
            legend: {
                display: true,
                position: 'right',
            }
        }
    },
    scales: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    autoSkip: false,
                },
            },
        },
    },
    elements: {
        elements: {
            arc: {
                borderWidth: 0
            }
        },

    },
};

// line chart
const trafficLineChart = new Chart(document.getElementById('traffic'), {
  type: 'line',
  data: {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [
      {
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1800, 2250, 1500, 2500],
        backgroundColor: 'rgba(213, 214, 236, 0.5)',
        fill: true,
        lineTension: 0.4,
      },
    ]
  },
  options: { ...options.default, ...options.scales },
});

// bar chart 
const dailyTrafficBarChart = new Chart(document.getElementById('daily'), {
    type: 'bar',
    data: {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [
        {
          data: [75, 115, 175, 135, 225, 200, 100],
          backgroundColor: "#7477BF",
          borderColor: '#686BAC',
          fill: true,
        },
      ]
    },
    options: { ...options.default, ...options.scales },
  });

// doughnut chart
  const mobileUsersChart = new Chart(document.getElementById('mobile'), {
    type: 'doughnut',
    data: {
      labels: ['Desktop', 'Tablet', 'Phones'],
      datasets: [ { data: [66, 16, 18], backgroundColor: [ '#7477BF', '#81C98F','#51B6C8'] } ]
    },
    options: { ...options.default, ...options.legendRight, ...options.elements },
  });

// generating random data
const generateRandom = ({ min, max, count }) => {
    let data = [];
    for (let i = 0; i < count; ++i) {
        data.push(Math. random() * (max - min) + min);
    }
    return data;
}

const generateData = () =>  generateRandom({ count: 11, min: 0, max: 2500 });

// event listeners for 
document.querySelector('section.reports').addEventListener('click', ({target : elemClicked}) => { 
    if (elemClicked.tagName === 'BUTTON') {
        document.querySelector('button.active').removeAttribute('class');
        trafficLineChart.data.datasets.forEach(dataset => {
            dataset.data = generateData();
          });
        trafficLineChart.update();
        elemClicked.classList.add('active');
    }
} );