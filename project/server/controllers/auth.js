const User =require ("../models/user");



exports.CreateOrUpdateUser= async (req,res)=> {

   const { name,picture,email } = req.user;

   //findOneAndUpdate({ FindBY }, { UpdateValues ? }, { Remove previous data })
   const user = await User.findOneAndUpdate(
      { email }, 
      { name: email.split("@")[0], picture }, 
      //up to date data
      { new:true });

   if(user){
      console.log("USER UPDATED", user);
      res.json(user);
   }
   else{
      //created user constructor to create user with email,name,picture
      const newUser = await new User({
         email,
         name : email.split("@")[0],
         picture
      }).save();
      
      console.log("USER CREATED", newUser)
      res.json(newUser);
   }
   
   };



   exports.currentUser = async (req,res) => {

      User.findOne({email: req.user.email}).exec((err,user) => {

         if (err) throw new Error(err);
         res.json(user);

      });

   };