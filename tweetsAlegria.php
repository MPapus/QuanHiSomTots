<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "277605732-cIafoQAwmpUMDyusLyR2FjiBOGKxbxKeMIITUYVd",
    'oauth_access_token_secret' => "K3iLR5gmYkY52X0ULRUu6yHXVUtxS26VPIIf1Z2wPNkvf",
    'consumer_key' => "YMv4Alhc5f7bmYL8g3oLhTQ53",
    'consumer_secret' => "YI090g3ztQKESDBHtgy5WsJgc2oSRK7QYiWodsr4bpNK0t220V"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **/
//$url = 'https://api.twitter.com/1.1/search/tweets.json';
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$requestMethod = 'GET';
$getField = '?q=%23QHSTAlegria';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getField)
             ->buildOauth($url, $requestMethod)
             ->performRequest(true);
