//list Of Cities
let cities = [
  {
    arabicName: "بومرداس",
    name: "Boumerdes",
  },
  {
    arabicName: "الجزائر",
    name: "Alger",
  },
  {
    arabicName: "وهران",
    name: "Oran",
  },
];
//Loop And Fill in Select
for (let city of cities) {
  const content = `
    <option>${city.arabicName}</option>
    `;
  document.getElementById("cities").innerHTML += content;
}

//Add Aventlistiner Change in option
document.getElementById("cities").addEventListener("change", function () {
  let cityName = "";
  for (let city of cities) {
    if (city.arabicName == this.value) {
      cityName = city.name;
    }
  }
  getPrayerTimingsOfCity(cityName);
  document.getElementById("city").innerHTML = this.value;
});
//Function To Get Prayer Timings Of City
function getPrayerTimingsOfCity(cityName) {
  let params = {
    country: "DZ",
    city: cityName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      //Call Function To Fill
      fillTimeToPrayer("fajr-time", timings.Fajr);
      fillTimeToPrayer("chorouk-time", timings.Sunrise);
      fillTimeToPrayer("dohr-time", timings.Dhuhr);
      fillTimeToPrayer("asser-time", timings.Asr);
      fillTimeToPrayer("meghrb-time", timings.Maghrib);
      fillTimeToPrayer("ichaa-time", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      const date = weekday + " " + readableDate;
      document.getElementById("date").innerHTML = date;
      //console.log(weekday + " " + readableDate);
      //console.log(response.data.data.timings.Fajr);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Function to filling the time in Html p
function fillTimeToPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
