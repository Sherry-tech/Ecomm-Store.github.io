import React,{useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import {auth} from "./firebase";
import {useDispatch} from "react-redux"; //Dispatch Hook is used for dispatching action,payload to update store.
import { currentUser } from "./functions/auth"

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import CompleteRegister from "./pages/auth/CompleteRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";


const App = () => {

  const dispatch = useDispatch();


  //to check firebase auth state
  useEffect(() =>{

    const unsubscribe = auth.onAuthStateChanged(async(user) => {

      if(user){

        const idTokenResult = await user.getIdTokenResult();
        
        currentUser(idTokenResult.token)
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

      }

    });

    //cleanup so the previous state dispatch is changed or remove.
    return () => unsubscribe();

  },[dispatch] );


  return (
    
    <>                
    <Header />
    <ToastContainer/>
    {/* for this we use React-DOM Browser Router component in index.js */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/register/complete" component={CompleteRegister} />
      <Route exact path="/forgot/password" component={ForgotPassword} />
      {/* protect the user route */}
      <UserRoute exact path="/user/history" component={History} />
      <UserRoute exact path="/user/password" component={Password} />
      <UserRoute exact path="/user/wishlist" component={Wishlist} />
      
      {/* protect the Admin route */}
      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
      <AdminRoute exact path="/admin/sub" component={SubCreate} />
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
      <AdminRoute exact path="/admin/product" component={ProductCreate} />

      <Route exact path="/product/:slug" component={Product} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart" component={Cart} />
      <UserRoute exact path="/checkout" component={Checkout} />
      <UserRoute exact path="/payment" component={Payment} />
      {/* exact is use to address the right exact path */}
    </Switch>
    </>
  );
};

export default App;
