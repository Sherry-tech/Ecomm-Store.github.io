import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Checkout = ({history}) => {

//when get the user cart put it in state.
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);

    const dispatch = useDispatch();
    const {user} = useSelector((state) => ({ ...state }));


    //get the user cart on every mount req to backend
    useEffect(() => {

        getUserCart(user.token).then((res) => {

            console.log("user cart res", JSON.stringify(res.data,null,4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);

        });

    }, []);




    const saveAddressToDb = () => {

        // console.log(address);
        saveUserAddress(user.token, address).then((res) => {

            if(res.data.ok){
                setAddressSaved(true);
                toast.success("Address Saved");
            }

        });


    };

    const emptyCart = () => {

        //remove from local storage
        if(typeof window !== "undefined")
        {
            localStorage.removeItem("cart");
        }
        //remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });

        //remove from backend
        emptyUserCart(user.token)
        .then((res) => {
            setProducts([]);
            setTotal(0);
            toast.success("Cart is Empty.. Continue Shopping");
        });


    };





    return(

        <div className='row'>
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br/>
                <ReactQuill style={{height: "150px"}} theme="snow" value={address} onChange={setAddress} /> 
                <button className="btn btn-primary mt-5" onClick={saveAddressToDb}> Save </button>
                <hr />
                <h4>Got Coupon?</h4>
                <br/>
                coupon input and apply button
            </div>



            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p, i) => (
                    <div key={i}>
                        <p>
                            {p.product.title} ({p.color}) x {p.count} = {" "}
                            {p.product.price * p.count}
                        </p>
                    </div>
                ))}
                <hr />
                <p>Cart Total: {total}</p>     



                <div className="row">
                    <div className='col-md-6'>
                    
                        <button 
                           className="btn btn-primary" 
                           disabled={!addressSaved || !products.length} 
                           onClick={() => history.push("/payment")}
                        >
                            Place Order
                        </button>
                    
                    </div>


                    <div className='col-md-6'>
                        <button disabled={!products.length} onClick={emptyCart} className='btn btn-primary '>Empty Cart</button>
                    </div>
                </div>


            </div>



            


        </div>
    )

};

export default Checkout