
//bismillah
//select necessary DOM elements
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search_btn');
const container = document.querySelector('.container');

//add event listener to search button
searchBtn.addEventListener('click', () => { 
    callAPI();
})
//call the api and handle response
 async function callAPI(){
//get search input value
const searchValue = searchInput.value;
const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=7632a408d6b0f55924e9958de6220968&q=${searchValue}&units=metric`,{ mode: 'cors'});
const responseData = await response.json();
console.log(responseData);    
processFetchedData(responseData);
};

 function processFetchedData(data){
     const dataObj = {
        temp: data.main['temp'],
        feelsLike: data.main['feels_like'],
        humidity: data.main['humidity'],
        locationName: data.name,
        rainChance: data.rain,
        weatherMain:data.weather[0]['main'],
        weatherDescription: data.weather[0]['description'],
        sunrise:data.sys.sunrise,
        sunset:data.sys.sunset,
        windSpeed:data.wind.speed,
        icon: data.weather[0]['icon']
     };
     createDOMElements(dataObj);
    }
    function createDOMElements(location){
        //select lhs,lhs content
        const lhs = document.querySelector('.lhs');
        const lhsContent = document.querySelector('.lhs-content');

        //handle temperature
        const temperature = document.querySelector('.temperature');
         const tempDeg = document.querySelector('.tempDeg');
         temperature.innerText = Math.round(location.temp);
         temperature.appendChild(tempDeg);

         //handle location name and date
         const name = document.querySelector('.location');
         const dateField = document.querySelector('.date');
         const date = new Date();
         const formatDate = `${moment(date).format("ddd,Do MMM,YY")}`;
         dateField.innerText = formatDate;
         name.innerText = location.locationName;
         name.appendChild(dateField)
         
         //handle weather info
         const weatherInfo = document.querySelector('.weather-desc');
         weatherInfo.innerText = location.weatherMain;

         //handle weather details section(RHS)
         let feltTemperatureDiv = document.querySelector('#feelsLike');
         const feltTemperature = Math.round(location.feelsLike);
         feltTemperatureDiv.innerHTML = `${feltTemperature} &degC`;
         
         const humidity = document.querySelector('#humidity');
         humidity.innerText = `${location.humidity}%`;
         
         const desc = document.querySelector("#description");
         desc.innerText = location.weatherDescription;
       
         const sunrise = document.querySelector('#sunrise');
         const sunriseTime = moment.unix(location.sunrise).format('HH:MM');
         sunrise.innerText = sunriseTime;

         const sunset = document.querySelector('#sunset');
         const sunsetTime = moment.unix(location.sunset).format('HH:MM')
         sunset.innerText = sunsetTime;   

         const wind_speed = document.querySelector('#windSpeed');
         const wind_speed_ = Math.round(location.windSpeed);
         wind_speed.innerHTML = `${wind_speed_} km/h`;
};
   
/*console.log(data.main['temp'],data.main['feels_like'],data.main['humidity'],data.name,data.sys.country,data.weather[0]['description'],data.weather[0]['icon']);*/

