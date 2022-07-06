import React, { useState } from "react";
import {Card, Tabs, Tooltip} from 'antd';
import {Link, useHistory} from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";


const { TabPane } = Tabs;

const SingleProduct = ({product}) => {

    const {title, images, description } = product;

    const [tooltip, setTooltip] = useState("Click to add");


  //redux
  const { user, cart } = useSelector((state)=> ({ ...state }));
  const dispatch = useDispatch();
  //router
  const history = useHistory();



  const handleAddToCart = () => {
    //create cart Array
    let cart = [];

    if(typeof window !== "undefined")
    {
      //if cart is in local storage GET it
      if (localStorage.getItem("cart"))
      {
        //parse the JSOn data from backend and use is as javascript object
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      //push new product to cart
      cart.push({
        //spread the product to get all the values
        ...product,
        count: 1,
      });

      //remove Duplicate using "lodash" method uniqwith.
      let unique = _.uniqWith(cart, _.isEqual);

      //save to local storage
      //console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));

      //show tooltip
      setTooltip("Added");

      //add to redux state
      dispatch({

        type: "ADD_TO_CART",
        payload: unique,

      });

    }

  };





  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("ADDED TO WISHLIST");
      history.push("/user/wishlist");
    });
    
  };






    return(
        <>

            <div className="col-md-7">
                
                { images && images.length ?  (
                
                <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) =>  <img src= {i.url} key= {i.public_id} /> )}
                </Carousel> 
                
                ) : (
                
                <Card
                cover={
                    <img src={Laptop} className="mb-3 card-image" alt='laptoPic'/>
                }
                ></Card>

                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>

                    <TabPane tab="More" key="2">
                        Call us on 0312-6784451 to get Direct Delivery.
                    </TabPane>

                </Tabs>
                
            </div>








            {/* Single Page Card  */}

            <div className="col-md-5">

                
            <h1 className="bg-info p-3">{title}</h1>

                <Card
                     actions=
                        {[
                            
                            <Tooltip title={tooltip}>
                                <a onClick={handleAddToCart}>
                                    <ShoppingCartOutlined className="text-danger"/> <br /> Add to 
                                    Cart
                                </a>
                            </Tooltip>, 
                             
                            <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info"/>
                            <br />
                            Add to Wishlist
                            </a>
                                        
                        ]}
                >


                   
                
                <ProductListItems product={product} /> 



                </Card>
            </div>
        </>
    );
};

export default SingleProduct;