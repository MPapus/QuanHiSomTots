/*
######################################################
######################################################
##################                 ###################
##################     CLASSES     ###################
##################                 ###################
######################################################
######################################################
 */

function Boleta(idBoletaHTML, video) {
    //si és instancia de Video llavors es una bola del tronc
    if (video instanceof Video) {
        this.video = video;
    }
    //sino, és una bola de la pinya
    else {
    }
    this.boleta = $(idBoletaHTML);

    this.getVideo = function () {
        return this.video;
    };

    this.getBoletaHTML = function () {
        return this.boleta;
    };

    this.init = function () {
        //si és instancia de Video llavors es una bola del tronc
        if (video instanceof Video) {
            var vid = this.video;
            this.boleta.mouseenter(function () {
                if (firstHover)
                {
                    firstHover = false;
                    removeAnimationAttr($("#pinya"));
                    removeAnimationAttr($("#pinya_linies"));
                    removeAnimationAttr($("#baixos"));
                    removeAnimationAttr($("#baixos_linies"));
                    createBotonsBoletesPinya();
                    $(this).css("fill", vid.getVideoColor()).css("cursor", "pointer");
                }
                else {
                    $(this).css("fill", vid.getVideoColor()).css("cursor", "pointer");
                }
            }).mouseleave(function () {
                $(this).css("fill", "#e3e3e3").css("cursor", "none");
            });
            this.boleta.on("click", function () {
                if (jQuery.inArray(this.id, clickedButtons) === -1)
                    clickedButtons.push(this.id);
                currentVideoID_JS = vid.getVideoTag();
                divCurrentVideo = vid.getVideoDiv();
                vid.changeSource();
                amagarDivCastell();
                mostrarDivVideos();
                $(divCurrentVideo).show();
                window.vplayer.play();
                window.vplayer.on('loadedmetadata', function () {
                    amagarDivCastell();
                    mostrarDivVideos();
                    currentVideo = currentVideoID_JS;
                    window.vplayer.play();
                    lastColorPlayed = vid.getVideoColor();
                    lastEmotionPlayed = vid.getVideoEmotion();
                    setTimeout(function () {
                        btnSaltar.removeClass("animate-flicker");
                        btnSaltar.hide();
                        btnSaltar.show();
                    }, 1000);
                    window.vplayer.userActive(true);
                    window.vplayer.isFullscreen(true);
                });

                window.vplayer.on("ended", function () {
                    btnSaltar.removeClass("animate-flicker");
                    standardEndingVideo();
                    checkForNewAnimations();
                });
            });
        }
        //sino, és una bola de la pinya
        else {
            this.boleta.mouseenter(function () {
                if (lastColorPlayed !== null)
                    $(this).css("fill", lastColorPlayed).css("cursor", "pointer");
            }).mouseleave(function () {
                if (lastColorPlayed !== null) {
                    var gradient = "url(#gradient" + lastEmotionPlayed.toString().charAt(0).toUpperCase() + lastEmotionPlayed.substr(1) + ")";
                    $(this).css("fill", gradient).css("cursor", "none");
                }
            });
        }
    }
}

function standardEndingVideo() {
    amagarDivVideos();
    mostrarDivCastell();
    console.log("canvio color a: " + lastColorPlayed + "(" + lastEmotionPlayed + ")");
    var gradient = "url(#gradient" + lastEmotionPlayed.toString().charAt(0).toUpperCase() + lastEmotionPlayed.substr(1) + ")";
    $("#pinya").css("fill", gradient).children().css("fill", gradient).attr("fill", gradient);
    $("#pinya_linies").css("fill", gradient).children().css("fill", gradient).attr("fill", gradient);
}

function Video(videoTag, videoEmotion, videoColor, videoDiv) {
    this.videoTag = videoTag;
    this.videoDiv = "#video" + videoDiv.toString().charAt(0).toUpperCase() + videoDiv.substr(1);
    this.emotion = videoEmotion;
    this.color = videoColor;

    this.getVideoEmotion = function () {
        return this.emotion;
    };

    this.getVideoColor = function () {
        return this.color;
    };

    this.getVideoTag = function () {
        return this.videoTag;
    };

    this.getVideoDiv = function () {
        return this.videoDiv;
    };

    this.changeSource = function () {
        var debug = document.getElementById(currentVideoID_JS);
        var videoSource = debug.children[0].currentSrc;
        var videoType = "video/" + videoSource.split('.').pop();
        window.vplayer.src({'src': videoSource, 'type': videoType});
    };
}

function Tweet() {

}

