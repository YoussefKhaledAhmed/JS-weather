/* variables to hold html objects */
let navBtns = document.querySelectorAll('.nav-btns');
let locationInput = document.getElementById('LocationInput');
let findBtn = document.getElementById('locationFindBtn');
let headFirstColumnDayName = document.querySelector('#head-1st-col .dayName');
let headFirstColumnDayDate = document.querySelector('#head-1st-col .dayDate');
let headSecondColumnDayName = document.querySelector('#head-2nd-col .dayName');
let headThirdColumnDayName = document.querySelector('#head-3rd-col .dayName');
let countryLocation = document.querySelector('#body-1st-col .location');
let currentTempDegree = document.querySelector('#body-1st-col .temp .degree');
let currentTempImg = document.querySelector('#body-1st-col .temp .temp-img img');
let currentCondition = document.querySelector('#body-1st-col .climate-status');
let currentHumidity = document.querySelector('#body-1st-col .weather-more-info .humidity .humidity-value');
let currentWindSpeed = document.querySelector('#body-1st-col .weather-more-info .wind .wind-value');
let currentWindDirection = document.querySelector('#body-1st-col .weather-more-info .wind-direction .wind-direction-value');
let forecastFirstIcon = document.querySelector('#body-2nd-col .temp-img-2nd img');
let forecastFirstMax = document.querySelector('#body-2nd-col .max-degree');
let forecastFirstMin = document.querySelector('#body-2nd-col .min-degree');
let forecastFirstCondition = document.querySelector('#body-2nd-col .climate-status');
let forecastSecondIcon = document.querySelector('#body-3rd-col .temp-img-2nd img');
let forecastSecondMax = document.querySelector('#body-3rd-col .max-degree');
let forecastSecondMin = document.querySelector('#body-3rd-col .min-degree');
let forecastSecondCondition = document.querySelector('#body-3rd-col .climate-status');


/* Class to hold weather info */
class currentWeatherInfoType {
    constructor(location , tempCelsius , humidity , condition , icon , windSpeed , windDirection , firstMaxTemp , firstMinTemp , firstCondition , firstIcon , secondMaxTemp , secondMinTemp , secondCondition , secondIcon , currentDate , forecastFirstDate , forecastSecondDate){
        this.location = location;
        this.tempCelsius = tempCelsius;
        this.humidity = humidity;
        this.condition = condition;
        this.conditionIcon = icon;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.forecastFirstMaxTemp = firstMaxTemp;
        this.forecastFirstMinTemp = firstMinTemp;
        this.forecastFirstCondition = firstCondition;
        this.forecastFirstIcon = firstIcon;
        this.forecastSecondMaxTemp = secondMaxTemp;
        this.forecastSecondMinTemp = secondMinTemp;
        this.forecastSecondCondition = secondCondition;
        this.forecastSecondIcon = secondIcon;
    }
};

/* array to store days names */
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* array to store month names */
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* API Key: */
let APIKey = '66a70c97bd6d495694600851241012';

// Get the full URL of the current page
const fullPath = window.location.pathname;
console.log('fullpath ->' , fullPath);


// Extract the current file name
const currentFile = fullPath.substring(fullPath.lastIndexOf('/') + 1);

/**
 * @TODO function to toggle the border and outline of 
 *       the navbar buttons
 */
let navBtnsClick = () =>{

    console.log('current file: ', currentFile);

    if(currentFile === "contact.html"){
        navBtns[4].classList.remove('list-items-default-color');
        navBtns[4].classList.add('list-items-clicked-color');
    }else{
        navBtns[0].classList.remove('list-items-default-color');
        navBtns[0].classList.add('list-items-clicked-color');
    }
}

/**
 * @TODO function to display the location weather 
 *       info.
 * @param {*} location 
 */
let getWeatherInfo = async (location = 'cairo') =>{
    try{
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${location}&days=4`);
        let data = await response.json();
        console.log(data);
        
        let info = {
            name: data.location.name,
            temp: data.current.temp_c,
            humidity: data.current.humidity,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            windSpeed: data.current.wind_kph,
            windDir: data.current.wind_dir,
            firstMaxtemp: data.forecast.forecastday[1].day.maxtemp_c,
            firstMintemp: data.forecast.forecastday[1].day.mintemp_c,
            firstCondition: data.forecast.forecastday[1].day.condition.text,
            firstConditionIcon: data.forecast.forecastday[1].day.condition.icon,
            secondMaxtemp: data.forecast.forecastday[2].day.maxtemp_c,
            secondMintemp: data.forecast.forecastday[2].day.mintemp_c,
            secondCondition: data.forecast.forecastday[2].day.condition.text,
            secondConditionIcon: data.forecast.forecastday[2].day.condition.icon
        };
        let currentWeatherInfo = new currentWeatherInfoType(...Object.values(info));
        displayWeatherInfo(currentWeatherInfo);
    }
    catch(err){
        console.log(err);
    }
}

let displayWeatherInfo = (currentWeatherInfo) =>{
    /* day name */
    const d = new Date();
    let day = d.getDay();

    /* day number */
    let dayNumber = d.getDate();

    /* month name */
    let monthName = months[d.getMonth()];

    /* Table first column */
    headFirstColumnDayName.innerHTML = weekday[day];
    headFirstColumnDayDate.innerHTML = dayNumber+monthName;
    countryLocation.innerHTML = currentWeatherInfo.location;
    currentTempDegree.innerHTML = currentWeatherInfo.tempCelsius+'&deg;C';
    currentTempImg.setAttribute('src' , currentWeatherInfo.conditionIcon);
    currentCondition.innerHTML = currentWeatherInfo.condition;
    currentHumidity.innerHTML = currentWeatherInfo.humidity + '%';
    currentWindSpeed.innerHTML = currentWeatherInfo.windSpeed + 'km/h';
    currentWindDirection.innerHTML = currentWeatherInfo.windDirection;

    /* Table second column */
    headSecondColumnDayName.innerHTML = weekday[day+1];
    forecastFirstIcon.setAttribute('src' , currentWeatherInfo.forecastFirstIcon);
    forecastFirstCondition.innerHTML = currentWeatherInfo.forecastFirstCondition;
    forecastFirstMax.innerHTML = currentWeatherInfo.forecastFirstMaxTemp + '&deg;C';
    forecastFirstMin.innerHTML = currentWeatherInfo.forecastFirstMinTemp + '&deg;C';

    /* Table third column */
    headThirdColumnDayName.innerHTML = weekday[day+2];
    forecastSecondIcon.setAttribute('src' , currentWeatherInfo.forecastSecondIcon);
    forecastSecondCondition.innerHTML = currentWeatherInfo.forecastSecondCondition;
    forecastSecondMax.innerHTML = currentWeatherInfo.forecastSecondMaxTemp + '&deg;C';
    forecastSecondMin.innerHTML = currentWeatherInfo.forecastSecondMinTemp + '&deg;C';
}

let locationInputClear = () =>{
    locationInput.value = null;
}

if(findBtn){
    findBtn.addEventListener('click' , function(){
        getWeatherInfo(locationInput.value);
        locationInputClear();
    });
}

if(locationInput){
    locationInput.addEventListener('keydown' , function(event){
        if(event.key === 'Enter'){
            getWeatherInfo(locationInput.value);
            locationInputClear();
        }
    });
}

navBtnsClick();
if(currentFile == "index.html"){
    getWeatherInfo('Cairo');
}