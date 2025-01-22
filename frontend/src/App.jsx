import { BrowserRouter, Routes , Route } from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage"
import { ToastContainer} from 'react-toastify';
import LoginPage from "./Pages/LoginPage";

function App() {
 return (
    <>
   <BrowserRouter>
   <Routes>
  <Route path="/register" element={<RegisterPage/>}/>
  <Route path="/login" element={<LoginPage/>}/>
   </Routes>
   <ToastContainer/>
   </BrowserRouter>
    </>
  )
}

export default App