function setUp() {
    amagarDivVideos();
    mostrarDivCastell();

    btnSaltar.removeClass("animate-flicker");
    btnSaltar.hide();

    animarPinya(4);
    setTimeout(function () {
        animarBaixos(4);
        setTimeout(function () {
            createBotonsBoletesBaixos();
        }, 4000);
    }, 4000);
}

/*
######################################################
######################################################
##########                                ############
##########    METODES PER MOSTRAR/AMAGAR  ############
##########                                ############
######################################################
######################################################
*/
function mostrarDivVideos() {
    if (!mostrarVideos) {
        mostrarVideos = true;
        divVideos.fadeIn(1500);
        console.log("mostro videos");
    }
}

function amagarDivVideos() {
    if (mostrarVideos) {
        mostrarVideos = false;
        divVideos.fadeOut(1500);
        console.log("amago videos");
    }
}

function mostrarDivCastell() {
    if (!mostrarCastell) {
        mostrarCastell = true;
        divCastell.fadeIn(1500);
        console.log("mostro castell");
    }
}

function amagarDivCastell() {
    if (mostrarCastell) {
        mostrarCastell = false;
        divCastell.fadeOut(1500);
        console.log("amago castell");
    }
}

/*
######################################################
######################################################
##########                                ############
##########           BOTONS               ############
##########                                ############
######################################################
######################################################
*/
function initBtnSaltar() {
    //fem set de l'event click
    btnSaltar.on("click", function () {
        needStop = true;
        window.vplayer.pause();
        if (currentVideoID_JS === "#videoIntro") {
            setUp();
        }
        else {
            standardEndingVideo();
            checkForNewAnimations();
        }
        btnSaltar.removeClass("animate-flicker");
        btnSaltar.hide();
    });
}

function createBotonsBoletesBaixos() {
    baixos1 = new Boleta("#baixos1", new Video("videoRabiaMariona", "rabia", colorRabia, "baixos1"));
    baixos2 = new Boleta("#baixos2", new Video("videoEuforiaMariona", "euforia", colorEuforia, "baixos2"));
    baixos3 = new Boleta("#baixos3", new Video("videoAlegriaMariona", "alegria", colorAlegria, "baixos3"));
    baixos4 = new Boleta("#baixos4", new Video("videoTristesaCarol", "tristesa", colorTristesa, "baixos4"));

    baixos1.init();
    baixos2.init();
    baixos3.init();
    baixos4.init();
}

function createBotonsBoletesSegons() {
    segons1 = new Boleta("#segons1", new Video("videoEuforiaMariona", "euforia", colorEuforia, "segons1"));
    segons2 = new Boleta("#segons2", new Video("videoRabiaMariona", "rabia", colorRabia, "segons2"));
    segons3 = new Boleta("#segons3", new Video("videoTristesaCarol", "tristesa", colorTristesa, "segons3"));
    segons4 = new Boleta("#segons4", new Video("videoAlegriaMariona", "alegria", colorAlegria, "segons4"));

    segons1.init();
    segons2.init();
    segons3.init();
    segons4.init();
}

function createBotonsBoletesTercos() {
    tercos1 = new Boleta("#tercos1", new Video("videoAlegriaMariona", "alegria", colorAlegria, "tercos1"));
    tercos2 = new Boleta("#tercos2", new Video("videoTristesaMariona", "tristesa", colorTristesa, "tercos2"));
    tercos3 = new Boleta("#tercos3", new Video("videoRabiaMariona", "rabia", colorRabia, "tercos3"));
    tercos4 = new Boleta("#tercos4", new Video("videoEuforiaMariona", "euforia", colorEuforia, "tercos4"));

    tercos1.init();
    tercos2.init();
    tercos3.init();
    tercos4.init();
}

function createBotonsBoletesPom() {
    anxeneta = new Boleta("#anxeneta", new Video("videoTristesaMariona", "tristesa", colorTristesa, "anxeneta"));
    aixecador = new Boleta("#aixecador", new Video("videoAlegriaMariona", "alegria", colorAlegria, "aixecador"));
    dosos1 = new Boleta("#dosos1", new Video("videoEuforiaMariona", "euforia", colorEuforia, "dosos1"));
    dosos2 = new Boleta("#dosos2", new Video("videoRabiaMariona", "rabia", colorRabia, "dosos2"));

    anxeneta.init();
    aixecador.init();
    dosos1.init();
    dosos2.init();
}

function createBotonsBoletesPinya() {
    p11 = new Boleta("#p11", null);
    p12 = new Boleta("#p12", null);
    p13 = new Boleta("#p13", null);
    p14 = new Boleta("#p14", null);
    p15 = new Boleta("#p15", null);
    p16 = new Boleta("#p16", null);
    p17 = new Boleta("#p17", null);
    p18 = new Boleta("#p18", null);
    p19 = new Boleta("#p19", null);

    p11.init();
    p12.init();
    p13.init();
    p14.init();
    p15.init();
    p16.init();
    p17.init();
    p18.init();
    p19.init();
}

