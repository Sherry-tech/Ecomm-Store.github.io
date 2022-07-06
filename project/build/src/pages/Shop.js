import React, {useState, useEffect} from "react";
import {getProductsByCount, fetchProductByFilter} from "../functions/product";
import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../components/cards/ProductCard";


const Shop = () => {

    const [products, setProducts] = useState([]);
    const {loading, setLoading} = useState(false);

    let{ search } = useSelector((state) => ({ ...state }));
    let { text } = search;





    useEffect(() => {
        loadAllProducts();
    }, []);



    //1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(21).then((p) => {
            
            setProducts(p.data);
            setLoading(false);
            
        });
    };



    //2. load products on user search input
    useEffect(() => {

        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if(!text)
            {
                loadAllProducts();
            }
        }, 300);

        return () => clearTimeout(delayed);

    }, [text]);


    const fetchProducts = (arg) => {

        fetchProductByFilter(arg)
        .then((res)=> {
            setProducts(res.data);
        });

    };



    return(
        <div className="container-fluid">
            <div className="row">
                {/* <div className="col-md-3">
                    seach/filter menu
                </div> */}


                <div className="col-md-12">
                <br />

                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Products</h4>
                    )}


                    {products.length < 1 && <p>No Products Found!</p>}

                    <br />

                    <div className="row pb-5">

                        {products.map((p) => (
                          <div key={p._id} className="col-md-3 mt-3">
                            <ProductCard product={p}/>
                            {/* <br /> */}
                          </div>
                          ))}

                    </div>



                </div>

            </div>
        </div>
    )

};

export default Shop;