<?php
require __DIR__ . '/../vendor/autoload.php';
include 'DBconnect.php';
include './models/Logbook.php';
include './Login.php';
include './Register.php';


use Aspera\Spreadsheet\XLSX\Reader;
use Aspera\Spreadsheet\XLSX\ReaderConfiguration;
use Aspera\Spreadsheet\XLSX\ReaderSkipConfiguration;

use XLSXWriter\Export;
use XLSXWriter\Fill;
use XLSXWriter\Font;
use XLSXWriter\Border;
use XLSXWriter\Chart\PieChart\PieChart;
use XLSXWriter\Chart\LineChart\LineChart;
use XLSXWriter\Chart\LineChart\Line;
use XLSXWriter\Chart\Chart;


$fill = new Fill("solid", ["from" => "string", "value" => "white"]);

$font = new Font([
    "size"      =>  12,
    "name"      =>  "Menlo, Monaco, 'Courier New', monospace",
    "bold"      =>  false,
    "italic"    =>  false,
    "underline" =>  false,
    "color"     =>  [
        "from"  =>  "hex",
        "value" =>  "000000"
    ]
]);

$alignment = [
    "horizontal"    =>  "center",
    "vertical"      =>  "center",
    "wrapText"      =>  "0",
    "textRotation"  =>  "0"
];

$borderColor = [
    "from" => "string",
    "value" => "black;"
    // "value" => [
    //     "red" => 0,
    //     "green" => 0,
    //     "blue" => 0
    // ]
];

$border = new Border([
    "left"  =>  [
        "style" =>  "small",
        "color" =>  $borderColor
    ],
    "diagonal"  =>  [
        "style" =>  "medium",
        "color" =>  $borderColor
    ],
    "diagonalUp"    =>  true,
    "diagonalDown"  =>  true,
]);

$style = [
    "fill"          =>  $fill,
    "font"          =>  $font,
    "alignment"     =>  $alignment,
    //  "numberFormat"  =>  "##",
    // "border"        =>  $border
];

$imgAlignment = [
    "horizontal"    =>  "rigth",
    "vertical"      =>  "bottom",
    "wrapText"      =>  "0",
    "textRotation"  =>  "0"
];

$imgStyle = [

    "alignment"     =>  $imgAlignment
];

$legendAlignment = [
    "horizontal"    =>  "left",
    "vertical"      =>  "bottom",
    "wrapText"      =>  "0",
    "textRotation"  =>  "0"
];

$legendStyle = [
     "fill" => $fill,
    "alignment"     =>  $legendAlignment
];

$cookie_expires = 3600;



$reader = new Reader();
$writer = new XLSXWriter();
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();



$config = ["path" => "./xls/"];

$method = $_SERVER['REQUEST_METHOD'];
// session_unset();

if (!isset($_SESSION)) {
    ini_set("session.cookie_domain", '.localhost');
    session_set_cookie_params($cookie_expires, '/', '.localhost');
    session_start();
}




header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
header("Access-Control-Allow-Origin:".$_ENV["ORIGIN"]);
//header("Access-Control-Allow-Origin:".$_ENV["ORIGIN_IP"]);
//header("Access-Control-Allow-Origin: *");



if ($method == "POST") {

    $http_origin = $_SERVER['HTTP_REFERER'];
    //var_dump($http_origin);
}

$objDB = new DbConnect;
$conn = $objDB->connect();
$user_conn = null;

// HOMEVIEW

if ($method == "GET" && $_SERVER["REQUEST_URI"] == "/api/") {


    echo <<<END
    <!doctype html>
    <html lang="pl">
    <head>
    <meta charset="utf-8"/>
    
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta name="description" content="general aviations breafing tools"/>
    <meta name="keywords" content="TAF,METAR,GAMET,wind triangle, load, NOTAM, database">
   
    <script defer src="../dist/main.js"></script>
    <link href="../dist/main.css" rel="stylesheet">
    <title>gaKneeBoard</title>
    </head>
    <body>
    <div id="root"></div>
    </body>
    </html>
    END;
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


    $logbook->createLogbook();

    unset($logbook);
}




//TAF

if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/taf") {


    $json = file_get_contents($_ENV["AVIATION_URI"]);

    echo $json;
}

//SIGNIFICANT

if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/whether/significant") {



    // $img = file_get_contents("https://awiacja.imgw.pl/dane_cbpl/SWC_PL_EPWA.GIF");

    copy($_ENV["AVIATION_GIF_URI"], './xls/sgft.gif');
}

