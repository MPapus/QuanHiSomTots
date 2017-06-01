$(document).ready(function() {
    console.log("main.js empezado");
    btnEnter.click(function() {
        init();
    });
});

var empezar = false;
var emocioSeleccio = "";
var needStop = false;
var btnEnter = $(".btnEnter");
var btnSaltar = $(".btnSaltar");
var divVideos = $("#divVideos");
var divCastell = $(".castell");
var divIntro = $(".intro");
var posicionActual = 0;
var videoID = "", currentVideoID_JS = "", currentVideoID_JQ = "";
var controlScroll1 = 0;
var talentoCabinaActive = false;
var lastSoundPlayedTalento = 1;
var proyecto = false;
var creditos = false;
var lastMouseY = -1;
var currentVideoClass = null;
var currentVideo = null;
var mostrarPis = $('.pis').hidden, mostrarBaixos = $('.baixos').hidden, mostrarSegons = false,
    mostrarTersos = false, mostrarDosos = false, mostrarAixecador = false, mostrarPortada = true,
    mostrarAnxeneta = false, mostrarCastell = false;
var animarPis1 = false, animarPis2 = false, animarPis3 = false, animarPis4 = false, animarDosos = false, animarAnxeneta = false;

function init() {
    if (empezar === false) {
        empezar = true;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        mostrarPortada = false;

        setTimeout(function () {

            // REQUEST FULL SCREEN
            var el = document.documentElement,
                rfs = // for newer Webkit and Firefox
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullScreen;
            if (typeof rfs !== "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") {
                // for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
            setTimeout(function () {
                currentVideoID_JS = "videoIntro";
                currentVideoID_JQ = "#videoIntro";

                currentVideo = videojs(currentVideoID_JS);
                currentVideo.isFullscreen(true);
                divVideos.fadeIn(1500);
                currentVideoClass = $(".videoIntro");

                currentVideoClass.show();
                //var video1 = document.getElementById("video1");
                playVideo(currentVideoID_JS);

                currentVideo.on("ended", function () {
                    currentVideoClass.fadeOut(1500);
                    animacioSeleccio();
                    this.dispose();
                    //if(!animarPis1) { animacioInicial(); }
                });
                initBtnSaltar();
            }, 1000);
        }, 1000);
        initOmplirBotonsBoletes();
        initCapsesSeleccio();
    }
}

function initBtnSaltar() {
    //fem set de l'event click
    btnSaltar.on("click", function () {
        needStop = true;
        pauseVideo(currentVideoID_JS);
        if (currentVideoID_JS === "videoIntro") {
            currentVideoClass.fadeOut(15000);
            animacioSeleccio();
            currentVideo.on("hide", function () {
                this.dispose();
            });
            //if(!animarPis1) { animacioInicial(); }
        }
    });
    //l'animem perquè marxi i aparegui
    $(function () {
        var $element = $('.btnSaltar');
        setInterval(function () {
            $element.fadeIn(1000).fadeOut(1500).fadeIn(1500);
        }, 500);
    });
    //el mostrem
    btnSaltar.show();
}

function omplirBotoBoleta(idBoletaHTML/*'#id'*/, idVideoJS/*'videoId'*/, idVideoJQ/*'#videoId'*/, videoClass/*'.class'*/, divVideo/*'#divID'*/, mourePis/*mourePis1*/) {
    $(idBoletaHTML).click(function () {
        divCastell.fadeOut(1500);
        mostrarCastell = false;
        currentVideoID_JS = idVideoJS;
        currentVideoID_JQ = idVideoJQ;
        video = videojs(currentVideoID_JS);
        currentVideoClass = $(videoClass);
        loadVideo(currentVideoID_JS);
        setTimeout(function () {
            $("#divVideos").show();
            $(divVideo).fadeIn(1500);
            video.on("ended", function () {
                divVideos.fadeOut(1500);
                divCastell.fadeIn(1500);
                mostrarCastell = true;
                video.dispose();
                mourePis();
            });
        }, 1000);
    });
    /* VERSIO PREVIA
     $("#baixos4").click(function () {
     $('.castell').fadeOut(1500);
     currentVideoID_JS = "videoAlegriaMariona";
     currentVideoID_JQ = "#videoAlegriaMariona";
     currentVideo = document.getElementById(currentVideoID_JS);
     currentVideoClass = $('.videoAlegriaMariona');
     loadVideo(currentVideoID_JS);
     setTimeout(function () {
     $("#divVideos").show();
     $('#divVideoAlegriaMariona').fadeIn(1500);
     playVideo(currentVideoID_JS);
     currentVideoClass.on("ended", function () {
     $('#divVideos').fadeOut(1500);
     $('.castell').fadeIn(1500);
     mourePis2();
     });
     }, 1000);
     });
     */
}

function initOmplirBotonsBoletes() {
    omplirBotoBoleta("#baixos4", "videoAlegriaMariona", "#videoAlegriaMariona", ".videoAlegriaMariona", "#divVideoAlegriaMariona", mourePis2);
}

function loadVideo(id) {
    var video = videojs(id);
    video.load();
}

function playVideo(id) {
    var video = videojs(id);
    video.play();
    video.isFullscreen(true);
}

function pauseVideo(id) {
    var video = videojs(id);
    video.pause();
}

function muteVideo(id) {
    var video = videojs(id);
    video.muted = !video.muted;
}

function animacioSeleccio() {
    console.log("animació seleccio comença");
    divVideos.fadeOut(1500);
    setTimeout(function () {
        $(".intro").fadeIn(2000);
        console.log("animació seleccio acaba");
    }, 2000);
}

function initCapsesSeleccio() {
    $('#alegria').on("click", function () {
        emocioSeleccio = "alegria";
        divIntro.fadeOut(1500);
        setTimeout(function () {
            currentVideoID_JS = "videoAlegriaMariona";
            currentVideoID_JQ = "#videoAlegriaMariona";
            currentVideo = videojs(currentVideoID_JS);
            currentVideoClass = $(".videoAlegriaMariona");
            loadVideo(currentVideoID_JS);
            setTimeout(function () {
                $("#divVideos").fadeIn(1500);
                btnSaltar.hide();
                playVideo(currentVideoID_JS);
                currentVideo.on("ended", function () {
                    divVideos.fadeOut(1500);
                    divCastell.fadeIn(1500);
                    mostrarCastell = true;
                    animacioInicial();
                });
            }, 1000);
        }, 2000)
    })
}

function animacioInicial() {
    console.log("animació inicial comença");
    $(".intro").fadeOut(2000);
    animarPis1 = true;
    setTimeout(function () {
        $(".castell").fadeIn(1500);
        mostrarCastell = true;
        setTimeout(function () {
            mostrarCastellInici();
            setTimeout(function () {
                mourePis1();
            }, 3000);
        }, 2000);
    }, 3000);
    console.log("animació inicial acaba");
}

function mostrarCastellInici() {
    $('.pisDiv1').show();
    $('.pisDiv2').show();
    $('.pisDiv3').show();
    $('.pisDiv4').show();
    setTimeout(function () {
        $('.boleta').fadeIn(1500);
    }, 2000);
}

function mourePis1() {
    moureBoletaJQ('.baixos4', 10, "pujar", 1);
    setTimeout(function () {
        moureBoletaJQ('.baixos1', 10, "dreta", 1);
        setTimeout(function () {
            moureBoletaJQ('.baixos3', 10, "esquerra", 1);
            setTimeout(function () {
                moureBoletaJQ('.baixos2', 10, "baixar", 1);
                setTimeout(function () {
                    $('.pis1').fadeIn(1500);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function mourePis2() {
    moureBoletaJQ('.segons1', 10, "dreta", 1);
    moureBoletaJQ('.segons3', 10, "esquerra", 1);
    setTimeout(function () {
        moureBoletaJQ('.segons4', 10, "pujar", 1);
        moureBoletaJQ('.segons1', 10, "pujar", 1);
        moureBoletaJQ('.segons2', 10, "pujar", 1);
        moureBoletaJQ('.segons3', 10, "pujar", 1);
        setTimeout(function () {
            $('.pis2').fadeIn(1500);
        }, 1000);
    }, 1000);
}

function mourePis3() {
    moureBoletaJQ('.segons1', 10, "dreta", 1);
    moureBoletaJQ('.segons3', 10, "esquerra", 1);
    setTimeout(function () {
        moureBoletaJQ('.segons4', 10, "pujar", 1);
        moureBoletaJQ('.segons1', 10, "pujar", 1);
        moureBoletaJQ('.segons2', 10, "pujar", 1);
        moureBoletaJQ('.segons3', 10, "pujar", 1);
        setTimeout(function () {
            $('.pis2').fadeIn(1500);
        }, 1000);
    }, 1000);
}

function mourePis4() {
    moureBoletaJQ('.segons1', 10, "dreta", 1);
    moureBoletaJQ('.segons3', 10, "esquerra", 1);
    setTimeout(function () {
        moureBoletaJQ('.segons4', 10, "pujar", 1);
        moureBoletaJQ('.segons1', 10, "pujar", 1);
        moureBoletaJQ('.segons2', 10, "pujar", 1);
        moureBoletaJQ('.segons3', 10, "pujar", 1);
        setTimeout(function () {
            $('.pis2').fadeIn(1500);
        }, 1000);
    }, 1000);
}

function mourePisAixecador() {
    moureBoletaJQ('.aixecador', 10, "dreta", 1);
    setTimeout(function () {
        moureBoletaJQ('.aixecador', 10, "pujar", 1);
    }, 1000);
}

function mourePisAnxeneta() {
    moureBoletaJQ('.anxeneta', 10, "dreta", 1);
    setTimeout(function () {
        moureBoletaJQ('.anxeneta', 10, "pujar", 1);
    }, 1000);
}

function moureBoletaJQ(divID, percentatge, direccio, durada_seg) {
    var elem = $(divID);
    var debug = "";
    if (direccio === "pujar") {
        debug = "-=" + percentatge + "vh";
        elem.animate({marginTop: debug}, durada_seg*1000);
    } else if (direccio === "dreta") {
        debug = "+=" + percentatge + "vh";
        elem.animate({marginLeft: debug}, durada_seg*1000);
    } else if (direccio === "esquerra") {
        debug = "-=" + percentatge + "vw";
        elem.animate({marginLeft: debug}, durada_seg*1000);
    } else if (direccio === "baixar") {
        debug = "+=" + percentatge + "vh";
        elem.animate({marginTop: debug}, durada_seg*1000);
    }
}

function moureBoleta4JS(divID, Start, Finish, pujar) {
    var elem = $(divID);
    var pos = Start;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos === Finish) {
            clearInterval(id);
        } else {
            if (pujar)
            {
                pos--;
                elem.offsetTop = pos + 'px';
                elem.offsetLeft = pos + 'px';
            }
            else {
                pos++;
                elem.offsetTop = pos + 'px';
                elem.offsetLeft = pos + 'px';
            }
        }
    }
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

$('#iconVolume').click(function () {
    currentVideo.muted = !currentVideo.muted;
    if(currentVideo.muted)
        document.getElementById("iconVolumeImage").className = "icon-volume-off";
    else
        document.getElementById("iconVolumeImage").className = "icon-volume-up";
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
