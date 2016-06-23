$(document).ready(function() {
  //Submit
  $('#btnsubmit').on('click',function() {
	  //Check option selected
	  checkOption();

	  //Check forename !null
	  var forename = $('#first_name').val();
	  var forename_s = forename.toString();
	  checkForename(forename_s);

	  //Check surname !null
	  var surname = $('#last_name').val();
	  var surname_s = surname.toString();
	  checkSurname(surname_s);

	  //Check paswords
	  var password1 = $('#password_enter1').val();
	  var password1_s = password1.toString();
	  var password2 = $('#password_enter2').val();
	  var password2_s = password2.toString();
	  comparePasswords(password1_s, password2_s);

	  //Check email is valid
	  var email = $('#email').val();
	  var email_s = email.toString();
	  validateEmail(email_s);

	  var optionselect = $('#optionselect').val();
	  var forename = $('#first_name').val();
	  var surname = $('#last_name').val();
	  var password_enter1 = $('#password_enter1').val();
	  var password_enter2 = $('#password_enter2').val();
	  var email = $('#email').val();
	  formSubmit(optionselect, forename, surname, password_enter1, password_enter2, email);
  });

  //Request
  $('#btnreq').on('click',function() {
	  var optionselect = $('#optionselect').val();
	  var forename = $('#first_name').val();
	  var surname = $('#last_name').val();
	  var password_enter1 = $('#password_enter1').val();
	  var password_enter2 = $('#password_enter2').val();
	  var email = $('#email').val();
	  formReq(optionselect, forename, surname, password_enter1, password_enter2, email);
  });

  //Update
  $('#userstable-div').on('click', '.updaterecord', function() {
	  var recordid = $(this).attr('data-id');
	  var forenameupdate = $('.record_'+recordid+' input[name="forenameinput"]').val();
	  var surnameupdate = $('.record_'+recordid+' input[name="surnameinput"]').val();
	  var emailupdate = $('.record_'+recordid+' input[name="emailinput"]').val();
	  formUpdate(recordid, forenameupdate, surnameupdate, emailupdate);
  });

  //Checking password for id on db from client
  $('#checkPassOnDbBtn').on('click', function() {
	 var passwordsearch_id = $('#passwordsearch_id').val();
	 var passwordsearch_input = $('#passwordsearch_input').val();
	 passwordsearch_input_s = passwordsearch_input.toString();
	 checkPassOnDb(passwordsearch_id, passwordsearch_input_s);
  });
});



//Check option selected
function checkOption() {
    var option = document.getElementById('optionselect');
	//console.log(option.value);

	if (option.value == "") {
		//console.log("No option");
		nooptionSelectedMsg();
	}
	else if (option.value == "USA") {
		console.log("USA selected");
	}
	else if (option.value == "UK") {
		console.log("UK selected");
	}
}

//Check forename !null
function checkForename(forename_s) {
	if (forename_s.length == 0) {
		noForenameMsg();
	}
}

//Check surname !null
function checkSurname(surname_s) {
	if (surname_s.length == 0) {
		noSurnameMsg();
	}
}


//Check equality of passwords
function comparePasswords(password1_s, password2_s) {
	if (password1_s != password2_s) {
		passwordsNotEqualMsg();
	}
	else if (password1_s.length == 0 || password2_s.length == 0) {
		passwordBlankMsg();
	}
	else if (password1_s.length > 0 && password1_s.length < 8) {
		passwordTooShortMsg();
	}
	else if (password1_s.length > 0 && password1_s == password2_s ) {
		passwordsMatchMsg();
	}
}

//Validate email
function validateEmail(email_s) {
	if ($('#email').hasClass("invalid")) {
		emailInvalidMsg();
	}
	else if (email_s.length == 0) {
		noEmailMsg();
	}
	else {
		emailValidMsg();
	}
}


//Message for option
function nooptionSelectedMsg() {
	alert("No option selected."); /*change this to a card*/
}

//Message for forename
function noForenameMsg() {
	alert("No forename completed."); /*change this to a card*/
}

//Message for surname
function noSurnameMsg() {
	alert("No surname completed."); /*change this to a card*/
}

//Messages for password
function passwordsNotEqualMsg() {
	alert("Passwords do not match."); /*change this to a card and make txtbxs red*/
}
function passwordBlankMsg() {
	alert("No password."); /*change this to a card*/
}
function passwordsMatchMsg() {
	alert("Passwords match."); /*change this to a card*/
}
function passwordTooShortMsg() {
	alert("Password to short, must be at least 8 chars or field left blank."); /*change this to a card*/
}

//Messages for email
function emailInvalidMsg() {
	alert("Invalid email."); /*change this to a card and make txtbxs red*/
}
function noEmailMsg() {
	alert("No email."); /*change this to a card and make txtbxs red*/
}
function emailValidMsg() {
	alert("Valid email."); /*change this to a card*/
}

//Submit data
function formSubmit(optionselect, forename, surname, password_enter1, password_enter2, email) {
	$.ajax({
		data: {
			action: 'submit',
			optionselect: optionselect,
			forename: forename,
			surname: surname,
			password_enter1: password_enter1,
			password_enter2: password_enter2,
			email: email
		},
		method: 'post',
		url: "../public/php/ajax.php",
		success: function(result){
	   		console.log(result);
   		}
	});
}

//Request
function formReq(optionselect, forename, surname, password_enter1, password_enter2, email) {
	$.ajax({
		data: {
			action: 'request',
			optionselect: optionselect,
			forename: forename,
			surname: surname,
			password_enter1: password_enter1,
			password_enter2: password_enter2,
			email: email
		},
		dataType:'json',
		method: 'post',
		url: "../public/php/ajax.php",
		success: function(userJson){
	   		renderUsers(userJson);
   		},
		error: function(a,b,c) {
			console.log(a,b,c);
		}
	});
}

function renderUsers(userJson) {
	var source   = $("#user-template").html();
	var template = Handlebars.compile(source);
	var html    = template(userJson);
	$('#userstable-div').html(html);
}

//Update
function formUpdate(recordid, forenameupdate, surnameupdate, emailupdate) {
	$.ajax({
		data: {
			action: 'update',
			recordid: recordid,
			forenameupdate: forenameupdate,
			surnameupdate: surnameupdate,
			emailupdate: emailupdate
		},
		method: 'post',
		url: "../public/php/ajax.php",
		success: function(result){
	   		console.log(result);
   		}
	});
}

//Check pass on db from client
function checkPassOnDb(passwordsearch_id, passwordsearch_input_s) {
	$.ajax({
		data: {
			action: 'comparepass',
			passwordsearch_id: passwordsearch_id,
			passwordsearch_input_s: passwordsearch_input_s
		},
		method: 'post',
		url: "../public/php/ajax.php",
		success: function(result){
	   		console.log(result);
   		}
	});
}
