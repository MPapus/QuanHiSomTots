var empezar = false, firstHover = true;
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
    segons1 = null, segons2 = null, segons3 = null, segons4 = null, baixos1 = null, baixos2 = null, baixos3 = null, baixos4 = null,
    p11 = null, p12 = null, p13 = null, p14 = null, p15 = null, p16 = null, p17 = null, p18 = null, p19 = null;
var mostrarCastell = false, mostrarVideos = false;
var colorAlegria = "#FFC14D", colorTristesa = "#3DABBF", colorRabia = "#FF5A4D", colorEuforia = "#9D43C7", lastColorPlayed = null, lastEmotionPlayed = null;
var clickedButtons = [];

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
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

function init() {
    if (empezar === false) {
        empezar = true;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        mostrarPortada = false;
        setTimeout(function () {

            toggleFullScreen();

                currentVideo = currentVideoID_JS;
                    window.vplayer.play();
                    setTimeout(function () {
                        btnSaltar.addClass("animate-flicker");
                        btnSaltar.show();
                    }, 5000);
                window.vplayer.userActive(true);
                window.vplayer.isFullscreen(true);

                window.vplayer.one("ended", function () {
                    if (currentVideoID_JS === "#videoIntro")
                        setUp();
                });
                initBtnSaltar();
        }, 1000);
    }
}
