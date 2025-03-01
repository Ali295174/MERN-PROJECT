import axios from "axios";



//---------------------------------------------------------create Products services
const createProducts = async (inputvalues) => {
  try {
    const axiosResponce = await axios.post(
      "http://localhost:8080/api/v1/products/",
      inputvalues,
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "multipart/form-data" },
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



//-----------------------------------------------------get all Products

const getAllProd = async () => {
  try {
    const axiosResponce = await axios.get(
      "http://localhost:8080/api/v1/products/",
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

//-----------------------------------------------------delete Product services

const deleteProd = async (productId) => {
  try {
    const axiosResponce = await axios.delete(
     `http://localhost:8080/api/v1/products/${productId}`,
      
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


//-----------------------------------------------------get Singlel Products

const getSingleProd = async (productId) => {
  try {
    const axiosResponce = await axios.get(
     `http://localhost:8080/api/v1/products/${productId}`,
      
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


//---------------------------------------------------------Update Products services

const UpdateProducts = async ({inputvalues,productId}) => {
  try {
    const axiosResponce = await axios.put(
      `http://localhost:8080/api/v1/products/${productId}`,
      inputvalues,
      {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "multipart/form-data" },
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





const productServices = {createProducts,getAllProd,deleteProd,getSingleProd,UpdateProducts}

export default productServices;
