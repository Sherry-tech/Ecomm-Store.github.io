import React from "react";


const ProductCreateForm = ({ handleSubmit, handleChange, values }) => {


        //destructure to give not values.title etc in the input field.
const {
    title,
    description,
    price,
    // categories,
    // category,
    // subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;


  

return (
    <form onSubmit={handleSubmit}>
                      
    {/* title */}
    <div className="form-group">
      <label>Title</label>
      <input 
      type="text" 
      name="title" 
      className="form-control" 
      value={title} 
      onChange={handleChange}/>
    </div>

    <br />

     {/* description */}
    <div className="form-group">
      <label>Description</label>
      <input 
      type="text" 
      name="description" 
      className="form-control" 
      value={description} 
      onChange={handleChange}/>
    </div>

    <br />

     {/* price */}
    <div className="form-group">
      <label>Price</label>
      <input 
      type="number" 
      name="price" 
      className="form-control" 
      value={price} 
      onChange={handleChange}/>
    </div>

    <br />

     {/* shipping */}
    <div className="form-group">
      <label>Shipping</label>
      <select name="shipping"  className="form-control" onChange={handleChange}>
          <option>Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
      </select>
    </div>

    <br />

    {/* quantity */}
    <div className="form-group">
      <label>Quantity</label>
      <input 
      type="number" 
      name="quantity" 
      className="form-control" 
      value={quantity} 
      onChange={handleChange}/>
    </div>

    <br />

    {/* map through the colors array to get the color value in the option */}
    <div className="form-group">
      <label>Color</label>
      <select name="color"  className="form-control" onChange={handleChange}>
          <option>Please Select</option>
          {colors.map((c) => <option key={c} value={c}> {c} </option>)}
      </select>
    </div>

    <br />

    {/* map through the brands array to get the brand value in the option */}
    <div className="form-group">
      <label>Brand</label>
      <select name="brand"  className="form-control" onChange={handleChange}>
          <option>Please Select</option>
          {brands.map((b) => <option key={b} value={b} >{b}</option>)}
      </select>
    </div>

    <br />
    
    {/* Categories */}
    {/* <div className="form-group">
                <label>Category</label>
                <select name="category " className="form-control" onChange={handleChange}>
                    
                    <option>Please Select</option>
                    
                    {categories.length > 0 && 
                     categories.map((c) => (
                       <option key={c._id} value={c._id}>
                           {c.name}
                        </option>
                       ) )}
                
                </select>
    </div> */}




  <button className="btn btn-outline-info">Save</button>
  </form>

 );

};

export default ProductCreateForm;