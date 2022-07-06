export const  userReducer = (state = null, action) => {
    switch(action.type) {
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
};



//on the basis of action type the payload of the action 
//which contain state values like name email will be set into the state which is right now null.