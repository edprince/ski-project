unction get(id) {
	return document.getElementById(id).value;
}


//Initialize Firebase
class DatabaseConnection {
  constructor() {
    var config = {
      apiKey: "AIzaSyD1__SyPP9HQ4-ViwJxH6s8EACpCY9-k34",
      authDomain: "skiproject-8236e.firebaseapp.com",
      databaseURL: "https://skiproject-8236e.firebaseio.com",
      storageBucket: "skiproject-8236e.appspot.com",
      messagingSenderId: "633876681860"
    }
    firebase.initializeApp(config);
    var database = firebase.database();
  }
}

class Member {
  constructor(firstname, surname, email, address, dob, password, membership){
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.address = address;
    this.dob = dob;
    this.password = password;
    this.membership = membership;
   }
}

class SlopeUI {
  constructor() {
    var searchButton = document.getElementById("SearchButton");
    var updateMember = document.getElementById("Update");
    var clearButton = document.getElementById("Clear");	  
    searchButton.addEventListener('click', function() {	    
      var db = new SearchMemberController();
      db.SearchMember(Member);	    
    });
    updateMember.addEventListener('click', function() {
      var db = new UpdateMemberController();
      db.UpdateMember(Member);
    });
    clearButton.addEventListener('click', function() {
      window.location.reload();
    });	    
  }
}

var userReference;

class SearchMemberController {
  constructor() {}
    SearchMember(member) {
    var searchMember = document.getElementById("Search");
    var text = searchMember.value;
    var memberRef = firebase.database().ref().child('user');
    memberRef.orderByChild("firstname").equalTo(text).on("child_added", function(snapshot) {
    	userReference = snapshot.key; 
    	var firstname = document.getElementById("firstname_update");
        var surname = document.getElementById("surname_update");
    	var membership = document.getElementById("membership_update");
    	firstname.value = snapshot.val().firstname;
    	surname.value = snapshot.val().surname;
    	membership.value = snapshot.val().membership;
    	 
    });
    }
  

}

class UpdateMemberController {
	constructor(){}
    UpdateMember() {
    var membership = document.getElementById("membership_update");
    var membership_update = membership.value;
    var userRef = firebase.database().ref().child('user').userReference;
    firebase.database().ref('user/' + userReference).set({
		'membership':membership_update,
    });
	$("#table_body").append("tr.><td>" + firstname_update + "</td><td>" + surname_update + "</td><td>" + address_update + "</td><td>" + email_update + "</td><td>" + membership_update + "</td><td>" + dob_update + "</tr></td>");
  }
}
class DeleteMemberController{
  constructor() {}
  DeleteMember(Member) {
    firebase.database().ref('user/' + userReference).remove();
    window.alert("Member Deleted");
    window.location.reload();
  }
}

var db_cnx = new DatabaseConnection();
var ui = new SlopeUI();
