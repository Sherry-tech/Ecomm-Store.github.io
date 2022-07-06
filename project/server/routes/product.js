const express = require("express");

const router = express.Router();

//middlewares
const {authCheck, adminCheck} =require("../middlewares/auth");

//controllers
const { create, read, listAll, list, productsCount, searchFilters } = require("../controllers/product");


//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll);
router.get("/product/:slug", read);


router.post("/products", list);

//search request
router.post("/search/filters", searchFilters)



   

module.exports = router;