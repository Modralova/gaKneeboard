<?php


class Register
{

  private $conn;
  public $user;

  public $email;

  public $passport;

  public $role;


  public function __construct($db)
  {

    $this->conn = $db;

  }


  public function createAccount($payload, $role)
  {

    $this->user = $payload->username;
    $this->passport = $payload->password;
    $this->email = $payload->email;
    $this->role = $role;


    $query = 'CREATE DATABASE ' . $this->user . ";";

    $statement = $this->conn->prepare($query);

    $statement->execute();

    $this->addNewUserToDatabase();


  }

  private function addNewUserToDatabase()
  {


    $this->user = htmlentities($this->user, ENT_QUOTES, "UTF-8");
    $this->passport = htmlentities($this->passport, ENT_QUOTES, "UTF-8");

    $hashformat = "$2y$12$";
    $salt = $_ENV["PEPPER"];
    $hash = $hashformat . $salt;
    $this->passport = crypt($this->passport, $hash);

    $query = 'INSERT INTO `users` (login,passport,email,role) VALUES (
                                             ' . '"' . $this->user . '"' . ", "
      . '"' . $this->passport . '"' . ", "
      . '"' . $this->email . '"' . ", "
      . '"' . $this->role . '"' .
      ');';


    $statement = $this->conn->prepare($query);

    $statement->execute();

  }


  private function randomize($bytes)
  {


    $data = openssl_random_pseudo_bytes($bytes, $strong);
    assert($data !== false && $strong);


    // echo format_uuidv4($data);



  }

  private function format_uuidv4($data)
  {
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
  }


}









