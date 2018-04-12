// The root URL for the RESTful services
var carURL = "http://192.168.1.53:9080/ELITEREST/api/car";
var customerURL = "http://192.168.1.53:9080/ELITEREST/api/customer";
var bookingURL = "http://192.168.1.53:9080/ELITEREST/api/booking";


var currentCar;
var currentCustomer;
var currentBooking;



//Search function
var search =function(searchKey) {
	CarResetForm();
	if (searchKey == '')
		findAllCar();
	else
		findCarByName(searchKey);
};
//Search function
var search =function(searchKey) {
	CustomerResetForm();
	if (searchKey == '')
		findAllCustomer();
	else
		findCustomerByName(searchKey);
};
//Search function
var search =function(searchKey) {
	BookingResetForm();
	if (searchKey == '')
		findAllBooking();
	else
		findBookingByName(searchKey);
};

//New items
var newCar=function () {
	$('#carBtnDelete').hide();
	currentCar = {};
	renderDetailsCar(currentCar); // Display empty form
};
var newCustomer=function () {
	$('#customerBtnDelete').hide();
	currentCustomer = {};
	renderDetailsCustomer(currentCustomer); // Display empty form
};
var newBooking=function () {
	$('#bookingBtnDelete').hide();
	currentBooking = {};
	renderDetailsBooking(currentBooking); // Display empty form
};



var findAllCar=function() {
	console.log('Finding all Cars');
	$.ajax({
		type: 'GET',
		url: carURL,
		dataType: "json", // data type of response
		success: carRenderList
	});
};
var findAllCustomer=function() {
	console.log('Finding all Customers');
	$.ajax({
		type: 'GET',
		url: customerURL,
		dataType: "json", // data type of response
		success: customerRenderList
	});
};
var findAllBooking=function() {
	console.log('Finding all Bookings');
	$.ajax({
		type: 'GET',
		url: bookingURL,
		dataType: "json", // data type of response
		success: bookingRenderList
	});
};



//Seatch function
var findCarByName= function(searchKey) {
	console.log('Finding car by name: ' + searchKey); //CHECK THIS
	$.ajax({
		type: 'GET',
		url: carURL + '/search/' + searchKey,
		dataType: "json",
		success: carRenderList
	});
};
var findCustomerByName= function(searchKey) {
	console.log('Finding Customer by name: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: customerURL + '/search/' + searchKey,
		dataType: "json",
		success: customerRenderList
	});
};
var findBookingByName= function(searchKey) {
	console.log('Find Booking by name: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: bookingURL + '/search/' + searchKey,
		dataType: "json",
		success: bookingRenderList
	});
};








//Find by ID
var findCarById= function(id) {
	console.log('Find Car by ID: ' + id);
	$.ajax({
		type: 'GET',
		url: carURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#carBtnDelete').show();
			console.log('Find car by ID success: ' + data.carID);
			currentCar = data;
			renderDetailsCar(currentCar);
		}
	});
};
var findCustomerById= function(id) {
	console.log('Find Customer by ID: ' + id);
	$.ajax({
		type: 'GET',
		url: customerURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#customerBtnDelete').show();
			console.log('Find customer by ID success: ' + data.customer_id);
			currentCustomer = data;
			renderDetailsCustomer(currentCustomer);
		}
	});
};
var findBookingById= function(id) {
	console.log('Find Booking by ID: ' + id);
	$.ajax({
		type: 'GET',
		url: bookingURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#bookingBtnDelete').show();
			console.log('Find booking by ID success: ' + data.bookingID);
			currentBooking = data;
			renderDetailsBooking(currentBooking);
		}
	});
};




//Adding
var addCar = function () {
	console.log('Adding Car via Post...');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: carURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Car created successfully');
			$('#carBtnDelete').show();
			$('#carId').val(data.carID);
            findAllCar();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Adding Car via Post Error: ' + textStatus);
		}
	});
};
var addCustomer = function () {
	console.log('Adding new Customer via Post...');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: customerURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Customer created successfully');
			$('#customerBtnDelete').show();
			$('#customerId').val(data.customer_id);
            findAllCustomer();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error adding customer via Post: ' + textStatus);
		}
	});
};
var addBooking = function () {
	console.log('Adding new booking via Post...');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: bookingURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Booking created successfully');
			$('#bookingBtnDelete').show();
			$('#bookingID').val(data.id);
            findAllBooking();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error adding booking via Post: ' + textStatus);
		}
	});
};







