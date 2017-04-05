function get(id) {
	return document.getElementById(id).value;
}

//Class for database connection
//Initialize Firebase
class DatabaseConnection {
  constructor() {
    var config = {
    apiKey: "AIzaSyD1__SyPP9HQ4-ViwJxH6s8EACpCY9-k34",
    authDomain: "skiproject-8236e.firebaseapp.com",
    databaseURL: "https://skiproject-8236e.firebaseio.com",
    projectId: "skiproject-8236e",
    storageBucket: "",
    messagingSenderId: "633876681860"
    }
    firebase.initializeApp(config);
    var database = firebase.database();
  }
}

//Class Member 
class Member {
  constructor(firstname, surname, email, address, dob, password, membership){
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.address = address;
    this.dob = dob;
    this.membership = membership;
   }
}

//Class SlopeUI which controlls class Controller 
//based on GRASP use case control pattern
class SlopeUI {
  constructor() {
    var searchButton = document.getElementById("SearchButton");
    var deleteMember = document.getElementById("Delete");
    var updateMember = document.getElementById("Update");
    var clearButton = document.getElementById("Clear");	
   //Event Listener which Searches for Member when button Search is pressed  
    searchButton.addEventListener('click', function() {	    
    let controller = new Controller() //gets instance of the class (GoF Singleton pattern)
    controller.SearchMember(Member);	    
    });
   //Event Listener which updates Member details when button Update is pressed
    updateMember.addEventListener('click', function() {
      var newUpdate = new Member( //object which gets all values from the HTML page where the operator has entered new details
	   get('firstname_update'),
	   get('surname_update'),
	   get('email_update'),
	   get('membership_update'),
	   get('dob_update'),
	   get('address_update')
      );
	    //After the button Update is pressed - Validate class is being triggered
	    //and if all details are correct - triggers Update Member function
	    //otherwise re-displays details again 
	    //and tells sends an alert to the screen - Invalid Input
      var validate = new Validate();
      if (validate.name(newUpdate.firstname) && validate.name(newUpdate.surname) && validate.email(newUpdate.email)) { //(validate.addressvalid(newUpdate.address)){
	        let controller = new Controller();; //reference to GoF Singleton instance (from Controller Class)
	 	controller.UpdateMember(Member);   
	    } else {
		  console.log("Invalid input.");
		  let controller = new Controller(); //reference to GoF Singleton instance (from Controller Class)
		  controler.SearchMember(Member);
		  alert('Invalid input. Please re-enter details.');
	}
    });
    //Event Listener which deletes a member when button Delete is pressed
    deleteMember.addEventListener('click', function() {
      let controller = new Controller(); //reference to GoF Singleton instance (from Controller Class)
      controller.DeleteMember(Member);
    });
    //Event listener which refreshes the page when button Clear is pressed
    clearButton.addEventListener('click', function() {
      window.location.reload();
    });	    
  }
}

var userReference; //global variable for user ID
var details = {}; //global object containing user details


let instance = null; 
class Controller {
	constructor() { //Singleton pattern instance creation
		if(!instance) { //if there's no instance, makes a new one
			instance = this;
			}
			return instance; //returns the instance
		}
	SearchMember(member) {
		//Search function which searches for a member by First Name
		//if found, the member is being displayed on the page
		var searchMember = document.getElementById("Search").value;
		var memberRef = firebase.database().ref().child('user');
		memberRef.orderByChild("firstname").equalTo(searchMember).on("child_added", function(snapshot) {
			userReference = snapshot.key;
			    	details.firstname = document.getElementById("firstname_update");
   				details.surname = document.getElementById("surname_update");
    				details.email = document.getElementById("email_update");
    				details.address = document.getElementById("address_update");
    				details.membership = document.getElementById("membership_update");
    				details.dob = document.getElementById("dob_update");
    				details.firstname.value = snapshot.val().firstname;
    				details.surname.value = snapshot.val().surname;
    				details.email.value = snapshot.val().email;
    				details.membership.value = snapshot.val().membership_tier;
    				details.dob.value = snapshot.val().dob; 
				details.address.value = snapshot.val().address;
   			 });
    	}
	UpdateMember(member) {
		//Update function which sends the updated details to the database
		//and displays them in a table at the Update Memebr Details page
		firebase.database().ref('user/'+userReference).set({
			'firstname': details.firstname.value,
			'surname': details.surname.value,
			'email': details.email.value,
			'address': details.address.value,
			'membership_tier': details.membership.value,
			'dob': details.dob.value
		});
			$("#table_body").append("tr><td>" + details.firstname.value + "</td><td>" + details.surname.value + "</td><td>" + details.address.value + "</td><td>" + details.email.value + "</td><td>" + details.membership.value + "</td><td>" + details.dob.value + "</tr></td>");
		$("#table_body").append("<tr>");
 	 }
	 DeleteMember(Member) {
		 //Delete function which deletes a member after the 
		 //Delete button is pressed
		 firebase.database().ref('user/'+ userReference).remove();
		 window.alert("Member Deleted!");
		 window.location.reload();
	 };
}

//Validation class
class Validate {
  constructor() {};
  //Validation Functions
  email(email) {
	  //Function to validate email
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	}
  name(name) {
	//Function to valiadte names (firstname & surname)
    var re = /^[a-zA-Z]+$/;
    return re.test(name);
  }
  addressvalid(address) {
	 return ",#-/ !@$%^*(){}|[]\\".indexOf(address) >= 0;
  }
}

//Class - script for Unit Testing 
//of email and name
class UnitTesting {
  constructor() {
    var v = new Validate();
    var emails = [['', false], ['1', false], ['@.', false], ['plamen@com', false], ['another@hotmail/com', false], ['boo', false], ['spoof.', false], ['crew.stein@gmail.com', true]];
    var names =  [['', false], ['Plamen1', false], ['Plamen@@', false], ['Plamen__ ', false], ['Plamen0', false],['   Plamen  ', false],['Plamen', true]];
    console.log('All values should match to pass all tests');
    console.log('Emails');
    var x;
    for (x = 0; x < emails.length;x++) {
      console.log(v.email(emails[x][0]), emails[x][1]);
    }
    console.log('Names');
	  for (x = 0; x <names.length;x++) {
		  console.log(v.name(names[x][0]), names[x][1]);
		  }

  }
}



var db_cnx = new DatabaseConnection();
var ui = new SlopeUI();
var unitTest = new UnitTesting();
