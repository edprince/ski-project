if (document.getElementById('#register').length > 0) {
  var register_submit = document.getElementById('submit');
  register_submit.addEventListener('click', function() {
    var email = document.getElementById('user_email').value;
    var firstname = document.getElementById('user_firstname').value;
    var surname = document.getElementById('user_surname').value;
    var password = document.getElementById('user_password').value;
    var membership = document.querySelector('input[name="membership"]:checked').value;
    if (validateEmail(email) && validateName(firstname, surname) /*&& validateDob(dob)*/) {
      //Submit details to database
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
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
}
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
