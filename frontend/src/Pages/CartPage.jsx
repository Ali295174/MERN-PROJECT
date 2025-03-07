import { removeFromCart, updateCart } from "@/store/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CartPage() {
  const dispatch = useDispatch();
  const handleQuantityChange = (productId,quantity) => {
    if(quantity < 1){
      return;
    }
    dispatch(updateCart({ productId, quantity }));
  };
  const handleRemoveCart = (productId) => {
    dispatch(removeFromCart({ productId }));
    toast.info("Item removed successfully",{autoClose:2000});
  };

  const CartItems= useSelector((state)=>state?.cart.items);

  if(CartItems.length === 0){
    return (
      <div className="container py-5">
        <h1 className="text-center font-semibold text-4xl">Cart Page</h1>
        <h1 className="text-center text-2xl">No Items in Cart</h1>
        <Link to="/shop" className="text-center text-lg font-semibold  text-orange-500 hover:text-orange-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalPrice = CartItems.reduce((Total,item)=>{
    return Total + item.quantity * item.price;
  },0);

  return (
    <div className="container  py-5">
      <h1 className="text-center font-semibold text-4xl">Cart Page</h1>
      <div className="flex flex-col space-y-4 ">
      {/* Single Product box */}
      {
        CartItems?.map((items)=>{
          return(
            
            <div key={items.productId} className="flex  items-center justify-between p-4  bg-white rounded-lg ">
          <img
            className="h-32 w-32 object-contain rounded"
            src={items.secureurl}
            alt=""
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{items.title}</h2>
            <p className="text-lg text-gray-600">Price : {items.price}</p>
            <p className="text-lg text-gray-600">Total : {items.quantity * items.price }</p>
            <div className="flex items-center ">
              <button
                onClick={() => {
                  handleQuantityChange(items.productId,items.quantity-1);
                }}
                className="bg-gray-600 px-1 py-1 rounded"
              >
                -
              </button>
              <input
                onClick={(event) => {
                  handleQuantityChange(items.productId,parseInt(event.target.value));
                }}
                type="number"
                value={items.quantity}
                className="w-16 text-center px-2 py-1 rounded"
              />
              <button
                onClick={() => {
                  handleQuantityChange(items.productId,items.quantity+1);
                }}
                className="bg-gray-600 px-1 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => {
                  handleRemoveCart(items.productId);
                }}
                className="bg-red-600 px-2 py-1 rounded ml-4 text-white"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-lg text-gray-600">Total : {totalPrice.toFixed(2)}</p>
              <Link className="bg-orange-600 hover:bg-orange-500  p-2 rounded text-black" to="/checkout">Proceed To Checkout</Link>
            </div>
          </div>
        </div>
          )
        })

      }
      </div>
    </div>
  );
}

export default CartPage;