// GET PLANES

if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/LOAD/planes") {


    $useQuery = $conn->prepare("SELECT * FROM planes;");
    $useQuery->execute();

    $res = $useQuery->fetchAll();

    $json = json_encode($res);

    print_r($json);
}

//SAVE TO XLSX

if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/tov/save") {



    header('Content-Disposition: attachment; filename="output.xlsx"');
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize("./xls/output.xlsx"));
    ob_clean();
    flush();
    readfile("./xls/output.xlsx");
}




if ($method == "POST" && $_SERVER["REQUEST_URI"] ==  "/api/tov/save_") {    ///////////////////////////////




    $payload = array_reverse(json_decode(file_get_contents("php://input")));

    // var_dump($payload);


    $imgDir = "./xls/";

    foreach ($payload as &$value) {

        $imageFile = fopen($value->img->data, 'r');
        file_put_contents("./xls/" . $value->img->fileName . ".png", $imageFile);
        fclose($imageFile);
    }

    unset($value);

    $legends = ["section:", "NKDG:", "KB:", "TIME:", "KM:", "DIST:", "WIND:"];


    $xls_content = array();

    foreach ($payload as &$value) {

        $xls_content[] =

            [
                $value->from . "=>" . $value->to,
                $value->nkdg."°",
                $value->kb,
                $value->t,
                $value->km,
                $value->s."nm",
                $value->dm . $value->u . "KT"
            ];
    }

    unset($value);


    $sheetName = "sheet1";

    $maxRow = count($payload);
    $maxCol = count($legends);

    $export = new Export("export.xlsx");

    for ($col = 0; $col < $maxCol; $col++) {

        $export->addField($sheetName, 0, $col, $legends[$col], $style);
    }



    foreach ($xls_content as $rowNumber => $row) {

        for ($col = 0; $col < count($legends); $col++) {

            $export->addField($sheetName, $rowNumber + 1, $col, $row[$col], $style);
        }
    }

    for ($i = 1; $i <= count($payload); $i++) {

        $images[] =

            [
                'file' => "./xls/" . $payload[$i - 1]->id . ".png",
                "row"   =>  $i,
                "col"  => 8

            ];


    }

    $export->setColumnWidth($sheetName, 8, 1);
    $export->setColumnWidth($sheetName, 9, 1);
    $export->setRowHeight($sheetName, 1, 60);
    $export->setRowHeight($sheetName, 2, 60);
    $export->setRowHeight($sheetName, 3, 60);


    foreach ($images as $imageNum => $image) {


        $export->addField($sheetName, $imageNum + 1, $maxCol, " ", $style);
        $export->addImage($sheetName, $image['file'], $image['row'], $image['col'] - 1);
    }


    unset($row);


    $export->saveOnDisk("./xls");
    unset($export);
}

