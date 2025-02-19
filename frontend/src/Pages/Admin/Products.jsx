import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";


function Products() {
  return (
    <>
   
   <div className="flex justify-between items-center">
    <h1>Products</h1>
   <Link to={"/admin/Products/add"}>
   <button className="bg-black text-white  rounded p-4" >
      Add Product 
    </button>
    </Link>
   </div>
   
    
    </> 
  )
}

export default Products;