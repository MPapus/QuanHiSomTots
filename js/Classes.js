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

    this.nodeName = null;

    this.boleta = $(idBoletaHTML);

    this.getVideo = function () {
        return this.video;
    };

    this.init = function (nodeName) {
        //si és instancia de Video llavors es una bola del tronc
        if (video instanceof Video) {

            var vid = this.getVideo();

            this.boleta.mouseenter(function () {
                $(this).css("fill", EMOCIO.properties[vid.getVideoEmotion()].color).css("cursor", "pointer");
                $(this).addClass("pathHover");
                var firstLetter = vid.getVideoTag().toString()[0].toLowerCase();
                var name = firstLetter === "c" ? "carol" : "miriam";
                tooltip.show('<img src=\'img/' + name + '.png\' width=\'150\' height=\'auto\'/>', 150);
            }).mouseleave(function () {
                $(this).css("fill", "#e3e3e3").css("cursor", "default");
                $(this).removeClass("pathHover");
                tooltip.hide();
            });

            this.boleta.on("click", function () {
                currentTreeNodeName = nodeName;
                if (!DictContainsValue(clickedButtons, this.id))
                    clickedButtons[this.id] = 1;
                else
                    clickedButtons[this.id] = clickedButtons[this.id] + 1;

                currentVideo = vid.getVideoTag();
                vid.changeSource();
                window.vplayer.play();

                setTimeout(function () {
                    btnSaltar.addClass("animate-flicker");
                    btnSaltar.show();
                }, 5000);

                lastEmotionPlayed = vid.getVideoEmotion();

                window.vplayer.one("ended", function () {
                    checkForNewAnimations();

                    lastEmotionPlayed = vid.getVideoEmotion();
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
    };

    this.clean = function () {
        this.boleta.unbind("mouseenter");
        this.boleta.unbind("mouseleave");
        this.boleta.off();
    }
}

function Video(videoTag, videoEmotion) {
    this.videoTag = videoTag;
    this.emotion = videoEmotion;

    this.getVideoEmotion = function () {
        return this.emotion;
    };

    this.getVideoTag = function () {
        return this.videoTag;
    };

    this.changeSource = function () {
        var debug = document.getElementById(currentVideo);
        var videoSource = debug.children[0].currentSrc;
        var videoType = "video/" + videoSource.split('.').pop();
        window.vplayer.src({'src': videoSource, 'type': videoType});
    };
}

function setUp() {

    initTrees();

    clickedButtons = {};

    amagarDivVideos();
    mostrarDivCastell();

    btnSaltar.removeClass("animate-flicker");
    btnSaltar.hide();

    setTimeout(function () {
        if (fase < FASE.Baixos) {
            fase = FASE.Baixos;
            animarBaixos();
        }
        else
            createBotonsBoletesBaixos();
    }, 1000);
}

function initTrees() {

    _DEBUT = new Tree('ACarol1', new Boleta("#baixos" + (a1[0] + 1).toString(), new Video("CAlegria", EMOCIO.Alegria)));
    _DEBUT.add('MAlegria2', new Boleta("#segons" + (a2[0] + 1).toString(), new Video("MAlegria", EMOCIO.Alegria)), 'ACarol1', _DEBUT.traverseBF);
    _DEBUT.add('CPor31', new Boleta("#tercos" + (a3[0] + 1).toString(), new Video("CPor", EMOCIO.Por)), 'MAlegria2', _DEBUT.traverseBF);
    _DEBUT.add('CTristesa41', new Boleta("#pom" + (a4[0] + 1).toString(), new Video("CTristesa", EMOCIO.Tristesa)), 'CPor31', _DEBUT.traverseBF);
    _DEBUT.add('CTristesa3', new Boleta("#tercos" + (a3[1] + 1).toString(), new Video("CTristesa", EMOCIO.Tristesa)), 'MAlegria2', _DEBUT.traverseBF);
    _DEBUT.add('CPor4', new Boleta("#pom" + (a4[0] + 1).toString(), new Video("CPor", EMOCIO.Por)), 'CTristesa3', _DEBUT.traverseBF);
    _DEBUT.add('CPor2', new Boleta("#segons" + (a2[1] + 1).toString(), new Video("CPor", EMOCIO.Por)), 'ACarol1', _DEBUT.traverseBF);
    _DEBUT.add('MPor3', new Boleta("#tercos" + (a3[0] + 1).toString(), new Video("MPor", EMOCIO.Por)), 'CPor2', _DEBUT.traverseBF);
    _DEBUT.add('CTristesa42', new Boleta("#pom" + (a4[0] + 1).toString(), new Video("CTristesa", EMOCIO.Tristesa)), 'MPor3', _DEBUT.traverseBF);
    _DEBUT.add('MAlegria4', new Boleta("#pom" + (a4[1] + 1).toString(), new Video("MAlegria", EMOCIO.Alegria)), 'MPor3', _DEBUT.traverseBF);
    _DEBUT.add('CRabia2', new Boleta("#segons" + (a2[2] + 1).toString(), new Video("CRabia", EMOCIO.Rabia)), 'ACarol1', _DEBUT.traverseBF);
    _DEBUT.add('CPor32', new Boleta("#tercos" + (a3[0] + 1).toString(), new Video("CPor", EMOCIO.Por)), 'CRabia2', _DEBUT.traverseBF);
    _DEBUT.add('CTristesa43', new Boleta("#pom" + (a4[0] + 1).toString(), new Video("CTristesa", EMOCIO.Tristesa)), 'CPor32', _DEBUT.traverseBF);


    _SEGONA = new Tree('MTristesa1', new Boleta('#baixos' + (a1[1] + 1).toString(), new Video("MTristesa", EMOCIO.Tristesa)));
    _SEGONA.add('MPor2', new Boleta('#segons' + (a2[3] + 1).toString(), new Video('MPor', EMOCIO.Por)), 'MTristesa1', _SEGONA.traverseBF);
    _SEGONA.add('MRabia3', new Boleta('#tercos' + (a3[2] + 1).toString(), new Video('MRabia', EMOCIO.Rabia)), 'MPor2', _SEGONA.traverseBF);
    _SEGONA.add('MAlegria4', new Boleta('#pom' + (a4[2] + 1).toString(), new Video('MAlegria', EMOCIO.Alegria)), 'MRabia3', _SEGONA.traverseBF);
    _SEGONA.add('CRabia31', new Boleta('#tercos' + (a3[3] + 1).toString(), new Video('CRabia', EMOCIO.Rabia)), 'MPor2', _SEGONA.traverseBF);
    _SEGONA.add('MRabia4', new Boleta('#pom' + (a4[3] + 1).toString(), new Video('MRabia', EMOCIO.Rabia)), 'CRabia31', _SEGONA.traverseBF);
    _SEGONA.add('CTristesa2', new Boleta('#segons' + (a2[2] + 1).toString(), new Video('CTristesa', EMOCIO.Tristesa)), 'MTristesa1', _SEGONA.traverseBF);
    _SEGONA.add('CRabia32', new Boleta('#tercos' + (a3[0] + 1).toString(), new Video('CRabia', EMOCIO.Rabia)), 'CTristesa2', _SEGONA.traverseBF);
    _SEGONA.add('MPor4', new Boleta('#pom' + (a4[3] + 1).toString(), new Video('MPor', EMOCIO.Por)), 'CRabia32', _SEGONA.traverseBF);
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
function initBtnHome() {
    clickedButtons[btnHome.attr("id")] = 0;
    btnHome.fadeIn(1500)
        .on("click", function () {

            btnHome.fadeOut(1500);

            clickedButtons[btnHome.attr("id")] = clickedButtons[btnHome.attr("id")] + 1;

            amagarCastellPintant();

            arr = [];
            parent = "";
            $.each(_TREE._root.children[0].children[0].children, function () {
                this.data.clean();
                arr.push(this.name);
                parent = this.parent.name;
            });

            $.each(arr, function () {
                _TREE.remove(this.toString(), parent, _TREE.traverseBF);
            });

            arr = [];
            parent = "";
            $.each(_TREE._root.children[0].children, function () {
                this.data.clean();
                arr.push(this.name);
                parent = this.parent.name;
            });

            $.each(arr, function () {
                _TREE.remove(this.toString(), parent, _TREE.traverseBF);
            });

            arr = [];
            parent = "";
            $.each(_TREE._root.children, function () {
                this.data.clean();
                arr.push(this.name);
                parent = this.parent.name;
            });

            $.each(arr, function () {
                _TREE.remove(this.toString(), parent, _TREE.traverseBF);
            });

            _DEBUT._root.data.clean();
            _SEGONA._root.data.clean();

            setTimeout(function () {
                fase = FASE.Pinya;
                setUp();
            }, 2000);
        });


}

function initBtnSaltar() {
    //fem set de l'event click
    btnSaltar.on("click", function () {
        window.vplayer.pause();
        if (fase < FASE.Baixos) {
            setUp();
            clickedButtons[btnSaltar.attr("id")] = 1;
        }
        else {
            clickedButtons[btnSaltar.attr("id")] = clickedButtons[btnSaltar.attr("id")] + 1;
            checkForNewAnimations(currentTreeNodeName);
        }
    });
}

function createBotonsBoletesBaixos() {
    _DEBUT._root.data.init(_DEBUT._root.name);
    _SEGONA._root.data.init(_SEGONA._root.name);
}

function createBotonsBoletesSegons() {

    if (currentTreeNodeName === "ACarol1") {
        $.each(_DEBUT._root.children, function () {
            this.data.init(this.name);
        });
        _TREE = _DEBUT;
        _SEGONA._root.data.clean();
    }
    else {
        $.each(_SEGONA._root.children, function () {
            this.data.init(this.name);
        });
        _TREE = _SEGONA;
        _DEBUT._root.data.clean();
    }
}

function createBotonsBoletesTercos() {
    $.each(_TREE._root.children[0].children, function () {
        this.data.init(this.name);
    });
}

function createBotonsBoletesPom() {

    $.each(_TREE._root.children[0].children[0].children, function () {
        this.data.init(this.name);
    });
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

    var arr = [];
    var parent = "";

    amagarDivVideos();
    mostrarDivCastell();

    btnSaltar.removeClass("animate-flicker");
    btnSaltar.hide();

    if (fase >= FASE.Pinya) {
        canviarColorPinya();
        actualitzarTweets();
    }

    if (fase === FASE.Pom)
        initBtnHome();

    if (((clickedButtons["baixos1"] >= 1) || (clickedButtons["baixos2"] >= 1) || (clickedButtons["baixos3"] >= 1) || (clickedButtons["baixos4"] >= 1))
        && fase < FASE.Segons) {
        if (fase < FASE.Pinya)
            setTimeout(function () {
                animarPinya();
                initTweets();
                fase = FASE.Segons;
                setTimeout(function () {
                    animarSegons();
                }, 4000);
            }, 1000);
        else {
            setTimeout(function () {
                fase = FASE.Segons;
                animarSegons();
            }, 1000);
        }
    }

    if (((clickedButtons["segons1"] >= 1) || (clickedButtons["segons2"] >= 1) || (clickedButtons["segons3"] >= 1) || (clickedButtons["segons4"] >= 1))
        && fase < FASE.Tercos) {

        arr = [];
        parent = "";
        $.each(_TREE._root.children, function () {
            if ((this.name !== currentTreeNodeName)) {
                this.data.clean();
                arr.push(this.name);
                parent = this.parent.name;
            }
        });

        $.each(arr, function () {
            _TREE.remove(this.toString(), parent, _TREE.traverseBF);
        });

        fase = FASE.Tercos;
        setTimeout(function () {
            amagarCD();
            setTimeout(function () {
                animarTercos();
            }, 1200)
        }, 1000);
    }

    if (((clickedButtons["tercos1"] >= 1) || (clickedButtons["tercos2"] >= 1) || (clickedButtons["tercos3"] >= 1) || (clickedButtons["tercos4"] >= 1))
        && fase < FASE.Pom) {

        arr = [];
        parent = "";
        $.each(_TREE._root.children[0].children, function () {
            if ((this.name !== currentTreeNodeName)) {
                this.data.clean();
                arr.push(this.name);
                parent = this.parent.name;
            }
        });

        $.each(arr, function () {
            _TREE.remove(this.toString(), parent, _TREE.traverseBF);
        });

        fase = FASE.Pom;
        setTimeout(function () {
            animarPom();
        }, 1000);
    }
}

function canviarColorPinya() {
    console.log("canvio color a: " + EMOCIO.properties[lastEmotionPlayed].name + "(" + EMOCIO.properties[lastEmotionPlayed].color + ")");
    var gradient = "url(#gradient" + EMOCIO.properties[lastEmotionPlayed].name.toString().charAt(0).toUpperCase() + EMOCIO.properties[lastEmotionPlayed].name.substr(1) + ")";

    var paths = $("#pinya").find("path");

    paths.each(function (i, e) {
        e.style.fill = EMOCIO.properties[lastEmotionPlayed].gradient;
    });
}

function animarPinya() {

    var paths = $("#c1").find("path");
    var pathscD = null;

    paths.each(function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.strokeLinecap = "round";
        e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
        e.style.strokeWidth = 6;
        if (i > 0) {
            var anim = "dash 1s linear forwards " + delay.toString();
            e.style.animation = anim;
        }
        else {
            e.style.animation = "dash 1s linear forwards"
        }
    });

    setTimeout(function () {

        paths = $("#c2").find("path");
        pathscD = $("#cD2").find("path");
        paths = $.merge(pathscD, paths);

        paths.each(function (i, e) {
            var delay = "0." + (i * 2).toString() + "s";
            e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
            e.style.strokeLinecap = "round";
            e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
            e.style.strokeWidth = 6;
            if (i > 0) {
                var anim = "dash 1s linear forwards " + delay.toString();
                e.style.animation = anim;
            }
            else {
                e.style.animation = "dash 1s linear forwards"
            }
        });

        setTimeout(function () {

            paths = $("#c3").find("path");
            pathscD = $("#cD3").find("path");
            paths = $.merge(pathscD, paths);

            paths.each(function (i, e) {
                var delay = "0." + (i * 2).toString() + "s";
                e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
                e.style.strokeLinecap = "round";
                e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
                e.style.strokeWidth = 6;
                if (i > 0) {
                    var anim = "dash 1s linear forwards " + delay.toString();
                    e.style.animation = anim;
                }
                else {
                    e.style.animation = "dash 1s linear forwards"
                }
            });

            setTimeout(function () {

                paths = $("#c4").find("path");
                pathscD = $("#cD4").find("path");
                paths = $.merge(pathscD, paths);

                paths.each(function (i, e) {
                    var delay = "0." + (i * 2).toString() + "s";
                    e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
                    e.style.strokeLinecap = "round";
                    e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
                    e.style.strokeWidth = 6;
                    if (i > 0) {
                        var anim = "dash 1s linear forwards " + delay.toString();
                        e.style.animation = anim;
                    }
                    else {
                        e.style.animation = "dash 1s linear forwards"
                    }
                });

                setTimeout(function () {
                    var pinya = $("#pinya")
                    paths = pinya.find("path");
                    paths.each(function (i, e) {
                        e.style.strokeDashoffset = e.strokeDasharray = "";
                        e.style.fill = EMOCIO.properties[lastEmotionPlayed].gradient;
                        e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
                        e.style.stroke = "";
                        e.style.strokeLinecap = "";
                        e.style.strokeWidth = "0";
                        e.style.animation = "";
                    });
                    $("#cD").removeAttr("clip-path");
                    pinya.removeAttr("clip-path");

                }, 2000);
            }, 900);
        }, 900);
    }, 900);
}

function animarBaixos() {
    var paths = $("#baixos").find("path");

    paths.each(function (i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
    });

    $("#baixos1").toggleClass("baixos1");
    $("#baixos2").toggleClass("baixos2");
    $("#baixos3").toggleClass("baixos3");
    $("#baixos4").toggleClass("baixos4");
    $("#linBai1").toggleClass("linBai1");
    $("#linBai2").toggleClass("linBai2");
    $("#linBai3").toggleClass("linBai3");
    $("#linBai4").toggleClass("linBai4");


    setTimeout(function () {
        createBotonsBoletesBaixos();
        $("#baixos").removeAttr("clip-path")
            .find("path").each(function (i, e) {
            e.style.fill = COLOR.Standard;
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
        });

        $("#baixos1").toggleClass("baixos1");
        $("#baixos2").toggleClass("baixos2");
        $("#baixos3").toggleClass("baixos3");
        $("#baixos4").toggleClass("baixos4");
        $("#linBai1").toggleClass("linBai1");
        $("#linBai2").toggleClass("linBai2");
        $("#linBai3").toggleClass("linBai3");
        $("#linBai4").toggleClass("linBai4");
        $('.navbar').show();
    }, 4500);
}

function animarSegons() {

    var segons = $("#segons");

    segons.attr("clip-path", "url(#clip-path-3)");

    $.each(segons.find("path"), function (i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.display = "";
        e.style.fill = "none";
    });

    $.each(segons.find("path"), function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeLinecap = "round";
        e.style.stroke = COLOR.Standard;
        e.style.strokeWidth = 6;
        if (i > 0) {
            e.style.animation = "dash 1s linear forwards " + delay.toString();
        }
        else {
            e.style.animation = "dash 1s linear forwards"
        }
    });

    setTimeout(function () {
        $.each(segons.removeAttr("clip-path").find("path"), function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.strokeWidth = 0;
            e.style.animation = "";
            e.style.fill = COLOR.Standard;
        });
        createBotonsBoletesSegons();
    }, 2000);
}

function animarTercos() {

    var tercos = $("#tercos");

    tercos.attr("clip-path", "url(#clip-path-2)");

    $.each(tercos.find("path"), function (i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.display = "";
        e.style.fill = "none";
    });

    $.each(tercos.find("path"), function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeLinecap = "round";
        e.style.stroke = COLOR.Standard;
        e.style.strokeWidth = 6;
        if (i > 0) {
            e.style.animation = "dash 1s linear forwards " + delay.toString();
        }
        else {
            e.style.animation = "dash 1s linear forwards"
        }
    });

    setTimeout(function () {
        $.each(tercos.removeAttr("clip-path").find("path"), function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.strokeWidth = 0;
            e.style.animation = "";
            e.style.fill = COLOR.Standard;
        });
        createBotonsBoletesTercos();
    }, 2000);
}

