$(document).ready(function() {

    var posicionActual = 0;
    console.log("main.js empezado");
    var emepezar = false;

    $('.btnEnter').click(function() {

        if (emepezar == false) {
            emepezar = true
            $('.portada').hide();
            $('.portadaFull').hide();

            var el = document.documentElement,
                rfs = // for newer Webkit and Firefox
                    el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen ||
                    el.msRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                // for Internet Explorer
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
            //$('.footer').show();
            init();

            //location.href='index.html';
        }

    });

    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {

        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        var event = state ? 'FullscreenOn' : 'FullscreenOff';

        if (event == 'FullscreenOff') {
            console.log("qutal escape");
            /*
            $('html, body').animate({
                scrollTop: $(".cabina1").offset().top
            }, 0, function() {
                posicionActual = 1;
            });*/
        }

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


    var videoID = "", currentVideoID_JS = "", currentVideoID_JQ = "";
    var controlScroll1 = 0;
    var talentoCabinaActive = false;
    var lastSoundPlayedTalento = 1;
    var proyecto = false;
    var creditos = false;
    var lastMouseY = -1;

    $(".creditosPag").hide();
    $(".proyectoPag").hide();

    $(".videoIntro").hide();

    $(".footer").hide();




    function init() { //miramos si le ha dado a la portada

        currentVideoID_JS = "videoIntro";
        currentVideoID_JQ = "#videoIntro";
        currentVideo = document.getElementById(currentVideoID_JS);

        $('.intro').show();
        videoCSSClass = $(".videoIntro");

        videoCSSClass.show();
        //var video1 = document.getElementById("video1");
        currentVideo.play();
        var btnSaltar = $(".btnSaltar");

        btnSaltar.on("click", function () {
            currentVideo.pause();
            $(".intro").fadeOut(1500);
            $(".intro").hide();
            $(".castell").show();
            setTimeout(function () {
                $('.baixos').toggle('slide', {direction: 'down'}, 500);
                $('.segons').toggle('slide', {direction: 'down'}, 500);
                $('.tersos').toggle('slide', {direction: 'down'}, 500);
                $('.dosos').toggle('slide', {direction: 'down'}, 500);
                $('.aixecador').toggle('slide', {direction: 'down'}, 500);
                $('.anxeneta').toggle('slide', {direction: 'down'}, 500);
                $('.pis').toggle('slide', {direction: 'down'}, 500);
            }, 1000);
        });

        $('#iconFullScreen').click(function () {
            toggleFullScreen(document.body);
        });

        $('#iconVolume').click(function () {
            currentVideo.muted = !currentVideo.muted;
            if(currentVideo.muted)
                document.getElementById("iconVolumeImage").className = "icon-volume-off";
            else
                document.getElementById("iconVolumeImage").className = "icon-volume-up";
        });

        $(function () {
            var $element = $('.btnSaltar');
            setInterval(function () {
                $element.fadeIn(1000).fadeOut(1500).fadeIn(1500);
            }, 500);
        });

        videoCSSClass.on("ended", function () {
            $(".intro").fadeOut(1500);
            $(".intro").hide();
            $(".castell").show();
            setTimeout(function () {
                $('.baixos').toggle('slide', {direction: 'down'}, 500);
            }, 1000);
        });

        btnSaltar.show();


        $(document).mousemove(function(e){
            if((e.clientY >= (window.screen.availHeight - 30))) {
                $('.footer').show();
            }
            else {
                $('.footer').hide();
            }
            lastMouseY = e.clientY;
        });
    }

    $("#baixos4").click(function () {
        $('.castell').fadeOut(1500);
        $('.castell').hide();
        $('.baixos').toggle();
        $('.segons').toggle();
        $('.tersos').toggle();
        $('.dosos').toggle();
        $('.aixecador').toggle();
        $('.anxeneta').toggle();
        $('.pis').toggle();
        currentVideoID_JS = "videoAlegriaMariona";
        currentVideoID_JQ = "#videoAlegriaMariona";
        currentVideo = document.getElementById(currentVideoID_JS);
        var videoBaixos4 = $('.videoAlegriaMariona');
        loadVideo(currentVideoID_JS);
        setTimeout(function () {
            $("#divVideos").show();
            $('#divVideoAlegriaMariona').fadeIn(1500);
            playVideo(currentVideoID_JS);
        }, 1000);
        videoBaixos4.on("ended", function () {
            $('#divVideoAlegriaMariona').fadeOut(1500);
            $('#divVideos').hide();
            $('.castell').show();
            setTimeout(function () {
                $('.baixos').toggle('slide', {direction: 'down'}, 500);
                $('.segons').toggle('slide', {direction: 'down'}, 500);
                $('.tersos').toggle('slide', {direction: 'down'}, 500);
                $('.dosos').toggle('slide', {direction: 'down'}, 500);
                $('.aixecador').toggle('slide', {direction: 'down'}, 500);
                $('.anxeneta').toggle('slide', {direction: 'down'}, 500);
                $('.pis').toggle('slide', {direction: 'down'}, 500);
            }, 1000)
        })
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
    //cerrar document ready
});

function loadVideo(id) {
    var video = document.getElementById(id);
    video.load();
}

function playVideo(id) {
    var video = document.getElementById(id);
    video.play();
}

function muteVideo(id) {
    var video = document.getElementById(id);
    video.muted = !video.muted;
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
