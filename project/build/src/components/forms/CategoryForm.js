import React from "react";


//destructurig the pros or u can also add props word with the letters
const CategoryForm = ({handleSubmit, setName, name}) => (

<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Name</label>
    <input 
    type="text" 
    className="form-control"  
    onChange={(e) => setName(e.target.value)}  
    value={name} 
    autoFocus
    required/>
    <br></br>
    <button className="btn btn-outline-primary">Save</button>
  </div>

</form>

);

export default CategoryForm;