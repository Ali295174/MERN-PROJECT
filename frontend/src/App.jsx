import { BrowserRouter, Routes , Route } from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage"
import { ToastContainer} from 'react-toastify';
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import DashboardLayout from "./Pages/Admin/DashboardLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Users from "./Pages/Admin/Users";
import Products from "./Pages/Admin/Products";
import Orders from "./Pages/Admin/Orders";


function App() {
 return (
    <>
   <BrowserRouter>
   <Routes>

  <Route path="/" element={<HomePage/>}/>

  <Route path="/admin" element={<DashboardLayout/>}>
  <Route index element={<Dashboard/>}/>
  <Route path="Users" element={<Users/>}/>
  <Route path="Products" element={<Products/>}/>
  <Route path="Orders" element={<Orders/>}/>
 
  </Route>
  
  <Route path="/register" element={<RegisterPage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
   </Routes>
   <ToastContainer/>
   </BrowserRouter>
    </>
  )
}

export default App
