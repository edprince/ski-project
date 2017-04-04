var config = {
   apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
    authDomain: "sphere-c41ce.firebaseapp.com",
    databaseURL: "https://sphere-c41ce.firebaseio.com", storageBucket: "sphere-c41ce.appspot.com", messagingSenderId: "204422136162"
}
firebase.initializeApp(config);

class controller {
  constructor() {

    var database = firebase.database
    firebase.database().ref('/sessions/' + 1).once('value').then(function(snapshot) {
      var endtime = snapshot.val().end;
      document.getElementById("test").innerHTML = endtime;
    });



    // Firebase.database().ref('/user/' + uid).once('value').then(function(snapshot) {
    //   document.getElementById("test").innerHTML = uid;
    // });

    var myTable = document.getElementById("myTable");//gets the table
    var tablerow = document.createElement('tr'); //creates a new row

    for (var i = 1; i <= 3; i++) {
      var tablerow = document.createElement('tr'); //creates a new row
      for (var j = 1; j <= 5; j++) {
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(j));
        tablerow.appendChild(tablecolumn);
      }
      myTable.appendChild(tablerow);
    }

  }//end of constructor

}//end of class

var thisiscontroller = new controller
