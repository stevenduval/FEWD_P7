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

const switchReport = ({ target: elemClicked }) => {
  if (elemClicked.tagName === 'LI') {
    // get text content of clicked element
    let textContent = elemClicked.textContent === 'Hourly';
    // if clicked li is Hourly, use default data set, otherwise generate random
    let chartData = textContent ? [750, 1250, 1000, 2000, 1500, 1750, 1250, 1800, 2250, 1500, 2500] : generateRandom({ count: 11, min: 0, max: 2500 });
    trafficLineChart.data.datasets[0].data = chartData;
    // remove and set active class
    document.querySelector('li.active').removeAttribute('class');
    elemClicked.classList.add('active');
    //update chart
    trafficLineChart.update();
  }
}

// switch traffic on main report when clicked
document.querySelector('.reports.main').addEventListener('click', switchReport);

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
    let userError = document.querySelector('#user ~ div.error');
    // check if either field is empty
    if (!usernameVal || !messageVal || userError.textContent.length > 0) {
      // get fields to display error messages in
      const messageError = document.querySelector('#message ~ div.error');
      // set error messages
      if (!usernameVal) {
        userError.textContent = 'please select a valid user'
      } else if (usernameVal &&  userError.textContent.length === 0) {
        userError.textContent = '';
      }
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

// remove results ul from screen
const removeMemberSearch = () => document.querySelector('.results').replaceChildren();

// if result is clicked put it as input value
document.querySelector('.results').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' ) {
    let userInput =  document.getElementById('user');
    // set intput value
    userInput.value = e.target.textContent;
    // fire off input event so we know the value changed
    userInput.dispatchEvent(new Event('input'));
    // remove list from screen once an option is clicked
    removeMemberSearch();
  }
});

// search functionality for users
document.getElementById('user').addEventListener('input', (e) => {
  let inputVal = e.target.value;
  let members = [...document.querySelectorAll('.members .info-section1 h3')].map(member => member.textContent);
  let results = document.querySelector('.results');
  let ul = document.createElement('ul');
  
  // throw an error when input does not contain a member thats in the members array
  const userError = document.querySelector('#user ~ div.error');
  userError.textContent = (members.indexOf(inputVal) === -1) ? 'please select a valid user' : '';
 
  // clear results from page
  removeMemberSearch();
  // if input is empty exit the function
  if (!inputVal) { return false; }
  // loop through each member and find a match based on substring of member name to input
  for (let i = 0; i < members.length; i++) {
    if (members[i].substring(0, inputVal.length).toLowerCase() === inputVal.toLowerCase()) {
      let li = document.createElement('li');
      li.textContent = members[i];
      ul.appendChild(li);
    }
  }
  // only append ul if it has children aka matches
  if (ul.children.length > 0) { results.appendChild(ul); } 
});

// remove member search if document is clicked
document.addEventListener('click', removeMemberSearch);

// when save button is clicked, set all storage values
document.querySelector('button.save').addEventListener('click', (e)=> {
  let emailChecked = document.querySelector('#email').checked ? 1 : 0;
  let profileChecked = document.querySelector('#profile').checked ? 1 : 0;
  let getSelectedTime = document.querySelector('#timezone').selectedOptions[0].value;
  localStorage.setItem("email", emailChecked);
  localStorage.setItem("profile", profileChecked);
  localStorage.setItem("time", getSelectedTime);
});

// when DOM is loaded, check for storage and set it if present

document.addEventListener("DOMContentLoaded", () => {
  let emailChecked = localStorage.getItem("email");
  let profileChecked = localStorage.getItem("profile");
  let getSelectedTime = localStorage.getItem("time");
  if (emailChecked) { document.querySelector('#email').checked = +emailChecked; }
  if (profileChecked) { document.querySelector('#profile').checked = +profileChecked;}
  if (getSelectedTime) { document.querySelector('#timezone').value = getSelectedTime;}
});

// on cancel button click, clear session storage and reset all to default values
document.querySelector('button.cancel').addEventListener('click', (e)=> {
  localStorage.clear();
  document.querySelector('#email').checked = 0;
  document.querySelector('#profile').checked = 0;
  document.querySelector('#timezone').value = 'not';
});

// when notification image is clicked show drawer
document.querySelector('.notification img').addEventListener('click', (e) => {
  let notifications = document.querySelector('.drawer ul').children.length;
  // if there are notifications set the proper display value of the drawer
  if (notifications !== 0 ) {
    let drawer =  document.querySelector('.drawer');
    let drawerDisplay = window.getComputedStyle(drawer).getPropertyValue("display");
    drawer.style.display = (drawerDisplay === 'none') ? 'block' : 'none';
  }
});

// on click of drawer 
document.querySelector('.drawer').addEventListener('click', ({ target: elemClicked }) => {
  // if action to close is clicked
  if (elemClicked.className === 'action') { elemClicked.parentNode.remove(); }
  // if no notifications are left 
  let notifications = document.querySelector('.drawer ul').children.length;
  if (notifications === 0 ) {
    // remove green notification circle
    document.querySelector('span.new').remove();
    // set display to none
    document.querySelector('.drawer').style.display = 'none';
  }
});
