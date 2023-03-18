import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useGetAllProductsQuery } from "./features/api/apiSlice";

//Components
import Navbar from "./components/Navbar";

// Views
import Home from "./views/Home";
import Brands from "./views/Brands";
import SingleProduct from "./views/SingleProduct";
import Cart from "./views/Cart";
import Login from "./views/Login";
import { useSelector } from "react-redux";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/auth/userSlice";



function App() {
  const user = useAppSelector(selectUser)
  console.log("This is user", user)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          user ? <Home /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/brands" element={
          user ? <Brands /> : <Navigate to="/login" />
        } />
        <Route path="/brands/:id" element={
          user ? <SingleProduct /> : <Navigate to="/login" />
        } />
        <Route path="/cart" element={
          user ? <Cart /> : <Navigate to="/login" />
        } />
      </Routes>
    </div>
  );
}

export default App;
