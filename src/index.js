import "./styles.css";

async function fetchData(location) {
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=ZFK9GLTQ5MBCD8WXTWGW676MW&contentType=json`;
  try {
    const responseObj = await fetch(URL);
    if (!responseObj.ok) {
      throw new Error("Network response was not ok");
    }
    const responseJson = await responseObj.json();
    populate(responseJson);
  } catch (error) {
    console.log("Can't get the values");
    const errorDiv = document.querySelector(".errorDiv");
    errorDiv.textContent = "Can't get the desired location!";
  }
}

function populate(responseObj) {
  const errorDiv = document.querySelector(".errorDiv");
  const body = document.querySelector("body");
  errorDiv.textContent = "";
  const loadingDiv = document.querySelector(".loadingDiv");
  if (loadingDiv) {
    body.removeChild(loadingDiv);
  }
  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weatherContainer");
  const icon = document.createElement("img");
  const iconValue = responseObj.currentConditions.icon;
  console.log(iconValue);
  const locationDiv = document.createElement("div");
  const conditionDiv = document.createElement("div");
  const tempDiv = document.createElement("div");
  const windSpeedDiv = document.createElement("div");
  windSpeedDiv.textContent =
    "Wind Speed : " + responseObj.currentConditions.windspeed;
  conditionDiv.textContent = "Description : " + responseObj.description;
  tempDiv.textContent =
    "Temperature : " + responseObj.currentConditions.temp + "C";
  locationDiv.textContent = responseObj.resolvedAddress;
  weatherContainer.appendChild(locationDiv);
  weatherContainer.appendChild(tempDiv);
  weatherContainer.appendChild(conditionDiv);
  weatherContainer.appendChild(windSpeedDiv);
  body.appendChild(weatherContainer);
  return;
}

function domEventHandler() {
  const button = document.querySelector(".submitBtn");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const inputValue = document.querySelector("#loc");
    const location = inputValue.value;
    if (!location) return;
    fetchData(location);
    const body = document.querySelector("body");
    const oldContainer = document.querySelector(".weatherContainer");
    if (oldContainer) {
      body.removeChild(oldContainer);
    }
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loadingDiv");
    loadingDiv.textContent = "Loading....";
    body.appendChild(loadingDiv);
  });
}

domEventHandler();
