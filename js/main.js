var btnEnter = $(".btnEnter");
var btnSaltar = $(".btnSaltar");
var divVideos = $("#divVideos");
var divCurrentVideo = "#videoIntro";
var divCastell = $(".castell");
var _pinya = $("#pinya");
var _pinyaLinies = $("#pinya_linies");
var _baixos = $("#baixos");
var _baixosLinies = $("#baixos_linies");
var _segons = $("#segons");
var _segonsLinies = $("#segons_linies");
var _tercos = $("#tercos");
var _tercosLinies = $("#tercos_linies");
var _pom = $("#pom");
var _pomLinies = $("#pom_linies");
var proyecto = false;
var creditos = false;
var lastMouseY = -1;
var fase = null;
var currentVideo = "#teaser";
var mostrarCastell = false, mostrarVideos = false;
var lastEmotionPlayed = null;
var clickedButtons = {};
var anxeneta = null, aixecador = null, dosos1 = null, dosos2 = null,
    tercos1 = null, tercos2 = null, tercos3 = null, tercos4 = null,
    segons1 = null, segons2 = null, segons3 = null, segons4 = null,
    baixos1 = null, baixos2 = null, baixos3 = null, baixos4 = null,
    p11 = null, p12 = null, p13 = null, p14 = null, p15 = null, p16 = null, p17 = null, p18 = null, p19 = null;

$(document).ready(function () {
    window.vplayer = videojs(currentVideo);
    window.vplayer.userActive(false);
    //window.vplayer.removeChild('BigPlayButton');
    console.log("main.js empezado");
    btnEnter.click(function () {
        if ($(window).width() < 780) {
            alert("La resolució del vostre dispositiu es massa baixa, problement un mòbil o tauleta. \r\n" +
                "Si us plau, accediu a Quan Hi Som Tots des d'un ordinador.");
        }
        else {
            init();
            clickedButtons[btnEnter.attr("id")] = 1; //Inicialitzem el diccionari de botons apretats amb el botó per entrar
        }
    });
});

function init() {
    if (fase === null) {
        fase = FASE.Intro;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        setTimeout(function () {

            toggleFullScreen();

            window.vplayer.play();

            setTimeout(function () {
                btnSaltar.addClass("animate-flicker");
                btnSaltar.show();
            }, 5000);
            window.vplayer.isFullscreen(true);

            window.vplayer.one("ended", function () {
                if (fase < FASE.Baixos) {
                    fase = FASE.Baixos;
                    setUp();
                }
            });
            initBtnSaltar();
        }, 1000);
    }
}
