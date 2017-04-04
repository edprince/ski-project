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
    this.address = address;
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
        get('user_address'),
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
        var db = new User_controller();
        db.createUser(newUser);
        db.writeUserInfo(newUser);
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

class User_controller {
  constructor() {
    console.log('Ready to communicate with database')
  }

  writeUserInfo(user) {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('user/' + uid).set({
      'firstname': user.firstname,
      'surname': user.surname,
      'email': user.email,
      //Tier 1,2,3 (registered, free basic, loyalty)
      'membership_tier': user.membership,
      'dob': user.dob,
      'address': user.address,
      'session_count': 0
    });
    window.location = '/main.html';
  }
  createUser(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

class Validate {
  constructor() {};
  //Validation Functions
  email(email) {
    var re = /..*@..*\...*/;
    return re.test(email);
   // return true;
  };
  name(name) {
    if (name) {
      return true;
    }
  };
  dob(dob) {
    //Validates a user submitted date of birth
    var re = /".*\/.*\/.*/;
    return re.test(dob);
  };
}

class UnitTesting {
  constructor() {
    var v = new Validate();
    var emails = [['',false], ['1', false], ['@.', false], ['ed@com', false], ['another@hotmail/com', false], ['boo', false], ['spoof.', false], ['ed@hotmail.com', true]];
    var dob = [['12.01.1996', false], ['12/1/1996', false], ['12/1/96', false], ['14/15/19094', false], ['987.1231.123', false], ['', false], ['1', false], ['00/00/0000', true]];
    console.log('All values should match to pass all tests');
    console.log('Emails');
    var x;
    for (x = 0; x < emails.length;x++) {
      console.log(v.email(emails[x][0]), emails[x][1]);
    }
    console.log('Dates of birth');
    for(x = 0; x < dob.length; x++) {
      console.log(v.dob(dob[x][0]), dob[x][1]);
    }
  }
}

var db_cnx = new DatabaseConnection();
var ui = new UserInterface();
var unitTest = new UnitTesting();
