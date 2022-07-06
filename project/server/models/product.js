const mongoose = require("mongoose");
//const { ObjectId } = mongoose.Schema;

//let Schema = mongoose.Schema;


const productSchema = new mongoose.Schema(
    {

    title: {
        type: String,
        trim: true,
        required:true,
        maxlength : 32,
        //for searching the title
        text: true,
    },



     slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },



    description: {
        type: String,
        required: true,
        maxlength : 2000,
        text: true,
    },
  
   
   
    price: {
        type: Number,
        trim : true,
        required:true,
        maxlength : 32,
    },
 
   
    // category: {
    //     type: String,
    //     ref: "Category",
    //   },
        
    
    //On one category there are many sub Categories that's why make array
    // subs: [{

    //     type: ObjectId,
    //     ref: "Sub",

    // }],



    quantity: Number,
    


    sold:{
        type: Number,
        default: 0,
    },
    


    images:{
        type: Array
    },



    shipping: {
        type: String,
        //we use enum for no other values other than we give.
        enum: ["Yes","No"],
    },



    color:{
        type: String,
        enum : ["Black", "Brown", "Silver", "White", "Blue"],
    },



    brand:{
        type: String,
        enum: ["Apple","Samsung","Microsoft","Lenovo","ASUS"]
    },

    // ratings: [
    //     {
    //     star: Number,
    //     postedBy: {type:ObjectId, ref: "User"},
    //     }
    // ],
   
 },  
  {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);