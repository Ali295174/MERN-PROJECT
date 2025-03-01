import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllCategory } from "@/store/features/categories/categoriesSlice";
import { deleteProduct, getAllProducts } from "@/store/features/Products/productsSlice";
import formatNumber from "format-number"

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const fetchedProducts = useSelector((state) => state.storeProducts.products);
  const status = useSelector((state) => state.storeProducts.status);
  const error = useSelector((state) => state.storeProducts.error);
 
 


  // Fetch products & categories when component mounts
  useEffect(() => {
    dispatch(getAllProducts()); 
   
  }, [dispatch]);

  

  // Handle Delete
  const handleDelete = (productId, e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          toast.success(response.message, { autoClose: 2000 });
          dispatch(getAllProducts());
        } else {
          toast.error(response.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      });
  };

  // Handle loading and error states
  if (status === "loading") {
    return <div className="h-full flex justify-center items-center"><p>Loading Products...</p></div>;
  }

  if (error) {
    return <div className="h-full flex justify-center items-center"><p>Error fetching products</p></div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Link to="/admin/products/add">
          <Button className="bg-black text-white">Add Product</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 text-center p-2 w-10">Sr. #</th>
              <th className="border border-gray-300 text-center p-2 w-40">Product</th>
              <th className="border border-gray-300 text-center p-2 w-20">Price</th>
              <th className="border border-gray-300 text-center p-2 w-20">Category</th>
              <th className="border border-gray-300 text-center p-2 w-20">Added By</th>
              <th className="border border-gray-300 text-center p-2 w-20">Date</th>
              <th className="border border-gray-300 text-center p-2 w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedProducts?.Products?.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 text-center p-2">{index + 1}</td>
                
                {/* Product Info */}
                <td className="border border-gray-300 text-center p-2">
                  <div className="flex flex-col items-center">
                    <img
                      src={product.picture?.secure_url || "placeholder.jpg"}
                      alt="Product"
                      className="h-16 w-16 object-cover rounded-md border mb-1"
                    />
                    <span className="font-semibold text-sm">{product.title}</span>
                    <p className="text-xs text-gray-500">{product.description}</p>
                  </div>
                </td>

                {/* Price */}
                <td className="border border-gray-300 text-center p-2">${formatNumber()(product.price)}</td>

                {/* Category (Fixed) */}
                <td className="border border-gray-300 text-center p-2">
                  {product.category?.name || "N/A"}
                </td>

                {/* Added By (Fixed) */}
                <td className="border border-gray-300 text-center p-2">
                  {product.user.name || "N/A"}
                </td>

                {/* Date */}
                <td className="border border-gray-300 text-center p-2">
                  {moment(product.createdAt).format("YYYY-MM-DD")}
                </td>

                {/* Actions Dropdown */}
                <td className="border border-gray-300 text-center p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <button onClick={() => navigate(`/admin/products/update/${product._id}`)}>Edit</button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button onClick={(e) => handleDelete(product._id, e)}>Delete</button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