if ($method == "POST" && $_SERVER["REQUEST_URI"] ==  "/api/tov/save") {  /////////////////////////////////////////////////////////

    $payload = json_decode(file_get_contents("php://input"));

    // var_dump($payload);


    $imgDir = "./xls/";

    foreach ($payload as &$value) {

        $imageFile = fopen($value->img->data, 'r');
        file_put_contents("./xls/" . $value->img->fileName . ".png", $imageFile);
        fclose($imageFile);
    }

    for ($i = 1; $i <= count($payload); $i++) {

        $images[] =

            [
                'file' => "./xls/" . $payload[$i - 1]->id . ".png",
                "row"   =>  $i,
                "col"  => 8

            ];
    }



    $legends = ["section:", "NKDG:", "KB:", "TIME:", "KM:", "DIST:", "WIND:"];

    $xls_content = array();

    foreach ($payload as &$value) {

        $xls_content[] =

        [
            $value->from . "=>" . $value->to,
            $value->nkdg."°",
            $value->kb,
            $value->t,
            $value->km,
            $value->s."nm",
            $value->dm . $value->u . "KT"
        ];
    }

    $slice_count = strlen($value->from . "=>" . $value->to);


    $sheetName = "sheet1";

    $maxRow = count($payload);
    $maxCol = count($legends);

    $export = new Export("output.xlsx");



    foreach ($legends as $columnNum => $column) {                      // nazwy kolumn  

        $export->addField($sheetName, 0, $columnNum, $column, $legendStyle);
    }
    unset($column);



    foreach ($xls_content as $rowNumber => $row) {                     //  

        for ($col = 0; $col < count($legends); $col++) {

            $export->addField($sheetName, $rowNumber + 1, $col, $row[$col], $style);
        }
    }
    $export->setColumnWidth($sheetName, 0, $slice_count + 2);
    $export->setColumnWidth($sheetName, 1,strlen("NKDG:") + 2); 
    $export->setColumnWidth($sheetName, 2, strlen("000°") + 1);
    $export->setColumnWidth($sheetName, 3, strlen("00 00 00") + 2);
    $export->setColumnWidth($sheetName, 4, strlen("000°") + 1);
    $export->setColumnWidth($sheetName, 5, strlen("0000nm") + 1);
    $export->setColumnWidth($sheetName, 7, 1);
    $export->setColumnWidth($sheetName, 8, 5.5);

    $export->markMergedCells($sheetName, array("row" => 0, "col" => 6), array("row" => 0, "col" => 8));

    for ($i = 1; $i <= count($xls_content); $i++) {

        $export->setRowHeight($sheetName, $i, 60);
        $export->markMergedCells($sheetName, array("row" => $i, "col" => 7), array("row" => $i, "col" => 8));
    }
   
    foreach ($images as $imageNum => $image) {

        $export->addField($sheetName, $imageNum + 1, $maxCol, " ", $style);
        $export->addField($sheetName, $imageNum + 1, $maxCol + 1, " ", $style);
        $export->addImage($sheetName, $image['file'], $image['row'], $image['col']);
    }

    

    $export->saveOnDisk("./xls");
    unset($export);
}



if ($method == "POST" && $_SERVER["REQUEST_URI"] ==  "/api/logbook/save") {


    $data = json_decode(file_get_contents("php://input"));


    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);

    $logbook->add($data);

    unset($logbook);
}




if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/logbook/convertAW") {

    if (!isset($_SESSION['login'])) return;

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);



    $reader = new Reader();
    $reader->open('./xls/logbook_errata.xlsx');

    $logbook = new Logbook($user_conn);

    $sheets = $reader->getSheets();

    $logbook_content = array();

    foreach ($reader as $row_number => $row) {

        $logbook_content[] = $row;
    }

    $reader->close();


    $logbook->convert_AW_history($logbook_content, false);

    unset($reader);
    unset($logbook);
}



if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/logbook") {

    if (!isset($_SESSION['login'])) return;

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);


    $history = $logbook->readAll();


    $res = $history->fetchAll();


    $json = json_encode($res);



    print_r($json);

    unset($logbook);
}


if ($method == "POST" && $_SERVER["REQUEST_URI"] ==  "/api/logbook/upload") {

    if (!isset($_SESSION['login'])) return;

    $uploadDir  = "./xls/downloads/";

    $user_conn = $objDB->connectToUserDatabase($_SESSION['login']);

    $logbook = new Logbook($user_conn);

    $reader = new Reader();

    $uploadFile = $uploadDir . basename($_FILES['file']['name']);

    $allowedfileExtensions = array('xlsx');

    $fileNameCmps = explode(".", $uploadFile);

    $fileExtension = strtolower(end($fileNameCmps));


    if (in_array($fileExtension, $allowedfileExtensions)) {

        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
            echo "File  uploaded.\n";
        } else {

            echo 'An error occurred while uploading.';
        }
    } else {

        echo 'Upload failed as the file type is not acceptable. The allowed file types are:' . implode(',', $allowedfileExtensions);
    }


    $reader->open($uploadFile);


    $logbook_content = array();


    foreach ($reader as  $row) {

        $logbook_content[] = $row;
    }

    unset($row);

    $reader->close();

    $res = $logbook->addMenyfrom_AW_XLSX($logbook_content, true);




    if ($res) {

        unlink($uploadFile);
    }


    unset($reader);
    unset($logbook);
}

if ($method == "GET" && $_SERVER["REQUEST_URI"] ==  "/api/logbook/configuration") {

    $reader_configuration = (new ReaderConfiguration())
        ->setTempDir('./xls/Temp/')
        ->setSkipEmptyCells(ReaderSkipConfiguration::SKIP_EMPTY)
        ->setReturnDateTimeObjects(true)
        ->setCustomFormats(array(20 => 'hh:mm'));
    // For a full list of supported options and their effects, consult the in-code documentation of ReaderConfiguration.

    $spreadsheet = new Reader($reader_configuration);
}


