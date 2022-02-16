const date = document.querySelector(".date");
const prevision = document.querySelector(".previsions");


function geoFindMe() {

    async function success(position) {
        console.log("localisation réussi");
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      const ville = document.querySelector("h2");
      const image = document.querySelector(".image");
      const temps = document.querySelector('.description');
      const temperature = document.querySelector(".temperature");
      const humidite = document.querySelector(".humidite");
      const vent = document.querySelector(".vent");
      const img1 = document.querySelector(".img1");
      const img2 = document.querySelector(".img2");
      const img3 = document.querySelector(".img3");
      const img4 = document.querySelector(".img4");
      const img5 = document.querySelector(".img5");
      const desc1 = document.querySelector(".desc1");
      const desc2 = document.querySelector(".desc2");
      const desc3 = document.querySelector(".desc3");
      const desc4 = document.querySelector(".desc4");
      const desc5 = document.querySelector(".desc5");
      
    await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=fr&exclude=hourly,daily&appid=47f02697dc0dd7c3eab316e0b1754c87`)
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        })
        .then(function(value1) {
            console.log(value1);
            let icon = value1.current.weather[0].icon
            image.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;
            temps.innerText = value1.current.weather[0].description;
            temperature.innerText = Math.round(value1.current.temp - 273.15) + "°" ;
            humidite.innerText = "Humidité :" + value1.current.humidity + "%";
            vent.innerText = "Vent :" + value1.current.wind_speed + "m/s";
            
        })
        .catch(function(err) {
            console.log(err);
        });

    await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=47f02697dc0dd7c3eab316e0b1754c87`)
      .then(function(res){
        if(res.ok){
          return res.json();
        }
      })
      .then(function(value2){
        let icon1 = value2.list[8].weather[0].icon;
        let icon2 = value2.list[16].weather[0].icon;
        let icon3 = value2.list[24].weather[0].icon;
        let icon4 = value2.list[32].weather[0].icon;
        let icon5 = value2.list[39].weather[0].icon;

        img1.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon1}@2x.png">`;
        img2.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon2}@2x.png">`;
        img3.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon3}@2x.png">`;
        img4.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon4}@2x.png">`;
        img5.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon5}@2x.png">`;
        desc1.innerText = Math.round(value2.list[8].main.temp - 273.15) + "°";
        desc2.innerText = Math.round(value2.list[16].main.temp - 273.15) + "°";
        desc3.innerText = Math.round(value2.list[24].main.temp - 273.15) + "°";
        desc4.innerText = Math.round(value2.list[32].main.temp - 273.15) + "°";
        desc5.innerText = Math.round(value2.list[39].main.temp - 273.15) + "°";
        console.log(value2)
        ville.innerText = value2.city.name
      })
     
      .catch(function(err){
        console.log(err);
      })
    }
      function error() {
      console.log("Géolocalisation impossible")
    }
  
    if (!navigator.geolocation) {
      console.log("Géolocalisation non supporté par votre navigateur")
    } else {
      console.log("En attente");
      navigator.geolocation.getCurrentPosition(success, error);
    }
         

    
}
geoFindMe()
setInterval(geoFindMe, 600000);


let heureChange = function(){

const heure = document.querySelector(".heure");
const jour2 = document.querySelector(".day2");
const jour3 = document.querySelector(".day3");
const jour4 = document.querySelector(".day4");
const jour5 = document.querySelector(".day5");

let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    });

let heureLocale = date1.toLocaleString('fr-FR',{
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
});

let jour = date1.getDay();
let jourSemaine = function(id){
  let week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  if((jour + id) > 6){
    return week[(jour + id) - 7];
  }else{
    return week[jour+id];
  }
}


date.innerText = dateLocale;
heure.innerText = heureLocale;
jour2.innerText = jourSemaine(2);
jour3.innerText = jourSemaine(3);
jour4.innerText = jourSemaine(4);
jour5.innerText = jourSemaine(5);

};

prevision.addEventListener('wheel', (evt) =>{
  evt.preventDefault();
  prevision.scrollLeft += evt.deltaY;
});

setInterval(heureChange, 1000);