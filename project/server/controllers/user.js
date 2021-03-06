const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const { findOne } = require("../models/user");




exports.User = (req,res) =>{

    res.json({
   
        data:"hey you hit User API endpoint",

     });

};


exports.userCart = async (req, res) => {
    //console.log(req.body);
    const { cart } = req.body;

    //Array of products
    let products = [];

    //find the user
    const user = await User.findOne({ email: req.user.email }).exec();

    //check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

    if(cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("removed old cart");
    }


    for(let i=0; i<cart.length; i++)
    {
        let object = {};


        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        //get price for creating total
        let productFromDb = await Product.findById(cart[i]._id).select("price").exec();
        object.price = productFromDb.price;

        products.push(object);

    }

    // console("Products", products)

    let cartTotal = 0;
    for(let i=0; i < products.length; i++)
    {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    // console("cartTotal", cartTotal);

    let newCart = await new Cart({
        products,
        cartTotal,
        orderdBy: user._id,
    }).save();

    console.log("new cart ====> ", newCart);
    res.json({ ok:true });

};



//getting user cart from database
exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product","_id title price")
    .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });  //req.data.cartTotal/products

};



exports.emptyCart = async (req,res) => {

    const user = await User.findOne({ email: req.user.email }).exec();

    const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
    res.json( cart );

};



exports.saveAddress = async (req,res) => {
    const userAddress = await User.findOneAndUpdate(
        { email: req.user.email }, 
        {address: req.body.address}
      ).exec();

      res.json({ ok: true });

};


//addToWishlist  wishlist  removeFromWishlist


exports.addToWishlist = async (req, res) => {

    const {productId} = req.body;

    //to check and prevent duplicate product in the wishlist we use $addToSet method of mongoose
    const user = await User.findOneAndUpdate(
        { email: req.user.email }, 
        { $addToSet: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });

};

exports.wishlist = async (req, res) => {

    const list = await User.findOne({email: req.user.email})
    .select("wishlist")
    .populate("wishlist") //by using populate we get the whole info of product by its productId in wishlist
    .exec();

    res.json(list);

};


//to pull or remove we use $pull method from mongoose
exports.removeFromWishlist = async (req, res) => {

    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
        { email: req.user.email }, 
        { $pull: {wishlist: productId} }
        ).exec();

    res.json({ok: true});

};






//Oreder Controllers
exports.createOrder = async (req,res) => {


    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();


    let { products } = await Cart.findOne({orderdBy: user._id}).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderdBy: user._id,
    }).save();

    // decrement quantity, increment Sold
    let bulkOption = products.map((item) => {

        return{
            updateOne: {   
                filter: {_id: item.product._id},  //Important item.product
                update: {$inc: {quantity: -item.count, sold: +item.count}},
            },
        };

    });

   let updated = await Product.bulkWrite(bulkOption, {});
   console.log("Product Quantity -- and Sold ++",updated);

    console.log("NEW ORDER SAVED", newOrder);

    res.json({ok: true});

};




exports.orders = async(req,res) => {

    let user = await User.findOne({ email: req.user.email }).exec();

    let userOrders = await Order.find({ orderdBy: user._id })
        .populate("products.product")
        .exec();



    res.json(userOrders);

};
