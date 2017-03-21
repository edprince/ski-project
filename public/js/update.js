//Initialize Firebase
var config = {
    apiKey: "AIzaSyD1__SyPP9HQ4-ViwJxH6s8EACpCY9-k34",
    authDomain: "skiproject-8236e.firebaseapp.com",
    databaseURL: "https://skiproject-8236e.firebaseio.com",
    storageBucket: "skiproject-8236e.appspot.com",
    messagingSenderId: "633876681860"
  };
//INITIALISE FIREBASE
	firebase.initializeApp(config);
	var userRef = firebase.database().ref().child('user');
	var searchUser = document.getElementById("Search");
	var searchButton = document.getElementById("SearchButton");
	var deleteUser = document.getElementById("Delete");
	var updateUser = document.getElementById("Update");
	searchButton.addEventListener('click', function() {
	var text = searchUser.value;
	userRef.orderByChild("firstname").equalTo(text).on("child_added", function(snapshot) {
	console.log(snapshot.val().firstname +" " + snapshot.val().surname);
	console.log(snapshot.val());
	var firstname = document.getElementById("firstname_update");
	var surname = document.getElementById("surname_update");
	var email = document.getElementById("email_update");
	var address = document.getElementById("address_update");
	var membership = document.getElementById("membership_update");
	var dob = document.getElementById("dob_update");
	firstname.value = snapshot.val().firstname;
	surname.value = snapshot.val().surname;
	email.value = snapshot.val().email;
	address.value = snapshot.val().address;
	membership.value = snapshot.val().membership;
	dob.value = snapshot.val().dob;
	deleteUser.addEventListener('click', function() {
		snapshot.ref.remove();
		window.alert("Member Deleted!");
		window.location.reload();
	});
   	updateUser.addEventListener('click', function() {
	var firstname = document.getElementById("firstname_update");
	var surname = document.getElementById("surname_update");
	var email = document.getElementById("email_update");
	var address = document.getElementById("address_update");
	var membership = document.getElementById("membership_update");
	var dob = document.getElementById("dob_update");
	var firstname_update = firstname.value;
	var surname_update = surname.value;
	var email_update = email.value;
	var address_update = address.value;
	var membership_update = membership.value;
	var dob_update = dob.value;
	if (validateEmail(email) && validateName(firstname, surname) && validateAddress(address) /*&& validateDob(dob)*/) {
	 	snapshot.ref.set({
			'firstname': firstname_update,
			'surname': surname_update,
			'email': email_update,
			'address': address_update,
			'membership':membership_update,
			'dob': dob_update
		});
		$("#table_body").append("<tr><td>" + firstname_update + "</td><td>" + surname_update + "</td><td>" + address_update + "</td><td>" + email_update + "</td><td>" + membership_update + "</td><td>" + dob_update + "</tr></td>")

    } else {
//Return user to form to re-complete;
    email = '';
    firstname = '';
    surname = '';
    dob = '';
    address = '';
    alert('There was an error with some of your information. Please re-enter.');
  };
	});
	});
	});

//Validation Functions
function validateEmail(email) {
  //var re = new regExp(".*@.*\..*");
  //return email.match(re);
  return true
};

function validateName(name) {
  if (name) {
    return true
  }
};

function validateDob(dob) {
  //Validates a user submitted date of birth
  return true
};

function validateAddress(address) {
  if (address) {
    return true
  };
};
