
const mongoose = require('mongoose') ;

const categorySchema = new mongoose.Schema({
    name: {

        type: String,
        //trim will remove the white spaces in the name.
        trim: true,
        required: 'Name is requires',
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],

    },
    //to replace the ObjectId of category in url we use slug to  
    slug:{

        type: String,
        //unique true will never create the category with same slug or name
        unique: true,
        lowercase:true,
        index:true,
    },

  },{ timestamps: true });


module.exports = mongoose.model("Category",categorySchema);