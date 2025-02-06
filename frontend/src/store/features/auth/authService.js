import axios from "axios";


//---------------------------------------------------registerUser Services
const logoutUser = async () => {
  try {
    const axiosResponce = await axios.get(
      "http://localhost:8080/api/v1/users/logout",
      
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

//---------------------------------------------------registerUser Services
const registerUser = async (inputvalues) => {
  try {
    const axiosResponce = await axios.post(
      "http://localhost:8080/api/v1/users/register",
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

//---------------------------------------------------loginUser Services

// auth service taking data from authslice to perform login service
const loginUser = async (inputvalues) => {
  try {
    const axiosResponce = await axios.post(
      "http://localhost:8080/api/v1/users/login",
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
const authservice = { loginUser ,registerUser,logoutUser};

export default authservice;
