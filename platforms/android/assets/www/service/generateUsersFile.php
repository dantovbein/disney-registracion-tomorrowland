<?php
	if(isset($_POST['users'])) { $users = json_decode($_POST["users"],true); }
	$txt = "";

	$txt .= "USER_NAME" . '|';
	$txt .= "USER_LAST_NAME" . '|';
	$txt .= "USER_BIRTH_DATE" . '|';
	$txt .= "USER_GENDER" . '|';
	$txt .= "USER_CONNECTED_DISNEY" . '|';
	$txt .= "USER_CONFIRM_LEGALS" . '|';

	foreach ($users as $user) {
		$txt .= $user["USER_NAME"] . '|';
		$txt .= $user["USER_LAST_NAME"] . '|';
		$txt .= $user["USER_BIRTH_DATE"] . '|';
		$txt .= $user["USER_GENDER"] . '|';
		$txt .= $user["USER_CONNECTED_DISNEY"] . '|';
		$txt .= $user["USER_CONFIRM_LEGALS"] . '|';
	}

	$file = fopen("../files/users.txt", "w") or die("No se puede abrir el archivo");
	fwrite($file, $txt);
	fclose($file);
?>