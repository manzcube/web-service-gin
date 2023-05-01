import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='View Home'>
      <div className='bounceInRight'>
        <h1>Welcome to GIN</h1>
        <h2>Top rated GIN brands with worldwide delivery</h2>
        <button className='checkBrandsBtn' onClick={() => navigate("/brands")}>Check Brands</button>
      </div>
    </div>
  )
}

export default Home