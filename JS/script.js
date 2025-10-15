const apiKey = "0cc3c5a760f864ddf2d707edb12d1181";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".search-error").style.display = "block";
        document.querySelector(".weather-info").style.display = "none";
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "IMG/cloudy.png";
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "IMG/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "IMG/misty.png";
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "IMG/rainy.png";
        } else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "IMG/snow.png";
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "IMG/sunny.png";
        } 

        document.querySelector(".search-error").style.display = "none";
        document.querySelector(".weather-info").style.display = "block";
    }


}

searchButton.addEventListener("click", ()=> {
    getWeather(searchBox.value);
});

const translations = {
    pt: {
        input: "Digite o nome da cidade",
        error: "Nome da cidade inválido",
        humidity: "Umidade",
        speed: "Velocidade"
    },
    en: {
        input: "Enter city name",
        error: "Invalid city name",
        humidity: "Humidity",
        speed: "Speed"
    }
};

const langSwitcher = document.getElementById("lang-switcher");

const elements = {
    input: document.getElementById("input-label"),
    error: document.getElementById("error-label"),
    humidity: document.getElementById("hum-label"),
    speed: document.getElementById("speed-label")
};

function changeLanguage(lang) {
    const t = translations[lang];
    elements.input.placeholder = t.input;
    elements.error.textContent = t.error;
    elements.humidity.textContent = t.humidity;
    elements.speed.textContent = t.speed;
}

langSwitcher.addEventListener("change", (e) => {
    changeLanguage(e.target.value);
});

changeLanguage("pt");
