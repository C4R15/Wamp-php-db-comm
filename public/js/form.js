$(document).ready(function() {
  //Submit
  $('#btnsubmit').on('click',function() {
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
});

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
