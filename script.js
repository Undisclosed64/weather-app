
//bismillah
//select necessary DOM elements
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search_btn');
const container = document.querySelector('.container');
const body = document.querySelector('body');
const rhs = document.querySelector('.section-rhs');

//add event listener to search button
searchBtn.addEventListener('click', () => { 
    callAPI()
})

//call the api and handle response
 async function callAPI(){
//get search input value
const searchValue = searchInput.value;
//request to api
const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=7632a408d6b0f55924e9958de6220968&q=${searchValue}&units=metric`,{ mode: 'cors'});

handleErr(response);
//return response body
const responseData = await response.json();
console.log(responseData); 

//call processFetchedData function 
processFetchedData(responseData);
  
};
showTime();
//simple err handle function
function handleErr(res){
  if(res.ok === false){
    alert('Please enter a valid city name')
        }
}
//filter the recieved data
 function processFetchedData(data){
   //return an obj with required weather data
     const dataObj = {
        temp: data.main['temp'],
        feelsLike: data.main['feels_like'],
        humidity: data.main['humidity'],
        locationName: data.name,
        weatherMain:data.weather[0]['main'],
        weatherDescription: data.weather[0]['description'],
        sunrise:data.sys.sunrise,
        sunset:data.sys.sunset,
        windSpeed:data.wind.speed,
        icon: data.weather[0],
        country:data.sys.country
     };
     //call fun to display data
     displayData(dataObj);

     //call func to handle weather change effct
     weatherChangeEffect(dataObj);
    }

    //func for displaying the data
    function displayData(location){
        //handle temperature
        const temperature = document.querySelector('.temperature');
         const tempDeg = document.querySelector('.tempDeg');
         temperature.innerText = Math.round(location.temp);
         temperature.appendChild(tempDeg);

         //handle location name
         const name = document.querySelector('.location');
         const dateField = document.querySelector('.date');
         name.innerText = location.locationName;
         name.appendChild(dateField)

         //handle weather info and appropriate icon
         const weatherInfo = document.querySelector('.weather-desc');
         let locationIcon = document.querySelector('.weather-icon');
         const {icon} = location.icon;
         locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
         weatherInfo.innerText = location.weatherMain;
    
         //handle weather details section(RHS)
         let feltTemperatureDiv = document.querySelector('#feelsLike');
         const feltTemperature = Math.round(location.feelsLike);
         feltTemperatureDiv.innerHTML = `${feltTemperature} &degC`;
         
         const humidity = document.querySelector('#humidity');
         humidity.innerText = `${location.humidity}%`;
         
         const wind_speed = document.querySelector('#windSpeed');
         const wind_speed_ = Math.round(location.windSpeed);
         wind_speed.innerHTML = `${wind_speed_} km/h`;

         const desc = document.querySelector("#description");
         desc.innerText = location.weatherDescription;

         const country = document.querySelector("#country");
         country.innerText = location.country;
       
         const sunrise = document.querySelector('#sunrise');
         const sunriseTime = moment.unix(location.sunrise).format('HH:MM');
         sunrise.innerText = sunriseTime;

         const sunset = document.querySelector('#sunset');
         const sunsetTime = moment.unix(location.sunset).format('HH:MM')
         sunset.innerText = sunsetTime;   
};
function showTime() {
  const dateField = document.querySelector('.date');
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
  
  const amPm = hour >=12 ? "PM" : "AM";
  
  hour = hour %12 || 12;
  
  dateField.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${amPm}`;
  
  setTimeout(showTime, 1000);

}
function addZero(n) {
  return (parseInt(n,10) < 10 ? "0" : '') + n
}
 
//have some background change effect depending upon weather change
 function weatherChangeEffect(weather){
   //select weather status
   const weatherStatus = weather.weatherMain;

   //do some comparisons and change container bg depending upon that
   if(weatherStatus === 'Clear' || weatherStatus === 'Sunny'){
       container.style.backgroundImage = "url(./images/clear.jpeg)";
       container.style.backgroundPosition = "top";
       body.classList.add('bgClear');

   } else if(weatherStatus === 'Haze' || weatherStatus === 'Mist' || weatherStatus === 'Smoke'){
          container.style.backgroundImage = "url(./images/haze.jpg)";
          body.classList.remove('bgClear');

   } else if(weatherStatus === 'Clouds'){
    container.style.backgroundImage = "url(./images/cloudy.jpg)";
    body.classList.remove('bgClear');

   } else if(weatherStatus === 'Rain'){
     container.style.backgroundImage = "url(./images/rainy.jpg)";
     body.classList.remove('bgClear');
   }
 }
  

