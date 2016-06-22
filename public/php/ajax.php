<?php

//Connect to Database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phpservertest";

$action = $_POST['action'];

if($action=="submit") {
	insertData();
}

if($action=="request") {
	fetchData();
}

if($action=="update") {
	updateData();
}

function insertData (){
	global $servername;
	global $username;
	global $password;
	global $dbname;

	$salt = "These are not the droids you are looking for";

	if($_POST['optionselect'] == "Option 1" || $_POST['optionselect'] == "") {
		formSubmitError();
		die("Unselected or Unavailable in Your Area.");
	}

	//Option
	$optionselect = $_POST['optionselect'];

	//Forename
	$forename = $_POST['forename'];

	//Surname
	$surname = $_POST['surname'];

	//Password
	//Field 1
	$password_enter1 = $_POST['password_enter1'];
	//Field 2
	$password_enter2 = $_POST['password_enter2'];

	//Email
	$email = $_POST['email'];

	//Echo Log
	//echo "Option: ", $optionselect, " -- Name: ", $forename, " ", $surname, " -- Password: ", $password_enter1, ", ", $password_enter2, " -- Email: ", $email;


	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //echo "Connected successfully";

		$encryptedPassword = md5($password_enter1.$salt);

		$password_enter1 = $encryptedPassword;

		// prepare sql and bind parameters
	    $stmt = $conn->prepare("INSERT INTO submissions ( forename, surname, password, email)
	    VALUES (:forename, :surname, :password, :email)");
		$stmt->bindParam(':forename', $forename);
		$stmt->bindParam(':surname', $surname);
		$stmt->bindParam(':password', $password_enter1);
		$stmt->bindParam(':email', $email);
		$stmt->execute();

		//echo "New records created successfully";
	}
	catch(PDOException $e) {
	    echo "Connection failed: " . $e->getMessage();
	}
	$conn = null;
}

function formSubmitError() {
	echo '<script language="javascript">';
	echo 'alert("Unselected or Unavailable in Your Area.")';
	echo '</script>';
}

//Request
function fetchData() {
	global $servername;
	global $username;
	global $password;
	global $dbname;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	//Search Whole Table (submissions)
	$wholeSubmissions = "SELECT id, forename, surname, email FROM submissions";
	$result = $conn->query($wholeSubmissions);

	//To JSON Array
	$userarray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $userarray[] = $row;
    }
	echo json_encode($userarray);

	//Write to users.json
	//file_put_contents('../json/users.json', json_encode($userarray));
}

//Update
function updateData (){
	global $servername;
	global $username;
	global $password;
	global $dbname;

	//id
	$recordid = $_POST['recordid'];

	//Forename
	$forenameupdate = $_POST['forenameupdate'];

	//Surname
	$surnameupdate = $_POST['surnameupdate'];

	//Password
	//$password = $_POST['password'];

	//Email
	$emailupdate = $_POST['emailupdate'];


	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    //echo "Connected successfully";

		$sql = "UPDATE submissions SET
				forename = :forenameupdate,
				surname = :surnameupdate,
	            email = :emailupdate
	            WHERE id = :recordid";

		$stmt = $conn->prepare($sql);

		$stmt->bindParam(':forenameupdate',$forenameupdate, PDO::PARAM_STR);
		$stmt->bindParam(':surnameupdate', $surnameupdate, PDO::PARAM_STR);
		$stmt->bindParam(':emailupdate', $emailupdate, PDO::PARAM_STR);
		$stmt->bindParam(':recordid', $recordid, PDO::PARAM_STR);
		$stmt->execute();



		echo "Successful update.";
	}
	catch(PDOException $e) {
	    echo "Connection failed: " . $e->getMessage();
	}
	$conn = null;
}


?>
