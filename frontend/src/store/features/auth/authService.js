import axios from "axios";

// auth service taking data from authslice to perform login service
const loginUser=(inputvalues)=>{
    const axiosResponce =
    axios
    .post("http://localhost:8080/api/v1/users/login", inputvalues, {
       withCredentials : true, //with this line we send cookies to backend from frontend which allaow backend to set token in 
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
        window.localStorage.setItem("user",JSON.stringify(response.data));
        return response.data;
        
    })
    .catch((error) => {
      return error.response.data
    });     
    return axiosResponce;

}
const authservice = {loginUser}

export default authservice; 