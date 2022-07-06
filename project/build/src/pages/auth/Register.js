import React,{ useState,useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";




const Register = ({history}) => {


  //grab the store state
  const {user} = useSelector((state) => ({ ...state}));
  
useEffect(()=>{

if(user && user.token)
{
  history.push("/");
}

},[user]);
  
  
  
  const[email, setEmail] = useState("");

    const handleSubmit = async (e) =>{

       e.preventDefault();

       const config = {
            url : process.env.REACT_APP_REGISTER_REDIRECT_URL,
            //to stay at the same device during registration.
            handleCodeInApp: true,
       };

       await auth.sendSignInLinkToEmail(email,config);
       toast.success(`Email is send to ${email}. Click the Link to complete your Registration`);
    
       window.localStorage.setItem('emailForRegistration',email)
       //clearstate
       setEmail("");

       history.push("/");
    
    };

               
  
  
  
  
  
    const registerform= () =>(

        
        <form onSubmit={handleSubmit}>

            <input type="email" className="form-control" 
            placeholder="Email Address" value={email} 
            onChange={(e) => setEmail(e.target.value)} autoFocus />
            
             <br></br>

            <button type="submit" className="btn btn-raised">
             Register
            </button>
        </form>
    );

  
  
  
  
  
  
    return(
                            // padding 5
        <div className="container p-5"> 
          <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerform()}
                </div>
          </div>
        </div>

    );

};

export default Register;