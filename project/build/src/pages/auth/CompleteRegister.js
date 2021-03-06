import React,{ useState,useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth.js";


const CompleteRegister = ({history}) => {

  const[email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  //accessing user from the state.
  //const { user } = useSelector((state) => ({ ...state }));
  
  const dispatch = useDispatch();

  //Populating the email in state
  useEffect(()=>{

    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href )
    // console.log(window.localStorage.getItem("emailForRegistration"))

  },[]);

    const handleSubmit = async (e) =>{

       e.preventDefault();
       
      //validation
      if(!email || !password )
      {
        toast.error('Email and Password is Required');
        return;
      }

      if(password.length < 6)
      {
        toast.error("Password must be atleast 6 character long");
        return;
      }


       try
       {
         const result = await auth.signInWithEmailLink(email,window.location.href);
        //  console.log("Result",result);

        if(result.user.emailVerified){

          //remove user from local storage
          window.localStorage.removeItem("emailForRegistration");

          //get user id token
          let user = auth.currentUser;
          await user.updatePassword(password);
          const idTokenResult = await user.getIdTokenResult();
          //redux store
            console.log("user",user , "idTokenResult",idTokenResult);

            createOrUpdateUser(idTokenResult.token)
            .then((res) =>{
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    name : res.data.name,
                    email : res.data.email,
                    token : idTokenResult.token,
                    role : res.data.role,
                    _id : res.data._id,
                },
            });
            })
            .catch((err) => console.log(err));
          //redirect
          history.push("/");

        }

        

       }

       catch (error)
       {
         console.log(error);
         toast.error(error.message);
       }
       
    };

               
    const completeRegisterForm= () =>(

        
        <form onSubmit={handleSubmit}>

            <input type="email" className="form-control" value={email} disabled />
            <br/>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus />
            <button type="submit" className="btn btn-raised">
             Complete-Registeration
            </button>
        </form>
    );

    return(
                            // padding 5
        <div className="container p-5"> 
          <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registeration</h4>
                    {completeRegisterForm()}
                </div>
          </div>
        </div>

    );

};

export default CompleteRegister;