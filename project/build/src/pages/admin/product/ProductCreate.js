import React, {useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
//axios funtion for createProduct
import { createProduct } from "../../../functions/product" ;
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
//load the categories
//import { getCategories } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from '@ant-design/icons'


 const initialState = {
    
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple","Samsung","Microsoft","Lenovo","ASUS"],
    color: "",
    brand: "",

};




const ProductCreate = () => {

    const [values, setValues] = useState(initialState);

    //redux
    const { user } = useSelector((state) => ({ ...state }));


    const [loading, setLoading] = useState(false);

    //mounts on every render and take callback arrow function.
    // useEffect(()  => {

    //     loadCategories();

    // }, []);

    // const loadCategories = () => 
    // getCategories().then((c)=> setValues({ ...values, categories: c.data }));



const handleSubmit = (e) => {

    e.preventDefault();
    createProduct(values, user.token)
    .then((res)=> {
        console.log(res);
        window.alert(`"${res.data.title}" is Created `);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
    });

};


//to popilate the state
const handleChange = (e) =>{

    //spread operator cuz updating one state at a time.
    //dynamically updating the state.
    setValues({...values, [e.target.name]: e.target.value});
    //console.log(e.target.name, "-----------", e.target.value);

};





    return(
        <div className="container-fluid">
            <div className="row">
               <div className="col-md-2">
                 <AdminNav />
                </div>


               <div className="col-md-10">
                   { loading ? <LoadingOutlined className="text-danger h1" /> : (<h4>Product Create</h4>) }
                    <hr/>

                   {/* console.log in JSON so that the values and check if we have them */}
                   {/* {JSON.stringify(values.images)} */}
                   {/* {JSON.stringify(values.categories)} */}

                    <div className="p-3">
                        <FileUpload 
                        values={values} 
                        setValues={setValues} 
                        setLoading={setLoading}
                        />
                    </div>

                    <ProductCreateForm 
                       handleSubmit={handleSubmit} 
                       handleChange={handleChange} 
                       values={values} 
                    />


               </div>


            </div>
        </div>
    );

};

export default ProductCreate;