//Update
var updateCar= function () {
	console.log('Updating Car using Put...');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: carURL + '/' + $('#carId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Car updated successfully');
            findAllCar();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Updating Car error: ' + textStatus);
		}
	});
};
var updateCustomer= function () {
	console.log('Updating Car via Put...');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: customerURL + '/' + $('#customerId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Customer updated successfully');
            findAllCustomer();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error Updating Car: ' + textStatus);
		}
	});
};
var updateBooking= function () {
	console.log('Updating Booking via Put...');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: bookingURL + '/' + $('#bookingId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Booking updated successfully');
            findAllBooking();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error Updating Booking: ' + textStatus);
		}
	});
};





//Delete functionality

var deleteCar=function() {
	console.log('Deleting Car by carID ...');
	$.ajax({
		type: 'DELETE',
		url: carURL + '/' + $('#carId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Car deleted successfully');
			CarResetForm();
            findAllCar();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error Deleting Car');
		}
	});
};

var deleteCustomer=function() {
	console.log('Deleting customer by customerID');
	$.ajax({
		type: 'DELETE',
		url: customerURL + '/' + $('#customerId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Customer deleted successfully');
			CustomerResetForm();
            findAllCustomer();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error deleting Customer');
		}
	});
};

var deleteBooking=function() {
	console.log('Deleting Booking by BookingID');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#bookingId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Booking deleted successfully');
			BookingResetForm();
            findAllBooking();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('Error Deleting Booking');
		}
	});
};










//Rendering Elements

var carRenderList = function(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$('#carList li').remove();
	$.each(list, function(index, car) {
		$('#carList').append('<li><a href="#" id="' + car.carID + '">'+ this.make +'</a></li>');
	});
};
var customerRenderList= function(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$('#customerList li').remove();
	$.each(list, function(index, customer) {
		$('#customerList').append('<li><a href="#" id="' + customer.customer_id + '">'+ customer.firstname +'</a></li>');
	});
};
var bookingRenderList= function(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$('#bookingList li').remove();
	$.each(list, function(index, booking) {
		$('#bookingList').append('<li><a href="#" id="' + booking.bookingId + '">'+ booking.pickupDate +'</a></li>');
	});
};





//renderDetails
var renderDetailsCar=function(car) {
	$('#carId').val(car.carId);
	$('#make').val(car.make);
	$('#model').val(car.model);
	$('#fuel_type').val(car.fuel_type);
	$('#engine_size').val(car.engine_size);
	$('#top_speed').val(car.top_speed);
  $('#price_per_day').val(car.price_per_day);
	// $('#pic').attr('src', 'resources/pics/' + wine.picture);
	// $('#description').val(wine.description);
};
var renderDetailsCustomer=function(customer) {
	$('#customer_id').val(customer.customer_id);
	$('#userName').val(customer.userName);
	$('#userPassword').val(customer.userPassword);
	$('#firstName').val(customer.firstName);
	$('#lastName').val(customer.lastName);
	$('#address').val(customer.address);
  $('#email').val(customer.email);
  $('#phoneNo').val(customer.phoneNo);
  $('#gender').val(customer.gender);
  $('#DOB').val(customer.DOB);
	// $('#pic').attr('src', 'resources/pics/' + wine.picture);
	// $('#description').val(wine.description);
};
var renderDetailsBooking=function(booking) {
	$('#bookingId').val(booking.bookingID);
	$('#carId').val(booking.carId);
	$('#customer_id').val(booking.customer_id);
	$('#PickupDate').val(booking.PickupDate);
	$('#DropOffDate').val(booking.DropOffDate);
	$('#bookingDate').val(booking.bookingDate);
	// $('#pic').attr('src', 'resources/pics/' + wine.picture);
	// $('#description').val(wine.description);
};






//For to JSON
// Helper function to serialize all the form fields into a JSON string
var CarsFormToJSON=function () {
	var carId = $('#carId').val();
	return JSON.stringify({
		"Car ID": carId == "" ? null : carId,
		"make": $('#make').val(),
		"model": $('#model').val(),
		"fuel_type": $('#fuel_type').val(),
		"engine_size": $('#engine_size').val(),
		"top_speed": $('#top_speed').val(),
    "price_per_day": $('#price_per_day').val()
  	// "picture": "generic.jpg",
		// "description": $('#description').val()
		});
};

var CustomerFormToJSON=function () {
	var customerId = $('#customerId').val();
	return JSON.stringify({
		"customer_id": customer_id == "" ? null : customer_id,
		"userName": $('#userName').val(),
		"userPassword": $('#userPassword').val(),
		"firstname": $('#firstname').val(),
		"lastName": $('#lastName').val(),
		"address": $('#address').val(),
    "email": $('#email').val(),
    "phoneNo": $('#phoneNo').val(),
    "gender": $('#gender').val(),
    "DOB": $('#DOB').val()
    // "year": $('#year').val(),
		// "picture": "generic.jpg",
		// "description": $('#description').val()
		});
};

