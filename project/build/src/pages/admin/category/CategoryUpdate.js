import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { updateCategory,getCategory } from "../../../functions/category" ;
import CategoryForm from "../../../components/forms/CategoryForm";
//use this Params Hook to get the slug from params
//import { useParams } from "react-router-dom";


//Accessing Slug from params using match props
const CategoryUpdate = ({history, match}) =>{

  //spread the state object and get destructured user
const {user} = useSelector(state => ({...state}));




const [name,setName] = useState("");
const [loading,setLoading] = useState(false);



useEffect(()=>{

  loadCategory();

},[]);

const loadCategory = () => 
getCategory(match.params.slug).then((c)=> setName(c.data.name));




//on submit Updating data into backend
const handleSubmit =(e) => {
  e.preventDefault();
  setLoading(true);
  updateCategory(match.params.slug, { name }, user.token)
  .then((res) => {
    //console.log(res);
    setLoading(false);
    setName("");
    toast.success(` "${res.data.name}" is updated `);
    //to load imediate after creating the category
    history.push("/admin/category");
  })
  .catch(err => {
    console.log("Catch Error",err);
    setLoading(false);
    if (err.response.status === 400) toast.error(err.response.data);
  });
  
};



    return (
        <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-2">
              <AdminNav />
          </div>
          <div className='col'>
            {loading ? (<h4 className="text-danger">Loading...</h4>) : ( <h4>Update Category</h4> )}
           <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
            <br></br>
          </div>
        </div>  
      </div>
    );

};

export default CategoryUpdate;
