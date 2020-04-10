const https = require("https");

https.get(
  {
    hostname: "api.openweathermap.org",
    path:
      "/data/2.5/weather?q=pune&units=metric&appid=c891401213ef73c16b634270d608f050",
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
          text: "The Current Temperature in Pune is " + cityTemp + "°C",
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
