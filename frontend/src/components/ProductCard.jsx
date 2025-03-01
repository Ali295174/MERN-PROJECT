import { Link } from "react-router-dom"
import { Card, CardContent } from "./ui/card"




function ProductCard({product}) {
  return (
      <Link to={`/product/${product._id}`}>
    <Card>
     <CardContent>
         <img src={product.picture?.secure_url} alt={product.title} 
         className="flex text-center h-56 object-contain"/>
         <div className=" pl-3  text-center pt-3 ">
          <h5 >{product.title}</h5>
          <div className="flex justify-between items-center">
            <span className="">
              <span >Price: </span>
              <span>${product.price}</span>
            </span>
            <button className="bg-orange-500  text-white px-2 py-1 rounded-sm">
              View Product
            </button>
          </div>
         </div>
     </CardContent>
    </Card>
    </Link>

   )
}

export default ProductCard