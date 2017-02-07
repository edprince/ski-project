//Initialize Firebase
var config = {
  apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
  authDomain: "sphere-c41ce.firebaseapp.com",
  databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
};
firebase.initializeApp(config);
var database = firebase.database();

function writeUserData(email, firstname, surname, dob) {
  firebase.database().ref('users').push({
    "email": email,
    "firstname": firstname,
    "surname": surname,
    "dob": dob
  });
};


//LOGGING IN
var login_btn = document.getElementById('login_submit');
login_btn.addEventListener('click', () => {
  var login_email = document.getElementById('login_email').value;
  var login_password = document.getElementById('login_password').value;
  firebase.auth().signOut().then(function() {
    //Sign-out successful.
  }, function(error) {
    // An error happened.
  });
  firebase.auth().signInWithEmailAndPassword(login_email, login_password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    //alert(errorMessage);
    login_email = '';
    login_password = '';
  });
  window.location.href = '/main.html';
});
