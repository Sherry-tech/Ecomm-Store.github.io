const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req,res) => {

    try{

        //check in the req.body is it is recieved.
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);

    } catch (err) {

        console.log("Product Create Controller Error: ",err);
        //res.status(400).send("Create product failed");
        res.status(400).json({

            err: err.message,

        });

    }


};


exports.listAll = async (req, res) => {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products);
  };




 // without Pagination

//   exports.list = async (req, res) => {
//     try{
//         //sort will be like createdAt/updatedAt, desc/asc , 3
//         const {sort, order, limit} =req.body;
//         const products = await Product.find({})
//         .sort([[sort, order]])
//         .limit(limit)
//         .exec();

//         res.json(products);

//     } catch (err) {
//         console.log(err);
//     }
// };



//WITH PAGINATION
exports.list = async (req, res) => {
    //to check what are we sending
    //console.table(req.body);
    try{
        //sort will be like createdAt/updatedAt, desc/asc , 3
        const { sort, order, page } =req.body;
        const currentPage = page || 1;
        const perPage = 3;


        const products = await Product.find({})
        //i.e (3-1 * 3) = 6(products)
        .skip(( currentPage - 1 ) * perPage)
        .sort([[sort, order]])
        .limit(perPage)
        .exec();

        res.json(products);

    } catch (err) {
        console.log(err);
    }
};





exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};



// exports.read = async (req,res) => {

//     let products = await Product.find({});
//     res.json(products);

// };


exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug }).exec();
    res.json(product);
  };
  

  //search-filter

const handleQuery = async (req, res, query) => {

    const products = await Product.find({ $text: { $search: query } }).exec();

    res.json(products);
};


exports.searchFilters = async (req,res) => {

    const {query} =req.body;

    if(query){
        console.log("query", query);
        await handleQuery(req, res, query);
    }
};
