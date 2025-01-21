import { Link } from "react-router-dom";
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
import axios from "axios";

export default function RegisterPage({ className, ...props }) {
  const [inputvalues, setInputvalues] = useState({});

  // email input event
  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputvalues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    // e.prevent Default stops automatic refreshing of page.
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/users/register", inputvalues, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
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
                {/*============================================================= Name Part  */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name here"
                    required
                    name="name"
                    value={inputvalues.name || ""}
                    onChange={handlechange}
                  />
                </div>
                {/* ===================================================================Email Part */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                    value={inputvalues.email || ""}
                    onChange={handlechange}
                  />
                </div>
                {/* ============================================================== ======Password Part*/}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    name="password"
                    value={inputvalues.password || ""}
                    onChange={handlechange}
                  />
                </div>
                {/*============================================================== Login btn*/}
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
