import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { getCategories } from "../../../functions/category" ;
import { updateSub, getSub } from "../../../functions/sub" ;
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch"




const SubUpdate = ({match, history}) =>{

  //spread the state object and get destructured user
const {user} = useSelector(state => ({...state}));




const [name,setName] = useState("");
const [loading,setLoading] = useState(false);
const [categories, setCategories] = useState([]);
const [parent, setParent] = useState("");







useEffect(()=>{

  loadCategories();
  loadSub();

}, []);

//showing list of ctegories.
const loadCategories = () => 
getCategories().then((c)=> setCategories(c.data));


//loading subs
const loadSub = () => 

getSub(match.params.slug).then((s)=> {    
    setName(s.data.name);
    setParent(s.data.parent);

});




//on submit sending data to backend
const handleSubmit =(e) => {
  e.preventDefault();
  setLoading(true);
  updateSub(match.params.slug, { name, parent }, user.token)
  .then((res) => {
    //console.log(res);
    setLoading(false);
    setName("");
    toast.success(` "${res.data.name}" is Updated `);
   history.push("/admin/sub")

  })
  .catch((err) => {
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
            {loading ? (<h4 className="text-danger">Loading...</h4>) : ( <h4>Update Sub-Category</h4> )}
            
            
            <br></br>
            <div className="form-group">
                <label className="text-warning">Parent Category</label>
                <select name="category " className="form-control" onChange={(e) => setParent(e.target.value)}>
                    
                    <option>Please Select</option>
                    
                    {categories.length > 0 && 
                     categories.map((c) => (
                       <option key={c._id} value={c._id} selected={c._id === parent}>
                           {c.name}
                        </option>
                       ) )}
                
                </select>
            </div>


            <br></br>
            
            
            {/* passing the props to the Category-form which is also used in Sub-Category component */}
            <CategoryForm 
            handleSubmit={handleSubmit} 
            name={name} 
            setName={setName}  />

          </div>
        </div>  
      </div>
    );

};

export default SubUpdate;