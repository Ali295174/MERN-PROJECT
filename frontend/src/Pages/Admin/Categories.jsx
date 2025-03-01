import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AddCategory,
  deletecategory,
  getAllCategory,
} from "@/store/features/categories/categoriesSlice";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Import table components from your library or create them if not available
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment"; // Make sure moment is imported if you want to format dates
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"; // Import dropdown menu components

function Categories() {
  const [inputValues, setinputValues] = useState({});
  const fitchedCategory = useSelector(
    (state) => state.storeCategory.initialCategory
  ); // Updated state reference
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
          dispatch(getAllCategory()); // Ensure you dispatch the getAllCategory after adding a category
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      });
  };

  const handleDelete = (slug) => {
    // e.preventDefault();
    dispatch(deletecategory(slug))
      .unwrap()
      .then((respons) => {
        if (respons?.success == true) {
          toast.success(respons?.message, { autoClose: 2000 });
          setinputValues({});
          dispatch(getAllCategory()); // Ensure you dispatch the getAllCategory after adding a category
        } else {
          toast.error(respons?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      });
  };
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
    return (
      <div className="h-full justify-center items-center">
        <p>An error occurred while fetching categories</p>
      </div>
    );
  }

  return (
    <>
    {/* Card to Add New Category */}
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              className="sm:w-1/2"
              id="name"
              type="text"
              placeholder="Category Name"
              required
              name="name"
              value={inputValues.name || ""}
              onChange={handleChange}
            />
            <Button type="submit">Add Category</Button>
          </div>
        </form>
      </CardContent>
    </Card>

    {/* Section to Display All Categories */}
    <section className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border text-left">Sr. #</th>
            <th className="p-4 border text-left">Name</th>
            <th className="p-4 border text-left">Slug</th>
            <th className="p-4 border text-left">Date Added</th>
            <th className="p-4 border text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {fitchedCategory?.controllerCategory?.map((cat, index) => (
            <tr key={cat._id} className="hover:bg-gray-50">
              <td className="p-4 border">{index + 1}</td>
              <td className="p-4 border">{cat.name}</td>
              <td className="p-4 border">{cat.slug}</td>
              <td className="p-4 border">
                {moment(cat.createdAt).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-5 w-5" />
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
                        className="w-full text-left"
                      >
                        Edit
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDelete(cat.slug)}
                        className="w-full text-left text-red-500"
                      >
                        Delete
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </>
  );
}

export default Categories;
