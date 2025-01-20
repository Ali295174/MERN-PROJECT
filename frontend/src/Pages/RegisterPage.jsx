import {Link} from "react-router-dom";
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

export default function RegisterPage({ className, ...props }) {
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
          <form>
            <div className="flex flex-col gap-6">
                {/*============================================================= Name Part  */}
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name here"
                  required
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
                />
              </div>
              {/* ============================================================== ======Password Part*/}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input id="password" type="password" required />
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
