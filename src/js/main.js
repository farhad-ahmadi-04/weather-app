// variables
const searchInput = document.querySelector(".search-input>input");
const cityNameOutput = document.querySelector(".city-name ");
const cityWindOutput = document.querySelector(".city-wind ");
const cityTempOutput = document.querySelector(".city-temp");
const cityStatusOutput = document.querySelector(".city-status");
const searchIcone = document.querySelector(".search-icon");
const apiKey = "3045dd712ffe6e702e3245525ac7fa38" //keyapi

// event
searchIcone.onclick = result

// functions

/**
 * send request to weather service and get weather data from weather service
 */
function weather() {
    let city = searchInput.value
    // promise for have better contral on weather service response & use async function to wait for weather service response
    return new Promise(async (resolve, reject) => {
        let weather = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)).json();
        console.log(weather);
        if (weather.cod === 200) {
            resolve(weather)
        } else {
            reject(weather)
        }
    });
}
/**
 * contral the weather service response object with this function
 */
function result() {
    // if response is note error message then active {thisn} but if response is error message then active {catch}
    weather().then(data => {
        cityNameOutput.textContent = `city is ${data["name"]}.${data["sys"]["country"]}`
        cityWindOutput.textContent = `wind speed is ${data["wind"]["speed"]}`
        cityTempOutput.textContent = `temp is ${data["main"]["temp"]}`
        cityStatusOutput.textContent = `city status is ${data["weather"][0]["main"]}`
    }).catch((err) => {
        alert(err["message"])
        searchInput.value = ""
        cityNameOutput.textContent = "City Name"
        cityWindOutput.textContent = "wind"
        cityTempOutput.textContent = "temp"
        cityStatusOutput.textContent = "city-status"
    });
}