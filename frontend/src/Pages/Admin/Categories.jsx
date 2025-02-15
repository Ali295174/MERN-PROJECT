import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddCategory, deletecategory, getAllCategory } from "@/store/features/categories/categoriesSlice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"; // Import table components from your library or create them if not available
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment"; // Make sure moment is imported if you want to format dates
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"; // Import dropdown menu components

function Categories() {
  const [inputValues, setinputValues] = useState({});
  const fitchedCategory = useSelector((state) => state.storeCategory.initialCategory);  // Updated state reference
  // console.log(fitchedCategory);
  

  const status = useSelector((state) => state.storeCategory.status);
  const error = useSelector((state) => state.storeCategory.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(AddCategory(inputValues))
      .unwrap()
      .then((respons) => {
        if (respons?.success === true) {
  
          toast.success(respons?.message, { autoClose: 2000 });
          setinputValues({});
          dispatch(getAllCategory());  // Ensure you dispatch the getAllCategory after adding a category
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      });
  };
  
  const handleDelete=(slug) => {
    // e.preventDefault();
    dispatch(deletecategory(slug))
      .unwrap()
      .then((respons) => {
        if (respons?.success == true) {
     
          toast.success(respons?.message, { autoClose: 2000 });
          setinputValues({});
          dispatch(getAllCategory());  // Ensure you dispatch the getAllCategory after adding a category
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      })
  }
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="h-full justify-center items-center">
        <p>Loading Categories.....</p>
      </div>
    );
  }
  if (error) {
    return(
      <div className="h-full justify-center items-center">
        <p>An error occurred while fetching categories</p>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <Input
                className="me-2"
                id="name"
                type="text"
                placeholder="Category Name"
                required
                name="name"
                value={inputValues.name || ""}
                onChange={handleChange}
              />
              <Button>Add Category</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ---------------------------------------------------------- Section Display all Categories */}
      <section>
        <Table>
          <TableHeader >
            <TableRow className=" justify-between items-center w-full" >
              <TableHead >Sr. #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // Check if categories is an array before using .map
              fitchedCategory && fitchedCategory.controllerCategory && fitchedCategory.controllerCategory.map((cat, index) => {
                return (
                  <TableRow key={cat._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.slug}</TableCell>
                    <TableCell>
                      {moment(cat.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                navigate(`/admin/categories/update/${cat.slug}`);
                              }}
                            >
                              Edit
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <button
                              onClick={() => {
                                handleDelete(cat.slug);
                              }}
                            >
                              Delete
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </section>
    </>
  );
}

export default Categories;