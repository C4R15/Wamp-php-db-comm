$(document).ready(function() {
  $('#button1').on('click',function() {
	  var name = $(this).attr('data-name');
	  contactServer(name);
  });
});

function contactServer(name) {
	$.ajax({
		data: {
			name: name
		},
		method: 'post',
		url: "ajax.php",
		success: function(result){
	   		console.log(result);
   		}
	});
}
