var btnEnter = $(".btnEnter");
var btnSaltar = $(".btnSaltar");
var btnHome = $("#home");
var divVideos = $("#divVideos");
var divCastell = $(".castell");
var _TREE = null, _DEBUT = null, _SEGONA = null;
var ajuda = false;
var credits = false;
var tweets = [];
var lastMouseY = -1;
var fase = null;
var currentVideo = "#teaser";
var currentTreeNodeName = null;
var mostrarCastell = false, mostrarVideos = false;
var lastEmotionPlayed = null;
var clickedButtons = null;
var p11 = null, p12 = null, p13 = null, p14 = null, p15 = null, p16 = null, p17 = null, p18 = null, p19 = null;

$(document).ready(function () {
    window.vplayer = videojs(currentVideo);
    window.vplayer.userActive(false);
    console.log("main.js empezado");
    btnEnter.click(function () {
        if ($(window).width() < 780) {
            alert("La resolució del vostre dispositiu es massa baixa, problement un mòbil o tauleta. \r\n" +
                "Si us plau, accediu a Quan Hi Som Tots des d'un ordinador.");
        }
        else {
            toggleFullScreen();
            init();
        }
    });
});

function init() {
    if (fase === null) {
        fase = FASE.Intro;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        setTimeout(function () {

            window.vplayer.play();

            setTimeout(function () {
                btnSaltar.addClass("animate-flicker");
                btnSaltar.show();
            }, 5000);
            window.vplayer.isFullscreen(true);

            window.vplayer.one("ended", function () {
                if (fase < FASE.Baixos) {
                    setUp();
                }
            });
            initBtnSaltar();
        }, 1000);
    }
}
