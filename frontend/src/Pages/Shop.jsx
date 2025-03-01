import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/store/features/Products/productsSlice";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";


function Shop() {
  
const dispatch = useDispatch();

  const fetchedProducts = useSelector((state) => state.storeProducts.products);
  const status = useSelector((state) => state.storeProducts.status);
  const error = useSelector((state) => state.storeProducts.error);
    // Handle loading and error states
     useEffect(() => {
      dispatch(getAllProducts()); 
       
      }, [dispatch]);
    if (status === "loading") {
      return <div className="h-full flex justify-center items-center pt-4"><p>Loading Products...</p></div>;
    }
  
    if (error) {
      return <div className="h-full flex justify-center items-center pt-4"><p>Error fetching products</p></div>;
    }


  return (
    <div className="container mx-auto py-4">
    <h1 className="text-center font-semibold text-3xl py-4">
      Latest <span className="text-orange-500">Mobiles</span>
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {fetchedProducts?.Products?.map((product) => (
        <div key={product._id} className="border border-gray-300 rounded-sm p-4 shadow-md max-w-xs mx-auto">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default Shop;