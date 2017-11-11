var btnEnter = $(".btnEnter");
var btnSaltar = $(".btnSaltar");
var btnHome = $("#home");
var divVideos = $("#divVideos");
var divCastell = $(".castell");
var _TREE = null, _DEBUT = null, _SEGONA = null;
var ajuda = false;
var credits = false;
var videoExtension = null;
var enConstruccio = true;
var lastMouseY = -1;
var fase = null;
var currentVideo = "teaser";
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
        else if (getInternetExplorerVersion() !== -1) {
            initNoSupport();
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            initNoSupport();
        }
        else if (enConstruccio) {
            initEnConstruccio();
        }
        else {
            toggleFullScreen();
            init();
        }
    });
    $("#easterEgg").click(function () {
        $("#enConstruccio").fadeOut(1500);
        $("#footer").fadeOut(1500);
        toggleFullScreen();
        init();
    })
});

function init() {
    if (fase === null) {
        fase = FASE.Intro;
        $('.portada').fadeOut(1500);
        $('.portadaFull').fadeOut(1500);
        setTimeout(function () {

            window.vplayer.play();

            setTimeout(function () {
                btnSaltar.fadeIn(1500);
                setTimeout(function () {
                    btnSaltar.addClass("animate-flicker");
                }, 1500);
            }, 5000);
            window.vplayer.isFullscreen(true);

            window.vplayer.one("ended", function (event) {
                if (fase < FASE.Baixos) {
                    setUp();
                    $(this).off(event);
                }
            });
            initBtnSaltar();
        }, 1000);
    }
}

function initNoSupport() {
    $('.portada').fadeOut(1500);
    $('.portadaFull').fadeOut(1500);
    $("#noSupport").fadeIn(1500);
}

function initEnConstruccio() {
    $('.portada').fadeOut(1500);
    $('.portadaFull').fadeOut(1500);
    $("#enConstruccio").fadeIn(1500);
}

function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName === 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}
