// DOM elements
const form = document.querySelector('form');
const fromPlace = document.querySelector('input[name="fromPlace"]');
const toPlace = document.querySelector('input[name="toPlace"]');
const date = document.querySelector('input[name="date"]');
const currentTime = Date.now() / 1000;
const resultSection = document.querySelector('#result-section');

// API Info
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "phucptit"; // Enter your userName credential
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitApiKey = '4c3a50cf079f4c078871dc67c40f5164'; // Enter your weather bit key
const pixabayAPIURL = "https://pixabay.com/api/?key=";
const pixabayApiKey = '41183605-eced4143edc9cdfed07c265a3'; // Enter your pixabay key

// Handle Submit
form.addEventListener('submit', submit);

function submit(e) {
    e.preventDefault();
    const fromPlaceValue = fromPlace.value;
    const toPlaceValue = toPlace.value;
    const dateValue = date.value;
    const timestamp = new Date(dateValue).getTime() / 1000;

    // Validate input
    Client.checkInput(fromPlaceValue, toPlaceValue);

    // Get GeoNames information
    getGeoNameInfo(geoNamesURL, toPlaceValue, username)
        .then((geoNameInfo) => {
            const cityLatitude = geoNameInfo.geonames[0].lat;
            const cityLongtitude = geoNameInfo.geonames[0].lng;
            return getWeatherBitInfo(cityLatitude, cityLongtitude);
        })
        .then((weatherBitInfo) => {
            const daysLeft = Math.round((timestamp - currentTime) / 86400);
            const weatherCondition = weatherBitInfo.data[15].temp * 9 / 5 + 32;
            return postData('http://localhost:8080/add', { fromPlaceValue, toPlaceValue, dateValue, weather: weatherCondition, daysLeft });
        })
        .then((userInfo) => {
            updatingUI(userInfo);
        });
}

// Fetch GeoNames information
const getGeoNameInfo = async (geoNamesURL, toPlaceValue, username) => {
    const res = await fetch(`${geoNamesURL}${toPlaceValue}&maxRows=10&username=${username}`);
    try {
        const cityData = await res.json();
        return cityData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

// Fetch WeatherBit information
const getWeatherBitInfo = async (cityLatitude, cityLongitude) => {
    const req = await fetch(`${weatherbitURL}lat=${cityLatitude}&lon=${cityLongitude}&key=${weatherBitApiKey}`);
    try {
        const weatherData = await req.json();
        return weatherData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

// Post data to the server
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            depCity: data.fromPlaceValue,
            arrCity: data.toPlaceValue,
            depDate: data.dateValue,
            weather: data.weather,
            daysLeft: data.daysLeft
        })
    });
    try {
        const userData = await req.json();
        return userData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

// Update UI with user data
const updatingUI = async (userData) => {
   // Unhide result section
   resultSection.classList.remove("hidden");
    
   // Fetch an image link from Pixabay
   const res = await fetch(`${pixabayAPIURL}${pixabayApiKey}&q=${userData.arrCity}+city&image_type=photo`);

   try {
       const imgLink = await res.json();
       const dateSplit = userData.depDate.split("_").reverse().join(" / ");

       // Update UI elements
       document.querySelector("#destination-img").setAttribute('src', imgLink.hits[0].webformatURL);
       document.querySelector("#city").innerHTML = userData.arrCity;
       document.querySelector("#date").innerHTML = dateSplit;
       document.querySelector("#days-left").innerHTML = userData.daysLeft;
       document.querySelector("#destination-weather").innerHTML = userData.weather;
   } catch (error) {
       console.log("error", error);
   }
};

// Exporting functions for external use
export { submit, getGeoNameInfo, getWeatherBitInfo, postData, updatingUI };