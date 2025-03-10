<?php


use Aspera\Spreadsheet\XLSX\Reader;
use Aspera\Spreadsheet\XLSX\ReaderConfiguration;
use Aspera\Spreadsheet\XLSX\ReaderSkipConfiguration;






class Logbook
{

    private $conn;
    private $table = 'Logbook';

    private $IDs = [
        ["id", "int(11) NOT NULL AUTO_INCREMENT",],
        ["date", "date NOT NULL"],
        ["departure_place", "varchar(10) DEFAULT NULL"],
        ["departure_time", "time DEFAULT NULL"],
        ["arrival_place", "varchar(10) DEFAULT NULL"],
        ["arrival_time", "time DEFAULT NULL"],
        ["aircraft_model", "varchar(10) DEFAULT NULL"],
        ["aircraft_registration", "varchar(10) DEFAULT NULL"],
        ["single_pilot_flightime_single_engine", "time DEFAULT NULL"],
        ["single_pilot_flightime_multi_engine", "time DEFAULT NULL"],
        ["multi_pilot_flightime", "time DEFAULT NULL"],
        ["block_time", "time DEFAULT NULL"],
        ["PIC_name", "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["landings_day", "int NOT NULL"],
        ["landings_night", "int NOT NULL"],
        ["operational_condition_time_night", "time DEFAULT NULL"],
        ["operational_condition_time_ifr", "time DEFAULT NULL"],
        ["pilot_function_time_PIC", "time DEFAULT NULL"],
        ["pilot_function_time_coPilot", "time DEFAULT NULL"],
        ["pilot_function_time_dual", "time DEFAULT NULL"],
        ["pilot_function_time_instructor", "time DEFAULT NULL"],
        ["task", 'varchar(32) DEFAULT NULL'],
        ["taxi_time", "time DEFAULT NULL"],
        ["air_time", "time DEFAULT NULL"]

    ];

    private $AWIDs = [

        ["`id`", "int NOT NULL AUTO_INCREMENT"],
        ["`﻿dzień`", "date NOT NULL"],
        ["`zlecenie na lot`", "varchar(20) DEFAULT NULL"],
        ["`znaki rejestracyjne`",  "varchar(10) DEFAULT NULL"],
        ["`statek powietrzny`",   "varchar(10) DEFAULT NULL"],
        ["`samolot wielosilnikowy`", "varchar(10) DEFAULT NULL"],
        ["`pilot/uczeń`", "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["`drugi pilot`", "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["`obserwator`",  "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["`instruktor`",  "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["`nadzór`",       "varchar(10) DEFAULT NULL"],
        ["`dowódca załogi`", "text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL"],
        ["`miejsce startu`", "varchar(10) DEFAULT NULL"],
        ["`miejsce lądowania`", "varchar(10) DEFAULT NULL"],
        ["`przelot po trasie`", "varchar(10) DEFAULT NULL"],
        ["`godzina startu`", "time DEFAULT NULL"],
        ["`godzina lądowania`", "time DEFAULT NULL"],
        ["`czas lotu`", "time DEFAULT NULL"],
        ["`początek kołowania`", "time DEFAULT NULL"],
        ["`koniec kołowania po locie`", "time DEFAULT NULL"],
        ["`czas blokowy`", "time DEFAULT NULL"],
        ["`IFR`", "time DEFAULT NULL"],
        ["`VFR`", "time DEFAULT NULL"],
        ["`VFR noc`", "time DEFAULT NULL"],
        ["`VFR spec`", "time DEFAULT NULL"],
        ["`VFR przyrz.`", "time DEFAULT NULL"],
        ["`godzina uruchomienia`", "time DEFAULT NULL"],
        ["`godzina wyłączenia`", "time DEFAULT NULL"],
        ["`czas pracy silnika`", "time DEFAULT NULL"],
        ["`mth przed lotem`",  "float(24) DEFAULT NULL"],
        ["`mth po locie`", "float(24) DEFAULT NULL"],
        ["`motogodziny`", "float(24) DEFAULT NULL"],
        ["`hobbs przed lotem`", "float(24) DEFAULT NULL"],
        ["`hobbs po locie`", "float(24) DEFAULT NULL"],
        ["`hobbs`", "float(24) DEFAULT NULL"],
        ["`ilość lotów`", "float(24) DEFAULT NULL"],
        ["`il. ląd.`", "float(24) DEFAULT NULL"],
        ["`il. touch and go`", "float(24) DEFAULT NULL"],
        ["`il. podejść`", "float(24) DEFAULT NULL"],
        ["`il. go around`", "float(24) DEFAULT NULL"],
        ["`rodzaj startu`", "varchar(10) DEFAULT NULL"],
        ["`czas holu za samolotem`", "time DEFAULT NULL"],
        ["`wysokość holu za samolotem`", "varchar(10) DEFAULT NULL"],
        ["`rodzaj lotu`", "varchar(10) DEFAULT NULL"],
        ["`nazwa produktu/usługi`", "varchar(10) DEFAULT NULL"],
        ["`szkolenie`", "varchar(10) DEFAULT NULL"],
        ["`zad./ćw.`", "varchar(32) DEFAULT NULL"],
        ["`wynik`", "varchar(20) DEFAULT NULL"],
        ["`uwagi`", "varchar(100) DEFAULT NULL"],
    ];

    public $date;
    public $departure_place;
    public $departure_time;
    public $arrival_place;
    public $arrival_time;
    public $aircraft_model;
    public $aircraft_registration;
    public $single_pilot_flightime_single_engine;
    public $single_pilot_flightime_multi_engine;
    public $multi_pilot_flightime;
    public $block_time;
    public $PIC_name;
    public $landings_day;
    public $landings_night;
    public $operational_condition_time_night;
    public $operational_condition_time_ifr;
    public $pilot_function_time_PIC;
    public $pilot_function_time_coPilot;
    public $pilot_function_time_dual;
    public $pilot_function_time_instructor;
    public $task;
    public $air_time;
    public $taxi_time;

    public function __construct($db)
    {
        $this->conn = $db;

        // var_dump("USER_CONN: ",$this->conn);
    }



    public function createLogbook()
    {


        $fields = "";

        foreach ($this->IDs as $column) {

            $fields = $fields . '`' . $column[0] . '`' . " " . $column[1] . ', ';
        }


        $fields = $fields . 'PRIMARY KEY (`id`)';


        $query = 'CREATE TABLE IF NOT EXISTS  `' . $this->table . '` ( ' . $fields . ')' .

            ' ENGINE=MyISAM AUTO_INCREMENT=1 ' .
            ' DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci; ';



        // var_dump( $query);  

        $statement = $this->conn->prepare($query);

       $statement->execute();
    }



    public function readAll()

    {

        $query = 'SELECT * FROM ' . $this->table;

        $statement = $this->conn->prepare($query);

        $statement->execute();

        return $statement;
    }

    public function readOne($id)

    {

        $query = 'SELECT * FROM ' . $this->table;

        $statement = $this->conn->prepare($query);

        $statement->execute();

        return $statement;
    }


    public function get_AW_history()

    {

        $query = 'SELECT * FROM ' . 'AW';

        $statement = $this->conn->prepare($query);

        $statement->execute();


        return $statement;
    }


    public function convert_AW_history($logbook, $save)

    {

        


        $fields =
            '
        `id` int NOT NULL AUTO_INCREMENT, 
        `﻿dzień` date NOT NULL,  
        `zlecenie na lot` varchar(20) DEFAULT NULL,
        `znaki rejestracyjne`  varchar(10) DEFAULT NULL,
        `statek powietrzny`    varchar(10) DEFAULT NULL,
        `samolot wielosilnikowy` varchar(10) DEFAULT NULL,
        `pilot/uczeń` text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL,
        `drugi pilot` text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL,
        `obserwator`  text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL,
        `instruktor`  text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL,
        `nadzór`       varchar(10) DEFAULT NULL,
        `dowódca załogi` text CHARACTER SET utf8mb3 COLLATE utf8mb3_polish_ci DEFAULT NULL,
        `miejsce startu` varchar(10) DEFAULT NULL,
        `miejsce lądowania` varchar(10) DEFAULT NULL,
        `przelot po trasie` varchar(10) DEFAULT NULL,
        `godzina startu` time DEFAULT NULL,
        `godzina lądowania` time DEFAULT NULL,
        `czas lotu` time DEFAULT NULL,
        `początek kołowania` time DEFAULT NULL,
        `koniec kołowania po locie` time DEFAULT NULL,
        `czas blokowy` time DEFAULT NULL,
        `IFR` time DEFAULT NULL,
        `VFR` time DEFAULT NULL,
        `VFR noc` time DEFAULT NULL,
        `VFR spec` time DEFAULT NULL,
        `VFR przyrz.` time DEFAULT NULL,
        `godzina uruchomienia` time DEFAULT NULL,
        `godzina wyłączenia` time DEFAULT NULL,
        `czas pracy silnika` time DEFAULT NULL,
        `mth przed lotem`  float(24) DEFAULT NULL,
        `mth po locie` float(24) DEFAULT NULL,
        `motogodziny` float(24) DEFAULT NULL,
        `hobbs przed lotem` float(24) DEFAULT NULL,
        `hobbs po locie` float(24) DEFAULT NULL,
        `hobbs` float(24) DEFAULT NULL,
        `ilość lotów` float(24) DEFAULT NULL,
        `il. ląd.` float(24) DEFAULT NULL,
        `il. touch and go` float(24) DEFAULT NULL,
        `il. podejść` float(24) DEFAULT NULL,
        `il. go around` float(24) DEFAULT NULL,
        `rodzaj startu` varchar(10) DEFAULT NULL,
        `czas holu za samolotem` time DEFAULT NULL,
        `wysokość holu za samolotem` varchar(10) DEFAULT NULL,
        `rodzaj lotu` varchar(10) DEFAULT NULL,
        `nazwa produktu/usługi` varchar(10) DEFAULT NULL,
        `szkolenie` varchar(10) DEFAULT NULL,
        `zad./ćw.` varchar(32) DEFAULT NULL,
        `wynik` varchar(20) DEFAULT NULL,
        `uwagi` varchar(100) DEFAULT NULL,
         UNIQUE KEY `id` (`id`)
        ';

        $cells = '`id`, ';

        foreach ($logbook[0] as  $cell) {    // nazwy kolumn

            $cells = $cells . '`'  . $cell . '`' . ', ';
        }

        $cells = substr($cells, 0, -2);

        unset($cell);


        $values = '';

        foreach ($logbook as $row_number => $row) {

            if ($row_number != 0) {

                $values = $values . '(' . $row_number . ', ';

                foreach ($row as $index => $cell) {

                    // rzutowanie dla pól wartościami liczbowymi

                    if ($index > 27 && $index < 39) {

                        $values = $values . intval($cell) . ', ';
                    } else {

                        $values = $values . '"' . $cell . '"' . ', ';
                    }
                }

                $values = substr($values, 0, -2);

                $values = $values . '), ';
            }
        }

        $values = substr($values, 0, -2);


        unset($row);
        unset($cell);
        unset($index);


        $query = 'CREATE TABLE IF NOT EXISTS `AW` ( ' . $fields . ')' .

            ' ENGINE=MyISAM AUTO_INCREMENT=1 ' .
            ' DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci; ' .


            ' INSERT INTO `AW` ( ' . $cells . ' ) VALUES ' .

            $values . '; ';




        $statement = $this->conn->prepare($query);

        if ($statement->execute()) {

            return true;
        }

        printf("ERROR: %s. \n", $statement->error);

        return false;
    }



    public function add($data)

    {






        $fields = "";

        foreach ($this->IDs as $val) {

            if ($val[0] !== "id") {

                $this->{$val[0]} = $data->{$val[0]};

                $fields = $fields  .  $val[0] . " = :" . $val[0] . ", ";
            }
        }


        $fields = substr($fields, 0, -2);   

        unset($val);


        $query = 'INSERT INTO ' . $this->table . ' SET ' . $fields;


        // print json_encode($this);


        $statement = $this->conn->prepare($query);

        foreach ($this->IDs as $val) {

            if ($val[0] !== "id") {

            $this->{$val[0]} = htmlspecialchars(strip_tags($this->{$val[0]}));


            $statement->bindParam(":" . $val[0], $this->{$val[0]});

            }
        }

        unset($val);

        if ($statement->execute()) {

            return true;
        }

        printf("ERROR: %s. \n", $statement->error);

        return false;


    }


    public function getRecord($data) {}

    public function updateRecord($data) 
    
    {

    
        $fields = "";

        foreach ($this->IDs as $val) {

            if ($val[0] !== "id") {

                $this->{$val[0]} = $data->{$val[0]};

                $fields = $fields  .  $val[0] . " = :" . $val[0] . ", ";
            }
        }







        $fields = substr($fields, 0, -2);   

        unset($val);


        $query = 'UPDATE ' . $this->table . ' SET ' . $fields . 
        
        ' WHERE id='.$data->id;


         print $query;


        $statement = $this->conn->prepare($query);

        foreach ($this->IDs as $val) {

            if ($val[0] !== "id") {

            $this->{$val[0]} = htmlspecialchars(strip_tags($this->{$val[0]}));


            $statement->bindParam(":" . $val[0], $this->{$val[0]});

            }
        }

        unset($val);

        if ($statement->execute()) {

            return true;
        }

        printf("ERROR: %s. \n", $statement->error);

        return false;


    }


    public function addMenyfrom_AW_XLSX($uploadDir,$save)
    {

        /*
     [0]=>"﻿dzień"
    [1]=>"zlecenie na lot"
    [2]=>"znaki rejestracyjne"
    [3]=>"statek powietrzny"
    [4]=>"samolot wielosilnikowy"
    [5]=>"pilot/uczeń"
    [6]=>"drugi pilot"
    [7]=>"obserwator"
    [8]=>"instruktor"
    [9]=>"nadzór"
    [10]=>"dowódca załogi"
    [11]=>"miejsce startu"
    [12]=> "miejsce lądowania"
    [13]=>"przelot po trasie"
    [14]=>"godzina startu"
    [15]=>"godzina lądowania"
    [16]=>"czas lotu"
    [17]=>"początek kołowania"
    [18]=>"koniec kołowania po locie"
    [19]=>"czas blokowy"
    [20]=>"IFR"
    [21]=>"VFR"
    [22]=>"VFR noc"
    [23]=>"VFR spec"
    [24]=> "VFR przyrz."
    [25]=>"godzina uruchomienia"
    [26]=>"godzina wyłączenia"
    [27]=>"czas pracy silnika"
    [28]=>"mth przed lotem"
    [29]=>"mth po locie"
    [30]=>"motogodziny"
    [31]=>"hobbs przed lotem"
    [32]=>"hobbs po locie"
    [33]=>"hobbs"
    [34]=>"ilość lotów"
    [35]=> "il. ląd."
    [36]=>"il. touch and go"
    [37]=>"il. podejść"
    [38]=>"il. go around"
    [39]=>"rodzaj startu"
    [40]=>"czas holu za samolotem"
    [41]=>"wysokość holu za samolotem"
    [42]=>"rodzaj lotu"
    [43]=>"nazwa produktu/usługi"
    [44]=>"szkolenie"
    [45]=>"zad./ćw."
    [46]=>"wynik"
    [47]=>"uwagi"
          */


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


    $history = array();


    foreach ($reader as $row) {

        $history[] = $row;
    }

    unset($row);

    $reader->close();

       
        
        $id = 1;
        $operation = new stdClass();
        $operation->chrono = [];
        $Logbook = [];


        foreach ($history as $r => $row) {

            if ($r != 0) {

                // $fligth = new stdClass();
                // $fligthData = new stdClass();


                $fligth = (object)[

                    'id' => $id,
                    'date' => $row[0],
                    'order' => $row[1],
                    'aircraft_registration' => $row[2],
                    'aircraft_model' => $row[3],
                    'multiEngine' => ($row[4] == 'nie') ? false : true,
                    'pilot' => $row[5],
                    'coPilot' => $row[7],
                    'instructor' => $row[8],
                    'nadzór' => ($row[9] === "nie") ? false : true,
                    'PIC_name' => $row[10],
                    'departure_place' => $row[11],
                    'arrival_place' => $row[12],
                    'route' => ($row[13] === "nie") ? false : true,
                    'operational_condition_time_ifr' => ($row[20] == "") ? "00:00:00" : $row[20],
                    'operational_condition_time_night' => ($row[22] == "") ? "00:00:00" : $row[22],
                    'task' => $row[45],

                ];

                $fligthData = (object)[

                    'date' => $row[0],
                    'departureTimeDateUTC' => $this->toUTC($row[0], $row[14]),
                    'arrivalTimeDateUTC' => $this->toUTC($row[0], $row[15]),

                    'inTheAir' =>  $row[16],

                    'taxiStartTimeDateUTC' => $this->toUTC($row[0], $row[17]),
                    'taxiEndTimeDateUTC' => $this->toUTC($row[0], $row[18]),

                    'totalTime' => $row[19],

                    'VFR' => ($row[21] == "") ? "00:00:00" : $row[21],
                    'VFRspec' => ($row[23] == "") ? "00:00:00" : $row[23],
                    'VFRinstr' => ($row[24] == "") ? "00:00:00" : $row[24],

                    'slice' => $history[$r][11] . " => " . $history[$r][12],

                    'taxiTime' => $this->countTaxiTime($row[0], $row[17], $row[18], $row[14], $row[15])
                ];

                if ($r < count($history) - 1 && ($history[$r][0] == $history[$r + 1][0])) {

                    if (
                        $history[$r][45] != $history[$r + 1][45] ||
                        $history[$r][11] . $history[$r][12] != $history[$r + 1][11] . $history[$r + 1][12] ||
                        $history[$r][10] != $history[$r + 1][10]
                    ) {


                        $operation->chrono[] = $fligthData;
                        $operation->landings_day = ($row[22] == "") ? count($operation->chrono) : 0;
                        $operation->landings_night = ($row[22] != "") ? count($operation->chrono) : 0;

                        $operation = (object) array_merge((array)$fligth, (array)$operation);


                        $operation->departure_time = $operation->chrono[0]->taxiStartTimeDateUTC;
                        $operation->arrival_time   = $operation->chrono[count($operation->chrono) - 1]->taxiEndTimeDateUTC;
                        $operation->begin_time = $operation->chrono[0]->departureTimeDateUTC;
                        $operation->end_time   = $operation->chrono[count($operation->chrono) - 1]->arrivalTimeDateUTC;


                        $operation->air_time = $this->countFligthTime($operation->chrono);
                        $operation->taxi_time = $this->countTotalTaxiTime($operation->chrono);
                        $operation->block_time = $this->countBlockTime($operation->date, $operation->air_time, $operation->taxi_time);

                        $operation->multi_pilot_flightime = ($row[6] != "") ? $operation->block_time : "00:00:00";

                        $operation->single_pilot_flightime_single_engine = ($row[6] == "" && $row[8] == ""
                            && !$operation->multiEngine)  ? $operation->block_time : "00:00:00";

                        $operation->single_pilot_flightime_multi_engine = ($row[6] == "" && $row[8] == ""
                            && $operation->multiEngine)  ? $operation->block_time : "00:00:00";



                        $operation->pilot_function_time_coPilot = ($row[5] == $row[6]) ? $operation->block_time :  "00:00:00";
                        $operation->pilot_function_time_instructor = ($row[5] == $row[8]) ? $operation->block_time :  "00:00:00";
                        $operation->pilot_function_time_PIC = ($row[5] == $row[10]) ? $operation->block_time :  "00:00:00";
                        $operation->pilot_function_time_dual = ($row[6] != "" || $row[8] != "") ? $operation->block_time : "00:00:00";


                        ////////
                        $Logbook[] = $operation;
                        ////////


                        $operation = new stdClass();
                        $operation->chrono = [];
                        $id++;
                    } else {

                        $operation->chrono[] = $fligthData;
                    }
                }

                if ($r < count($history) - 1 && ($history[$r][0] != $history[($r + 1)][0])) {


                    $operation->chrono[] = $fligthData;
                    $operation->landings_day = ($row[22] == "") ? count($operation->chrono) : 0;
                    $operation->landings_night = ($row[22] != "") ? count($operation->chrono) : 0;


                    $operation = (object) array_merge((array)$fligth, (array)$operation);

                    $operation->departure_time = $operation->chrono[0]->taxiStartTimeDateUTC;
                    $operation->arrival_time   = $operation->chrono[count($operation->chrono) - 1]->taxiEndTimeDateUTC;
                    $operation->begin_time = $operation->chrono[0]->departureTimeDateUTC;
                    $operation->end_time   = $operation->chrono[count($operation->chrono) - 1]->arrivalTimeDateUTC;

                    $operation->air_time = $this->countFligthTime($operation->chrono);
                    $operation->taxi_time = $this->countTotalTaxiTime($operation->chrono);
                    $operation->block_time = $this->countBlockTime($operation->date, $operation->air_time, $operation->taxi_time);


                    $operation->multi_pilot_flightime = ($row[6] != "") ? $operation->block_time : "00:00:00";

                    $operation->single_pilot_flightime_single_engine = ($row[6] == "" && $row[8] == ""
                        && !$operation->multiEngine)  ? $operation->block_time : "00:00:00";

                    $operation->single_pilot_flightime_multi_engine = ($row[6] == "" && $row[8] == ""
                        && $operation->multiEngine)  ? $operation->block_time : "00:00:00";


                    $operation->pilot_function_time_coPilot = ($row[5] == $row[6]) ? $operation->block_time :  "00:00:00";
                    $operation->pilot_function_time_instructor = ($row[5] == $row[8]) ? $operation->block_time :  "00:00:00";
                    $operation->pilot_function_time_PIC = ($row[5] == $row[10]) ? $operation->block_time :  "00:00:00";
                    $operation->pilot_function_time_dual = ($row[6] != "" || $row[8] != "") ? $operation->block_time : "00:00:00";




                    ////////
                    $Logbook[] =  $operation;
                    ////////

                    $operation = new stdClass();
                    $operation->chrono = [];
                    $id++;
                }
            }
        }

        unset($row);


        if ($save) {

            foreach ($Logbook as $record) {

                $this->add($record);
            }

            unset($record);
        }


        unlink($uploadFile);


    }



    private function countFligthTime($chrono)
    {

        $total = 0;

        foreach ($chrono as $fligth) {


            $minutes = strtotime(str_replace("-", "/", $fligth->date) . " " . $fligth->inTheAir);

            $total = $total + date($minutes);
        }

        unset($fligth);



        return date("H:i:s", $total);
    }

    private function countTaxiTime($date, $taxiStart, $taxiEnd, $departureTime, $arrivalTime)

    {

        $taxiStartDate = strtotime(str_replace("-", "/", $date . " " . $taxiStart));
        $taxiEndDate = strtotime(str_replace("-", "/", $date . " " . $taxiEnd));
        $departureDate = strtotime(str_replace("-", "/", $date . " " . $departureTime));
        $arrivalDate = strtotime(str_replace("-", "/", $date . " " . $arrivalTime));

        $beforeStartTaxiTime = $departureDate - $taxiStartDate;
        $afterLandingTaxiTime = $taxiEndDate - $arrivalDate;
        $totalTaxiTime = $beforeStartTaxiTime + $afterLandingTaxiTime;


        return (object)[

            'totalTaxiTime' => date("H:i:s", $totalTaxiTime),
            'beforeTaxiTime' => date("H:i:s", $beforeStartTaxiTime),
            'afterTaxiTime' => date("H:i:s", $afterLandingTaxiTime)

        ];
    }

    private function countTotalTaxiTime($chrono)

    {

        $totalMinutes = 0;

        foreach ($chrono as $fligth) {


            $minutes = strtotime(str_replace("-", "/", $fligth->date . " " . $fligth->taxiTime->totalTaxiTime));

            $totalMinutes = $totalMinutes +  intval(date("i", $minutes));
        }
        unset($fligth);

        return date("H:i:s", $totalMinutes * 60);
    }

    private function countBlockTime($date, $inTheAir, $onTheGround)

    {


        $inTheAirDate = strtotime(str_replace("-", "/", $date . " " . $inTheAir));
        $onTheGroundDate = strtotime(str_replace("-", "/", $date . " " . $onTheGround));


        $blockTime = $onTheGroundDate + $inTheAirDate;

        //var_dump(date("H:i:s", $blockTime));

        return date("H:i:s", $blockTime);
    }

    private function toUTC($date, $time)
    {

        $utc = strtotime(str_replace("-", "/", $date . " " . $time) . " " . 'Europe/Warsaw');


        return date('H:i:s', $utc);
    }




}
