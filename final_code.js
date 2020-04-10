const https = require("https");
// replace [Pune] to the city's weather which you want to show using the Bot
let city = "Pune";
// You can change [metric] to whatever you like to(as of now it returns Temperature in Celsius, read OpenWeather API Docs to know more.)
let units = "metric";
// Please add your own API Key below || Example: let appid = "YOUR_API_KEY"
let appid = "";

https.get(
  {
    hostname: "api.openweathermap.org",
    path: `/data/2.5/weather?q=${city}&units=${units}&appid=${appid}`,
  },
  function (res) {
    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        let parsedData = JSON.parse(rawData);
        // console.log(parsedData.main.temp.toString());
        let cityTemp = parsedData.main.temp.toString();
        let response = {
          text: "The Current Temperature in " + city + ` is ${cityTemp} °C`,
        };
        // console.log(response);
        render(response);
      } catch (e) {
        // console.error(e.message);
        let response = {
          text: "Sorry, something went wrong",
        };
        render(response);
      }
    });
  }
);
