import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/store/features/categories/categoriesSlice";
import { addProduct } from "@/store/features/Products/productsSlice";

function AddProducts() {
  const [inputvalues, setInputvalues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fitchedCategory = useSelector(
    (state) => state.storeCategory.initialCategory
  );
  const productsStatus = useSelector((state) => state.storeProducts.status);
  const status = useSelector((state) => state.storeCategory.status);
  const error = useSelector((state) => state.storeCategory.error);

  const handlechange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    setInputvalues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputvalues.title);
    formData.append("description", inputvalues.discription);
    formData.append("category", inputvalues.category);
    formData.append("price", inputvalues.price);
    formData.append("picture", inputvalues.picture);

   

    dispatch(addProduct(formData))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message, { autoClose: 2000 });
          setInputvalues({});
          setTimeout(() => {
            navigate("/admin/Products");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while adding the product.", {
          autoClose: 2000,
        });
      });
  };

  const handleCategoryChange = (value) => {
    setInputvalues((values) => ({ ...values, category: value }));
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="h-full flex justify-center items-center">
        <p>Loading Categories.....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center items-center">
        <p>An error occurred while fetching categories</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Products Details</CardTitle>
          <CardDescription>
            Enter your information below to add a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title"> Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  required
                  name="title"
                  value={inputvalues.title || ""}
                  onChange={handlechange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    required
                    name="price"
                    value={inputvalues.price || ""}
                    onChange={handlechange}
                  />
                </div>
                <div className="grid gap-2 pt-5">
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {fitchedCategory?.controllerCategory?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  required
                  name="picture"
                  onChange={(e) => {
                    setInputvalues((values) => ({
                      ...values,
                      picture: e.target.files[0],
                    }));
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discription">Description</Label>
                <Textarea
                  id="discription"
                  placeholder="Enter product description"
                  name="discription"
                  value={inputvalues.discription || ""}
                  onChange={handlechange}
                />
              </div>
              <Button
                type="submit"
                className="w-fit"
                disabled={productsStatus === "loading"}
              >
                {productsStatus === "loading" ? "Adding Product ..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProducts;
