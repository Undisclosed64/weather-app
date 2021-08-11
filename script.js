//bismillah
//select necessary DOM elements
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('.search_btn');

//add event listener to search button
searchBtn.addEventListener('click', () => { 
    callAPI();
})
//call the api and handle response
 async function callAPI(){
//get search input value
const searchValue = searchInput.value;
const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=7632a408d6b0f55924e9958de6220968&q=${searchValue}`,{ mode: 'cors'});
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
        weatherDescription: data.weather[0]['description'],
        icon: data.weather[0]['icon']
     };
     console.log(dataObj);
/*console.log(data.main['temp'],data.main['feels_like'],data.main['humidity'],data.name,data.sys.country,data.weather[0]['description'],data.weather[0]['icon']);*/
}


