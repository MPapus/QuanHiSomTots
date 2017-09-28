function Boleta (idBoletaHTML, video) {
    this.video = video;
    this.boleta = $(idBoletaHTML);

    this.getVideo = function () {
        return this.video;
    };

    this.getBoletaHTML = function () {
        return this.boleta;
    };

    this.init = function () {
        var vid = this.video;
        this.boleta.mouseenter(function() {
            $(this).css("fill", vid.getVideoColor()).css("cursor", "pointer");
        }).mouseleave(function() {
            $(this).css("fill", "#e3e3e3").css("cursor", "none");
        });
        this.boleta.on("click", function () {
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
                    btnSaltar.addClass("animate-flicker");
                    btnSaltar.show();
                }, 1000);
                window.vplayer.userActive(true);
                window.vplayer.isFullscreen(true);
            });

            window.vplayer.on("ended", function () {
                btnSaltar.removeClass("animate-flicker");
                amagarDivVideos();
                mostrarDivCastell();
                $(divCurrentVideo).hide();
                $("#pinya").children().css("fill", vid.getVideoColor());
                $("#pinya_linies").children().css("fill", vid.getVideoColor());
            });
        });
    }
}

function Video (videoTag, videoEmotion, videoColor, videoDiv) {
    this.videoTag = videoTag;
    this.videoDiv = "#video"  + videoDiv.toString().charAt(0).toUpperCase() + videoDiv.substr(1);
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
        window.vplayer.src({'src':videoSource, 'type':videoType});
    };
}

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

function requestFullScreen() {
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
}
