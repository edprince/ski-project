 function get(id) {
    return document.getElementById(id).value;
}

class DatabaseConnection {
    constructor() {
        var config = {
            apiKey: "AIzaSyD1__SyPP9HQ4-ViwJxH6s8EACpCY9-k34",
            authDomain: "skiproject-8236e.firebaseapp.com",
            databaseURL: "https://skiproject-8236e.firebaseio.com",
            storageBucket: "skiproject-8236e.appspot.com",
            messagingSenderId: "633876681860"
        }
        firebase.initializeApp(config);
        var database = firebase.database();
    }
}
class Session {
    constructor(time, date, location, customerFirstname, customerSurname, instructorFirstname, instructorSurname){
        this.time = time;
        this.date = date;
        this.location = location;
        this.customerFirstname = customerFirstname;
        this.customerSurname = customerSurname;
        this.instructorFirstname = instructorFirstname;
        this.instructorSurname = instructorSurname;
    }
}
class SessionInterface {
    constructor() {
        var createSession = document.getElementById('create')
        createSession.addEventListener('click', function(){
            var newSession = Session(
                get('session_time'),
                get('session_date'),
                get('session_location'),
                get('session_customerFirstname'),
                get('session_customerSurname'),
                get('session_instructorFirstname'),
                get('session_instructorSurname'),
            );
        });
        var validate = new Validate();
        if(validate.time(newSession.time)&&validate.date(newSession.date)&&validate.location(newSession.location)&&validate.name(newSession.customerFirstname)&&validate.name(newSession.customerSurname)&&validate.name(newSession.instructorFirstname)&&validate.name(newSession.instructorSurname)){
            var db = new SessionControler();
            db.createNewsession(newSession);
        }
        else{
            document.getElementById('session_time').value = '';
            document.getElementById('session_date').value = '';
            document.getElementById('session_location').value = '';
            document.getElementById('session_customerFirstname').value = '';
            document.getElementById('session_customerSurname').value = '';
            document.getElementById('session_instructorFirstname').value = '';
            document.getElementById('session_instructorSurname').value = '';
            alert('There is some incorrect or missing data.Please try again.');
        }


    }
}

class Validate {
    constructor(){};
    name(name){
        var letters = /^[a-zA-Z]+$/;
        if(name.match(letters)){
            return true;
        }
    }
    location(location){
        var coordonites = /^[0-9a-zA-Z]+$/;
        if(location.match(coordonites)){
            return true;
        }
    }
     time(time){
            var hour =/^\d{1,2}:\d{2}([ap]m)+$/;
            if(time.match(hour)){
                return true;
                }
        }
    date(date){
         var day = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            if(date.match(day)){
                return true;
            }
        }
    }
class SessionControler{
    createNewsession(session){
        var sessionid = firebase.auth().currentSession.sessionid;
        firebase.database().ref('session/'+sessionid).set({
            'time' : session.time,
            'date' : session.date,
            'location' : session.location,
            'customerFirstname' : session.customerFirstname,
            'customerSurname' : session.customerSurname,
            'instructorFirstname' : session.instructorFirstname,
            'instructorSurname' : session.instructorSurname,

        });
        $("#table_body").append("tr.><td>" + session.time +"tr.><td>" + session.date +"tr.><td>" + session.location +"tr.><td>" + session.customerFirstname +"tr.><td>" + session.customerSurname + "tr.><td>" + session.instructorFirstname + "tr.><td>" + session.instructorSurname + "</tr></td>");
    }

}

var db_cnx = new DatabaseConnection();
var ui = new SessionInterface();
