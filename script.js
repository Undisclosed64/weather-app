
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
        countryName: data.sys.country,
        weatherMain:data.weather[0]['main'],
        weatherDescription: data.weather[0]['description'],
        icon: data.weather[0]['icon']
     };
     console.log(dataObj);
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

         //handle location name
         const name = document.querySelector('.location');
         name.innerText = location.locationName;
        /* const dateParent = document.querySelector('.date');
         console.log(dateParent);
         const date = new Date();
         dateParent.appendChild(date);*/
         
         //handle weather info
         const weatherInfo = document.querySelector('.weather-desc');
         weatherInfo.innerText = location.weatherMain;


       

   
};
   
/*console.log(data.main['temp'],data.main['feels_like'],data.main['humidity'],data.name,data.sys.country,data.weather[0]['description'],data.weather[0]['icon']);*/

