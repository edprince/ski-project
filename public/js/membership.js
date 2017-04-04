class Databaseconnection {
  //Initialize Firebase
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
      //*/
    firebase.initializeApp(config);
    console.log('Connecting to db');
    var database = firebase.database();
    var ui = new Member_UI(database);
  }
}



//get user id and information
//if user is registered then proceed to membership
class Member_UI {
  constructor(database) {
    var membership;
    var question=document.getElementById("Would you like to become a member?");
    var yes_member=document.getElementById("Yes");
    var no_member=document.getElementById("No");
    var basic=document.getElementById("free_membership");
    var loyalty=document.getElementById('loyalty_membership');
    setTimeout(function() {
      try {
        var uid = firebase.auth().currentUser.uid;
        console.log('Fetching uid');
        //var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        basic.addEventListener('click', function(){
          console.log(uid);
          membership='Basic';
          console.log('Basic membership');
          firebase.database().ref('user/' + uid).update({
            'membership_tier': 'basic'
          });
        });

        loyalty.addEventListener('click',function(){
          console.log('Loyalty membership');
          //check if number of sessions booked is >10
          //Button is clicked => Get snapshot, see if numberOfSession > 10
          //If so can become loyalty members
          //If not Refused
          firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
            console.log(snapshot.val());
            var sessionCount = snapshot.val().session_count;
            console.log(sessionCount, ' session count');
            if (sessionCount>=10) {
              //Assign loyalty membership
              firebase.database().ref('user/' + uid).update({
                'membership_tier': 'loyalty'
              });
            } else {
            //Print error message explaining why they can't become a loyalty member
              alert('You need to have more than 10 bookings to become a loyalty member! ');
            }
          });
          var sessionCount = firebase.database().ref('users/' + uid + '/session_count');
          sessionCount.on('value', function(snapshot) {
            console.log(snapshot.val());
            var numberOfSessions = snapshot.val();
          });
        });
      } catch(err) {
        console.log(err);
        console.log('GONE WRONG');
       // window.location = './login.html';
      }
    }, 1000);
  }
}
var db_connect = new Databaseconnection();
