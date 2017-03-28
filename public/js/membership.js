class Databaseconnection{
  //Initialize Firebase
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



//get user id and information
//if user is registered then proceed to membership
class Member_UI {
  constructor() {
    var membership=None;
    var question=document.getElementById("Would you like to become a member?");
    var yes_member=document.getElementById("Yes");
    var no_member=document.getElementById("No");
    var basic=document.getElementById("free_membership");
    var loyalty=document.getElementById('loyalty_membership');

    basic.addEventListener('click', function(){
      membership='Basic';
    });

    loyalty.addEventListener('click',function(){
      //check if number of sessions booked is >10
      //Button is clicked => Get snapshot, see if numberOfSession > 10
      //If so can become loyalty members
      //If not Refused
      var sessionCount = firebase.database().ref('users/' + uid + '/session_count');
      sessionCount.on('value', function(snapshot) {
        var numberOfSessions = snapshot.val();
      });
      if (sessionCount>=10) {
        //Assign loyalty membership
        firebase.database().ref('user/' + uid).set({
          'membership_tier': 'loyalty'
        });
      } else {
      //Print error message explaining why they can't become a loyalty member
        alert('You need to have more than 10 bookings to become a loayalty member! ');
    }

    });
  }
}
