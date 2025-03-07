import {  Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import DashboardLayout from "./Pages/Admin/DashboardLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Users from "./Pages/Admin/Users";
import Products from "./Pages/Admin/Products";
import Orders from "./Pages/Admin/Orders";
import Navbar from "./components/Navbar";
import Contact from "./Pages/Contact";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Categories from "./Pages/Admin/Categories";
import UpdateCategory from "./Pages/Admin/UpdateCategory";
import AddProducts from "./Pages/Admin/AddProducts";
import UpdateProducts from "./Pages/Admin/UpdateProducts";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
// import Categories from "./Pages/Admin/Categories";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    

    
    <>
    {!isAdmin && <Navbar />}
      
        
        <Routes>
          {/*- -----------------------------------------------------------User Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/product/:productId" element={<ProductDetails/>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />


          {/* --------------------------------------------------------------Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProducts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/update/:slug" element={<UpdateCategory />} />
            <Route path="products/update/:productId" element={<UpdateProducts />} />
            <Route path="Orders" element={<Orders />} />
          </Route>

          
        </Routes>
        <ToastContainer />
      
    </>
  );
}

export default App;
