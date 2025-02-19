
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getSingleCategory } from "@/store/features/categories/categoriesSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
function UpdateCategory() {
    const [catName, setCatName] = useState({});
    const dispatch = useDispatch();
       const {slug}=useParams();

        const handleSubmit = (e) => {
           e.preventDefault();
          
           dispatch(UpdateCategory())
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
   
    
      

      useEffect(()=>{
        dispatch(getSingleCategory(slug))
          .unwrap()
          .then((response) => {
            if (response?.success == true) {
              console.log(response);	
      
              toast.success(response?.message, { autoClose: 2000 });
              setCatName(response.category?.name);   
               
            } else {
              toast.error(response?.message, { autoClose: 2000 });
            }
          })
          .catch((error) => {
            toast.error(error.message, { autoClose: 2000 });
          });
      },[dispatch,slug])
  return (
    <>
    
      <Card>
            <CardHeader>
              <CardTitle>Update Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form >
                <div className="flex">
                  <Input
                    className="me-2"
                
                    type="text"
                
                    required
                    name="name"
                    value={catName}
                    onChange={(e)=>{
                         setCatName(e.target.value);
                    }}
                  />
                  <Button>Update Category</Button>
                </div>
              </form>
            </CardContent>
          </Card>
    </>
  )
}

export default UpdateCategory