function animarPom() {


    var dosos = $("#dosos");
    var aixecador = $("#aixecador");
    var anxeneta = $("#anxeneta");

    var pom = $("#pom");

    pom.attr("clip-path", "url(#clip-path)");

    $.each(pom.find("path"), function (i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.display = "";
        e.style.fill = "none";
    });

    $.each(dosos.find("path"), function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeLinecap = "round";
        e.style.stroke = COLOR.Standard;
        e.style.strokeWidth = 6;
        if (i > 0) {
            e.style.animation = "dash 2s linear forwards " + delay.toString();
        }
        else {
            e.style.animation = "dash 2s linear forwards"
        }
    });

    setTimeout(function () {
        $.each(aixecador.find("path"), function (i, e) {
            var delay = "0." + (i * 2).toString() + "s";
            e.style.strokeLinecap = "round";
            e.style.stroke = COLOR.Standard;
            e.style.strokeWidth = 6;
            if (i > 0) {
                e.style.animation = "dash 2s linear forwards " + delay.toString();
            }
            else {
                e.style.animation = "dash 2s linear forwards"
            }
        });
        setTimeout(function () {
            $.each(anxeneta.find("path"), function (i, e) {
                var delay = "0." + (i * 2).toString() + "s";
                e.style.strokeLinecap = "round";
                e.style.stroke = COLOR.Standard;
                e.style.strokeWidth = 6;
                if (i > 0) {
                    e.style.animation = "dash 2s linear forwards " + delay.toString();
                }
                else {
                    e.style.animation = "dash 2s linear forwards"
                }
            });
        }, 1000);
    }, 1000);

    setTimeout(function () {
        $.each(pom.removeAttr("clip-path").find("path"), function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.strokeWidth = 0;
            e.style.animation = "";
            e.style.fill = COLOR.Standard;
        });
        createBotonsBoletesPom();
    }, 3500);
}

