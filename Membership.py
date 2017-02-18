def membership():
    
    user_membership=None #User has no membership yet
    
    try:
        if user_status=='new user':#if the user is a newly registered user
            registration()#first register the user before becoming a member
        elif user_status=='existing user':
            ask=input('Would you like to join our basic membership program or our Loyalty membership program?' )#Asks which membership program they would like to join

            if ask=='Basic':
                user_membership=Basic
                
