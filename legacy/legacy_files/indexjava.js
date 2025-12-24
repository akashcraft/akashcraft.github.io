function main(){
    setTimeout(()=>{
        $("a.downarrow").animate({opacity:1, scale: 1},400);
        $("a.downarrow").animate({opacity:1, scale: 1},400);
    },800)
    var newscards = $("div.news");
    var arrows = $("div.newsarrow");
    var change = true;
    newscards.parent().hover(()=>{
        change=false;
        arrows.css({"visibility":"visible"});
    },()=>{
        change=true;
        arrows.css({"visibility":"hidden"});
    });

    $(newscards[0]).show();
    var count = 0;
    function update(){
        if (change){
            $(newscards[count]).hide();
            if (count<newscards.length-1){
                count++;
            } else {
                count = 0;
            }
            $(newscards[count]).show();
        }
    }
    setInterval(update,3000);

    $("#newsleft").click(()=>{
        $(newscards[count]).hide();
        count = (count>0) ? count-1 : newscards.length-1;
        $(newscards[count]).show();
    });

    $("#newsright").click(()=>{
        $(newscards[count]).hide();
        count = (count<newscards.length-1) ? count+1 : 0;
        $(newscards[count]).show();
    });

    //Special
    var reveal = 0;
    $("div.reveal").click(()=>{
        if(reveal==0){
            reveal++;
            $("div.reveal i").text("info");
            $("div.reveal p").text("Answer");
            $("span#hint").text("Look more closely at the 'AKASH' animated text at the top of the page.");
        } else {
            $("div.reveal").slideUp();
            $("span#hint").text("Click the second A in 'AKASH' to show the hidden easter egg.");
        }
    })

    var allowspecial = true;
    $("#M3").click(()=>{
        if (allowspecial){
            $("#M3").animate({fontSize:'1.2em'});
            $("body").css("overflow","hidden");
            allowspecial = false;
            $(".mainapp1").fadeOut();
            $("#M1, #M2, #M3, #M4, #M5").css('animation','none');
            setTimeout(()=>{
                $("#M1, #M2, #M4, #M5").css('animation','fade2 0.1s 0s ease both reverse');
                setTimeout(()=>{
                    $("#M3").css('animation','fade2 0.1s 0.1s ease both reverse');
                },100);
            },100);
            $("header").slideUp();
            $("a.singlenews").hide();
            $("img#triangle").animate({rotate:'-90deg',left:'-=100%'},1000);
            $("img#circle").animate({top:'+=100dvh'},1000);
            $("img#rectangle").animate({rotate:'+360deg',right:"-=100%"},1000);
            $("#moon").animate({left:"-=300px"},1000,'swing',moon);
            $(".emoon").animate({rotate:'720deg'},45000);            
            $("#earth").animate({rotate:'720deg'},85000);
            var degcount = 0;
            var deg = 360;
            function moon(){
                degcount++;
                deg = 360*degcount;
                $(".emoon").css("z-index","-1");
                $("#moon").animate({marginLeft:"550px",rotate:deg.toString()+'deg'},1000,'swing',()=>{
                    degcount++;
                    deg = 360*degcount;
                    $(".emoon").css("z-index","0");
                    $("#moon").animate({marginLeft:"0px",rotate:deg.toString()+'deg'},1000,'swing',moon)
                });
            }
            setTimeout(()=>{
                    $(".mainapp").hide();
                    $(".easter").fadeIn().css("display","flex");
                },1100);
            setTimeout(()=>{
                    $(".easter").fadeOut(400,()=>{ 
                    window.location.href = 'index.php';
                })
            },8000)
        }
        
    })
};

$(window).on("load",()=>{
    $("div.loading").fadeOut(200);
    setTimeout(()=>{
        $("div.mainapp").fadeIn(200);
    },200);
    main();
});