import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { getCategories } from "../../../functions/category" ;
import { createSub, getSub, getSubs,removeSub } from "../../../functions/sub" ;
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch"




const SubCreate = () =>{

  //spread the state object and get destructured user
const {user} = useSelector(state => ({...state}));




const [name,setName] = useState("");
const [loading,setLoading] = useState(false);
const [categories, setCategories] = useState([]);

//list ofcategory in the option.
const [category, setCategory]= useState("");

//subs
const [subs, setSubs] = useState([]);


//Searching/filtering
//Step 1
const [keyword,setKeyword] = useState(""); 






useEffect(()=>{

  loadCategories();
  loadSubs();

}, []);

//showing list of ctegories.
const loadCategories = () => 
getCategories().then((c)=> setCategories(c.data));


//loading subs
const loadSubs = () => 
getSubs().then((s)=> setSubs(s.data));




//on submit sending data to backend
const handleSubmit =(e) => {
  e.preventDefault();
  setLoading(true);
  createSub({ name, parent:category }, user.token)
  .then((res) => {
    //console.log(res);
    setLoading(false);
    setName("");
    toast.success(` "${res.data.name}" is created `);
    loadSubs();

  })
  .catch((err) => {
    console.log("Catch Error",err);
    setLoading(false);
    if (err.response.status === 400) toast.error(err.response.data);
  });
  
};





//remove
const handleRemove = async (slug) => {

  if(window.confirm("Delete")) 
  {
    setLoading(true);
    removeSub(slug, user.token)
    .then((res)=> {
      setLoading(false);
      toast.error(`${res.data.name} deleted`);
      loadSubs();

    })
    .catch((err) => {
      if (err.response.status === 400) 
      {
        setLoading(false);
        toast.error(err.response.data);
      }
    });
  }

};





 //Step# 4
 const searched = (keyword) => (c) =>c.name.toLowerCase().includes(keyword)


    return (
        <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-2">
              <AdminNav />
          </div>
          <div className='col'>
            {loading ? (<h4 className="text-danger">Loading...</h4>) : ( <h4>Create Sub-Category</h4> )}
            
            
            <br></br>
            <div className="form-group">
                <label className="text-warning">Parent Category</label>
                <select name="category " className="form-control" onChange={(e) => setCategory(e.target.value)}>
                    
                    <option>Please Select</option>
                    
                    {categories.length > 0 && 
                     categories.map((c) => (
                       <option key={c._id} value={c._id}>
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

           {/* step 2 and 3 */}
           <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
            

            <br></br>

            {/* Step# 5 */}
            {subs.filter(searched(keyword)).map((s) => (
                <div className="alert alert-secondary" key={s._id}> 
                    {s.name}{" "}

                    <span 
                    onClick={() => handleRemove(s.slug)} 
                    className="btn btn-sm float-right"> 
                    
                      <DeleteOutlined className="text-danger" />          
                    
                    </span>

                    <Link to={`/admin/sub/${s.slug}`}>
                    <span className="btn btn-sm float-right"> 
                       <EditOutlined className="text-warning" />  
                    </span> 
                    </Link> 
                </div>
            ))}
          </div>
        </div>  
      </div>
    );

};

export default SubCreate;