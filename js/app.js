// default options for charts
let options = {
  default: {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  },
  legendRight: {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            weight: 700,
          },
        },
      },
    },
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
        borderWidth: 0,
      },
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
        backgroundColor: 'rgba(116, 119, 191, 0.3)',
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
    datasets: [{ data: [66, 16, 18], backgroundColor: ['#7477BF', '#81C98F', '#51B6C8'] }]
  },
  options: { ...options.default, ...options.legendRight, ...options.elements, aspectRatio: 2 },
});

// generating random data
const generateRandom = ({ min, max, count }) => {
  let data = [];
  for (let i = 0; i < count; ++i) {
    data.push(Math.random() * (max - min) + min);
  }
  return data;
}

// event listeners to switch traffic report
document.querySelector('section.reports').addEventListener('click', ({ target: elemClicked }) => {
  if (elemClicked.tagName === 'LI') {
    document.querySelector('li.active').removeAttribute('class');
    trafficLineChart.data.datasets.forEach(dataset => {
      dataset.data = generateRandom({ count: 11, min: 0, max: 2500 });
    });
    trafficLineChart.update();
    elemClicked.classList.add('active');
  }
});

// remove alert bar from screen
document.querySelector('.alerts').addEventListener('click', ({ target: elemClicked }) => {
  if (elemClicked.className === 'action') {
    elemClicked.parentNode.remove();
  }
});

// on message submit
document.querySelector('.message').addEventListener('click', (e) => {
  if (e.target.type === "submit") {
    // prevent form from being truly submitted
    e.preventDefault();
    // get values of fields
    const usernameVal = document.getElementById('user').value;
    const messageVal = document.getElementById('message').value;
      // check if either field is empty
    if (!usernameVal || !messageVal) {
      // get fields to display error messages in
      const userError = document.querySelector('#user ~ div.error');
      const messageError = document.querySelector('#message ~ div.error');
      // set error messages
      userError.textContent = (!usernameVal) ? 'please select a user' : '';
      messageError.textContent = (!messageVal) ? 'please provide a message' : '';
      // break out of function because one of the fields are empty
      return false;
    }
    // get overlay
    const overlay = document.querySelector('.overlay');
    //set overlay display
    overlay.style.display = 'flex';
  }
});