import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "@/store/features/auth/authslice";
import { useDispatch } from "react-redux";
  


// Main component for the Register page


export default function RegisterPage({ className, ...props }) {
  const [inputvalues, setInputvalues] = useState({}); // State to store input field values.
  const navigate = useNavigate();
  const  dispatch = useDispatch();
  

  // Function to handle changes in input fields
  const handlechange = (event) => {
    const name = event.target.name; // Get the 'name' attribute of the input field.
    const value = event.target.value; // Get the value entered by the user.
    setInputvalues((values) => ({ ...values, [name]: value }));
    // Update the state dynamically.By using square brackets ([name]), JavaScript dynamically assigns the value of the name variable as the key in the object.
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(inputvalues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, { autoClose: 2000 });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the registration form */}
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Full Name Input */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name here"
                    required
                    name="name"
                    value={inputvalues.name || ""} // Bind value to the 'name' state.
                    onChange={handlechange} // Update state on user input.
                  />
                </div>

                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                    value={inputvalues.email || ""} // Bind value to the 'email' state.
                    onChange={handlechange} // Update state on user input.
                  />
                </div>

                {/* Password Input */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    name="password"
                    value={inputvalues.password || ""} // Bind value to the 'password' state.
                    onChange={handlechange} // Update state on user input.
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <p>
                  Already have an account?
                  <Link to="/login" className="text-blue-700 underline">
                    {" "}
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
