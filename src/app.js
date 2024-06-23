import "./style.css"

const dom = {
    prImg: document.querySelector("#primary_icon"),
    prTemp: document.querySelector("h1"),
    fahrenheit: document.querySelector(".fahrenheit"),
    time: document.querySelector("#time"),
    place: document.querySelector("#place")
}

function updateDom(weather, temp, fahrenheit, time, place) {
    dom.prTemp.textContent = temp
    dom.fahrenheit.textContent = "Fahrenheit: " + fahrenheit + "°F"
    dom.time.textContent = time
    dom.place.textContent = place
}

async function getWeather(place) {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=04e19b0ae95c4b9f8be55605242306&q=" + place.toLowerCase(), { mode: "cors" })
        const weather = await response.json()
        updateDom(weather.current.condition.text, weather.current.temp_c, weather.current.temp_f, weather.location.localtime.toString().split(" ")[0].replace(/-/g, '/'), place)
    } catch (error) {
        console.log("Invalid location!")
    }
}

getWeather("London")

document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault()
    const value = document.querySelector("input").value
    document.querySelector("input").value = ""
    getWeather(value)
})