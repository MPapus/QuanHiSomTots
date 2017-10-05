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
        return this.boleta.attr("id");
    };

    this.init = function () {
        //si és instancia de Video llavors es una bola del tronc
        if (video instanceof Video) {
            var vid = this.getVideo();
            this.boleta.mouseenter(function () {
                $(this).css("fill", EMOCIO.properties[vid.getVideoEmotion()].color).css("cursor", "pointer");
                $(this).addClass("pathHover");
            }).mouseleave(function () {
                $(this).css("fill", "#e3e3e3").css("cursor", "none");
                $(this).removeClass("pathHover");
            });
            this.boleta.on("click", function () {
                if (!DictContainsValue(clickedButtons, vid.getVideoBoleta()))
                    clickedButtons[vid.getVideoBoleta()] = 1;
                else
                    clickedButtons[vid.getVideoBoleta()] = clickedButtons[vid.getVideoBoleta()] + 1;
                currentVideo = vid.getVideoTag();
                divCurrentVideo = vid.getVideoDiv();
                vid.changeSource();
                amagarDivCastell();
                mostrarDivVideos();
                $(divCurrentVideo).show();
                window.vplayer.play();
                window.vplayer.on('loadedmetadata', function () {
                    amagarDivCastell();
                    mostrarDivVideos();
                    window.vplayer.play();
                    lastEmotionPlayed = vid.getVideoEmotion();
                    setTimeout(function () {
                        btnSaltar.addClass("animate-flicker");
                        btnSaltar.show();
                    }, 1000);
                    window.vplayer.userActive(true);
                    window.vplayer.isFullscreen(true);
                });

                window.vplayer.on("ended", function () {
                    checkForNewAnimations();
                });
            });
        }
        //sino, és una bola de la pinya
        else {
            this.boleta.mouseenter(function () {
                if (lastEmotionPlayed !== null) {
                    $(this).css("fill", EMOCIO.properties[lastEmotionPlayed].color).css("cursor", "pointer");
                    $(this).addClass("pathHover");
                }
            }).mouseleave(function () {
                if (lastEmotionPlayed !== null) {
                    var gradient = "url(#gradient" + EMOCIO.properties[lastEmotionPlayed].name.toString().charAt(0).toUpperCase() + EMOCIO.properties[lastEmotionPlayed].name.substr(1) + ")";
                    $(this).css("fill", gradient).css("cursor", "none");
                    $(this).removeClass("pathHover");
                }
            });
        }
    }
}

function Video(videoTag, videoEmotion, boleta) {
    this.videoTag = videoTag;
    this.videoDiv = "#video" + boleta.toString().charAt(0).toUpperCase() + boleta.substr(1);
    this.emotion = videoEmotion;
    this.boleta = boleta;

    this.getVideoEmotion = function () {
        return this.emotion;
    };

    this.getVideoBoleta = function () {
        return this.boleta;
    };

    this.getVideoTag = function () {
        return this.videoTag;
    };

    this.getVideoDiv = function () {
        return this.videoDiv;
    };

    this.changeSource = function () {
        var debug = document.getElementById(currentVideo);
        var videoSource = debug.children[0].currentSrc;
        var videoType = "video/" + videoSource.split('.').pop();
        window.vplayer.src({'src': videoSource, 'type': videoType});
    };
}


function setUp() {
    amagarDivVideos();
    mostrarDivCastell();

    btnSaltar.removeClass("animate-flicker");
    btnSaltar.hide();

    setTimeout(function () {
        animarBaixos(4);
        setTimeout(function () {
            removeAnimationAttr($("#baixos"));
            removeAnimationAttr($("#baixos_linies"));
            createBotonsBoletesBaixos();
            $('.navbar').show();
        }, 3900);
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
        if (fase >= FASE.Baixos)
            $("#footer").fadeIn(1500);
        console.log("mostro castell");
    }
}

function amagarDivCastell() {
    if (mostrarCastell) {
        mostrarCastell = false;
        divCastell.fadeOut(1500);
        $("#footer").fadeOut(1500);
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
        window.vplayer.pause();
        if (fase < FASE.Baixos) {
            fase = FASE.Baixos;
            setUp();
            clickedButtons[btnSaltar.attr("id")] = 1;
        }
        else {
            clickedButtons[btnSaltar.attr("id")] = clickedButtons[btnSaltar.attr("id")] + 1;
            checkForNewAnimations();
        }
    });
}

