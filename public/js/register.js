//Initialize Firebase
var config = {
    apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
    authDomain: "sphere-c41ce.firebaseapp.com",
    databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
};
//INITIALISE FIREBASE
firebase.initializeApp(config);
var database = firebase.database();
var register_submit = document.getElementById('submit');


register_submit.addEventListener('click', function() {
  //Submit New User
  var email = document.getElementById('user_email').value;
  var firstname = document.getElementById('user_firstname').value;
  var surname = document.getElementById('user_surname').value;
  var password = document.getElementById('user_password').value;
  var membership = document.querySelector('input[name="membership"]:checked').value;
  if (membership == 'member') {
    membership = 1;
  } else {
    membership = 2;
  }
  if (validateEmail(email) && validateName(firstname, surname) /*&& validateDob(dob)*/) {
    //Submit details to database
    console.log('Creating user');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
    console.log('done');
    uid = firebase.auth().currentUser.uid;
    console.log(uid);
    database.ref('user/' + uid).set({
      'firstname': firstname,
      'surname': surname,
      'email': email,
      //Tier 1,2,3 (registered, free basic, loyalty)
      'membership_tier': membership
    });

//writeUserData(email, firstname, surname, dob, membership);
  } else {
//Return user to form to re-complete;
    email = '';
    firstname = '';
    surname = '';
    dob = '';
    alert('There was an error with some of your information. Please re-enter.');
  };
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
