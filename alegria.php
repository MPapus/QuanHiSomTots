<?php

require_once "twitteroauth/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

define('CONSUMER_KEY', '6yP5BfxSZp3b6CnLwrVQ8lGLI');
define('CONSUMER_SECRET', 'rcB2RSHPGgBudcXE2Z8OhgpvtMx7dBAZExDALRaA7Q7m6MRkgH');
define('ACCESS_TOKEN', '277605732-S1GkioNqVZkD12hBnlL1LyvpF3GGSdHfK5MX1H2g');
define('ACCESS_TOKEN_SECRET', 'Xfki6Uq6OHtyfPJ3izPmanz0UzMhkq4i2sOBq5GpTWsnI');


$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

$query = array(
  "q" => "#puigdemont",
  "result_type" => "popular",
  "count" => "36",
  "include_rts" => "false"
);

$statuses = $connection->get("search/tweets", $query);

echo json_encode($statuses);
?>