function amagarCD() {
    var paths = $("#cD")
        .find("path");

    paths.each(function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.strokeLinecap = "round";
        e.style.stroke = COLOR.Negre;
        e.style.strokeWidth = 6;
        if (i > 0) {
            e.style.animation = "dash 1s linear forwards " + delay.toString();
        }
        else {
            e.style.animation = "dash 1s linear forwards"
        }
    });

    setTimeout(function () {
        paths.each(function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.stroke = "none";
            e.style.strokeWidth = "";
            e.style.animation = "";
            e.style.fill = "none";
            e.style.display = "none";
        });
    }, 1000)
}

function amagarCastellPintant() {

    //AMAGAR CASTELL
    paths = $.merge($.merge($("#pom").find("path"), $("#tercos").find("path")), $("#segons").find("path"));

    paths.each(function (i, e) {
        var delay = "0." + (i * 2).toString() + "s";
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.strokeLinecap = "round";
        e.style.stroke = COLOR.Negre;
        e.style.strokeWidth = 8;
        if (i > 0) {
            e.style.animation = "dash 2s linear forwards " + delay.toString();
        }
        else {
            e.style.animation = "dash 2s linear forwards"
        }
    });

    setTimeout(function () {
        paths.each(function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.stroke = "none";
            e.style.strokeWidth = 0;
            e.style.animation = "";
            e.style.fill = "none";
        });
    }, 2000);


    //MOSTRAR TROÇET DE PINYA
    var cD = $("#cD");

    cD.attr("clip-path", "url(#clip-path-6)");

    $.each(cD.find("path"), function (i, e) {
        e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        e.style.display = "";
        e.style.fill = "none";
    });

    setTimeout(function () {
        $.each(cD.find("path"), function (i, e) {
            var delay = "0." + (i * 2).toString() + "s";
            e.style.strokeLinecap = "round";
            e.style.stroke = EMOCIO.properties[lastEmotionPlayed].gradient;
            e.style.strokeWidth = 6;
            if (i > 0) {
                e.style.animation = "dash 1s linear forwards " + delay.toString();
            }
            else {
                e.style.animation = "dash 1s linear forwards"
            }
        });
    }, 1000);

    setTimeout(function () {
        $.each(cD.removeAttr("clip-path").find("path"), function (i, e) {
            e.style.strokeDasharray = e.style.strokeDashoffset = "";
            e.style.strokeLinecap = "";
            e.style.strokeWidth = 0;
            e.style.animation = "";
            e.style.fill = EMOCIO.properties[lastEmotionPlayed].gradient;
        });
    }, 2800);
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
    Por: "#9D43C7",
    Standard: "#e3e3e3",
    Negre: "#000"
};

