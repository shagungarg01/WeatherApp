const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoText = document.querySelector(".info-text");
const inputField = document.querySelector(".input");
const locationBtn = document.querySelector("button");
const arrowBtn = document.querySelector(".arrow"); 
const wIcon = document.querySelector(".weather-part img");
inputField.addEventListener('keyup',function(e){
    if(e.key=="Enter" && inputField.value!=""){
        requestApi(inputField.value);
    }
});
locationBtn.addEventListener("click",function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }else{
        alert("Your browser not support geolocation api");
    }
})
function onSuccess(position){
    let apiKey = 'f32404c1c5f5650ce2d77e7c37255993';
    const{latitude,longitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function onError(position){
    infoText.innerText = error.message;
    infoText.classList.add("error");
}
function requestApi(city){
    let apiKey = 'f32404c1c5f5650ce2d77e7c37255993'; 
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    infoText.classList.replace("pending","error");
    if(info.cod=="404"){
        infoText.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const{feels_like,humidity,temp} = info.main;
        
        if(id==800){
            wIcon.src="clear.svg";
        }else if(id>=200 && id<=232){
            wIcon.src = "storm.svg";
        }else if(id>=600 && id<=622){
            wIcon.src = "snow.svg";
        }else if(id>=701 && id<=781){
            wIcon.src = "haze.svg";
        }else if(id>=801 && id<=804){
            wIcon.src = "cloud.svg";
        }else if(id>=300 && id<=321 || id>=500 && id<=531){
            wIcon.src = "rain.svg";
        }
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city} , ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoText.classList.remove("pending","error");
        wrapper.classList.add("active");
    }
}
arrowBtn.addEventListener('click',function(){
    wrapper.classList.remove("active");
})