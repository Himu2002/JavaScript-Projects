// API key for OpenWeather API
const apiKey = "30ae4d784348b2a983016c024d708088";

// Base URL for fetching weather data in metric units
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting the search input, search button, and weather icon elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data for a given city
async function checkWeather(city) {
    // Fetch weather data from the API and convert response to JSON format
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    // Error handling for invalid city names
    if (response.status == 404) {
        // Show error message if city is not found
        document.querySelector(".error").style.display = "block"; 

        // Hide weather details if the previous data was shown
        document.querySelector(".weather").style.display = "none";
    } 
    else {
        // Extract data from the response
        var data = await response.json();

        // Log API response for debugging purposes
        console.log(data);

        // Display weather details in the UI
        document.querySelector(".city").innerHTML = data.name;             // Display city name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";  // Display temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";        // Display humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";            // Display wind speed

        // Change weather icon based on weather conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";     // Clouds icon
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";      // Clear sky icon
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";       // Rain icon
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";    // Drizzle icon
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";       // Mist icon
        }

        // Display the weather details container after data is loaded
        document.querySelector(".weather").style.display = "block";

        // Hide error message if data is successfully loaded
        document.querySelector(".error").style.display = "none";
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    // Check if the search box is empty before proceeding
    if (searchBox.value.trim() === "") {
        alert("⚠️ Please enter a city name!");  // Alert if the input is empty
        return;
    }

    // Call the checkWeather function with the entered city name
    checkWeather(searchBox.value.trim());
});