var GRADIENT = {
    Inicial: "url(#gradientIncial)",
    Alegria: "url(#gradientAlegria)",
    Rabia: "url(#gradientRabia)",
    Tristesa: "url(#gradientTristesa)",
    Por: "url(#gradientPor)"
};

var EMOCIO = {
    Alegria: 1,
    Tristesa: 2,
    Rabia: 3,
    Por: 4,
    properties: {
        1: {color: COLOR.Alegria, name: "alegria", gradient: GRADIENT.Alegria},
        2: {color: COLOR.Tristesa, name: "tristesa", gradient: GRADIENT.Tristesa},
        3: {color: COLOR.Rabia, name: "rabia", gradient: GRADIENT.Rabia},
        4: {color: COLOR.Por, name: "por", gradient: GRADIENT.Por}
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
$("#ajuda").click(function () {

    if (!ajuda) {
        $(".creditsPag").fadeOut(500);
        $(".ajudaPag").fadeIn(1000);
        ajuda = true;
    } else {
        $(".ajudaPag").fadeOut(1000);
        ajuda = false;
    }
});
//pagina aparte
$("#credits").click(function () {

    if (!credits) {
        $(".ajudaPag").fadeOut(500);
        $(".creditsPag").fadeIn(1000);
        credits = true;
    } else {
        $(".creditsPag").fadeOut(1000);
        credits = false;
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

var tooltip = function () {
    var id = 'tt';
    var top = 3;
    var left = 3;
    var maxw = 150;
    var speed = 10;
    var timer = 20;
    var endalpha = 95;
    var alpha = 0;
    var tt, t, c, b, h;
    var ie = document.all ? true : false;
    return {
        show: function (v, w) {
            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                t = document.createElement('div');
                t.setAttribute('id', id + 'top');
                c = document.createElement('div');
                c.setAttribute('id', id + 'cont');
                b = document.createElement('div');
                b.setAttribute('id', id + 'bot');
                tt.appendChild(t);
                tt.appendChild(c);
                tt.appendChild(b);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            tt.style.display = 'block';
            c.innerHTML = v;
            tt.style.width = w ? w + 'px' : 'auto';
            if (!w && ie) {
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block';
            }
            if (tt.offsetWidth > maxw) {
                tt.style.width = maxw + 'px'
            }
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function () {
                tooltip.fade(1)
            }, timer);
        },
        pos: function (e) {
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - h) + 'px';
            tt.style.left = (l + left) + 'px';
        },
        fade: function (d) {
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                } else if (alpha < speed && d == -1) {
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.zIndex = 1000;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none'
                }
            }
        },
        hide: function () {
            clearInterval(tt.timer);
            tt.timer = setInterval(function () {
                tooltip.fade(-1)
            }, timer);
        }
    };
}();

(function($) {
    $.fn.shuffle = function() {
        // credits: http://bost.ocks.org/mike/shuffle/
        var m = this.length, t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = this[m];
            this[m] = this[i];
            this[i] = t;
        }

        return this;
    };
}(jQuery));
