var boletes = $.merge($.merge($.merge($.merge($("#cDB").find("path"), $("#cB4").find("path")), $("#cB3").find("path")), $("#cB2").find("path")), $("#cB1"));

var usedTweets = {};

$(document).ready(function () {

    $.each(boletes, function (i, e) {
        $(e).tooltipster({
            delay: 100,
            maxWidth: 500,
            speed: 300,
            interactive: true,

            content: '',
            contentAsHTML: true,

            animation: 'grow',
            trigger: 'custom'
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

            var text, img, user, hashtag, ttContent;

            var tweet = 0;

            tweets = JSON.parse(data).statuses;

            $(boletes).each(function (i, e) {
                if (typeof  tweets[tweet] === 'undefined')
                    return false;
                var currentTweet = tweets[tweet];
                tweet = tweet + 1;

                if (DictContainsValue(usedTweets, currentTweet.id_str))
                    return;

                usedTweets[currentTweet.id_str] = usedTweets[currentTweet.id_str] + 1;

                if (tweet.retweet_count > 0) {
                    currentTweet = tweet.retweeted_status;
                }

                text = currentTweet.text;

                user = "@" + currentTweet.user.screen_name + ": ";

                if ((typeof currentTweet.entities.media !== "undefined") && (currentTweet.entities.media !== null)) {

                    var media = currentTweet.entities.media;

                    img = '<img width="300px" height="auto" class="image-responsive center-block" style="display: block !important; margin-bottom: 20px;" src=\'' + media[0].media_url_https + '\'/>';
                }

                ttContent = '<div class="row"><div class="col-md-10 col-md-offset-1 text-center">' + img + '</div></div><p><i>' + user + '</i>' + text + '</p>';

                var theme = 'tooltipster-' + EMOCIO.properties[lastEmotionPlayed].name.toString();
                $(e).tooltipster('content', $(ttContent));
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
                        $(this).css("fill", gradient).css("cursor", "none");
                        $(this).removeClass("pathHover");
                    }
                });
            });
        },
        error: function (res) {
            alert("Error finding tweets");
        }
    });


}

function actualitzarTweets() {

    var path = EMOCIO.properties[lastEmotionPlayed].name + ".php";

    usedTweets = {};

    $.each(boletes, function (i, e) {
        $(e).tooltipster('destroy');
    });

    $.each(boletes, function (i, e) {
        $(e).tooltipster({
            delay: 100,
            maxWidth: 500,
            speed: 300,
            interactive: true,

            content: '',
            contentAsHTML: true,

            animation: 'grow',
            trigger: 'custom'
        });
    });

    $.ajax({
        type: 'GET',
        url: path,
        success: function (data) {

            var tweets = null;

            var text, img, user, hashtag, ttContent;

            var tweet = 0;

            tweets = JSON.parse(data).statuses;

            $(boletes).each(function (i, e) {
                if (typeof  tweets[tweet] === 'undefined')
                    return false;
                var currentTweet = tweets[tweet];
                tweet = tweet + 1;

                if (DictContainsValue(usedTweets, currentTweet.id_str))
                    return;

                usedTweets[currentTweet.id_str] = usedTweets[currentTweet.id_str] + 1;

                if (tweet.retweet_count > 0) {
                    currentTweet = tweet.retweeted_status;
                }

                text = currentTweet.text;

                user = "@" + currentTweet.user.screen_name + ": ";

                if ((typeof currentTweet.entities.media !== "undefined") && (currentTweet.entities.media !== null)) {

                    var media = currentTweet.entities.media;

                    img = '<img width="300px" height="auto" class="image-responsive center-block" style="display: block !important; margin-bottom: 20px;" src=\'' + media[0].media_url_https + '\'/>';
                }

                ttContent = '<div class="row"><div class="col-md-10 col-md-offset-1 text-center">' + img + '</div></div><p><i>' + user + '</i>' + text + '</p>';

                var theme = 'tooltipster-' + EMOCIO.properties[lastEmotionPlayed].name.toString();

                $(e).tooltipster('content', $(ttContent));
                $(e).tooltipster('option', 'theme', theme);
                $(e).tooltipster('option', 'trigger', 'click');
            });
        },
        error: function (res) {
            alert("Error finding tweets");
        }
    });
}
