/*
function get(id) {
  return document.getElementById(id).value;
}
*/

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
    var deleteMember = document.getElementById("Delete");
    var updateMember = document.getElementById("Update");
    searchButton.addEventListener('click', function() {
      var db = new SearchMemberController();
      db.SearchMember(Member);
    });
    updateMember.addEventListener('click', function() {
      var db = UpdateMemberController();
      db.UpdateMember(Member);
    });
    deleteMember.addEventListener('click', function() {
      var db = DeleteMemberController();
      db.DeleteMember(Member);
    });
  }
}

class SearchMemberController {
  constructor() {}
  SearchMember(Member) {
    var searchMember = document.getElementById("Search");
    var text = searchMember.value;
    var memberRef = firebase.database().ref().child('user');
    var snapshot = memberRef.orderByChild("firstname").equalTo(text).on("child_added", function(snapshot) {
      console.log(snapshot.val().firstname +" " + snapshot.val().surname);
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
    });
   }
}

class UpdateMemberController {
  constructor() {
    $("#table_body").append("tr><td>" + firstname_update + "</td><td>" + surname_update + "</td><td>" + address_update + "</td><td>" + email_update + "</td><td>" + membership_update + "</td><td>" + dob_update + "</tr></td>");
  }
  UpdateMember(Member) {
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
    snapshot.ref.set({
      'firstname': firstname_update,
      'surname': surname_update,
      'email': email_update,
      'address': address_update,
      'membership':membership_update,
      'dob': dob_update
    });
  }
}

class DeleteMemberController {
  constructor() {}
  DeleteMember(Member) {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('user/' + uid).remove();
    window.alert("Member Deleted");
    window.location.reload();
  };
}

var db_cnx = new DatabaseConnection();
var ui = new SlopeUI();
