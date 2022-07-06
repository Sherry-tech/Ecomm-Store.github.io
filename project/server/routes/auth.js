//import for express server
const express = require('express');
//All the functions of router are derived from express.Router() method.
//Now we can use GET & Post on the routes easily.(i.e router.get, router.post)
const router = express.Router();

//middleware for auth check processing
const {authCheck, adminCheck} =require("../middlewares/auth");


//import controllers and destructure by putting {} beacuse there may be many exports
const {CreateOrUpdateUser, currentUser} = require("../controllers/auth");



//before the controller(also a function) codes run the middleware will run & check the authentication.
router.post("/create-or-update-user", authCheck ,CreateOrUpdateUser);
router.post("/current-user", authCheck , currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

   
//Export Router
module.exports = router;