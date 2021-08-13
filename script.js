
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
//console.log(response); 

//call processFetchedData function 
processFetchedData(responseData);
  
};
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

         //handle location name and  current date
         const name = document.querySelector('.location');
         const dateField = document.querySelector('.date');
         const date = new Date();
         const formatDate = `${moment(date).format("ddd,Do MMM,YY")}`;
         dateField.innerText = formatDate;
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

//have some background change effect depending upon weather change
 function weatherChangeEffect(weather){
   //select weather status
   const weatherStatus = weather.weatherMain;

   //do some comparisons and change container bg depending upon that
   if(weatherStatus === 'Clear' || weatherStatus === 'Sunny'){
       container.style.backgroundImage = "url(https://images.pexels.com/photos/1526713/pexels-photo-1526713.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)";
       container.style.backgroundPosition = "top"
       body.classList.add('bgClear');

   } else if(weatherStatus === 'Haze' || weatherStatus === 'Mist' || weatherStatus === 'Smoke'){
          container.style.backgroundImage = "url(https://images.unsplash.com/photo-1524262134826-05a36ba28ec4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)";
          body.classList.remove('bgClear');

   } else if(weatherStatus === 'Clouds'){
    container.style.backgroundImage = "url(https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)";
    body.classList.remove('bgClear');

   } else if(weatherStatus === 'Rain'){
     container.style.backgroundImage = "url(https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)";
     body.classList.remove('bgClear');
   }
 }
  