var BookingFormToJSON=function () {
	var bookingId = $('#bookingId').val();
	return JSON.stringify({
		"bookingId": bookingId == "" ? null : bookingId,
		"carId": $('#carId').val(),
		"customer_id": $('#customer_id').val(),
		"PickupDate": $('#PickupDate').val(),
		"DropOffDate": $('#DropOffDate').val(),
		"BookingDate": $('#BookingDate').val()
		// "picture": "generic.jpg",
		// "description": $('#description').val()
		});
};







//RESETFORM
var CarResetForm=function(){
	$('#carId').val("");
	$('#make').val("");
	$('#model').val("");
	$('#fuel_type').val("");
	$('#engine_size').val("");
	$('#top_speed').val("");
  $('#price_per_day').val("");
	// $('#pic').attr('src', "");
	// $('#description').val("");
};

var CustomerResetForm=function(){
	$('#customer_id').val("");
	$('#userName').val("");
	$('#userPassword').val("");
	$('#firstName').val("");
  $('#lastName').val("");
	$('#address').val("");
	$('#email').val("");
	$('#phoneNo').val("");
  $('#gender').val("");
  $('#DOB').val("");
	// $('#pic').attr('src', "");
	// $('#description').val("");
};

var BookingResetForm=function(){
	$('#BookingID').val("");
	$('#carId').val("");
	$('#customer_id').val("");
	$('#PickupDate').val("");
	$('#DropOffDate').val("");
	$('#BookingDate').val("");
	// $('#pic').attr('src', "");
	// $('#description').val("");
};








//When the DOM is ready.
$(document).ready(function(){
	// Nothing to delete in initial application state
	$('#carBtnDelete').hide();
	$('#customerBtnDelete').hide();
  $('#bookingBtnDelete').hide();

  //The return false is cancelling the default browser action
	$(document).on('click','#carBtnSearch',function() {
		search($('#carSearchKey').val());
		return false;
	});
  $(document).on('click','#customerBtnSearch',function() {
    search($('#customerSearchKey').val());
    return false;
  });
  $(document).on('click','#bookingBtnSearch',function() {
    search($('#bookingSearchKey').val());
    return false;
  });

	// Trigger search when pressing 'Return' on search key input field

	$(document).on('keypress','#carSearchKey',function(e){
		if(e.which == 13) {
			search($('#carSearchKey').val());
			return false;
	    }
	});
  $(document).on('keypress','#customerSearchKey',function(e){
    if(e.which == 13) {
      search($('#customerSearchKey').val());
      return false;
      }
  });
  $(document).on('keypress','#bookingSearchKey',function(e){
    if(e.which == 13) {
      search($('#bookingSearchKey').val());
      return false;
      }
  });





	$(document).on('click','#carBtnAdd',function() {
		newCar();
		return false;
	});
  $(document).on('click','#customerBtnAdd',function() {
    newCustomer();
    return false;
  });
  $(document).on('click','#bookingBtnAdd',function() {
    newBooking();
    return false;
  });

//CHOOSES BETWEEN PUT AND POST
	//if the id is empty we are adding a new item - otherwise update
	$(document).on('click','#carBtnSave',function() {
		if ($('#carId').val() == '')
			addCar();
		else
			updateCar();
		return false;
	});
  $(document).on('click','#customerBtnSave',function() {
		if ($('#customer_id').val() == '')
			addCustomer();
		else
			updateCustomer();
		return false;
	});
  $(document).on('click','#bookingBtnSave',function() {
		if ($('#bookingId').val() == '')
			addBooking();
		else
			updateBooking();
		return false;
	});




//DELETE
	$(document).on('click','#carBtnDelete',function() {
		deleteCar();
		return false;
	});
  $(document).on('click','#customerBtnDelete',function() {
		deleteCustomer();
		return false;
	});
  $(document).on('click','#bookingBtnDelete',function() {
    deleteBooking();
    return false;
  });




//Links
	$(document).on("click", '#carList a', function(){findCarById(this.id);});
  $(document).on("click", '#customerList a', function(){findCustomerById(this.id);});
  $(document).on("click", '#bookingList a', function(){findBookingById(this.id);});



	//reset form
	CarResetForm();
	$('#carSearchKey').val("");
	findAllCar();

//reset form
CustomerResetForm();
$('#customerSearchKey').val("");
findAllCustomer();

//reset form
BookingResetForm();
$('#bookingSearchKey').val("");
findAllBooking();
});
