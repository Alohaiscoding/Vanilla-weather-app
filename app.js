function displayTemperature(response) {
  console.log(response.data);
}
let apiKey = "508d54a034ao7702ct57a2eb3f9ba0acb";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Sydney&key=08d54a034ao7702ct57a2eb3f9ba0acb&units=metric";

axios.get(apiUrl).then(displayTemperature);
