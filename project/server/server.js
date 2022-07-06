//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
//file system automate routes
const fs = require("fs")
require('dotenv').config()
//import routes manually
//const authRoutes = require("./routes/auth")





//app using express server function. Think of it as request,response handler.
const app = express();

//db connection
mongoose.connect(process.env.DATABASE)
.then(()=> console.log("DB Connnected."))
.catch((err) => console.log("DB Connection ERROR: ", err));

//Middlewares are functions that runs in between used to achieve certain features.
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());
//routes middlewares  manually where api will be prefix on any routes
//app.use("/api", authRoutes)
//Automate routes and apply middlewares
fs.readdirSync("./routes").map((r) => 
app.use( "/api" ,require( "./routes/" + r))

);




//decide port
const port = process.env.PORT || 8000;



app.listen(port, () => console.log(`Server is running on Port ${port}`));