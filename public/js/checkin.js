function get(id) {
	return document.getElementById(id).value;
}

//Initialize Firebase
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
		var test = new Singleton;
		
		searchButton.addEventListener('click', function() { //on button click preform search function
			var db = Singleton.GetInstance()
			db.SearchUsers();
			db.SearchBookings();	
		});
			
		checkinButton.addEventListener('click', function() { //on button click preform checkin function 
			var db = Singleton.GetInstance()
			db.Checkin();
		});
		
		clearButton.addEventListener('click', function() { //clear the screen
		window.location.reload();
		});
    }	    	
}

class Singleton { // this class is used so that the UI only needs to create one checkin controller
	constructor() {
		this.instance;
	}
	static GetInstance() {

		if(this.instance==null) {
			console.log(new Date()) // this was to test if any new checkin controller were created
			this.instance = new CheckinController();
			}
			return this.instance;
		}
	
}


class CheckinController {
	
	SearchUsers() { // this function looks through the database to find data on the user from the typed in first name
		var searchId = document.getElementById("NameSearch").value;
		console.log('searching for: ' + searchId)
		
		var dbref = firebase.database().ref('users');
		
		dbref.orderByChild('firstname').equalTo(searchId).on('child_added', function(snapshot) { // finds ths users firstname from the database
			userId = snapshot.key; // stores the id to use in future database queries
			console.log('User found: ' + userId)
		}, function(err) {console.log(err)
		});
	
	}
		
	SearchBookings() { // this uses the userId found by the SearchUsers function to find bookings related to them
		var dbUserRef = firebase.database().ref('users/' + userId + '/bookings').orderByChild('checkin').equalTo('no'); // finds all bookings were the searched user has not checked in
		var notinlist = true
		
		dbUserRef.on('child_added', function(snapshot) {
			for (var i = 0; i < bookingList.length; ++i){
				if (bookingList.options[i].value == snapshot.key){ // Used to see if bookings are already in the displayed list
					notinlist = false;
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
	}
	
	Checkin() { // this function is used to change the booking's checkin value to true
		var key = bookingList.options[bookingList.selectedIndex].value // gets the booking's key based of the selected booking from the list in the UI
		console.log('users/'+ userId + '/bookings/' + key)
		
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
				else{// if the user has not payed
					document.getElementById("Message").innerHTML = "Checkin Incomplete";
				}
			}
			
		}, function(err) {console.log(err)
		});
	}
}

var bookingList = document.getElementById("list");
var userId
var db_cnx = new DatabaseConnection();
console.log('Database connected')
var ui = new SlopeOperatorUI();
