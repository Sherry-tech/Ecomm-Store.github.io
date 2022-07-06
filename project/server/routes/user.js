const express = require('express');

const router = express.Router();





//middlewares
const {authCheck} =require("../middlewares/auth");

//controller
const { User, userCart, getUserCart, emptyCart, saveAddress, addToWishlist, wishlist, removeFromWishlist, createOrder, orders, } = require("../controllers/user");

router.get("/user", User);
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//wishList //addToWishlist  wishlist removeFromWishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);


//Order Routes
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);


module.exports = router;