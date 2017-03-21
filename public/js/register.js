//Initialize Firebase
class DatabaseConnection = {
  constructor() {
    var config = {
        apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
        authDomain: "sphere-c41ce.firebaseapp.com",
        databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
    }
    firebase.initializeApp(config);
    var database = firebase.database();

  }
}

class User = {
  constructor(firstname, surname, email, password, membership) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.membership = membership;
  }
}

class UserInterface = {
  constructor() {
    var register_submit = document.getElementById('submit');
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
      var validate = new Validate();
      if (validate.email(newUser.email) && validate.name(newUser.firstname, newUser.surname) /*&& validateDob(dob)*/) {
        //Submit details to databaseURL
        var db = new ReadWriteDatabase();
        db.createUser(newUser);
        db.writeUserInfo(newUser);
        //writeUserData(email, firstname, surname, dob, membership);
      } else {
        //Return user to empty form to re-complete;
        get('user_email') = '';
        get('user_firstname') = '';
        get('user_surname') = '';
        alert('There was an error with some of your information. Please re-enter.');
      };
    });
  }
}

class ReadWriteDatabase = {
  constructor() {
    console.log('Ready to communicate with database')
  }
  function createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
  function writeUserInfo(user) {
    var uid = firebase.auth().currentUser.uid;
    database.ref('user/' + uid).set({
      'firstname': newUser.firstname,
      'surname': newUser.surname,
      'email': newUser.email,
      //Tier 1,2,3 (registered, free basic, loyalty)
      'membership_tier': newUser.membership
    });
  }
}

class Validate = {
  constructor() {};
  //Validation Functions
  function email(email) {
    //var re = new regExp(".*@.*\..*");
    //return email.match(re);
    return true;
  };
  function name(name) {
    if (name) {
      return true;
    }
  };
  function dob(dob) {
    //Validates a user submitted date of birth
    return true;
  };
}

function get(id) {
  return document.getElementById(id).value;
}

var db_cnx = new DatabaseConnection();
var ui = new UserInterface();
