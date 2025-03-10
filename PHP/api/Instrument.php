<?php


class Instrument
{

    private $imgDir;


    public function __construct($imgDir)
    {

        $this->imgDir = $imgDir;
    }

    public function drawCompass($NKDG, $DM, $KZ, $fileId,$testBool)
    {

        $test = $testBool;
        $size = 100;
        $center = $size / 2;
        $radius = $size / 2 - 50;
        $image = imagecreatetruecolor($size, $size);

        $font = __DIR__ . '/fonts/Menlo.ttf';

        $white = imagecolorallocate($image, 255, 255, 255);
        $black = imagecolorallocate($image, 0, 0, 0);
        $red = imagecolorallocate($image, 255, 0, 0);
        $blue = imagecolorallocate($image, 0, 0, 255);
        $grey = imagecolorallocate($image, 128, 128, 128);

        // Wypełnienie tła
        imagefilledrectangle($image, 0, 0, $size, $size, $white);


        $this->drawRose($image, $center, $radius, $black, $NKDG, $KZ, $size, $font);
        $this->drawFace($image, $center, $radius, $black, $NKDG);

        $this->drawRotatedLine($image, $center, $center, $radius, $grey, 0);
        $this->drawRotatedLine($image, $center, $center, $radius, $black, $KZ);

        $this->drawWind($image, $center, $center, 40, $black, $DM, $NKDG);
        $this->drawRotatedArrowplane($image, $center, $center, 40, $black, $KZ);



        header("Content-Type: image/png");


        if ($test) {

            // test
            imagepng($image);

        } else {
            imagepng($image, __DIR__ . "/".$this->imgDir."/" . $fileId . ".png");
        }


        imagedestroy($image);
    }



    private function drawRose($img, $center, $r, $color, $NKDG, $KZ, $size, $font)
    {

    
        $directions = ["N", "E", "S", "W"];

        for ($i = 0; $i < 4; $i++) {

            $offset = [[0, 0], [0, 0], [0, 0], [0, 0]];

            $angle = (-$NKDG + 85) * pi() / 180 + $i * pi() / 2;
            $x = $center + cos($angle) * ($r - 38);
            $y = $center + sin($angle) * ($r - 38);


            // Kąt obrotu tekstu, aby był zawsze równoległy do promienia
            $textAngle = -($i * 90 + (-$NKDG));


            // Rysowanie liter z obrotem

            imagettftext($img, 8, $textAngle, round($x + $offset[$i][0]), round($y + $offset[$i][1]), $color, $font, $directions[$i]);

        }

        $text = "$KZ" . "°";
        $fontSize = 12;
        $textX = $size - 30; // Odsunięcie od prawej krawędzi
        $textY = $size - 3; // Odsunięcie od dolnej krawędzi
        imagettftext($img, $fontSize, 0, $textX, $textY, $color, $font, $text);


    }



    private function drawWind($img, $cx, $cy, $size, $color, $DM, $NKDG)
    {


        $x2 = 0;
        $y2 = 10;
        $s2 = 1.3;

        //ikona wiatru

        $wind = [
            [$x2 - 20 * $s2, $y2 - 33 * $s2],
            [$x2 + 0 * $s2, $y2 - 23 * $s2],
            [$x2 + 20 * $s2, $y2 - 33 * $s2],
            [$x2 + 0 * $s2, $y2 - 28 * $s2],
            [$x2 - 20 * $s2, $y2 - 33 * $s2]
        ];

        $rotatedPoints = [];

        foreach ($wind as [$x, $y]) {
            $angle = deg2rad($DM - $NKDG);
            $rx = (int) ($cx + $x * cos($angle) - $y * sin($angle));
            $ry = (int) ($cy + $x * sin($angle) + $y * cos($angle));
            $rotatedPoints[] = $rx;
            $rotatedPoints[] = $ry;
        }


        imagefilledpolygon($img, $rotatedPoints, $color);

    }

    private function drawRotatedArrowplane($img, $cx, $cy, $size, $color, $rotation)
    {

        // ikona samolotu

        $x = 0;
        $y = 3;
        $s = 1.1;

        $at3 = [
            [$x + 0 * $s, $y - 10 * $s],
            [$x - 1 * $s, $y - 10 * $s],
            [$x - 2 * $s, $y - 5 * $s],
            [$x - 14 * $s, $y - 5 * $s],
            [$x - 14 * $s, $y - 1 * $s],
            [$x - 2 * $s, $y + 0 * $s],
            [$x - 1 * $s, $y + 6 * $s],
            [$x - 6 * $s, $y + 6 * $s],
            [$x - 6 * $s, $y + 9 * $s],
            [$x - 1 * $s, $y + 9 * $s],
            [$x + 0 * $s, $y + 11 * $s],
            [$x + 1 * $s, $y + 9 * $s],
            [$x + 6 * $s, $y + 9 * $s],
            [$x + 6 * $s, $y + 6 * $s],
            [$x + 1 * $s, $y + 6 * $s],
            [$x + 2 * $s, $y + 0 * $s],
            [$x + 14 * $s, $y - 1 * $s],
            [$x + 14 * $s, $y - 5 * $s],
            [$x + 2 * $s, $y - 5 * $s],
            [$x + 1 * $s, $y - 10 * $s],
            [$x + 0 * $s, $y - 10 * $s]
        ];


        $rotatedPoints = [];

        foreach ($at3 as [$g, $h]) {
            $angle = deg2rad($rotation);
            $rx = (int) ($cx + $g * cos($angle) - $h * sin($angle));
            $ry = (int) ($cy + $g * sin($angle) + $h * cos($angle));
            $rotatedPoints[] = $rx;
            $rotatedPoints[] = $ry;
        }

        // Rysowanie strzałki jako wielokąt
        imagefilledpolygon($img, $rotatedPoints, $color);
    }


    private function drawRotatedLine($img, $cx, $cy, $r, $color, $rotation)
    {
        $angle = deg2rad($rotation - 90);
        $x1 = (int) ($cx + cos($angle) * (-$r + 40));
        $y1 = (int) ($cy + sin($angle) * (-$r + 40));
        $x2 = (int) ($cx + cos($angle) * ($r - 40));
        $y2 = (int) ($cy + sin($angle) * ($r - 40));
        imageline($img, $x1, $y1, $x2, $y2, $color);
    }


    private function array_some($array, $callback)
    {

        return count(array_filter($array, $callback)) > 0;

    }




    private function drawFace($img, $center, $r, $color, $rotationAngle)
    {




        for ($i = 0; $i < 360; $i++) {


            $rs = -5;
            $longi = [0, 30, 60, 90];

            $angle = deg2rad($i * 15 + $rotationAngle);

            if (!($i % 15)) {

                $x1 = $center + cos($angle) * ($r + 35);
                $y1 = $center + sin($angle) * ($r + 35);
                $x2 = $center + cos($angle) * ($r + 31);
                $y2 = $center + sin($angle) * ($r + 31);


            }
            if (($i % 15)) {

                $x1 = $center + cos($angle) * ($r - 33);
                $y1 = $center + sin($angle) * ($r - 33);
                $x2 = $center + cos($angle) * ($r - 33);
                $y2 = $center + sin($angle) * ($r - 33);


            }


            imageline($img, (int) $x1, (int) $y1, (int) $x2, (int) $y2, $color);

        }

    }



}



?>