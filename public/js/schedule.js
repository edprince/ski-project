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

class controller { //controller class
  constructor() {

    var myTable = document.getElementById("myTable");//gets the table
    var database = firebase.database

    for (var session = 1; session <= 3; session++) {//for loop to itterate over each session
      var temp = firebase.database().ref('/sessions/' + session).once('value').then(function(snapshot){//start of firebase snapchot
        var tablerow = document.createElement('tr'); //creates a new row
        var tablecolumn = document.createElement('td'); //creates a new column
        //gets the value of instructor from the database snapshot and appeneds it to the column of the table
        tablecolumn.appendChild(document.createTextNode(snapshot.val().instructor));
        tablerow.appendChild(tablecolumn);//appends the column to the row (i.e. moves on to the next column)
        var tablecolumn = document.createElement('td');//creates a new cloumn
        //gets the value of slope from the database snapshot and appeneds it to the column of the table
        tablecolumn.appendChild(document.createTextNode(snapshot.val().slope));
        tablerow.appendChild(tablecolumn);//appends the column to the row (i.e. moves on to the next column)
        var tablecolumn = document.createElement('td');//creates a new cloumn
        //gets the value of start from the database snapshot and appeneds it to the column of the table
        tablecolumn.appendChild(document.createTextNode(snapshot.val().start));
        tablerow.appendChild(tablecolumn);//appends the column to the row (i.e. moves on to the next column)
        var tablecolumn = document.createElement('td');//creates a new cloumn
        //gets the value of end from the database snapshot and appeneds it to the column of the table
        tablecolumn.appendChild(document.createTextNode(snapshot.val().end));
        tablerow.appendChild(tablecolumn);//appends the column to the row (i.e. moves on to the next column)
        var tablecolumn = document.createElement('td');//creates a new cloumn
        //gets the value of group_size from the database snapshot and appeneds it to the column of the table
        tablecolumn.appendChild(document.createTextNode(snapshot.val().group_size));
        tablerow.appendChild(tablecolumn);//appends the column to the row (i.e. moves on to the next column)
        var tablecolumn = document.createElement('td');//creates a new cloumn
        myTable.appendChild(tablerow);//appends the row to the table (i.e. moves on to the next row)
      });//end of database screenshot

    }//end of for loop
  }//end of constructor
}//end of class

class Singleton {//end of Singleton class, used to
  constructor(){
    this.instance
  }

  static GetInstance(){
    if(this.instance==null){
      this.instance = new controller;
    }
    return this.instance;
  }
}


Singleton.GetInstance();

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
