<?php
require __DIR__ . '/../vendor/autoload.php';
include 'DBconnect.php';
include './models/Logbook.php';
include './Login.php';
include './Register.php';
include './models/Routes.php';
include_once './Instrument.php';
include "./RouteXLSX.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


$cookie_expires = 3600;



$method = $_SERVER['REQUEST_METHOD'];

if (!isset($_SESSION)) {
    ini_set("session.cookie_domain", '.localhost');
    session_set_cookie_params($cookie_expires, '/', '.localhost');
    session_start();
}




header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
header("Access-Control-Allow-Origin:" . $_ENV["ORIGIN"]);
//header("Access-Control-Allow-Origin:".$_ENV["ORIGIN_IP"]);
//header("Access-Control-Allow-Origin: *");



if ($method == "POST") {

    $http_origin = $_SERVER['HTTP_REFERER'];

}

$objDB = new DbConnect;
$conn = $objDB->connect();
$user_conn = null;

// HOMEVIEW

$method = $_SERVER["REQUEST_METHOD"];



if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/") {


    echo <<<END
    <!doctype html>
    <html lang="pl">
    <head>
    <meta charset="utf-8"/>
    
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="description" content="general aviations breafing tools"/>
    <meta name="keywords" content="TAF,METAR,GAMET,wind triangle, load, NOTAM, database">
     <script defer src="/gaKneeboard/bundle.js"></script>
    <link href="/gaKneeboard/bundle.css" rel="stylesheet">
    <title>gaKneeBoard</title>
    </head>
    <body>
    <div id="root"></div>
    </body>
    </html>
    END;
    exit();
}

// LOGIN

if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/") {

    $payload = json_decode(file_get_contents("php://input"));

    $user = new Login($conn);

    $res = $user->login($payload);



    if ($res['logged']) {



        $_SESSION['logged_id'] = $res['id'];
        $_SESSION['logged'] = $res['logged'];
        $_SESSION['login'] = $res['login'];

        unset($_SESSION['bad_attempt']);
        setcookie("SESSLOGIN", $res['login'], time() + $cookie_expires, "/", ".localhost");
        $queryPld = json_encode($_SESSION);

        print_r($queryPld);
    }
    if (!$res['logged']) {


        $_SESSION['logged_id'] = $res['id'];
        $_SESSION['logged'] = $res['logged'];
        $_SESSION['login'] = $res['login'];



        $queryPld = json_encode($_SESSION);

        print_r($queryPld);

        session_unset();

        unset($user);
    }
}

if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/register") {



    $payload = json_decode(file_get_contents("php://input"));



    $register = new Register($conn);

    $register->createAccount($payload, "user");



    $user_conn = $objDB->connectToUserDatabase($payload->username);


    $logbook = new Logbook($user_conn);
    $routes = new Routes($user_conn);


    $logbook->createLogbook();
    $routes->createRoutes();



    unset($logbook);
    unset($routes);

}


//TAF

if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/taf") {


    $json = file_get_contents($_ENV["AVIATION_URI"]);

    echo $json;
}

//SIGNIFICANT

if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/whether/significant") {

    header("Content-Type: image/gif");
    
    $imageData = file_get_contents($_ENV["AVIATION_GIF_URI"]);

    echo $imageData;

}

// GET PLANES

if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/LOAD/planes") {


    $useQuery = $conn->prepare("SELECT * FROM planes;");
    $useQuery->execute();

    $res = $useQuery->fetchAll();

    $json = json_encode($res);

    print_r($json);
}


//TRIANGLE & ROUTE



//DOWNLOAD XLSX 

if ($method == "GET" && strtok($_SERVER["REQUEST_URI"], "?") == "/api/tov/save") {


    if (isset($_SESSION['login'])) {

        $dirName = $_SESSION['login'];


        $route_name = urldecode(isset($_GET["route_name"]) ? $_GET["route_name"] : "");


     
        $route = new RouteXLSX( $_SESSION['login']);


        $route->downloadXSLX($route_name);



    } else {


        return;

    }

}




//SAVE TO XLSX
if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/tov/save") {  /////////////////////////////////////////////////////////


    $payload = json_decode(file_get_contents("php://input"));



    if (isset($_SESSION['login'])) {

        $imgDir = "./" . $_SESSION['login'];


        $output = new RouteXLSX($_SESSION['login']);



        $output->fillDocument($payload->data,$payload->route_name);

    }


}


if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/tov") {

    if (!isset($_SESSION['login']))
        return;

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $routes = new Routes($user_conn);


    $history = $routes->readAll();


    $res = $history->fetchAll();


    $json = json_encode($res);


    print_r($json);

    unset($routes);


}


////////////////////<===========

if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/tov/dbsave") {


    $data = json_decode(file_get_contents("php://input"));

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $routes = new Routes($user_conn);

    $routes->add($data);

    unset($routes);
}


if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/tov/dbupdate") {



    $data = json_decode(file_get_contents("php://input"));

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $routes = new Routes($user_conn);

    $routes->update($data);

    unset($routes);
}


if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/tov/dbdelete") {



    $data = json_decode(file_get_contents("php://input"));

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $routes = new Routes($user_conn);



    $routes->delete($data->route_name);

    unset($routes);
}



//LOGBOOK

if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/logbook/save") {


    $data = json_decode(file_get_contents("php://input"));



    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);

    $logbook->add($data);


    unset($logbook);
}

if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/logbook/update") {


    $data = json_decode(file_get_contents("php://input"));



    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);

    $logbook->updateRecord($data);

    unset($logbook);
}



if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/logbook") {

    if (!isset($_SESSION['login']))
        return;

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);


    $history = $logbook->readAll();


    $res = $history->fetchAll();


    $json = json_encode($res);



    print_r($json);

    unset($logbook);
}


if ($method == "POST" && $_SERVER["REQUEST_URI"] == "/api/logbook/upload") {


    if (!isset($_SESSION['login']))
        return;

    $uploadDir = "./" . $_SESSION['login'];


    if (!is_dir($uploadDir))
        mkdir($uploadDir);


    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);


    $logbook = new Logbook($user_conn);

    /////////

    $logbook->addMenyfrom_AW_XLSX($uploadDir, true);


    unset($logbook);
}


if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/dump") {


    //    $canvasImage = new Instrument();
//     $canvasImage->drawCompass(0,270,-8,"instrument",true);
//     unset($canvasImage);


}


