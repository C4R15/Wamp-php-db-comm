$(document).ready(function () {
	populateUserTable();
});

function populateUserTable() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://www.w3schools.com/website/customers_mysql.php";

	xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myFunction(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	function myFunction(response) {
	    var arr = JSON.parse(response);
	    var i;
	    var out = "<table>";

	    for(i = 0; i < arr.length; i++) {
	        out += "<tr><td>" +
	        arr[i].Name +
	        "</td><td>" +
	        arr[i].City +
	        "</td><td>" +
	        arr[i].Country +
	        "</td></tr>";
	    }
	    out += "</table>";
	    document.getElementById("userstable-div").innerHTML = out;
	}
}