/*
######################################################
######################################################
##########                                ############
##########    METODES PER ANIMAR          ############
##########                                ############
######################################################
######################################################
*/
// Easing excerpt from George McGinley Smith
// https://gsgd.co.uk/sandbox/jquery/easing/
jQuery.extend(jQuery.easing,
    {
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    });

function checkForNewAnimations() {
    if ((jQuery.inArray("baixos1", clickedButtons) !== -1) && (jQuery.inArray("baixos2", clickedButtons) !== -1) &&
        (jQuery.inArray("baixos3", clickedButtons) !== -1) && (jQuery.inArray("baixos4", clickedButtons) !== -1)) {
        animarSegons(6);
        setTimeout(function () {
            createBotonsBoletesSegons();
        }, 6100);
    }
    if ((jQuery.inArray("segons1", clickedButtons) !== -1) && (jQuery.inArray("segons2", clickedButtons) !== -1) &&
        (jQuery.inArray("segons3", clickedButtons) !== -1) && (jQuery.inArray("segons4", clickedButtons) !== -1)) {
        animarTercos(6);
        setTimeout(function () {
            createBotonsBoletesTercos();
        }, 6100);
    }
}

function removeAnimationAttr(_parentElement) {

    var paths = $(_parentElement).find('path');

    _parentElement.removeAttr("stroke").removeAttr("stroke-width").removeAttr("stroke-alignment").removeAttr("fill");

    $.each(paths, function () {

        if ((_parentElement.attr('id') === "pinya") || ((_parentElement.attr('id') === "pinya_linies"))) {
            $(this).css({
                'stroke-dashoffset': "",
                'stroke-dasharray': "",
                'stroke': ''
            });
        }
        else {
            $(this).css({
                'stroke-dashoffset': "",
                'stroke-dasharray': "",
                'transition': "",
                'fill': "#e3e3e3",
                'stroke': "",
                'transition-delay': ""
            });
        }
    });
}

function drawSVGPaths(_parentElement, _timeMax) {

    var paths = $(_parentElement).find('path');

    //for each PATH..
    $.each(paths, function () {

        //get the total length
        var totalLength = this.getTotalLength();

        if ((_parentElement.attr('id') === "pinya") || ((_parentElement.attr('id') === "pinya_linies"))) {
            //set PATHs to invisible
            $(this).css({
                'stroke-dashoffset': totalLength,
                'stroke-dasharray': totalLength + ' ' + totalLength,
                'stroke': 'url(#gradientInicial)'
            });
        }
        else {
            //set PATHs to invisible
            $(this).css({
                'stroke-dashoffset': totalLength,
                'stroke-dasharray': totalLength + ' ' + totalLength,
                'transition': "fill 2s ease",
                'fill': "#e3e3e3",
                'stroke': "#e3e3e3",
                'transition-delay': "3s"
            });
        }

        //animate
        $(this).animate({
            'stroke-dashoffset': 0
        }, {
            //duration: Math.floor(Math.random() * _timeMax) + _timeMin
            duration: _timeMax,
            easing: 'easeInOutQuad'
        });
    });
}

function startSVGAnimation(parentElement, segons) {
    drawSVGPaths(parentElement, segons * 1000);
}

function animarPinya(segons) {
    startSVGAnimation($('#pinya'), segons);
    startSVGAnimation($('#pinya_linies'), segons);
    setTimeout(function () {
        $('#pinya_linies').css("fill", "url(#gradientInicial)");
        $('#pinya').css("fill", "url(#gradientInicial)");
    }, (segons * 1000) - 1000);
}

function animarBaixos(segons) {
    startSVGAnimation($("#baixos"), segons);
    startSVGAnimation($("#baixos_linies"), segons);
}

function animarSegons(segons) {
    startSVGAnimation($("#segons"), segons);
    startSVGAnimation($("#segons_linies"), segons);
    setTimeout(function () {
        removeAnimationAttr($("#segons"));
        removeAnimationAttr($("#segons_linies"));
    }, segons * 1000 + 200)
}

function animarTercos(segons) {
    startSVGAnimation($("#tercos"), segons);
    startSVGAnimation($("#tercos_linies"), segons);
    setTimeout(function () {
        removeAnimationAttr($("#tercos"));
        removeAnimationAttr($("#tercos_linies"));
    }, segons * 1000 + 200)
}
/*
######################################################
######################################################
##########                                ############
##########           TRICKS               ############
##########                                ############
######################################################
######################################################
*/
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

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
