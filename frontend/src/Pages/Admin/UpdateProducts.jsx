import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
   
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { getAllCategory } from "@/store/features/categories/categoriesSlice";
  import { getSingleProduct, updateProduct } from "@/store/features/Products/productsSlice";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
  } from "@/components/ui/select";
  import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
  
  function UpdateProducts() {
    // ---------------------------------------------------------------------------For Categories
    const fetchedCategory = useSelector(
      (state) => state.storeCategory.initialCategory
    );
    const Catgorystatus = useSelector((state) => state.storeCategory.status);
    const Catgoryerror = useSelector((state) => state.storeCategory.error);
  
    // ------------------------------------------------------------------------------For Products
    const fetchedProducts = useSelector((state) => state.storeProducts.products);
    const Productstatus = useSelector((state) => state.storeProducts.status);
    const Producterror = useSelector((state) => state.storeProducts.error);
  
    const [inputValues, setInputValues] = useState({
      title: "",
      description: "",
      price: "",
      category: "",
      picture: "",
      picturePreview: "",
    });
  
    const handlechange = (event) => {
      const name = event.target.name;
      const value =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
  
      if (event.target.type === "file") {
        const file = event.target.files[0];
        setInputValues((values) => ({
          ...values,
          picture: file,
          picturePreview: URL.createObjectURL(file),
        }));
      } else {
        setInputValues((values) => ({ ...values, [name]: value }));
      }
    };
  
    const handleCategoryChange = (value) => {
      setInputValues((values) => ({ ...values, category: value }));
    };
  
    const navigate = useNavigate();
    const params = useParams();
    const productId = String(params.productId);
  
    const dispatch = useDispatch();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const formData = new FormData();
      formData.append("title", inputValues.title);
      formData.append("description", inputValues.description);
      formData.append("price", inputValues.price);
      formData.append("category", inputValues.category);
      
      // Only append the picture if a new file was uploaded
      if (inputValues.picture instanceof File) {
          formData.append("picture", inputValues.picture);
      }
  
      dispatch(updateProduct({ productId, inputvalues: formData }))
        .unwrap()
        .then((response) => {
          if (response?.success === true) {
            toast.success(response.message, { autoClose: 2000 });
            navigate("/admin/products");
          } else {
            toast.error(response.message, { autoClose: 2000 });
          }
        })
        .catch((error) => {
          toast.error(error.message || "Update failed", { autoClose: 2000 });
        });
  };
  
      useEffect(() => {
        if (productId) {
          dispatch(getSingleProduct(productId)); // Ensure productId is passed correctly
        } else {
          console.error("Product ID is invalid");
        }
        dispatch(getAllCategory());
      }, [productId, dispatch]);
      
    useEffect(() => {
      if (fetchedProducts && fetchedProducts.Product) {
        setInputValues({
          title: fetchedProducts.Product.title || "",
          description: fetchedProducts.Product.description || "",
          price: fetchedProducts.Product.price || "",
          category: fetchedProducts.Product.category?._id || "",
          picture: fetchedProducts.Product.picture.secure_url || "",
          picturePreview: fetchedProducts.Product.picture.secure_url || "",
        });
      }
    }, [fetchedProducts]);
  
    if (Catgorystatus === "failed" || Productstatus === "failed") {
      return (
        <div className="h-full justify-center items-center">
          <p>An error occurred while fetching categories and products</p>
        </div>
      );
    }
  
    if (Catgorystatus === "loading" || Productstatus === "loading") {
      return (
        <div className="h-full justify-center items-center">
          <p>Loading Categories and Products.....</p>
        </div>
      );
    }
  
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
            <CardDescription>
              Update the details of the product with the provided information.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter Product Title"
                  required
                  name="title"
                  value={inputValues.title || ""}
                  onChange={handlechange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    name="price"
                    value={inputValues.price || ""}
                    onChange={handlechange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={inputValues.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <>
                        category
                        {fetchedProducts &&
                          fetchedProducts?.controllerCategory &&
                          fetchedProducts?.controllerCategory.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="picture">Product Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    required
                    name="picture"
                    onChange={(e) =>
                        handlechange({
                        target: {
                          name: "picture",
                          value: e.target.files[0],
                        },
                      })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="picture"> Previous Picture</Label>
                  <img
                     src={inputValues.picturePreview || inputValues.picture}
                  
                    className="aspect-square rounded-md object-cover"
                    height="100"
                    width="100"
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="min-h-32"
                  placeholder="Enter Product Description"
                  name="description"
                  required
                  value={inputValues.description || ""}
                  onChange={handlechange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  // className="w-full"
                  // disabled={status == "loading" ? true : false}
                >
                  {/* {status == "loading" ? "Adding Product..." : "Add Product"} */}
                  Update Product
                </Button>
              </div>
            </div>
          </form>
          </CardContent>
        </Card>
      </>
    );
  }
  
  export default UpdateProducts;