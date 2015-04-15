<?php
class Storage {
	public $host = "";	
	public $server = "";
	public $password = "";
	public $dataBase = "";
	private $sql;

	public function Storage() {
		$debug = !true;
		if($debug) {
			$this->host = "localhost";	
			$this->server = "root";
			$this->password = "";
			$this->dataBase = "disney_tomorrowland";
		} else {
			$this->host = "localhost";	
			$this->server = "deaene.com.ar";
			$this->password = "arcomdeaene";
			$this->dataBase = "apps_deaene_com_ar";
		}
	}

	private function connect() {
		$this->sql = mysql_connect($this->host , $this->server , $this->password) or die ('Error al conectarse a sql');
		mysql_select_db($this->dataBase) or die ("Error al conectarse a la Base de Datos");
	}

	private function close() {
		mysql_close($this->sql);
	}

	public function synchronizeUsers($data){
		$this->connect();
		$users = json_decode($data['users'],true);
		foreach ($users as $user) {
			$query = 'INSERT INTO users_disney_tomorrowland (USER_TOMORROWLAND_NAME,USER_TOMORROWLAND_LAST_NAME,USER_TOMORROWLAND_BIRTH_DATE,USER_TOMORROWLAND_GENDER,USER_TOMORROWLAND_CONNECTED_DISNEY,USER_TOMORROWLAND_CONFIRM_LEGALS,USER_TOMORROWLAND_CREATED) VALUES (' . '"' . $user['USER_TOMORROWLAND_NAME'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_LAST_NAME'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_BIRTH_DATE'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_GENDER'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_CONNECTED_DISNEY'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_CONFIRM_LEGALS'] . '"' . ',' . '"' . $user['USER_TOMORROWLAND_CREATED'] . '"' . ')';
			mysql_query($query);
		}
		$this->overwriteUsersFile($users);
		$this->close();	
	}

	public function overwriteUsersFile($users){
		$txt = "";
		//var_dump($users["data"]);
		//foreach ($users["data"]["users"] as $user) {
		foreach ($users as $user) {
			$txt .= $user['USER_TOMORROWLAND_NAME'] . "|";
			$txt .= $user['USER_TOMORROWLAND_LAST_NAME'] . "|";
			$txt .= $user['USER_TOMORROWLAND_BIRTH_DATE'] . "|";
			$txt .= $user['USER_TOMORROWLAND_GENDER'] . "|";
			$txt .= $user['USER_TOMORROWLAND_CONNECTED_DISNEY'] . "|";
			$txt .= $user['USER_TOMORROWLAND_CONFIRM_LEGALS'] . "|";
			$txt .= $user['USER_TOMORROWLAND_CREATED'] . "|";
			$txt .= "\n";
		}
		$file = fopen("../../files/users.txt", "a") or die("No se puede abrir el archivo");
		fwrite($file, $txt);
		fclose($file);
	}
	
}

?>