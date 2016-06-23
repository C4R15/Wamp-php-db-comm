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
if($action=="comparepass") {
	comparepass();
}

function insertData (){
	global $servername;
	global $username;
	global $password;
	global $dbname;

	$optionselect = $_POST['optionselect'];
	$forename = $_POST['forename'];
	$surname = $_POST['surname'];
	$password_enter1 = $_POST['password_enter1'];
	$password_enter1_s = (string)$password_enter1;
	$password_enter2 = $_POST['password_enter2'];
	$password_enter2_s = (string)$password_enter2;
	$email = $_POST['email'];

	if(	$optionselect == "USA" || $optionselect == "" ||
		$forename == "" ||
		$surname == "" ||
		$password_enter1_s != $password_enter2_s || $password_enter1 == "" || $password_enter2 == "" ||
		$email == "" ) { //|| ( $("#email").hasClass('invalid') )
		formSubmitError();
		die("Invalid data.");
	}

	//Encrypt password
	$salt = "It's high noon somewhere in the world.";
	$encryptedPassword = md5($password_enter1.$salt);
	$password_enter1 = $encryptedPassword;

	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    $stmt = $conn->prepare("INSERT INTO submissions ( forename, surname, password, email)
	    VALUES (:forename, :surname, :password, :email)");
		$stmt->bindParam(':forename', $forename);
		$stmt->bindParam(':surname', $surname);
		$stmt->bindParam(':password', $password_enter1);
		$stmt->bindParam(':email', $email);
		$stmt->execute();
	}
	catch(PDOException $e) {
	    echo "Connection failed: " . $e->getMessage();
	}
	$conn = null;
}

function formSubmitError() {
	echo '<script language="javascript">';
	echo 'alert("Invalid data.")';
	echo '</script>';
}

//Request
function fetchData() {
	global $servername;
	global $username;
	global $password;
	global $dbname;

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	//Search Whole Table bar password(submissions)
	$submissions = "SELECT id, forename, surname, email FROM submissions";
	$result = $conn->query($submissions);

	//To JSON Array
	$userarray = array();
    while($row = mysqli_fetch_assoc($result))
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

	$recordid = $_POST['recordid'];
	$forenameupdate = $_POST['forenameupdate'];
	$surnameupdate = $_POST['surnameupdate'];
	$emailupdate = $_POST['emailupdate'];

	try {
	    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

function comparepass() {
	global $servername;
	global $username;
	global $password;
	global $dbname;

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	//Search passwords (submissions)
	$passwords = "SELECT password FROM submissions";
	$result = $conn->query($passwords);

	//To Array
	$passwordsarray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $passwordsarray[] = $row;
    }

	$passwordsearch_id = $_POST['passwordsearch_id'];
	$passwordsearch_input = $_POST['passwordsearch_input_s'];

	$seachid = ($passwordsearch_id - 1);
	$passwordsarray_forid = $passwordsarray[$seachid];

	if ($passwordsearch_input == implode($passwordsarray_forid)) {
		passwordsMatchMsg();
	}
	else {
		passwordsDontMatch();
	}
}

function passwordsMatchMsg() {
	echo '<script language="javascript">';
	echo 'alert("Password Matches")';
	echo '</script>';
}

function passwordsDontMatch() {
	echo '<script language="javascript">';
	echo 'alert("Password Does Not Match")';
	echo '</script>';
}

?>
