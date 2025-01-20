import { BrowserRouter, Routes , Route } from "react-router-dom"
import RegisterPage from "./Pages/RegisterPage"

function App() {
 return (
    <>
   <BrowserRouter>
   <Routes>
  <Route path="/register" element={<RegisterPage/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
