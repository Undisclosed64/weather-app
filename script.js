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
};
