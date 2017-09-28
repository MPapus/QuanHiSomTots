$(document).ready(function() {
    window.vplayer = videojs(currentVideoID_JS);
    window.vplayer.userActive(false);
    //window.vplayer.removeChild('BigPlayButton');
    console.log("main.js empezado");
    btnEnter.click(function() {
        if ($(window).width() < 780) {
            alert("La resolució del vostre dispositiu es massa baixa, problement un mòbil o tauleta. \r\n" +
                "Si us plau, accediu a Quan Hi Som Tots des d'un ordinador.");
        }
        else {
            init();
        }
    });
});

var empezar = false;
var currentVideoID_JS = "#videoIntro";
var needStop = false;
var btnEnter = $(".btnEnter");
var btnSaltar = $(".btnSaltar");
var divVideos = $("#divVideos");
var divCurrentVideo = "#videoIntro";
var divCastell = $(".castell");
var proyecto = false;
var creditos = false;
var lastMouseY = -1;
var currentVideo = null;
var anxeneta = null, aixecador = null, dosos1 = null, dosos2 = null, tercos1 = null, tercos2 = null, tercos3 = null, tercos4 = null,
    segons1 = null, segons2 = null, segons3 = null, segons4 = null, baixos1 = null, baixos2 = null, baixos3 = null, baixos4 = null;
var mostrarCastell = false, mostrarVideos = false;
var colorAlegria = "#FFC14D", colorTristesa = "#3DABBF", colorRabia = "#FF5A4D", colorEuforia = "#9D43C7", lastColorPlayed = null, lastEmotionPlayed = null;

function init() {
    if (empezar === false) {
        empezar = true;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        mostrarPortada = false;
        setTimeout(function () {

            requestFullScreen();

            setTimeout(function () {
                currentVideo = currentVideoID_JS;
                setTimeout( function () {
                    window.vplayer.play();
                    mostrarDivVideos();
                    setTimeout(function () {
                        btnSaltar.addClass("animate-flicker");
                        btnSaltar.show();
                    }, 1000);
                }, 1500);
                window.vplayer.userActive(true);
                window.vplayer.isFullscreen(true);

                window.vplayer.one("ended", function () {
                    btnSaltar.removeClass("animate-flicker");
                    amagarDivVideos();
                    mostrarDivCastell();
                    animacioInicial();
                    btnSaltar.hide();
                });
                initBtnSaltar();
            }, 500);
        }, 1000);
        initOmplirBotonsBoletes();
    }
}

function initBtnSaltar() {
    //fem set de l'event click
    btnSaltar.on("click", function () {
        needStop = true;
        window.vplayer.pause();
        if (currentVideoID_JS === "#videoIntro") {
            amagarDivVideos();
            mostrarDivCastell();
            animacioInicial();
        }
        else {
            amagarDivVideos();
            mostrarDivCastell();
            console.log("canvio color a: " + lastColorPlayed + "(" + lastEmotionPlayed + ")");
            var gradient = "url(#gradient" + lastEmotionPlayed.toString().charAt(0).toUpperCase() + lastEmotionPlayed.substr(1) + ")";
            $("#pinya").css("fill", gradient);
            $("#pinya_linies").css("fill", gradient);
        }
        btnSaltar.removeClass("animate-flicker");
        btnSaltar.hide();
    });

    /*
    //l'animem perquè marxi i aparegui
    $(function () {
        var interval = setInterval(function () {
            if (!needStop)
                animarBoto(btnSaltar);
            else {
                clearInterval(interval);
                btnSaltar.hide();
            }
        }, 500);
    });
    //el mostrem*/
}

