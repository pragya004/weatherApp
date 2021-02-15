var submitButton = document.getElementById('submitButton');
var search = document.getElementById('search');

submitButton.addEventListener('click', fetchWeather);

var gotData = document.getElementById('gotData');
var hello = document.getElementById('hello');
var dropsSectionShowers = document.getElementById('drops-section-showers');
var stars = document.getElementById("stars");
var twinkling = document.getElementById("twinkling");
var clouds = document.getElementById("clouds");
var cloud = document.getElementById("cloud");
var snowfall = document.getElementById("snowfall");
var thunder = document.getElementById("thunder");
var theSun = document.getElementById("theSun");
var main1 = document.getElementById("main1");

var htmlplaceName = document.getElementById("placeName");
var htmltemp = document.getElementById("temp");
var htmlweatherName = document.getElementById("weatherName");
var htmlweatherImage = document.getElementById("weatherImage");
var htmlmaxmin = document.getElementById("maxmin");
var htmlhumidity = document.getElementById("humidity");
var htmlvisibility = document.getElementById("visibility");
var htmltime = document.getElementById("time");
var htmlcontent = document.getElementById("content");
var htmljoke = document.getElementById("joke");

var righth1 = document.getElementById("righth1");
var cardParentright = document.getElementById("cardParentright");

search.addEventListener("keyup", e => {
    if (e.code === "Enter") {
      e.preventDefault();
      submitButton.click();
    }
});

// hello.style.background = "linear-gradient(180deg, #38B0DE 0%, rgba(56, 176, 222, 0.23) 100%)";

function getWeather(code){
    if(code === "c"){
        return("./\images/\c.svg");
    }
    else if(code === "h"){
        return("./\images/\h.svg");
    }
    else if(code === "hc"){
        return("./\images/\hc.svg");
    }
    else if(code === "hr"){
        return("./\images/\hr.svg");
    }
    else if(code === "lc"){
        return("./\images/\lc.svg");
    }
    else if(code === "lr"){
        return("./\images/\lr.svg");
    }
    else if(code === "s"){
        return("./\images/\s.svg");
    }
    else if(code === "sl"){
        return("./\images/\sl.svg");
    }
    else if(code === "sn"){
        return("./\images/\sn.svg");
    }
    else {
        return("./\images/\t.svg");
    }
}

