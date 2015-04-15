<?php
	header('Access-Control-Allow-Origin: *');
	
	include "../Storage.php";

	if(isset($_POST['users'])){ $users = $_POST['users']; }

	$data = array(
		"users" => $users
	);

	$storage = new Storage();
	echo $storage->synchronizeUsers($data);
?>