function createBotonsBoletesBaixos() {
    baixos1 = new Boleta("#baixos1", new Video("CRabia", EMOCIO.Rabia, "baixos1"));
    baixos2 = new Boleta("#baixos2", new Video("MPor", EMOCIO.Por, "baixos2"));

    baixos1.init();
    baixos2.init();
    /*
    baixos3 = new Boleta("#baixos3", new Video("videoAlegriaMariona", EMOCIO.Alegria, "baixos3"));
    baixos4 = new Boleta("#baixos4", new Video("videoTristesaCarol", EMOCIO.Tristesa, "baixos4"));

    baixos3.init();
    baixos4.init();
    */
}

function createBotonsBoletesSegons() {
    /*
    segons1 = new Boleta("#segons1", new Video("CPor", EMOCIO.Por, "segons1"));
    segons2 = new Boleta("#segons2", new Video("MTristesa", EMOCIO.Tristesa, "segons2"));

    segons1.init();
    segons2.init();
    */
    segons3 = new Boleta("#segons3", new Video("CPor", EMOCIO.Por, "segons3"));
    segons4 = new Boleta("#segons4", new Video("MTristesa", EMOCIO.Tristesa, "segons4"));

    segons3.init();
    segons4.init();
}

function createBotonsBoletesTercos() {
    tercos1 = new Boleta("#tercos1", new Video("CAlegria", EMOCIO.Alegria, "tercos1"));
    tercos2 = new Boleta("#tercos2", new Video("MRabia", EMOCIO.Tristesa, "tercos2"));

    tercos1.init();
    tercos2.init();
    /*
    tercos3 = new Boleta("#tercos3", new Video("videoRabiaMariona", EMOCIO.Rabia, "tercos3"));
    tercos4 = new Boleta("#tercos4", new Video("videoPorMariona", EMOCIO.Por, "tercos4"));

    tercos3.init();
    tercos4.init();
    */
}

