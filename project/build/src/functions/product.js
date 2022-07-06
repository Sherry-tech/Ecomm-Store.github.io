import axios from "axios";



export const createProduct = async (product,authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {

        headers : {
            authtoken,
        },

    });



export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);




export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);



export const getProducts = async (sort, order, page) => 
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort, 
        order, 
        page,
    });


export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`);


    export const fetchProductByFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

