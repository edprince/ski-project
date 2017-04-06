class DatabaseConnection {// class for the database connection
  constructor() {
	  var config = {
		apiKey: "AIzaSyDUKbcHqkKySsRME987SCeS2sVR-wu4T8U",
		authDomain: "ct-712be.firebaseapp.com",
		databaseURL: "https://ct-712be.firebaseio.com",
		projectId: "ct-712be",
		storageBucket: "ct-712be.appspot.com",
		messagingSenderId: "259799400234"
	  };
	  firebase.initializeApp(config);
	  var database = firebase.database();
  }
}

class SlopeOperatorUI {//class for the UI
	constructor() {
		var searchButton = document.getElementById("SearchButton");
		var checkinButton = document.getElementById("Checkin");
		var clearButton = document.getElementById("Clear");
		var controller = new CheckinController;
		
		searchButton.addEventListener('click', function() { //on button click preform search function
			var db = CheckinController.GetInstance() //runs the singleton function to check if a checkinController has been made
			db.SearchUsers();
			db.SearchBookings();	
		});
			
		checkinButton.addEventListener('click', function() { //on button click preform checkin function 
			var db = CheckinController.GetInstance() //runs the singleton function to check if a checkinController has been made
			db.Checkin();
		});
		
		clearButton.addEventListener('click', function() { //clear the screen
		window.location.reload();
		});
    }	    	
}

class CheckinController { //class for the checkin controller
	constructor() {
		this.instance;
	}
	
	static GetInstance() { // function as a singleton for the class making sure that it is only made once

		if(this.instance==null) { // if there is not a checkin controller object made
			console.log(new Date()) // this was to test if any new checkin controller objects were created
			this.instance = new CheckinController(); // make a new checkinController
			}
		return this.instance; // return the checkinController whether its new or not
	}
	
	SearchUsers() { // this function looks through the database to find data on the user from the typed in first name
		var searchId = document.getElementById("NameSearch").value;
		var validate = Validate.GetInstance()
		var usernotfound = true //store to see if a user is found
		
		if (validate.name(searchId)) { //checks if the first name is valid
	        
			console.log('searching for: ' + searchId)
		
			var dbref = firebase.database().ref('users');
			console.log("a")
			dbref.orderByChild('firstname').equalTo(searchId).on('child_added', function(snapshot) { // finds ths users firstname from the database
				console.log("b")
				usernotfound = false
				userId = snapshot.key; // stores the id to use in future database queries
				console.log('User found: ' + userId)
			}, function(err) {console.log(err)
			});
						
		}
	    else {
			alert('Invalid first name input. Please re-enter details');
		}
		console.log ("c")
		if (usernotfound) { //displays an alert if no members are found
			alert ("No members found with matching first name, please check spelling/capitalisation and try again")
		}
    }
	
	SearchBookings() { // this uses the userId found by the SearchUsers function to find bookings related to them
		var dbUserRef = firebase.database().ref('users/' + userId + '/bookings').orderByChild('checkin').equalTo('no'); // finds all bookings were the searched user has not checked in
		var notinlist = true
		var bookingnotfound = true
		
		
		dbUserRef.on('child_added', function(snapshot) {
			for (var i = 0; i < bookingList.length; ++i){
				if (bookingList.options[i].value == snapshot.key){ // Used to see if bookings are already in the displayed list
					notinlist = false;
					bookingnotfound = false
				}
			}
			
			if (notinlist == true) { // if the booking is not in list, add it to the list
				console.log(snapshot.val())
				console.log('booking found')
				var option = document.createElement('option');
				option.innerHTML = snapshot.val().date + " " + snapshot.val().time;
				option.value = snapshot.key;
				bookingList.appendChild(option)
			}
			
		}, function(err) {console.log(err)
		});
		
		if (bookingnotfound) { //dispays an alert if no valid bookings are found, i.e bookings not checked in
			alert ("No valid bookings found for this member")
		}
		
	}
	
	Checkin() { // this function is used to change the booking's checkin value to true
		var key = bookingList.options[bookingList.selectedIndex].value // gets the booking's key based of the selected booking from the list in the UI
		
		var validate = Validate.GetInstance()
		if (validate.booking(key)) { //Checks to see if booking has been selected
		
			var dbbookingref = firebase.database().ref('users/'+ userId + '/bookings');

			dbbookingref.orderByKey().equalTo(key).on('child_added', function(snapshot){ // finds the booking that was selected

				console.log(snapshot.val())
				
				if (snapshot.val().paid == "yes") { // checks to see if the member has paid
					dbbookingref.child(key).set({checkin: 'yes', date: snapshot.val().date, paid: 'yes', time: snapshot.val().time}); //if the user has paid this checks them in
					document.getElementById("Message").innerHTML = "Checkin Completeted"; //displays confirmation
					for (var i=0; i<bookingList.length; i++){ // removes booking from the list
						  if (bookingList.options[i].value == key )
							 bookingList.remove(i);
					}
				}
				
				else{ // if the user hasn't paid
					var payment = confirm("Member has not yet paid please accept payment now and click ok"); //displays message asking for payment
					if (payment == true) { // if the member pays
						dbbookingref.child(key).set({checkin: 'yes', date: snapshot.val().date, paid: 'yes', time: snapshot.val().time}); //changes the paid and checkin value to yes
						document.getElementById("Message").innerHTML = "Checkin Completeted";
						for (var i=0; i<bookingList.length; i++){// removes booking from list
						  if (bookingList.options[i].value == key )
							 bookingList.remove(i);
						}
					}
					else{// if the user has not paid
						document.getElementById("Message").innerHTML = "Checkin Incomplete";
					}
				}
				
			}, function(err) {console.log(err)
			});
		}
		else {
			alert('Please select a booking from the dropdown list');
		}
	}
}

class Validate { //class to check for validation
  	constructor() {
		this.instance;
	}
	
	static GetInstance() { // function as a singleton for the class making sure that it is only made once

		if(this.instance==null) { // if there is not a Validate object made
			console.log(new Date()) // this was to test if any new Validate objects were created
			this.instance = new Validate(); // make a new Validate
			}
		return this.instance; // return the Validate whether its new or not
	}
	
	name(name) { //Function to validate the inputed first name
		var re = /^[a-zA-Z]+$/; //this is the characters to check against, meaning that it will return false if the name is blank or contains a character not in this list
		return re.test(name);
	}
	booking(booking) { //Function to validate the selected booking
		if (booking == '') {//Checks to see if there is a booking selected
			return false
		}
	}
}

class UnitTesting { //Class - script for Unit Testing of firstnames
	constructor() {
		var validate = Validate.GetInstance();
		var names =  ['', 'Aston1', 'Aston@@', 'Aston__ ', 'Aston0', 'Aston  ', 'Aston']; // input values for testing function
		console.log('All values should match to pass all tests');
		console.log('Names');
		for (var x = 0; x <names.length;x++) {
			console.log(names[x], " returns: " , validate.name(names[x]));
		}
	}
}

var bookingList = document.getElementById("list");
var userId
var v = new Validate
var db_cnx = new DatabaseConnection();
console.log('Database connected')
var ui = new SlopeOperatorUI();
var unitTest = new UnitTesting();