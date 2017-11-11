var boletesPinya = $.merge($.merge($.merge($("#cDB").find("path"), $("#cB4").find("path")), $("#cB3").find("path")), $("#cB2").find("path"));

var boletesTronc = $.merge($.merge($("#cB4").find("path"), $("#cB3").find("path")), $("#cB2").find("path"));

var usedTweets = {};

$(document).ready(function () {

    $.each(boletesPinya, function (i, e) {
        $(e).tooltipster({
            delay: 100,
            maxWidth: 500,
            speed: 300,
            interactive: true,
            content: '',
            contentAsHTML: true,
            animation: 'grow',
            trigger: 'custom',
            contentCloning: false
        });
    });

});

function initTweets() {

    var path = EMOCIO.properties[lastEmotionPlayed].name + ".php";

    $.ajax({
        type: 'GET',
        url: path,
        success: function (data) {

            var tweets = null;

            var text, user, hashtag, ttContent, img;

            tweets = JSON.parse(data);

            $(boletesPinya).shuffle().each(function (i, e) {
                var cTweet = tweets.statuses[i];
                if (typeof cTweet === 'undefined')
                    return false;

                var content = buildContent(cTweet);

                if (content !== false) {
                    $(e).tooltipster('content', content);
                    themesAndEvents(e);
                }
            });
        },
        error: function (res) {
            alert("Error finding tweets");
        }
    });


}

function actualitzarTweets() {

    var path = EMOCIO.properties[lastEmotionPlayed].name + ".php";

    resetTooltips();

    $.ajax({
        type: 'GET',
        url: path,
        success: function (data) {

            var tweets = null;

            var text, img, user, hashtag, ttContent, url;

            tweets = JSON.parse(data);

            var boletes = boletesPinya;

            if (fase >= FASE.Tercos)
                boletes = boletesTronc;

            $(boletes).shuffle().each(function (i, e) {
                var currentTweet = tweets.statuses[i];
                if (typeof  currentTweet === 'undefined')
                    return false;

                var content = buildContent(currentTweet);

                if (content !== false) {
                    $(e).tooltipster('content', content);
                    themesAndEvents(e);
                }
            });
        },
        error: function (res) {
            alert("Error finding tweets");
        }
    });
}

function buildContent(info) {

    var tweet = info;

    if (DictContainsValue(usedTweets, tweet.id_str) || typeof tweet === 'undefined') {
        usedTweets[tweet.id_str] = usedTweets[tweet.id_str] + 1;
        return false;
    }

    usedTweets[tweet.id_str] = 1;

    var text = tweet.full_text;

    var user = "@" + tweet.user.screen_name + ": ";

    var img = '';

    var url = 'href="https://twitter.com/statuses/' + tweet.id_str + '" target="_blank"';

    if ((typeof tweet.entities.media !== "undefined") && (tweet.entities.media !== null)) {

        var media = tweet.entities.media;

        img = '<div class="row">' +
            '<div class="col">' +
            '<img style="max-width: 75%; height: auto;" class="rounded mx-auto d-block" src=\'' + media[0].media_url_https + '\'/>' +
            '</div></div>';

        text = text.replace(' ' + tweet.entities.media[0].url, '');
    }

    return $('<a '+ url +'>' + img + '<div class="row"><div class="col text-left"><p style="margin-bottom: 0 !important;"><b>' + user + '</b>' + text + '</p></div></div></a>');
}

function themesAndEvents(e) {

    var theme = 'tooltipster-' + EMOCIO.properties[lastEmotionPlayed].name.toString();

    $(e).tooltipster('option', 'theme', theme);
    $(e).tooltipster('option', 'trigger', 'click');

    $(e).mouseenter(function () {
        if (lastEmotionPlayed !== null) {
            $(this).css("fill", EMOCIO.properties[lastEmotionPlayed].color).css("cursor", "pointer");
            $(this).addClass("pathHover");
        }
    }).mouseleave(function () {
        if (lastEmotionPlayed !== null) {
            var gradient = "url(#gradient" + EMOCIO.properties[lastEmotionPlayed].name.toString().charAt(0).toUpperCase() + EMOCIO.properties[lastEmotionPlayed].name.substr(1) + ")";
            $(this).css("fill", gradient).css("cursor", "default");
            $(this).removeClass("pathHover");
        }
    });
}

function resetTooltips() {

    usedTweets = {};

    $.each(boletesPinya, function (i, e) {
        $(e).tooltipster('destroy');
        $(e).off();
        $(e).unbind("mouseenter");
        $(e).unbind("mouseleave");
    });

    $.each(boletesPinya, function (i, e) {
        $(e).tooltipster({
            delay: 100,
            maxWidth: 500,
            speed: 300,
            interactive: true,
            content: '',
            contentAsHTML: true,
            animation: 'grow',
            trigger: 'custom',
            contentCloning: false
        });
    });
}
