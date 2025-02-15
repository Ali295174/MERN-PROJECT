import axios from "axios";



//--------------------------------------------------create category services
const createCat = async (inputvalues) => {
  try {
    const axiosResponce = await axios.post(
      "http://localhost:8080/api/v1/categories/",
      inputvalues,
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "application/json" },
      }
    );

    return axiosResponce.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
      return Promise.reject(errorMsg);

  }
 
};


//-----------------------------------------------------get all services

const getAllCat = async () => {
  try {
    const axiosResponce = await axios.get(
      "http://localhost:8080/api/v1/categories/",
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "application/json" },
      }
    );
  
    return axiosResponce.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
      return Promise.reject(errorMsg,);

  }
 
};
//-----------------------------------------------------get all services

const getSingleCat = async (slug) => {
  try {
    const axiosResponce = await axios.get(
      `http://localhost:8080/api/v1/categories/${slug}`,
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "application/json" },
      }
    );

  
    return axiosResponce.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
      return Promise.reject(errorMsg,);

  }
 
};


//-----------------------------------------------------delete category services

const deleteAllCat = async (slug) => {
  try {
    const axiosResponce = await axios.delete(
     ` http://localhost:8080/api/v1/categories/${slug}`,
      
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "application/json" },
      }
    );
  
    return axiosResponce.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong Please try again";
      return Promise.reject(errorMsg);

  }
 
};


const categoriesServices = {createCat,getAllCat,deleteAllCat,getSingleCat};

export default categoriesServices;
