let form = document.querySelector("form");
let input = document.querySelector("input");
let temp = document.querySelector(".temp");
let place = document.querySelector(".time_location p");
let time = document.querySelector(".time_location span");
let condition = document.querySelector(".weather_condition span");
let conditionImage = document.querySelector(".weather_condition img");


form.addEventListener("submit", function(e) {
    e.preventDefault();  // it will prevent from page refresh after submitting the form
    let value = input.value;
    console.log(value);
    let apiUrl =
  'http://api.weatherapi.com/v1/current.json?key=b49e4a2927cf463dae131850231612&q='+value+'&aqi=no';

    fetch(apiUrl)
    .then(response => {
        // console.log(response);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let celsius = data.current.temp_c
        temp.innerText = celsius+"℃";
        place.innerText = data.location.name;
        time.innerText = data.location.localtime;
        condition.innerText = data.current.condition.text;
        let imgSrc = data.current.condition.icon;
        // console.log(imgSrc.substring(2));
        conditionImage.src = "https://"+imgSrc;
    })
    .catch(error => {
        // alert("Sorry for the inconvience, please try again with correct name")
        Swal.fire({
            title: "Wrong City!",
            text: "Please try again with correct name.",
            icon: "question"
          });
        console.log("Error", error);
    });
})