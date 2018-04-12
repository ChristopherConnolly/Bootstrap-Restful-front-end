// This declares the working root URL for the RESTful services
var rootURL = "http://localhost:9080/ELITEREST/api/car";

var currentCar;




//Search function
var search =function(searchKey) {
	resetForm();
	if (searchKey == '') 
		findAll();
	else
		findByengine_size(searchKey);
};



// called on('click','#btnAdd'....
var newCar=function () {
	$('#btnDelete').hide();
	currentCar = {};
	renderDetails(currentCar); // Display empty form
};



//Displays all 
var findAll=function() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
};



//Calls to AJAX as a search function
var findByengine_size= function(searchKey) {
	console.log('findByengine_size: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
};



var findById= function(id) {
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.carID);
			currentCar = data;
			renderDetails(currentCar);
		}
	});
};


//This is the code to add a new item
var addCar = function () {
	console.log('addWine');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Car created successfully');
			$('#btnDelete').show();
			$('#carID').val(data.carID);
            findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addCar error: ' + textStatus);
		}
	});
};


//This is the code to do a HTML PUT
var updateCar= function () {
	console.log('updateCar');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#carId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('car updated successfully');
            findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateCar error: ' + textStatus);
		}
	});
};


//This is the code to do a HTML delete
var deleteCar=function() {
	console.log('deleteCar');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#carId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Car deleted successfully');
			resetForm();
            findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteCar error');
		}
	});
};


//Writes a list of units
var renderList = function(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	$('#carList li').remove();
	$.each(list, function(index, wine) {
		$('#carList').append('<li><a href="#" id="' + car.carID + '">'+ carID +'</a></li>');
	});
};


//This creates an object with the different attributes in it.
var renderDetails=function(wine) {
	$('#carID').val(wine.id);
	$('#engine_size').val(wine.engine_size);
	$('#fuel_type').val(wine.fuel_type);
	$('#make').val(wine.make);
	$('#model').val(wine.model);
	$('#price_per_day').val(wine.price_per_day);
	//$('#pic').attr('src', 'resources/pics/' + wine.picture);
	//$('#description').val(wine.description);
};



// Helper function to serialize all the form fields into a JSON string
//Used to add units and do HTML PUT
var formToJSON=function () {
	var carID = $('#carID').val();
	return JSON.stringify({
		"carID": carID == "" ? null : carID, 
		"engine_size": $('#engine_size').val(), 
		"fuel_type": $('#fuel_type').val(),
		"make": $('#make').val(),
		"model": $('#model').val(),
		"price_per_day": $('#price_per_day').val(),
        "top_speed": $('top_speed').val(),
	//	"picture": "generic.jpg",
	//	"description": $('#description').val()
		});
};


// Called to clear form
var resetForm=function(){
	$('#carID').val("");
	$('#engine_size').val("");
	$('#fuel_type').val("");
	$('#make').val("");
	$('#model').val("");
	$('#price_per_day').val("");
    $('top_speed')
	//$('#pic').attr('src', "");
	//$('#description').val("");
}



//When the DOM is ready.
$(document).ready(function(){
	// Hides the Delete Button 
	$('#btnDelete').hide();
    
  //The return false is cancelling the default browser action
	$(document).on('click','#btnSearch',function() {
		search($('#searchKey').val());
		return false;
	});

    
	// Trigger search when pressing 'Return' on search key input field
	$(document).on('keypress','#searchKey',function(e){
		if(e.which == 13) {
			search($('#searchKey').val());
			return false;
	    }
	});

	$(document).on('click','#btnAdd',function() {
		newWine();
		return false;
	});
    
    
	//if the id is empty we are adding a new wine - otherwise update
	$(document).on('click','#btnSave',function() {
		if ($('#carID').val() == '')
			addWine();
		else
			updateWine();
		return false;
	});

	$(document).on('click','#btnDelete',function() {
		deleteWine();
		return false;
	});

	$(document).on("click", '#wineList a', function(){findById(this.id);});

    
    
	//Resets Form, clears searchKey, Reloads list.
	resetForm();
	$('#searchKey').val("");
	findAll();
});