function initOmplirBotonsBoletes() {

    //Creem les instàncies
    anxeneta = new Boleta("#anxeneta", new Video("videoTristesaMariona", "tristesa", colorTristesa, "anxeneta"));
    aixecador = new Boleta("#aixecador", new Video("videoAlegriaMariona", "alegria", colorAlegria, "aixecador"));
    dosos1 = new Boleta("#dosos1", new Video("videoEuforiaMariona", "euforia", colorEuforia, "dosos1"));
    dosos2 = new Boleta("#dosos2", new Video("videoRabiaMariona", "rabia", colorRabia, "dosos2"));
    tercos1 = new Boleta("#tercos1", new Video("videoAlegriaMariona", "alegria", colorAlegria, "tercos1"));
    tercos2 = new Boleta("#tercos2", new Video("videoTristesaMariona", "tristesa", colorTristesa, "tercos2"));
    tercos3 = new Boleta("#tercos3", new Video("videoRabiaMariona", "rabia", colorRabia, "tercos3"));
    tercos4 = new Boleta("#tercos4", new Video("videoEuforia", "euforia", colorEuforia, "tercos4"));
    segons1 = new Boleta("#segons1", new Video("videoEuforia", "euforia", colorEuforia, "segons1"));
    segons2 = new Boleta("#segons2", new Video("videoRabiaMariona", "rabia", colorRabia, "segons2"));
    segons3 = new Boleta("#segons3", new Video("videoTristesaCarol", "tristesa", colorTristesa, "segons3"));
    segons4 = new Boleta("#segons4", new Video("videoAlegriaMariona", "alegria", colorAlegria, "segons4"));
    baixos1 = new Boleta("#baixos1", new Video("videoRabiaMariona", "rabia", colorRabia, "baixos1"));
    baixos2 = new Boleta("#baixos2", new Video("videoEuforia", "euforia", colorEuforia, "baixos2"));
    baixos3 = new Boleta("#baixos3", new Video("videoAlegriaMariona", "alegria", colorAlegria, "baixos3"));
    baixos4 = new Boleta("#baixos4", new Video("videoTristesaCarol", "tristesa", colorTristesa, "baixos4"));

    //le iniciem amb els events necessaris
    anxeneta.init();
    aixecador.init();
    dosos1.init();
    dosos2.init();
    tercos1.init();
    tercos2.init();
    tercos3.init();
    tercos4.init();
    segons1.init();
    segons2.init();
    segons3.init();
    segons4.init();
    baixos1.init();
    baixos2.init();
    baixos3.init();
    baixos4.init();
}

function animacioInicial() {
    console.log("animació inicial comença");
    mostrarCastellInici();
}

function mostrarCastellInici() {
    $('.pinya').show();
    $('.liniesPinya').fadeIn(500);
    setTimeout(function () {
        $(".castell").fadeIn(1500);
        mostrarCastell = true;
        setTimeout(function () {
            $('.boleta').fadeIn(1500);
            setTimeout(function () {
               $('.liniesCastell').fadeIn(2000);
            }, 1600);
            console.log("animació inicial acaba");
        }, 1000);
    }, 3000);
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

divCastell.click(function (e) {
    if(e.target.className === "castell")
    {
        $.ajax({
            url: 'tweetsTristesa.php',
            success: function(response) {
                var tweets = $.parseJSON(response);
                var tweetsHTML = [];
                for (var i=0; i<tweets.length; i++){
                    var username = tweets[i].user.screen_name;
                    var tweet = tweets[i].text;
                    tweetsHTML.push('<span><b>'+status+'</b>: '+tweet+'</span>');
                }
                document.getElementById('tweets').innerHTML = tweetsHTML.join('<br/>');
            }
        });
    }
});

$(document).mousemove(function(e){
    if (empezar) {
        //mostrar navbar
        var desplegable = document.getElementsByClassName('dropdown-toggle')[0].getAttribute("aria-expanded");
        if((e.clientY <= ((window.innerHeight*0.05)))) {
            $('.navbar').show();
        }
        else {
            if("true" !== desplegable)
                $('.navbar').hide();
        }
        lastMouseY = e.clientY;
    }
});


//pagina aparte
$("#elProyecto").click(function() {

    if (!proyecto) {
        $(".creditosPag").fadeOut(500);
        $(".proyectoPag").fadeIn(1000);
        proyecto = true;
    } else {
        $(".proyectoPag").fadeOut(1000);
        proyecto = false;
    }
});
//pagina aparte
$("#losCreditos").click(function() {

    if (!creditos) {
        $(".proyectoPag").fadeOut(500);
        $(".creditosPag").fadeIn(1000);
        creditos = true;
    } else {
        $(".creditosPag").fadeOut(1000);
        creditos = false;
    }
});

$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {

    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    var event = state ? 'FullscreenOn' : 'FullscreenOff';

    if (event === 'FullscreenOff') { console.log("Exit FullScreen"); } else if (event === 'FullscreenOn') { console.log("Enter FullScreen"); }

});

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

$('#iconFullScreen').click(function () {
    toggleFullScreen(document.documentElement);
});