async function fetchWeather(e){
    e.preventDefault();
    var searchValue = search.value;

    try{   

        let data = await fetch(`https://proxy-server-weatherapi.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchValue}`);
        let json = await data.json();
        console.log(json);

        //if place is not found
        if(json.length === 0){
            cardParentright.style.display = "none";
            righth1.style.display = "block";
            righth1.innerText = "Sorry this place is invalid! Please try again.";
            hello.style.backgroundColor  = "";
            hello.style.background = "linear-gradient(to right top, #38B0DE,  rgba(56, 176, 222, 0.23));";
        }
        else{
            cardParentright.innerHTML = " ";
            
            var pcard = document.createElement("p");
            pcard.innerText = "Next 5 day's forecast";
            console.log("came here");

            cardParentright.appendChild(pcard);

            //getting details about that place
            let locData =  await fetch(`https://proxy-server-weatherapi.herokuapp.com/https://www.metaweather.com/api/location/${json[0].woeid}/`);
            let locDataJson = await locData.json();
            console.log(locDataJson);
            

            let currentTime = locDataJson.time.slice(11,19);
            var currentDate = locDataJson.time.slice(0,10);
            let code0 = locDataJson.consolidated_weather[0].weather_state_abbr;

            // setting today's data - 

            htmljoke.style.display = "none";

            htmlplaceName.innerText = searchValue;
            let currentTemp0 = Math.round(locDataJson.consolidated_weather[0].the_temp).toString();
            htmltemp.innerHTML = currentTemp0+'<span>&#176;</span>';
            htmlweatherName.innerText =  locDataJson.consolidated_weather[0].weather_state_name;
            htmlweatherImage.src = getWeather(code0);
            htmlmaxmin.innerHTML = Math.round(locDataJson.consolidated_weather[0].min_temp)+'<span>&#176;</span>'+" / "+Math.round(locDataJson.consolidated_weather[0].max_temp)+'<span>&#176;</span>';
            htmlhumidity.innerText = locDataJson.consolidated_weather[0].humidity;
            htmlvisibility .innerText= Math.round(locDataJson.consolidated_weather[0].visibility);
            htmltime.innerText = locDataJson.time.slice(11,19);            

            htmlcontent.style.display = "flex";

            
            // changing background according to time
            // snow and hail

            if(code0 === "sn" || code0 === "sl" || code0 === "h"){
 
                if(parseInt(currentTime) > 6 && parseInt(currentTime) <= 18){
                    dropsSectionShowers.style.visibility = "hidden";
                    theSun.style.visibility = "hidden";
                    stars.style.visibility = "hidden";
                    twinkling.style.visibility = "hidden";
                    clouds.style.visibility = "hidden";
                    cloud.style.visibility = "hidden";
                    thunder.style.visibility = "hidden";
                    snowfall.style.visibility = "visible";
                    hello.style.background = "url(snowday.jpg) center no-repeat";
                    hello.style.backgroundSize = "100% 100%";
                    
                }
                else{
                    dropsSectionShowers.style.visibility = "hidden";
                    theSun.style.visibility = "hidden";
                    stars.style.visibility = "hidden";
                    twinkling.style.visibility = "hidden";
                    clouds.style.visibility = "hidden";
                    cloud.style.visibility = "hidden";
                    thunder.style.visibility = "hidden";
                    hello.style.background = "none";
                    snowfall.style.visibility = "visible";
                    hello.style.background = "#000 url(snownight.jpg) center no-repeat";
                    hello.style.backgroundSize = "cover";
                }
            }

            //thunder
            else if(code0 === "t"){
                    dropsSectionShowers.style.visibility = "hidden";
                    stars.style.visibility = "hidden";
                    theSun.style.visibility = "hidden";
                    twinkling.style.visibility = "hidden";
                    clouds.style.visibility = "hidden";
                    cloud.style.visibility = "hidden";
                    hello.style.background = "none";
                    snowfall.style.visibility = "hidden";
                    thunder.style.visibility = "visible";
            }
            
            // night to mor
           
            else if(parseInt(currentTime) >= 0 && parseInt(currentTime) < 5){
                dropsSectionShowers.style.visibility = "hidden";
                stars.style.visibility = "hidden";
                theSun.style.visibility = "hidden";
                twinkling.style.visibility = "hidden";
                clouds.style.visibility = "hidden";
                cloud.style.visibility = "hidden";
                thunder.style.visibility = "hidden";
                snowfall.style.visibility = "hidden";
                hello.style.background = "none";
                stars.style.visibility = "visible";
                twinkling.style.visibility = "visible";
                clouds.style.visibility = "visible";
            }
            
            // evening to whole night
            
            else if(parseInt(currentTime) >= 19 && parseInt(currentTime) < 24){
                dropsSectionShowers.style.visibility = "hidden";
                stars.style.visibility = "hidden";
                theSun.style.visibility = "hidden";
                twinkling.style.visibility = "hidden";
                clouds.style.visibility = "hidden";
                cloud.style.visibility = "hidden";
                thunder.style.visibility = "hidden";
                snowfall.style.visibility = "hidden";
                hello.style.background = "none";
                stars.style.visibility = "visible";
                twinkling.style.visibility = "visible";
                clouds.style.visibility = "visible";
            }
            
            // evening
            
            else if(parseInt(currentTime) >= 16 && parseInt(currentTime) < 19){
                dropsSectionShowers.style.visibility = "hidden";
                theSun.style.visibility = "hidden";
                stars.style.visibility = "hidden";
                twinkling.style.visibility = "hidden";
                clouds.style.visibility = "hidden";
                cloud.style.visibility = "hidden";
                snowfall.style.visibility = "hidden";
                thunder.style.visibility = "hidden";
                hello.style.backgroundColor  = "";
                hello.style.background = "linear-gradient(180deg, #1b5972 0%, rgba(145, 95, 20, 0.527) 100%)";
            }
            
            // morning to evening
            
            else{

                dropsSectionShowers.style.visibility = "hidden";
                stars.style.visibility = "hidden";
                twinkling.style.visibility = "hidden";
                clouds.style.visibility = "hidden";
                cloud.style.visibility = "hidden";
                snowfall.style.visibility = "hidden";
                thunder.style.visibility = "hidden";
                snowfall.style.visibility = "hidden";
                hello.style.background = "";
                theSun.style.visibility = "visible";
                hello.style.background = "linear-gradient(to right top, #38B0DE,  rgba(56, 176, 222, 0.23))";
            }
            
            
            // changing weather - shower - light rain - heavy rain - light clod - heavy cloud - clear
            
            if(code0 === "s"){
                console.log('here');
                theSun.style.visibility = "hidden";
                dropsSectionShowers.style.visibility = "visible";
                changeNumDrops(200);
            }
            else if(code0 === "lr"){
                theSun.style.visibility = "hidden";
                dropsSectionShowers.style.visibility = "visible";
                changeNumDrops(400);
                console.log("lr")
            }
            else if(code0 === "hr"){

                theSun.style.visibility = "hidden";
                dropsSectionShowers.style.visibility = "visible";
                changeNumDrops(800);
            }
            else if(code0 === "lc" || code0 === "hc"){
                theSun.style.visibility = "hidden";
                cloud.style.visibility = "visible";
            }

            
            //details about the next 5 days
            locDataJson.consolidated_weather.map(item => {
                if(item.applicable_date !== currentDate){
                    let code = item.weather_state_abbr;
                    
                    var weatherImageDay = document.createElement('img');
                    weatherImageDay.src = getWeather(code);
                    weatherImageDay.style.height = "25px";
                    weatherImageDay.style.width = "25px";

                    var weatherStateName = document.createElement('p');
                    weatherStateName.innerText = item.weather_state_name;

                    var maxminDay = document.createElement('p');
                    maxminDay.innerHTML = Math.round(item.min_temp)+'<span>&#176;</span>'+" / "+Math.round(item.max_temp)+'<span>&#176;</span>';

                    var newItem = document.createElement('div');
                    newItem.className = "card";
                    newItem.appendChild(weatherImageDay);
                    newItem.appendChild(weatherStateName);
                    newItem.appendChild(maxminDay);
                    cardParentright.appendChild(newItem);
                }
            })
            righth1.style.display = "none";
            cardParentright.style.display = "flex";
        }
        
    }
    catch(err){
        console.log(err);

    }    
}


// applicable_date.innerText = `On ${item.applicable_date}`;
// humidity.innerText = `humidity - ${item.humidity}`;
// visibility.innerText = `visibility - ${Math.round(item.visibility)}`;
// weather_state_name.innerText = `weather - ${item.weather_state_name}`;