function get(id) {
	return document.getElementById(id).value;
}

//Class for database connection
//Initialize Firebase
class DatabaseConnection {
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

class SlopeOperatorUI {
	constructor() {
		var searchButton = document.getElementById("SearchButton");
		var checkinButton = document.getElementById("Checkin");
		var clearButton = document.getElementById("Clear");
		
		searchButton.addEventListener('click', function() {
			var db = new CheckinController();
			db.SearchUsers();
			db.SearchBookings();	
		});
			
		checkinButton.addEventListener('click', function() {
			var db = new CheckinController();
			db.Checkin();
		});
		
		clearButton.addEventListener('click', function() {
		window.location.reload();
		});
    }	    	
}

class CheckinController {
	constructor() {}
	SearchUsers() {
		var searchId = document.getElementById("NameSearch").value;
		console.log('searching for: ' + searchId)
		
		var dbref = firebase.database().ref('users');
		
		dbref.orderByChild('firstname').equalTo(searchId).on('child_added', function(snapshot) {
			userId = snapshot.key;
			console.log('User found: ' + userId)
		}, function(err) {console.log(err)
		});
	
	}
		
	SearchBookings() {
		var dbUserRef = firebase.database().ref('users/' + userId + '/bookings').orderByChild('checkin').equalTo('no');
		var notinlist = true
		
		dbUserRef.on('child_added', function(snapshot) {
			for (var i = 0; i < bookingList.length; ++i){
				if (bookingList.options[i].value == snapshot.key){
					notinlist = false;
				}
			}
			if (notinlist == true) {
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
	
	Checkin() {
		var key = bookingList.options[bookingList.selectedIndex].value
		console.log('users/'+ userId + '/bookings/' + key)
		
		var dbbookingref = firebase.database().ref('users/'+ userId + '/bookings');

		dbbookingref.orderByKey().equalTo(key).on('child_added', function(snapshot){

			console.log(snapshot.val())
			
			if (snapshot.val().paid == "yes") {
				dbbookingref.child(key).set({checkin: 'yes', date: snapshot.val().date, paid: 'yes', time: snapshot.val().time});
				document.getElementById("Message").innerHTML = "Checkin Completeted";
				for (var i=0; i<bookingList.length; i++){
					  if (bookingList.options[i].value == key )
						 bookingList.remove(i);
				}
			}
			
			else{
				var payment = confirm("Member has not yet paid please except payment now and click ok");
				if (payment == true) {
					dbbookingref.child(key).set({checkin: 'yes', date: snapshot.val().date, paid: 'yes', time: snapshot.val().time});
					document.getElementById("Message").innerHTML = "Checkin Completeted";
					for (var i=0; i<bookingList.length; i++){
					  if (bookingList.options[i].value == key )
						 bookingList.remove(i);
					}
				}
				else{
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