def membership():
    '''
    Function to register the user as a member
    Takes in user input to determine which membership to register the user under

    '''
    
    user_membership=None #User has no membership yet
    
    try:
        if user_status=='new user':#if the user is a newly registered user
            registration()#first register the user before becoming a member
            
        elif user_status=='existing user':
            ask=input('Would you like to join our basic membership program or our Loyalty membership program? ' )#Asks which membership program they would like to join

            if ask=='Basic':
                user_membership='Basic Member'
                print('You will have to pay a one off fee')
                payment()#a one off payment is required to become a basic member
                
                if booked_sessions>=10:#Member can upgrade their membership after booking 10 sessions
                    upgrade=input('Would you like to upgrade to the loyalty membership? )

                                  
            elif ask=='Loyal' or 'Loyalty':
                user_membership='Loyalty Member'
                print('You will have to pay an annual fee')
                
    except TypeError:
        if not ask.isalpha():
		print('Only use letters to type in your membership preference')
	
