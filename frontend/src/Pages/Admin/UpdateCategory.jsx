
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
function UpdateCategory() {
    const [catName, setCatName] = useState({});
    const dispatch = useDispatch();
       const {slug}=useParams();
   
    
      

      useEffect(()=>{
         
        dispatch(getSingleCategory(slug))
          .unwrap()
          .then((respons) => {
            if (respons?.success == true) {
      
              toast.success(respons?.message, { autoClose: 2000 });
              setCatName(respons.category?.name);   
               
            } else {
              toast.error(respons?.message, { autoClose: 2000 });
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