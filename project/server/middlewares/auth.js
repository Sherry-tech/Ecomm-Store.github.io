const admin = require("../firebase");
const User = require("../models/user")
//this function work as middleware.
//next is applied as parameter to move to next means to the controller.
exports.authCheck = async (req,res,next) => {

    // console.log("Middle-Ware",req.headers); //token
    //validate the token
    try{

        const firebaseUser= await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        //console.log("FIREBASE USER IN AuthCHECK",firebaseUser);
        //do request to make the user available in controller
        req.user = firebaseUser;
        next();
    }
    catch (err) {
        //HTTP status 200(OK) 400 (Not Found)  401(Unauthorized)
        // console.log(err);
        res.status(401).json({
            err: "Invalid or Expired Token",
        });
    }

};


exports.adminCheck = async (req,res,next) => {

    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if(adminUser.role !== "admin"){
        res.status(403).json({
            err: "Admin resource, Access Denied.",
        });
    }
    else{
        next();
    }

};