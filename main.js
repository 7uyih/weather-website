const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")
const cityHide = document.querySelector(".city-hide")

search.addEventListener("click", () => {
    const APIKey = "dbbc54998e4d454113dba55ed997df2a"
    // console.log(APIKey);
    const city = document.querySelector(".search-box input").value;

    if (city === "")
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ar&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if (Number(json.cod) === 404) {
            cityHide.textContent = city;
            container.style.height = "400px";
            weatherBox.classList.remove("active");
            weatherDetails.classList.remove("active");
            error404.classList.add("active");
            return
        }

        // console.log(json)
        const image = document.querySelector(".weather-box img");
        const temp = document.querySelector(".weather-box .temp");
        const desc = document.querySelector(".weather-box .desc");
        const humi = document.querySelector(".weather-details .humi span");
        const wind = document.querySelector(".weather-details .wind span");

        if (cityHide.textContent == city) {
            return;
        }else {
            cityHide.textContent = city;
            container.style.height = "555px";
            container.classList.add("active");
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error404.classList.remove("active");

            // setTimeout(() => {
            //     container.classList.remove("active");
            // }, 2500);

            switch (json.weather[0].main) {
            case 'Clear':
                image.src = "source/images/clear.png";
                break;
                
            case 'Rain':
                image.src = "source/images/rain.png";
                break;
                
            case 'Snow':
                image.src = "source/images/snow.png";
                break;
                
            case 'Clouds':
                image.src = "source/images/cloud.png";
                break;

            case 'Mist':
                image.src = "source/images/mist.png";
                break;

            case 'Haze':
                image.src = "source/images/mist.png";
                break;

            default:
                image.src = 'source/images/cloud.png';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humi.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed * 10)}Km/h`;

        // document.querySelectorAll("#clone-info-weather, #clone-info-humi, #clone-info-wind").forEach(el => el.remove());


        const infoWeather = document.querySelector(".info-weather");
        const infoHumi = document.querySelector(".info-humi");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumi = infoHumi.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumi.id = "clone-info-humi";
        elCloneInfoHumi.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        // setTimeout(() => {
        //     infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather)
        //     infoHumi.insertAdjacentElement("afterend", elCloneInfoHumi)
        //     infoWind.insertAdjacentElement("afterend", elCloneInfoWind)
        // }, 2200);

        const cloneInfoWeather = document.querySelectorAll(".info-weather.active-clone");
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumi = document.querySelectorAll(".info-humi.active-clone");
        const cloneInfoHumiFirst = cloneInfoHumi[0];

        const cloneInfoWind = document.querySelectorAll(".info-wind.active-clone");
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
            cloneInfoWeatherFirst.classList.remove("active-clone");
            cloneInfoHumiFirst.classList.remove("active-clone");
            cloneInfoWindFirst.classList.remove("active-clone");

            setTimeout(() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumiFirst.remove();
                cloneInfoWindFirst.remove();
            }, 2200);
        }

    }
    })
})









