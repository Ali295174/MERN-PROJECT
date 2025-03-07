import { addtoCart } from "@/store/features/cart/cartSlice";
import { getAllCategory, getSingleCategory } from "@/store/features/categories/categoriesSlice";
import { getSingleProduct } from "@/store/features/Products/productsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  const fetchedProducts = useSelector((state) => state.storeProducts.products);
  const status = useSelector((state) => state.storeProducts.status);
  const error = useSelector((state) => state.storeProducts.error);

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    picture: "",
  });

  const { productId } = useParams();
 

  const dispatch = useDispatch();
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addtoCart({
      productId,
      title,
      price,
      secureurl : pictureurl,
      quantity : value,
    }),   toast.success("Product added to cart"));

  };

  const { title, price, category , picture , description } = productDetails;

  const pictureurl =picture.secure_url || "";
  const categoryname = category?.name || ""; 



  useEffect(() => {
    dispatch(getSingleProduct(productId)); 
  }, [dispatch, productId]);


  useEffect(() => {
    if (fetchedProducts && fetchedProducts.Product) {
      setProductDetails(fetchedProducts.Product);
    }
  }, [fetchedProducts]);

  if (status === "loading") {
    return (
      <div className="h-full flex justify-center items-center pt-4">
        <div className="spinner"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center pt-4">
        <p>Error fetching products</p>
      </div>
    );
  }

  return (
    <div className="container py-5 mx-auto">
      <h1 className="text-center font-semibold text-5xl py-4 ">
        Product <span className="text-orange-500">Details</span>
      </h1>
      <div className="flex py-5 ">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={pictureurl}
            alt={title}
            className=" w-52  rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2 ">
          <h2 className="text-3xl mb-3 font-semibold">{title}</h2>
          <p className="text-xl mb-3">
            <strong>Price:</strong> <span className="font-semibold">${price}</span>
          </p>
          <p className="capitalize py-2 text-lg">
            <strong>Category:</strong> <span className="font-semibold">{categoryname}</span>
          </p>
          <p className="text-gray-600 text-lg mb-4">
            <strong>Description:</strong> {description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-5">
            <button
              onClick={handleIncrement}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all"
            >
              +
            </button>
            <input
              type="number"
              readOnly
              value={value}
              className="w-16 text-center border rounded-md border-gray-800"
            />
            <button
              onClick={handleDecrement}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all"
            >
              -
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="border mt-5 border-gray-900 bg-orange-500 text-white hover:bg-orange-700 max-w-xl text-center p-3 rounded-sm transition-all">
            <p className="text-lg font-semibold" onClick={handleAddToCart}>Add to Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;