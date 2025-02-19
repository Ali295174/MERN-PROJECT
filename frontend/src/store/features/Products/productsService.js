import axios from "axios";



//--------------------------------------------------create Products services
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

const productServices = {createProducts}

export default productServices;
