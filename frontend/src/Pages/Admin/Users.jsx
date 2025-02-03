import axios from "axios";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState({});
  const getuserdata = () => {
    axios
      .get("http://localhost:8080/api/v1/users/all-users", {
        withCredentials: true, //with this line we send cookies to backend from frontend which allaow backend to set token in
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
          {/* IF we call users directily in {users} it will cause an error  React cannot directly display objects. thats why we use JSON.STRINGFY*/}
      {/* JSON.stringify(value, replacer, space) */}
      {JSON.stringify(users,undefined,4)}
      </div>
      
      
    </>
  );
}

export default Users;
