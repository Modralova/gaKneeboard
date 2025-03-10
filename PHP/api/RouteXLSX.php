<?php


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








// $reader = new Reader();
// $writer = new XLSXWriter();









class RouteXLSX
{


    private $username;











    public function __construct($username)
    {
        $this->username = $username;
  
    }


    public function fillDocument($payload,$route_name)
    {

 





        $fill = new Fill("solid", ["from" => "string", "value" => "white"]);

        $font = new Font([
            "size" => 12,
            "name" => "Menlo, Monaco, 'Courier New', monospace",
            "bold" => false,
            "italic" => false,
            "underline" => false,
            "color" => [
                "from" => "hex",
                "value" => "000000"
            ]
        ]);

        $alignment = [
            "horizontal" => "center",
            "vertical" => "center",
            "wrapText" => "0",
            "textRotation" => "0"
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
            "left" => [
                "style" => "small",
                "color" => $borderColor
            ],
            "diagonal" => [
                "style" => "medium",
                "color" => $borderColor
            ],
            "diagonalUp" => true,
            "diagonalDown" => true,
        ]);

        $style = [
            "fill" => $fill,
            "font" => $font,
            "alignment" => $alignment,
            //  "numberFormat"  =>  "##",
            // "border"        =>  $border
        ];

        $imgAlignment = [
            "horizontal" => "rigth",
            "vertical" => "bottom",
            "wrapText" => "0",
            "textRotation" => "0"
        ];

        $imgStyle = [

            "alignment" => $imgAlignment
        ];

        $legendAlignment = [
            "horizontal" => "left",
            "vertical" => "bottom",
            "wrapText" => "0",
            "textRotation" => "0"
        ];

        $legendStyle = [
            "fill" => $fill,
            "alignment" => $legendAlignment
        ];


        $directory = "./" . $this->username;



        if (!is_dir($directory))

            mkdir($directory);

        if (is_dir($directory)) {


            foreach ($payload as &$value) {

                $canvasImage = new Instrument($this->username);

                $canvasImage->drawCompass($value->nkdg, $value->dm, $value->kz, $value->id, false);

                unset($canvasImage);

            }


            for ($i = 1; $i <= count($payload); $i++) {

                $images[] =

                    [
                        'file' => $directory . "/" . $payload[$i - 1]->id . ".png",
                        "row" => $i,
                        "col" => 8

                    ];
            }


            


            $legends = ["section:", "NKDG:", "KB:", "TIME:", "KM:", "DIST:", "WIND:"];

            $xls_content = array();

            foreach ($payload as &$value) {

                $xls_content[] =

                    [
                        " " . $value->from . "=>" . $value->to . "  ",
                        $value->nkdg . "°",
                        $value->kb,
                        $value->t,
                        $value->km,
                        $value->s . "nm",
                        $value->dm . $value->u . "KT"
                    ];
            }

            $slice_count = strlen(" " . $value->from . "=>" . $value->to);


            $sheetName = "sheet1";

            $maxRow = count($payload);
            $maxCol = count($legends);

            $export = new Export($route_name.".xlsx");



            foreach ($legends as $columnNum => $column) {                      // nazwy kolumn  

                $export->addField($sheetName, 0, $columnNum, $column, $legendStyle);
            }
            unset($column);



            foreach ($xls_content as $rowNumber => $row) {                     //  

                for ($col = 0; $col < count($legends); $col++) {

                    $export->addField($sheetName, $rowNumber + 1, $col, $row[$col], $style);
                }
            }
            $export->setColumnWidth($sheetName, 0, $slice_count + 4);
            $export->setColumnWidth($sheetName, 1, strlen("NKDG:") + 2);
            $export->setColumnWidth($sheetName, 2, strlen("000°") + 1);
            $export->setColumnWidth($sheetName, 3, strlen("00 00 00") + 2);
            $export->setColumnWidth($sheetName, 4, strlen("000°") + 1);
            $export->setColumnWidth($sheetName, 5, strlen("0000nm") + 1);
            $export->setColumnWidth($sheetName, 7, 1);
            $export->setColumnWidth($sheetName, 8, 9);

            $export->markMergedCells($sheetName, array("row" => 0, "col" => 6), array("row" => 0, "col" => 8));

            for ($i = 1; $i <= count($xls_content); $i++) {

                $export->setRowHeight($sheetName, $i, 52);
                $export->markMergedCells($sheetName, array("row" => $i, "col" => 7), array("row" => $i, "col" => 8));
            }

            foreach ($images as $imageNum => $image) {

                $export->addField($sheetName, $imageNum + 1, $maxCol, " ", $style);
                $export->addField($sheetName, $imageNum + 1, $maxCol + 1, " ", $style);
                $export->addImage($sheetName, $image['file'], $image['row'], $image['col']);
            }


            $export->saveOnDisk($directory);
            unset($export);


 
        }

       


    }

    public function downloadXSLX($route_name)
    {

        $directory = "./".$this->username;

        $file_name = htmlspecialchars_decode($route_name);
        $file_name = urldecode($route_name);


        header('Content-Disposition: attachment; filename="'.$file_name.'.xlsx"');
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($directory."/".$file_name.".xlsx"));
        ob_clean();
        flush();
        readfile($directory ."/".$file_name.".xlsx");


        $this->deleteFolder($directory);



    }

    private function deleteFolder($folder)
    {
        if (!is_dir($folder)) {

            return false;
        }


        $files = array_diff(scandir($folder), ['.', '..']);


        foreach ($files as $file) {
            $filePath = "$folder/$file";
            if (is_dir($filePath)) {
                $this->deleteFolder($filePath);

            } else {
                unlink($filePath);


            }
        }

        rmdir($folder);
        echo "🗑️ Folder '$folder' usunięty.\n";

        return true;
    }


}










?>