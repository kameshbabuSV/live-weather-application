const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app = express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
var cityarr=[];
var city_search;


app.get("/",function(req,res){
    var today = new Date();
    var currentday = today.getDay();
    var day="";
    if(currentday===0){
        day = "Sunday";
    }
    else if(currentday===1){
        day="Monday";
    }
    else if(currentday===2){
        day="Tuesday";
    }
    else if(currentday===3){
        day="Wednesday";
    }
    else if(currentday==4){
        day="Thursday";
    }
    else if(currentday===5){
        day="Friday";
    }
    else{
        day="Saturday";
    }
    const query="Madurai";
    const appid="9fc3494645d5c616d5e88ca1caca9044";
    const unit="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;//temperature
            const city = weatherdata.name;//cityname
            const icon = weatherdata.weather[0].icon;
            const main = weatherdata.weather[0].main;//description_main;
            const description = weatherdata.weather[0].description;
            const feelslike = weatherdata.main.feels_like;//feels_like
            const humidity = weatherdata.main.humidity;//humid
            const wind = weatherdata.wind.speed;//wind_speed
            const max_temp = weatherdata.main.temp_max;//man_temp
            const min_temp = weatherdata.main.temp_min;//mix_temp
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";//image
            res.render("index",{temperature:temp,cityname:city,description_main:main,feels_like:feelslike,humid:humidity,wind_speed:wind,mini_temp:min_temp,maxi_temp:max_temp,today:day,image:imageurl,desc:description});
        })
    })
})
app.post("/search",function(req,res){
    var today = new Date();
    var currentday = today.getDay();
    var day="";
    if(currentday===0){
        day = "Sunday";
    }
    else if(currentday===1){
        day="Monday";
    }
    else if(currentday===2){
        day="Tuesday";
    }
    else if(currentday===3){
        day="Wednesday";
    }
    else if(currentday==4){
        day="Thursday";
    }
    else if(currentday===5){
        day="Friday";
    }
    else{
        day="Saturday";
    }
    const query=req.body.location;
    const appid="9fc3494645d5c616d5e88ca1caca9044";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const result = weatherdata.message;
            if(result != "city not found"){
            const temp = weatherdata.main.temp;//temperature
            const city = weatherdata.name;//cityname
            const icon = weatherdata.weather[0].icon;
            const main = weatherdata.weather[0].main;//description_main;
            const description = weatherdata.weather[0].description;
            const feelslike = weatherdata.main.feels_like;//feels_like
            const humidity = weatherdata.main.humidity;//humid
            const wind = weatherdata.wind.speed;//wind_speed
            const max_temp = weatherdata.main.temp_max;//man_temp
            const min_temp = weatherdata.main.temp_min;//mix_temp
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";//image
            res.render("search",{temperature:temp,cityname:city,description_main:main,feels_like:feelslike,humid:humidity,wind_speed:wind,mini_temp:min_temp,maxi_temp:max_temp,today:day,image:imageurl,desc:description});
            }
            else{
                res.render("search",{temperature:0,cityname:"No Data Found",description_main:"",feels_like:0,humid:0,wind_speed:0,mini_temp:0,maxi_temp:0,today:"",image:"",desc:""});
            }   
        })
    })
})

app.listen(3000,function(){
    console.log("server started");
})