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

    var database = firebase.database

    for (var session = 1; session <= 3; session++) {
      var temp = firebase.database().ref('/sessions/' + session).once('value').then(function(snapshot){
        var tablerow = document.createElement('tr'); //creates a new row
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(snapshot.val().instructor));
        tablerow.appendChild(tablecolumn);
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(snapshot.val().slope));
        tablerow.appendChild(tablecolumn);
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(snapshot.val().start));
        tablerow.appendChild(tablecolumn);
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(snapshot.val().end));
        tablerow.appendChild(tablecolumn);
        var tablecolumn = document.createElement('td');
        tablecolumn.appendChild(document.createTextNode(snapshot.val().group_size));
        tablerow.appendChild(tablecolumn);
        var tablecolumn = document.createElement('td');
        myTable.appendChild(tablerow);
      });//end of database screenshot

    }

    // for (var i = 1; i <= 3; i++) {
    //   var tablerow = document.createElement('tr'); //creates a new row
    //   for (var j = 1; j <= 2; j++) {
    //     var tablecolumn = document.createElement('td');
    //     tablecolumn.appendChild(document.createTextNode('hello'));
    //     tablerow.appendChild(tablecolumn);
    //   }//end of for loop
    //   myTable.appendChild(tablerow);
    // }//end of for loop

  }//end of constructor

}//end of class

var thisiscontroller = new controller

function myFunction() {
      // Declare variables
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
