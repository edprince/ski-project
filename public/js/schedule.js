// Initialize Firebase
var config = {
  apiKey: "AIzaSyBw2hHMudDYVgfhsWMr6j2fMpOZ8RhZOKw",
  authDomain: "sphere-c41ce.firebaseapp.com",
  databaseURL: "https://sphere-c41ce.firebaseio.com",
  projectId: "sphere-c41ce",
  storageBucket: "sphere-c41ce.appspot.com",
  messagingSenderId: "204422136162"
};
firebase.initializeApp(config);
//end of initializing firebase

class controller {
  constructor() {

    var myTable = document.getElementById("myTable");//gets the table
    var tablerow = document.createElement('tr'); //creates a new row

    var database = firebase.database

    var array = [];

    for (var session = 1; session <= 2; session++) {
      firebase.database().ref('/sessions/' + session).once('value').then(function(snapshot){
        array.push(snapshot.val().end);
      });//end of database screenshot
    }
    console.log(array[0]);
    
    // for (var i = 1; i <= 3; i++) {
    //   var tablerow = document.createElement('tr'); //creates a new row
    //   for (var j = 1; j <= 2; j++) {
    //     var tablecolumn = document.createElement('td');
    //     tablecolumn.appendChild(document.createTextNode(array[j]));
    //     tablerow.appendChild(tablecolumn);
    //   }//end of for loop
    //   myTable.appendChild(tablerow);
    // }//end of for loop
    // Firebase.database().ref('/user/' + uid).once('value').then(function(snapshot) {
    //   document.getElementById("test").innerHTML = uid;
    // });

  }//end of constructor

}//end of class

var thisiscontroller = new controller
