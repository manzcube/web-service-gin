import React from 'react'
import { useGetAllProductsQuery } from '../../features/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Product from '../../components/Product';
import { ProductType } from '../../features/api/types';

const Brands = () => {
  const navigate = useNavigate()
  const { data: products, isLoading, isSuccess, isError } = useGetAllProductsQuery()
  let content;
  if (isLoading) {
    content = "Loading.."
  } else if (isSuccess) {
    content = products?.map((prod: ProductType, i:number) => <Product key={i} prod={prod} />)
  } else if (isError) {
    content = <p>Error</p>
  }
  return (
    <>
      <div className='Brands'>
        <h1>Best brands in one place</h1>
      </div>
      <div className='Products'>
        {content}
      </div>
    </>
    
  )
}

export default Brands