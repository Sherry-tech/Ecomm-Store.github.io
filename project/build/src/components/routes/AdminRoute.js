import React,{ useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({childern, ...rest}) => {

    const {user} = useSelector((state) => ({ ...state }));

    const [ok, setOK] = useState(false);

   
    useEffect (() => {

        if(user && user.token){

            currentAdmin(user.token)
            .then((res) => {
                console.log('Current Admin RES', res);
                setOK(true);
            })
            .catch((err) => {
                console.log("Admin Route Error", err);
                setOK(false);
            });

        }

    },[user]);





    return ok ? <Route {...rest} /> : <LoadingToRedirect />;

 };

 export default AdminRoute;