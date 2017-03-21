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

class user = {
  constructor(firstname, surname, email, password, membership) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.membership = membership;
  }
}

register_submit.addEventListener('click', function() {
  var newUser = new user(
    get('user_firstname'),
    get('user_surname'),
    get('user_email'),
    get('user_password'),
    document.querySelector('input[name="membership"]:checked').value
  );
  if (newUser.membership == 'member') {
    newUser.membership = 1;
  } else {
    newUser.membership = 2;
  }
  if (validateEmail(newUser.email) && validateName(newUser.firstname, newUser.surname) /*&& validateDob(dob)*/) {
    //Submit details to database
    console.log('Creating user');
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
    console.log('done');
    uid = firebase.auth().currentUser.uid;
    console.log(uid);
    database.ref('user/' + uid).set({
      'firstname': newUser.firstname,
      'surname': newUser.surname,
      'email': newUser.email,
      //Tier 1,2,3 (registered, free basic, loyalty)
      'membership_tier': newUser.membership
    });

//writeUserData(email, firstname, surname, dob, membership);
  } else {
//Return user to form to re-complete;
    get('user_email') = '';
    get('user_firstname') = '';
    get('user_surname') = '';
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

function get(id) {
  return document.getElementById(id).value;
}
