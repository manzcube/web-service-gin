import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGetAllProductsQuery } from "./features/api/apiSlice";

//Components
import Navbar from "./components/Navbar/Navbar";

// Views
import Home from "./views/Home";
import Cart from "./views/Cart";
import Login from "./views/Login/Login";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/auth/userSlice";
import SingleProduct from "./views/SingleProduct/SingleProduct";
import Brands from "./views/Brands/Brands";



function App() {
  const user = useAppSelector(selectUser)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:id" element={<SingleProduct />} />
        <Route path="/cart" element={
          user ? <Cart /> : <Navigate to="/login" />
        } />
      </Routes>
    </div>
  );
}

export default App;
