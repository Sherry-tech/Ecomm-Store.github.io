import React, { useState } from "react";
import { Menu, Badge } from "antd";
import { AppstoreOutlined, 
         HomeOutlined, 
         SettingOutlined, 
         UserAddOutlined, 
         UserOutlined,
         LogoutOutlined,
         ShoppingOutlined,
         ShoppingCartOutlined, 
        } from "@ant-design/icons";
import { Link } from "react-router-dom";

//imports for firebase to logout and use dispatch to update the state use history to push to another website
import firebase from 'firebase/compat/app';
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//import { toast } from "react-toastify";
import Search from "../forms/Search";


const { SubMenu, Item } = Menu; //Menu.SubMenu
 
const Header = () => {

    const [current, setCurrent] = useState("/");
    
    let history = useHistory();
    let dispatch = useDispatch();

    let {user, cart} = useSelector((state) => ({ ...state}));   
    
    

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {

        //toast.message("Are YOU Sure!");

        firebase.auth().signOut()
        dispatch({
            type:"LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
        
        <Item key="home" icon={<HomeOutlined />}>
         <Link to="/">Home</Link> 
        </Item>

        <Item key="shop" icon={<ShoppingOutlined />} style={{marginLeft: "-1150px"}}>
         <Link to="/shop">Shop</Link> 
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
         <Link to="/cart">
            <Badge count={cart.length} offset={[ 9,0 ]}>
                Cart
            </Badge>
        </Link> 
        </Item>


       {user && ( 
        // Split will make array of [name,email] se we get 0 where name is.
       < SubMenu key="SubMenu" icon={<SettingOutlined/>} style={{marginLeft: 'auto'}} title={user.email && user.email.split("@")[0]}>  
       
       {/* <Item key="setting:1" icon={<AppstoreOutlined/>}>Dashboard</Item> */}




       {/* user dashboard */}
       {user && user.role === "subscriber" && (

        <Item icon={<AppstoreOutlined/>} >
            <Link to= "/user/history">Dashboard</Link>
        </Item>

       )}




        {/* admin dashboard */}
        {user && user.role === "admin" && (

        <Item icon={<AppstoreOutlined/>} >
            <Link to= "/admin/dashboard">Dashboard</Link>
        </Item>

        )}



       <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Log Out</Item>
       </SubMenu>)}
        
        
        
        {!user && (
        <Item key="login" icon={<UserOutlined />} style={{marginLeft: 'auto'}}>
        <Link to="/login">Login</Link>
        </Item>)}

        {!user && (
        <Item key="register" icon={<UserAddOutlined />} style={{marginLeft: '10px'}}>
        <Link to="/register">Register</Link>
        </Item>)}

        <span className="p-1" style={{marginLeft: '920px'}}>
            <Search />
        </span>
    
      </Menu>
    );

}

export default Header;