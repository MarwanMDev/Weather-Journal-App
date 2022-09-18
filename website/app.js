/*
 * Global Variables
 */
// Personal API Key and baseURL for OpenWeatherMap API
const apiKey = '&appid=1f1824fab2cff790c7c89aaff3bffc0c&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Generate button element
const generateButton = document.getElementById('generate');
// Required span element
const requiredSpan = document.getElementById('requiredSpan');
// Spinner element
const spinner = document.getElementById('spinner');
// Temperature element
const temperatureElement = document.getElementById('temp');
// Content element
const contentElement = document.getElementById('content');
// Date element
const dateElement = document.getElementById('date');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
/*
 * End Global Variables
 */

/*
 * Event Listeners
 */
// Event listener to add performAction function to generate button element
generateButton.addEventListener('click', performAction);
/*
 * End Event Listeners
 */

/*
 * Main Functions
 */
// Function called by event listener
function performAction(e) {
  const zipCode = document.getElementById('zip');
  const feelings = document.getElementById('feelings');

  // Check if zip code input has value
  if (zipCode.value) {
    // Update elements style
    zipCode.classList.remove('required');
    requiredSpan.style.display = 'none';
    // Display spinner
    spinner.style.display = 'inline-block';
    // Run
    getWeatherByZipCode(baseURL, zipCode.value, apiKey).then((data) => {
      postData('/postData', {
        date: newDate,
        temp: data.main.temp,
        feel: feelings.value,
      }).then(retrieveData());
    });
  } else {
    zipCode.classList.add('required');
    requiredSpan.style.display = 'block';
    spinner.style.display = 'none';
    return;
  }
}

// Get weather data from openWeatherMap API by Zip code
const getWeatherByZipCode = async (url, zipCode, key) => {
  const response = await fetch(url + zipCode + key);
  try {
    const data = response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// Post request to add an entry to the project endpoint
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Retrieve all data and update user interface
const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    // retrieved data
    const allData = await request.json();
    // update interface
    temperatureElement.innerHTML =
      'Temperature: ' + Math.round(allData.temp) + ' degrees';
    allData.feel
      ? (contentElement.innerHTML = 'Feel: ' + allData.feel)
      : (contentElement.innerHTML = '');
    dateElement.innerHTML = 'Date: ' + allData.date;
    // hide spinner
    spinner.style.display = 'none';
  } catch (error) {
    console.log('error', error);
  }
};
/*
 * End Main Functions
 */
