function get(id) {
  return document.getElementById(id).value;
}
//Initialize Firebase
class DatabaseConnection {
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

class User {
  constructor(firstname, surname, email, password, membership, dob, address) {
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.membership = membership;
    this.dob = dob;
    this.address1 = address;
  }
}

class UserInterface {
  constructor() {
    var register_submit = document.getElementById('submit');
    register_submit.addEventListener('click', function() {
      var newUser = new User(
        get('user_firstname'),
        get('user_surname'),
        get('user_email'),
        get('user_password'),
        get('user_dob'),
        get('user_address')
        document.querySelector('input[name="membership"]:checked').value
      );
      if (newUser.membership == 'member') {
        newUser.membership = 'yes';
      } else {
        newUser.membership = 'no';
      }
      var validate = new Validate();
      if (validate.email(newUser.email) && validate.name(newUser.firstname, newUser.surname) /*&& validateDob(dob)*/) {
        //Submit details to databaseURL
        var db = new ReadWriteDatabase();
        db.createUser(newUser);
        //db.writeUserInfo(newUser);
        //writeUserData(email, firstname, surname, dob, membership);
      } else {
        //Return user to empty form to re-complete;
        console.log('Getting here');
        document.getElementById('user_email').value = '';
        document.getElementById('user_firstname').value = '';
        document.getElementById('user_surname').value = '';
        alert('There was an error with some of your information. Please re-enter.');
      };
    });
  }
}

class ReadWriteDatabase {
  constructor() {
    console.log('Ready to communicate with database')
  }

  createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    }, this.writeUserInfo(user));
  }
  writeUserInfo(user) {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('user/' + uid).set({
      'firstname': user.firstname,
      'surname': user.surname,
      'email': user.email,
      //Tier 1,2,3 (registered, free basic, loyalty)
      'membership_tier': user.membership,
      'session_count': 0
    });
    window.location = '/main.html';
  }
}

class Validate {
  constructor() {};
  //Validation Functions
  email(email) {
    //var re = new regExp(".*@.*\..*");
    //return email.match(re);
    return true;
  };
  name(name) {
    if (name) {
      return true;
    }
  };
  dob(dob) {
    //Validates a user submitted date of birth
    return true;
  };
}

var db_cnx = new DatabaseConnection();
var ui = new UserInterface();
