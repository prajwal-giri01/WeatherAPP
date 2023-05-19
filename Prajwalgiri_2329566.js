
let myVar = setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  const clockElement = document.getElementById("clock");
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[d.getMonth()];
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdayName = weekdayNames[d.getDay()];
  const dateTimeString = ` ${monthName} ${d.getDate()}, ${d.getFullYear()}<br> ${weekdayName}`;
  clockElement.innerHTML = dateTimeString;
  


}

const defaultCity = "Cambridge";
const apiKey = "ca925ba0443f78b9c1b8d285bd03ebfa";

document.getElementById("FetchButton").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityname").value || defaultCity;
     
  const xhr = new XMLHttpRequest();
  const urll = "Prajwalgiri_2329566.php";
  const params = `cityname=${city}`;
  
  xhr.open("POST", urll, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          const response = xhr.responseText;
          console.log(response);
      }
  };
 xhr.send(params);


 
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)  

      
      
      const cityname = data.city.name;
      const countryCode = data.city.country;
      const windSpeed = data.list[0].wind.speed;;
      const humidity = data.list[0].main.humidity;
      const weatherIcon = data.list[0].weather[0].icon;
      const weatherDescription = data.list[0].weather[0].description;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
      const iconHtml = `<img src="${iconUrl}" alt="Weather icon">`;
      const temperature = data.list[0].main.temp.toFixed(1);
      const chancesOfRain = data.list[0].pop ;
      const feellike = data.list[0].main.feels_like;
      const max_temp= data.list[0].main.temp_max;
      const min_temp = data.list[0].main.temp_min;
      
      const html = `
      <div class="weather-container">
      <div class="location">
        <h1>${cityname},${countryCode}</h1>
      </div>
      <div class="current-weather">
        <div class="temperature">${temperature}°C</div>
        <div class="description">${weatherDescription} ${iconHtml}</div>
       
      </div>
      <div class="details">
        <div class="detail-item">
          <div class="detail-label">Feels like</div>
          <div class="detail-value">${feellike}°C</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Max Temperature</div>
          <div class="detail-value">${max_temp}°C</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Min Temperature</div>
          <div class="detail-value">${min_temp}°C</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Wind Speed</div>
          <div class="detail-value">${windSpeed} Km/h</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Humidity</div>
          <div class="detail-value">${humidity}%</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Chances of Rain</div>
          <div class="detail-value">${chancesOfRain}%</div>
        </div>
      </div>
    </div>
    
    
    `;
      const today = document.getElementById("today").innerHTML=html
      
      
    })


    
    .catch(error => console.log(error));
}

getWeather(defaultCity);


function open(){
  document.getElementById("section").style.display = "flex";
}

  

