import React from 'react';
import {Link} from "react-router-dom";


const ProductListItems = ({product}) => {

    const {price, shipping, color, quantity, brand, sold} = product;

    return (
        
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        $ {price}
                </span>
            </li>


            <li className="list-group-item">
                Shipping{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        {shipping}
                </span>
            </li>

            <li className="list-group-item">
                Color{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        {color}
                </span>
            </li>


            <li className="list-group-item">
                Available{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        {quantity}
                </span>
            </li>


            <li className="list-group-item">
                Brand{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        {brand}
                </span>
            </li>

            <li className="list-group-item">
                Sold{" "} 
                <span className='label label-default labrl-pill pull-xs-right'>
                        {sold}
                </span>
            </li>

        </ul>


        

    );
};

export default ProductListItems;