function createBotonsBoletesPom() {
    anxeneta = new Boleta("#anxeneta", new Video("CTristesa", EMOCIO.Tristesa, "anxeneta"));
    aixecador = new Boleta("#aixecador", new Video("MAlegria", EMOCIO.Alegria, "aixecador"));
    //dosos1 = new Boleta("#dosos1", new Video("videoPorMariona", EMOCIO.Por, "dosos1"));
    //dosos2 = new Boleta("#dosos2", new Video("videoRabiaMariona", EMOCIO.Rabia, "dosos2"));

    anxeneta.init();
    aixecador.init();
    //dosos1.init();
    //dosos2.init();
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

    btnSaltar.removeClass("animate-flicker");
    btnSaltar.hide();
    amagarDivVideos();
    mostrarDivCastell();
    if (fase >= FASE.Pinya)
        canviarColorPinnya();

    if (((clickedButtons[baixos1.boleta.attr("id")] >= 1) || (clickedButtons[baixos2.boleta.attr("id")] >= 1) /*|| (clickedButtons[baixos3.boleta.id] >= 1) || (clickedButtons[baixos4.boleta.id] >= 1)*/)
        && fase < FASE.Pinya) {
        fase = FASE.Pinya;
        animarPinya(4);
        setTimeout(function () {
            createBotonsBoletesPinya();
        }, 5000);
    }
    if (((clickedButtons["baixos1"] >= 1) && (clickedButtons["baixos2"] >= 1) /*|| (clickedButtons["baixos3"] >= 1) || (clickedButtons["baixos4"] >= 1)*/)
        && fase < FASE.Segons) {
        fase = FASE.Segons;
        animarSegons(6);
        setTimeout(function () {
            createBotonsBoletesSegons();
        }, 5000);
    }
    if ((/*(clickedButtons["segons1"] >= 1) || (clickedButtons["segons2"] || 1) ||*/ (clickedButtons["segons3"] >= 1) || (clickedButtons["segons4"] >= 1))
        && fase < FASE.Tercos) {
        fase = FASE.Tercos;
        animarTercos(6);
        setTimeout(function () {
            createBotonsBoletesTercos();
        }, 5000);
    }
    if (((clickedButtons["tercos1"] >= 1) || (clickedButtons["tercos2"] >= 1) /*|| (clickedButtons["tercos3"] >= 1) || (clickedButtons["tercos4"] >= 1)*/)
        && fase < FASE.Pom) {
        fase = FASE.Pom;
        animarPom(6);
        setTimeout(function () {
            createBotonsBoletesPom();
        }, 5000);
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

function canviarColorPinnya() {
    console.log("canvio color a: " + EMOCIO.properties[lastEmotionPlayed].name + "(" + EMOCIO.properties[lastEmotionPlayed].color + ")");
    var gradient = "url(#gradient" + EMOCIO.properties[lastEmotionPlayed].name.toString().charAt(0).toUpperCase() + EMOCIO.properties[lastEmotionPlayed].name.substr(1) + ")";
    $("#pinya").css("fill", gradient).children().css("fill", gradient).attr("fill", gradient);
    $("#pinya_linies").css("fill", gradient).children().css("fill", gradient).attr("fill", gradient);
}

function animarPinya(segons) {
    if (fase === FASE.Pinya) {
        startSVGAnimation(_pinya, segons);
        startSVGAnimation(_pinyaLinies, segons);
        setTimeout(function () {
            //_pinya.css("fill", "url(#gradientInicial)");
            //_pinyaLinies.css("fill", "url(#gradientInicial)");
            removeAnimationAttr(_pinya);
            removeAnimationAttr(_pinyaLinies);
            canviarColorPinnya();
        }, (segons * 1000) + 100);
    }
}

function animarBaixos(segons) {
    if (fase === FASE.Baixos) {
        startSVGAnimation(_baixos, segons);
        startSVGAnimation(_baixosLinies, segons);
        setTimeout(function () {
            removeAnimationAttr(_baixos);
            removeAnimationAttr(_baixosLinies);
        }, segons * 1000);
    }
}

function animarSegons(segons) {
    if (fase === FASE.Segons) {
        startSVGAnimation(_segons, segons);
        startSVGAnimation(_segonsLinies, segons);
        setTimeout(function () {
            removeAnimationAttr(_segons);
            removeAnimationAttr(_segonsLinies);
        }, segons * 1000);
    }
}

function animarTercos(segons) {
    if (fase === FASE.Tercos) {
        startSVGAnimation(_tercos, segons);
        startSVGAnimation(_tercosLinies, segons);
        setTimeout(function () {
            removeAnimationAttr(_tercos);
            removeAnimationAttr(_tercosLinies);
        }, segons * 1000);
    }
}

function animarPom(segons) {
    if (fase === FASE.Pom) {
        startSVGAnimation(_pom, segons);
        startSVGAnimation(_pomLinies, segons);
        setTimeout(function () {
            removeAnimationAttr(_pom);
            removeAnimationAttr(_pomLinies);
        }, segons * 1000);
    }
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

var FASE = {
    Intro: 0,
    Baixos: 1,
    Pinya: 2,
    Segons: 3,
    Tercos: 4,
    Pom: 5,
    Climax: 6
};

var COLOR = {
    Alegria: "#FFC14D",
    Tristesa: "#3DABBF",
    Rabia: "#FF5A4D",
    Por: "#9D43C7"
};

var EMOCIO = {
    Alegria: 1,
    Tristesa: 2,
    Rabia: 3,
    Por: 4,
    properties: {
        1: {color: COLOR.Alegria, name: "alegria"},
        2: {color: COLOR.Tristesa, name: "tristesa"},
        3: {color: COLOR.Rabia, name: "rabia"},
        4: {color: COLOR.Por, name: "euforia"}
    }
};

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
/*
$(document).mousemove(function (e) {
    if (fase > FASE.Baixos) {
        //mostrar navbar
        var desplegable = document.getElementsByClassName('dropdown-toggle')[0].getAttribute("aria-expanded");
        if ((e.clientY <= ((window.innerHeight * 0.05)))) {
            $('.navbar').show();
        }
        else {
            if ("true" !== desplegable)
                $('.navbar').hide();
        }
        lastMouseY = e.clientY;
    }
});
*/
//pagina aparte
$("#elProyecto").click(function () {

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
$("#losCreditos").click(function () {

    if (!creditos) {
        $(".proyectoPag").fadeOut(500);
        $(".creditosPag").fadeIn(1000);
        creditos = true;
    } else {
        $(".creditosPag").fadeOut(1000);
        creditos = false;
    }
});

$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {

    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    var event = state ? 'FullscreenOn' : 'FullscreenOff';

    if (event === 'FullscreenOff') {
        console.log("Exit FullScreen");
    } else if (event === 'FullscreenOn') {
        console.log("Enter FullScreen");
    }

});

/**
 * @return {boolean}
 */
function DictContainsValue(_dict, _value) {
    for (var key in _dict) {
        if (key === _value) {
            return true;
        }
    }
    return false;
}
