<?php


class Routes
{


    private $conn;
    private $table = 'Routes';




    public function __construct($db)
    {
        $this->conn = $db;
    }

    private $IDs = [
        ["id", "int(11) NOT NULL AUTO_INCREMENT"],
        ["date", "date NOT NULL"],
        ["route_name", "text NOT NULL"],
        ["route_data", "text NOT NULL"]
    ];

    public $date;

    public $route_name;

    public $route_data;


    public function createRoutes()
    {


        $fields = "";

        foreach ($this->IDs as $column) {

            $fields = $fields . '`' . $column[0] . '`' . " " . $column[1] . ', ';
        }


        $fields = $fields . 'PRIMARY KEY (`id`),  UNIQUE(`route_name`)';


        $query = 'CREATE TABLE IF NOT EXISTS  `' . $this->table . '` ( ' . $fields . ')' .

            ' ENGINE=MyISAM AUTO_INCREMENT=1 ' .
            ' DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci; ';




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

    public function add($data)
    {


        $t = time();

        $this->date = date("Y-m-d", $t);




        $excl_IDs = ['id', 'date'];
        $excl_ = ['route_data', 'route_name'];


        $fields = "";



        foreach ($this->IDs as $val) {



            if (!$this->array_some($excl_IDs, fn($id) => $id === $val[0])) {

                $this->{$val[0]} = $data->{$val[0]};

                $fields = $fields . $val[0] . " = :" . $val[0] . ", ";

            }

        }

        $fields = $fields . "date" . " = :date";




        unset($val);


        $query = 'INSERT INTO ' . $this->table . ' SET ' . $fields;



        $statement = $this->conn->prepare($query);

        foreach ($this->IDs as $val) {

            if (!$this->array_some($excl_IDs, fn($item) => $item === $val[0])) {

                if (!$this->array_some($excl_, fn($item) => $item === $val[0])) {

                    $this->{$val[0]} = htmlspecialchars(strip_tags($this->{$val[0]}));
                }

                $statement->bindParam(":" . $val[0], $this->{$val[0]});

            }
        }

        $statement->bindParam(":date", $this->date);



        $this->date = htmlspecialchars(strip_tags($this->date));

        unset($val);

        if ($statement->execute()) {

            return true;
        }


        printf("ERROR: %s. \n", $statement->error);

        return false;

    }


    public function update($data)
    {


        $excl_IDs = ['id', 'date'];
        $excl_ = ["route_data","route_name"];


        $fields = "";

        foreach ($this->IDs as $val) {



            if (!$this->array_some($excl_IDs, fn($item) => $item === $val[0])) {

                $this->{$val[0]} = $data->{$val[0]};

                $fields = $fields . $val[0] . " = :" . $val[0] . ", ";

            }

        }


        $fields = substr($fields, 0, -2);

        unset($val);


        $query = 'UPDATE ' . $this->table . ' SET ' . $fields .

            ' WHERE route_name=' . '"' . $data->route_name . '"';


        // print $query;


        $statement = $this->conn->prepare($query);

        foreach ($this->IDs as $val) {

            if (!$this->array_some($excl_IDs, fn($item) => $item === $val[0])) {


                if (!$this->array_some($excl_, fn($item) => $item === $val[0])) {

                    $this->{$val[0]} = htmlspecialchars(strip_tags($this->{$val[0]}));
                }

                if ($val[0] !== "date") {

                    $statement->bindParam(":" . $val[0], $this->{$val[0]});

                }

            }
        }

        unset($val);

        if ($statement->execute()) {

            return true;
        }

        printf("ERROR: %s. \n", $statement->error);

        return false;

    }


    public function delete($route_name)
    {

        $this->route_name = $route_name;

        $query = 'DELETE FROM ' . $this->table .

            ' WHERE route_name=' . '"' . $this->route_name . '"';

        $statement = $this->conn->prepare($query);


        $this->route_name = htmlspecialchars(strip_tags($this->route_name));


        if ($statement->execute()) {

            return true;
        }

        printf("ERROR: %s. \n", $statement->error);

        return false;


    }

    private function array_some($array, $callback)
    {
        return count(array_filter($array, $callback)) > 0;
    }



}




?>