import React from 'react'
import { ProductType } from '../features/api/types'

type Props = {
  prod: ProductType;
};

const Product = ({ prod }: Props) => {
  return (
    <div className='Product'>
      <div className='Product-image'>
        <img src={prod.img} alt="" />
      </div>
      <div className='Product-info'>
        <h2>{prod.name}</h2>
        <p className='Product-price'>Price: {prod.price}</p>
        <p className='Product-qty'>Qty: {prod.qty}</p>
        <p className='Product-description'>{prod.description}</p>
      </div>
    </div>
  )
}

export default Product
