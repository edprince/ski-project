class Databaseconnection{
  
}

//get user id and information
//if user is registered then proceed to membership
class Member_UI{
  constructor(){
    var membership=None; 
    var question=document.getElementById("Would you like to become a member?");
    var yes_member=document.getElementById("Yes");
    var no_member=document.getElementById("No");
    
    yes_member.addEventListener('click', function(){
      
      var basic=document.getElementById("Basic Membership( No charge )");
      var loyalty=document.getElementById('Loyalty Membership( Annual Payment )');
      
      basic.addEventListener('click', function(){
                             membership='Basic';}
                              
                              )
      loyalty.addEventListener('click',function(){
        //check if number of sessions booked is >10
      }
  }
                                )
    
}
