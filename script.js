function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const dayName = days[now.getDay()];
  const dateStr = `${dayName}, ${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  document.getElementById('date').textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock();

async function fetchWeather(city = "Vung Tau, VN") {
  const apiKey = "7d4c6ef369c5581c9b7a29b2614bffbf";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === 200) {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `
        <div id="weather" class="weather-container">
          <img id="weather-img" src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
          <div id="weather-info">
            ${data.name}:<br>
            ${data.weather[0].description}, ${data.main.temp}°C
          </div>
        </div>
      `;
    } else {
      document.getElementById("weather").textContent = "Không lấy được dữ liệu thời tiết.";
    }
  } catch {
    document.getElementById("weather").textContent = "Lỗi kết nối thời tiết.";
  }
}

fetchWeather();

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("sidenav").style.left = "-2px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("sidenav").style.left = "-305px";
}