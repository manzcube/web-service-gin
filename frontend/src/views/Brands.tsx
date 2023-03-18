import React from 'react'
import { useGetAllProductsQuery } from '../features/api/apiSlice';

const Brands = () => {
  const { data: products, isLoading, isSuccess, isError } = useGetAllProductsQuery()
  let content;
  console.log(content)
  if (isLoading) {
    content = "Loading.."
  } else if (isSuccess) {
    content = products.map((prod: any, i: number) => (
      <div key={i}>{prod.name}</div>
    ))
  } else if (isError) {
    content = <p>Error</p>
  }
  return (
    <div className='View'>Brands</div>
  )
}

export default Brands