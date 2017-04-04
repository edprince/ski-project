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

    for (var i = 0; i < 2; i++) {
      firebase.database().ref('/sessions/' + i).once('value').then(function(snapshot) {
        array.push(snapshot.val().end);


        for (var i = 1; i <= 3; i++) {
          var tablerow = document.createElement('tr'); //creates a new row
          for (var j = 1; j <= 5; j++) {
            var tablecolumn = document.createElement('td');
            tablecolumn.appendChild(document.createTextNode(array[j]));
            tablerow.appendChild(tablecolumn);
          }
          myTable.appendChild(tablerow);
        }


        });//end of database screenshot


      //document.getElementById("test").innerHTML = typeof endtime;




    }


  }//end of constructor

}//end of class

var thisiscontroller = new controller
