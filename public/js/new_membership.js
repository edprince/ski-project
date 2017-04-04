function get(id) {
	return document.getElementById(id).value;
}


//Initialize Firebase
class DatabaseConnection {
  constructor() {
    var config = {
      /*
      apiKey: "AIzaSyD1__SyPP9HQ4-ViwJxH6s8EACpCY9-k34",
      authDomain: "skiproject-8236e.firebaseapp.com",
      databaseURL: "https://skiproject-8236e.firebaseio.com",
      storageBucket: "skiproject-8236e.appspot.com",
      messagingSenderId: "633876681860"
      */
      apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
      authDomain: "sphere-c41ce.firebaseapp.com",
      databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
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
    console.log('slope ui intiated');
    var searchButton = document.getElementById("SearchButton");
    var updateMemberFree = document.getElementById("update_free");
    var updateMemberLoyalty = document.getElementById('update_loyalty');
    var clearButton = document.getElementById("Clear");	  
    searchButton.addEventListener('click', function() {	    
      console.log('search button clicked');
      var db = new SearchMemberController();
      db.searchMember(Member);	    
    });
    updateMemberFree.addEventListener('click', function() {
      var db = new UpdateMemberController();
      db.UpdateMember('free');
    });
    updateMemberLoyalty.addEventListener('click', function() {
      console.log('Loyalty button clicked');
      var db = new UpdateMemberController();
      db.UpdateMember('loyalty');
    });
    clearButton.addEventListener('click', function() {
      window.location.reload();
    });
  }
}

var userReference;

class SearchMemberController {
  constructor() {}
    searchMember() {
      console.log('searching');
      var searchMember = document.getElementById("Search");
      var text = searchMember.value;
      var memberRef = firebase.database().ref().child('user');
      memberRef.orderByChild("email").equalTo(text).on("child_added", function(snapshot) {
        userReference = snapshot.key;
        if (!userReference) {
          alert('No users with that email');
        }
        var membership = document.getElementById("membership_update");
        membership.value = snapshot.val().membership_tier;
    });
  }
}

class UpdateMemberController {
	constructor(){}
    UpdateMember(membership_tier) {
      //var userRef = firebase.database().ref().child('user').userReference;
      console.log(membership_tier, ' membership variable');
      if (membership_tier == 'loyalty') {
        firebase.database().ref('/user/' + userReference).once('value').then(function(snapshot) {
          console.log('Session count: ', snapshot.val());
          var sessionCount = snapshot.val().session_count;
          if (sessionCount > 10) {
            console.log('Upgrading to loyalty');
            firebase.database().ref('user/' + userReference).update({
              'membership_tier': membership_tier,
            });
            alert('Membership upgraded to Loyalty Membership');
          } else {
            alert('Sorry, a user must have had 10 sessions for loyalty membership');
          }
        });
      } else if (membership_tier == 'free') {
        console.log('updating to free membership');
        firebase.database().ref('user/' + userReference).update({
          'membership_tier': membership_tier,
        });
        alert('Membership upgraded to Free Basic Membership');
      } else {
        alert('Please select a membership upgrade');
      }
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
