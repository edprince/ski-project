function get(id) {
  return document.getElementById(id).value;
}

//Initialize Firebase
class DatabaseConnection {
  /**
   * @class This intializes the firebase application
   * using the console credentials.
   */
  initialize() {
    var config = {
        apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
        authDomain: "sphere-c41ce.firebaseapp.com",
        databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
    }
    firebase.initializeApp(config);
    var database = firebase.database();
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
  }
}

var dbSingleton = new DatabaseConnection();

function dbGetInstance() {
  return dbSingleton;
}

dbGetInstance().initialize();

class User {
  /**
   * @constructor Creates a user object with required params.
   * @class user class
   * @param {string} firstname The users firstname
   * @param {string} surname The users surname
   * @param {string} email The users email
   * @param {string} password The users password
   * @param {string} dob The users date of birth
   * @param {string} address The users address
   */
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

class Validate {
  /**
   * @class contains validation functions for name, email and date of birth
   */
  //Validation Functions
  /*
   * Function takes email address and validates based on regular expression
   * @param {string} email The users email address
   * @returns {boolean} true or false depending on output of validation
   */
  email(email) {
    var re = /..*@..*\...*/;
    return re.test(email);
   // return true;
  };

  /**
   * Function takes name and checks it's not empty
   * @param {string} name The users name
   * @return {boolean} true or false depending on the output of validation
   */
  name(name) {
    if (name) {
      return true;
    }
  };
  /**
   * Function takes date of birth and checks it is in correct format
   * @param {string} dob The users date of birth
   * @return {boolean} true or false depending on the output of validation
   */
  dob(dob) {
    //Validates a user submitted date of birth
    var re = /".*\/.*\/.*/;
    return re.test(dob);
  };
}

class UserInterface {
  /**
   * @class Interacts with the user interface
   */

  /**
   * Function reads data from the registration form and writes to 'user' object
   */
  getData() {
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
    return newUser;
  }

  /**
   * Function writes user information to the Firebase Database
   * @param {object} newUser The user object containing name, email etc.
   */
  writeData(newUser) {
    var validate = new Validate();
    if (validate.email(newUser.email) && validate.name(newUser.firstname, newUser.surname) /*&& validateDob(dob)*/) {
      //Submit details to databaseURL
      console.log('Creating and writing user information');
      var db = new User_controller();

      db.createUser(newUser).then(user => {
        newUser.uid = user.uid;
        db.writeUserInfo(newUser);
      }).catch(err) {
        alert(err);
      };
    } else {
      //Return user to empty form to re-complete;
      console.log('Getting here');
      document.getElementById('user_email').value = '';
      document.getElementById('user_firstname').value = '';
      document.getElementById('user_surname').value = '';
      alert('There was an error with some of your information. Please re-enter.');
    };
  }
}

var uiSingleton = new UserInterface();

function uiGetInstance() {
  return uiSingleton;
}

var register_submit = document.getElementById('submit');
register_submit.addEventListener('click', () => {
  var newUser = uiGetInstance().getData();
  console.log('New user: ', newUser);
  uiGetInstance().writeData(newUser);
});


class User_controller {
  /**
   * @constructor Logs when ready to communicate with the database
   * @class creates new Firebase user and writes user info to database
   */
  constructor() {
    console.log('Ready to communicate with database')
  }

  /**
   * Function creates new Firebase user
   * @param {object} user Object containing all user info (name, email etc.)
   */
  createUser(user) {
    console.log('Creating user');
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  }

  /**
   * Fubction writes user object data to Firebase database
   * @param {object} user Object containing all user info (name, email etc.)
   */
  writeUserInfo(user) {
    var uid = user.uid;
    console.log(uid);
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
}


class UnitTesting {
  /**
   * @constructor Runs the unit tests upon instatiation of object
   * @class Set of unit tests to test validation algorithms for email addresses and date of births
   */
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
var unitTest = new UnitTesting();
