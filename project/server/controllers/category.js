const Category = require('../models/category');
const slugify = require('slugify');

exports.create = async (req,res) => {

    try {
        // destructure name from req body ,send entire data
        const {name} = req.body;
        const category = await new Category({name , slug: slugify(name)}).save();
        res.json(category);

    } catch (err) {
        res.status(400).send("Create Category Failed!")
    }

};

exports.list = async (req,res) =>    
    res.json(await Category.find({}).sort({createdAt: -1}).exec());


exports.read = async (req,res) =>{
                                //requesting slug from controller parameter
    let category =  await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
};


exports.update = async (req,res) =>{

    const {name} = req.body;
    try{
        const updated = await Category.findOneAndUpdate(
            {slug: req.params.slug}, 
            {name, slug: slugify(name)},
            {new:true});
        
        res.json(updated);

    } catch(err) {
        res.json(400).send("Category Update is failed");
    }
    
};


exports.remove = async (req,res) =>{
    try{

        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);

    } catch (err){

        res.status(400).send("Category delete failed");

    }
};