<?php
	if(isset($_POST['USER_NAME'])){ $userName = $_POST['USER_NAME']; }
	if(isset($_POST['USER_LAST_NAME'])){ $userLastName = $_POST['USER_LAST_NAME']; }
	if(isset($_POST['USER_BIRTH_DATE'])){ $userBirthDate = $_POST['USER_BIRTH_DATE']; }
	if(isset($_POST['USER_GENDER'])){ $userGender = $_POST['USER_GENDER']; }
	if(isset($_POST['USER_CONNECTED_DISNEY'])){ $userConnectedDisney = $_POST['USER_CONNECTED_DISNEY']; }
	if(isset($_POST['USER_CONFIRM_LEGALS'])){ $userConfirmLegals = $_POST['USER_CONFIRM_LEGALS']; }
	
	
	$txt = "";
	$txt .= "\n";
	$txt .= $userName . "|";
	$txt .= $userLastName . "|";
	$txt .= $userBirthDate . "|";
	$txt .= $userGender . "|";
	$txt .= $userConnectedDisney . "|";
	$txt .= $userConfirmLegals . "|";

	$file = fopen("../files/users.txt", "a") or die("No se puede abrir el archivo");
	fwrite($file, $txt);
	fclose($file);
?>