 /* eslint-disable no-undef */
function main(){   
    var tile = document.getElementById("desktile");
    var start = document.getElementsByClassName("main")[0];
    var desktop = document.getElementsByClassName("desktop")[0];
    var shutdown = document.getElementsByClassName("shutdown")[0];
    var charmshour = document.getElementById("charms-hour");
    var charmsmins = document.getElementById("charms-minutes");
    var charmsday = document.getElementById("charms-day");
    var charmsmonth = document.getElementById("charms-month");
    var taskhour = document.getElementById("task-hour");
    var taskmins = document.getElementById("task-mins");
    var taskdate = document.getElementById("task-date");
    var taskmonth = document.getElementById("task-month");
    var taskyear = document.getElementById("task-year");
    var charmshint = document.getElementsByClassName("charmshint")[0];
    var charms = document.getElementsByClassName("charms")[0];
    var charmsbar = document.getElementsByClassName("charmsbar")[0];
    var charmstime = document.getElementsByClassName("charms-time")[0];
    var charmsicon = charmsbar.getElementsByTagName("img");
    var appsdown = document.getElementsByClassName("appsdown")[0];
    var apps = document.getElementsByClassName("apps")[0];
    var appsup = document.getElementsByClassName("appsup")[0];
    var desktopapp = document.getElementsByClassName("desktopapp")[0];
    var closewarn = document.getElementsByClassName("close")[0];
    var appwarn = document.getElementsByClassName("appwarn")[0];
    var appwarns = document.getElementsByClassName("noopen");
    var calendartile = document.getElementById("calendartile");
    var calendartext = document.getElementById("calendar");
    var datetile = document.getElementsByClassName("datetile")[0];
    var phototile = document.getElementsByClassName("phototile")[0];
    var phototile1 = document.getElementsByClassName("phototile1");
    var calendarh2 = document.getElementById("calendar");
    var photosh2 = document.getElementById("photos");
    var onstart = true;
    var onapps = false;

    for (let i in appwarns){
        appwarns[i].onclick = function(){
            appwarn.style.display = "flex";
            appwarn.style.animation = "fade 0.15s 0s both";
            setTimeout(function(){
                appwarn.style.animation = "";
            },200)
        }
    }

    closewarn.onclick = function(){
        appwarn.style.animation = "fade 0.1s 0s ease both reverse";
        setTimeout(function(){
            appwarn.style.display = "none";
            appwarn.style.animation = "";
        },200)
    }

    appsdown.children[0].onclick = function(){
        onapps = true;
        calendartext.style.display = "none";
        photosh2.style.display = "none";
        appsdown.style.display = "none";
        apps.style.display = "block";
        start.style.animation = "slideout 0.5s 0s cubic-bezier(.24,.02,.09,1.01) forwards";
        apps.style.animation = "slideout1 0.5s 0s cubic-bezier(.24,.02,.09,1.01) forwards";
        setTimeout(function(){
            start.style.animation = "";
            apps.style.animation = "";
        },500)
    }

    appsdown.children[0].onmouseover = function(){
        appsdown.children[0].src = "img-windows/appsdown1.png";
        appsdown.style.cursor = "pointer";
    }

    appsdown.children[0].onmouseout = function(){
        appsdown.children[0].src = "img-windows/appsdown.png";
    }

    appsup.children[0].onclick = function(){
        onapps = false;
        photosh2.style.display = "block";
        calendartext.style.display = "block";
        start.style.animation = "slideout 0.5s 0s cubic-bezier(.82,-0.04,1,.64) both reverse";
        apps.style.animation = "slideout1 0.5s 0s cubic-bezier(.82,-0.04,1,.64) both reverse";
        setTimeout(function(){
            start.style.animation = "";
            apps.style.animation = "";
            apps.style.display = "none";
            appsdown.style.display = "block";
        },500)
    }

    appsup.children[0].onmouseover = function(){
        appsup.children[0].src = "img-windows/appsup1.png";
        appsup.style.cursor = "pointer";
    }

    appsup.children[0].onmouseout = function(){
        appsup.children[0].src = "img-windows/appsup.png";
    }

    tile.onclick = function(){
        appsdown.style.display = "none";
        onstart = false;
        resetstart();
        tile.style.animation = "tiltback 0.2s 0s ease forwards";
        start.style.transformOrigin = "bottom";
        start.style.animation = "fadeoutzoom 0.1s 0.1s ease-out forwards";
        
        setTimeout(function(){
            start.style.animation = "";
            tile.style.animation = ""
            start.style.display = "none";
            appsdown.style.display = "block";
        },300);

        setTimeout(function(){
            desktop.style.display = "block";
        },200);
    };

    desktopapp.onclick = function(){
        onstart = false;
        resetstart();
        appsdown.style.display = "none";
        apps.style.display = "none";
        desktop.style.display = "block";
        desktop.style.animation = "fade 0.25s 0s ease forwards";
        start.style.display = "none";
        appsdown.style.display = "block";
        setTimeout(function(){
            desktop.style.animation = "";
        },250)
    };

    var starttile = document.getElementById("start");
    starttile.onmouseover = function(){
        starttile.src = "img-windows/win8start2.png";
        starttile.style.backgroundColor = "black";
    }
    starttile.onmouseout = function(){
        starttile.src = "img-windows/win8start.png"
        starttile.style.backgroundColor = "";
    }
    starttile.onclick = function(){
        desktop.style.display = "none";
        start.style.animation = "fade 0.08s 0s ease-out forwards"
        start.style.display = "block";
        onstart = true;
    };

    var power = document.getElementById("power");
    power.onclick = function(){
        appwarn.style.display = "none";
        start.style.display = "none";
        //$("div.mainapp").css;
        onstart = false;
        resetstart();
        charmshint.style.display = "none";
        charms.style.display = "none";
        charmshint.style.display = "none";
        charmstime.style.display = "none";
        shutdown.style.display = "block"
        shutdown.style.animation = "fadeout 0.2s 3s ease-out forwards"
        setTimeout(function(){
            window.location.href = "/#/web";
        },3200);
    };

    charms.onmouseover = function(){
        charmshint.style.display = "none";
        charmsbar.style.animation = "slidein 1s 0s cubic-bezier(0,1.01,0,.99) forwards";
        charmsicon[0].style.animation = "slidein1 0.3s 0s ease";
        charmsicon[1].style.animation = "slidein1 0.2s 0s ease";
        charmsicon[3].style.animation = "slidein1 0.2s 0s ease";
        charmsicon[4].style.animation = "slidein1 0.3s 0s ease";
        charmstime.style.display = "block";
        charmstime.style.animation = "fade 0.5s 0s ease forwards";
        charms.style.width = "70px";
        charms.style.height = "100vh";
    };

    charms.onmouseout = function(){
        charmsbar.style.animation = "";
        charms.style.width = "20px";
        charms.style.height = "40px";
        charmstime.style.animation = ""
        charmstime.style.display = "none";
        charmsicon[0].style.animation = "";
        charmsicon[1].style.animation = "";
        charmsicon[3].style.animation = "";
        charmsicon[4].style.animation = "";
    };

    var date = new Date();
    charmshour.innerHTML = date.getHours();
    taskhour.innerHTML = date.getHours();
    if (date.getMinutes()>=10){
        charmsmins.innerHTML = date.getMinutes();
        taskmins.innerHTML = date.getMinutes();
    } else {
        charmsmins.innerHTML = "0"+date.getMinutes();
        taskmins.innerHTML = "0"+date.getMinutes();
    }
    taskdate.innerHTML = date.getDate();
    taskmonth.innerHTML = date.getMonth()+1;
    taskyear.innerHTML = date.getFullYear();

    if (date.getMonth()==0){
        charmsmonth.innerHTML = "January";
    } else if (date.getMonth()==1){
        charmsmonth.innerHTML = "February";
    } else if (date.getMonth()==2){
        charmsmonth.innerHTML = "March";
    } else if (date.getMonth()==3){
        charmsmonth.innerHTML = "April";
    } else if (date.getMonth()==4){
        charmsmonth.innerHTML = "May";
    } else if (date.getMonth()==5){
        charmsmonth.innerHTML = "June";
    } else if (date.getMonth()==6){
        charmsmonth.innerHTML = "July";
    } else if (date.getMonth()==7){
        charmsmonth.innerHTML = "August";
    } else if (date.getMonth()==8){
        charmsmonth.innerHTML = "September";
    } else if (date.getMonth()==9){
        charmsmonth.innerHTML = "October";
    } else if (date.getMonth()==10){
        charmsmonth.innerHTML = "November";
    } else {
        charmsmonth.innerHTML = "December";
    }

    var day;
    if (date.getDay()==0){
        day = "Sunday";
    } else if (date.getDay()==1){
        day = "Monday";
    } else if (date.getDay()==2){
        day = "Tuesday";
    } else if (date.getDay()==3){
        day = "Wednesday";
    } else if (date.getDay()==4){
        day = "Thursday";
    } else if (date.getDay()==5){
        day = "Friday";
    } else {
        day = "Saturday";
    }

    charmsday.innerHTML = day;
    document.getElementById("calendarday").innerHTML = day;
    document.getElementById("calendardate").innerHTML = date.getDate();

    setInterval(function(){
        var date = new Date();
        charmshour.innerHTML = date.getHours();
        taskhour.innerHTML = date.getHours();
        if (date.getMinutes()>=10){
            charmsmins.innerHTML = date.getMinutes();
            taskmins.innerHTML = date.getMinutes();
        } else {
            charmsmins.innerHTML = "0"+date.getMinutes();
            taskmins.innerHTML = "0"+date.getMinutes();
        }
    },5000);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // swap elements
        }
        return array;
    }

    setInterval(function(){
        if (onstart){
            onstart = false;
            calendartile.src = "img-windows/wintile31.png";
            if (onapps==false){
                calendarh2.style.display = "block";
                photosh2.style.display = "block";
            }
            
            datetile.style.animation = "slidein2 1s 0s forwards cubic-bezier(0,.93,.56,1.01)";
            setTimeout(function(){
                datetile.style.bottom = "140px";
                datetile.style.animation = "";
            },1100);
            const arr = [1, 2, 3, 4, 5];
            const randomizedArr = shuffleArray([...arr]);
            var j = 1;
            for(let i = 0; i < randomizedArr.length; i++) {
                document.getElementById("photo"+randomizedArr[i]).getElementsByTagName("img")[0].src = "img-windows/photo"+j+".png";
                j++
            }
        
            document.getElementById("newstile2").style.animation = "slidein4 1s 1s forwards cubic-bezier(0,.93,.56,1.01)"

            
            phototile.getElementsByTagName("img")[0].src = "img-windows/wintile11.png";
            phototile1[0].style.animation = "slidein3 1s 0s forwards cubic-bezier(0,.93,.56,0.99)";
            var l = 1;
            setInterval(function(){
                phototile1[l].style.animation = "slidein3 1s 0s forwards cubic-bezier(0,.93,.56,0.99)";
                l++;
                if (l==5){
                    l = 0;
                    phototile1[0].style.animation = "";
                    phototile1[1].style.animation = "";
                    phototile1[2].style.animation = "";
                    phototile1[3].style.animation = "";
                    setTimeout(function(){
                        phototile1[4].style.animation = "";
                    },6000)    
                }
            },6000);
        }
    },6000);

    function resetstart(){
        calendartile.src = "img-windows/wintile3.png";
        calendarh2.style.display = "none";
        photosh2.style.display = "none";
        datetile.style.bottom = "0px";
        phototile1[0].style.animation = "";
        phototile1[1].style.animation = "";
        phototile1[2].style.animation = "";
        phototile1[3].style.animation = "";
        phototile1[4].style.animation = "";
        document.getElementById("storetile").style.animation = "";
        document.getElementById("newstile2").style.animation = "";
    }

}

$(window).on("load",()=>{
    $("div.loading").css({"display": "none"});
    $("div.mainapp").css({"display": "block"});
    main();
});