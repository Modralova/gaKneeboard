<?php


class DbConnect {
		
		public function connect() {

			try {
				$conn = new PDO('mysql:host=' .$_ENV["DB_HOST"] .';dbname=' .$_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}

		}


		public function connectToUserDatabase($login) {
			try {
				$conn = new PDO('mysql:host=' .$_ENV["DB_HOST"] .';dbname=' . $login, $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}

	}
