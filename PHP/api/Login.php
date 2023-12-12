<?php

class Login
{

    private $conn;



    public $login;
    public $password;

    public $id;


    public function __construct($db)
    {

        $this->conn = $db;
    }


    public function login($payload)

    {

        $resPld = [
            'logged' =>  false,
            'id'     =>   null,
            'login'  =>  null,
        ];

        $res = [];





        if (!$payload->logged) {



            $this->login = $payload->username;
            $this->password = $payload->password;




            $query = 'SELECT * FROM users WHERE login = :login';


            $statement = $this->conn->prepare($query);

            $statement->bindValue(':login', $this->login, PDO::PARAM_STR);

            $statement->execute();

            $res = $statement->fetch();



            if ($res) {

                $resPld = [

                    'logged' =>  $res['passport']  && password_verify($this->password, $res['passport']) ? true : false,
                    'id'     =>  $res['passport']  && password_verify($this->password, $res['passport']) ? $res['_id_'] : null,
                    'login'  =>  $res['passport']  && password_verify($this->password, $res['passport']) ? $res['login'] : null,

                ];
            }

            return $resPld;


        } else {



            return $resPld;

            

        }
    }
}
