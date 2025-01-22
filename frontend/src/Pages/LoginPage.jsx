// Import necessary libraries and components
import { Link } from "react-router-dom"; // For navigation (not currently used in this code).
import { cn } from "@/lib/utils"; // Utility function for conditional class names.
import { Button } from "@/components/ui/button"; // Button component.
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Card components for structured design.
import { Input } from "@/components/ui/input"; // Input field component.
import { Label } from "@/components/ui/label"; // Label component for inputs.
import { useState } from "react"; // React hook to manage state.
import axios from "axios"; // For sending HTTP requests.
import { toast } from "react-toastify"; // For displaying success or error messages.

// Main component for the Register page
export default function LoginPage({ className, ...props }) {
  const [inputvalues, setInputvalues] = useState({}); // State to store input field values.

  // Function to handle changes in input fields
  const handlechange = (event) => {
    const name = event.target.name; // Get the 'name' attribute of the input field.
    const value = event.target.value; // Get the value entered by the user.
    setInputvalues((values) => ({ ...values, [name]: value }));
    // Update the state dynamically.By using square brackets ([name]), JavaScript dynamically assigns the value of the name variable as the key in the object.
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from refreshing when the form is submitted.
    console.log(inputvalues);
    // Send a POST request to the backend with input values
    axios
      .post("http://localhost:8080/api/v1/users/login", inputvalues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response); // Log the success response.
        toast.success(response?.data?.message, { autoClose: 2000 }); // Show a success toast message.
        setInputvalues({}); // Reset input fields after successful registration.
      })
      .catch((error) => {
        console.log(error); // Log the error.
        toast.error(error?.response?.data?.message, { autoClose: 2000 }); // Show an error toast message.
        setInputvalues({}); // Reset input fields after an error.
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the registration form */}
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your information below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* email input here */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="email here"
                    required
                    name="email"
                    value={inputvalues.email || ""} // Bind value to the 'name' state.
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
                  Login Account
                </Button>
              </div>
              <div className="flex items-center justify-center pt-4">
                <p>
                  Create new Account
                  <Link to="/register" className="text-blue-700 underline">
                    {" "}
                    Sign up
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
