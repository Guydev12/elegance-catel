import AppLogo from "@/components/shared/AppLogo";
import Register from "@/components/shared/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
      <div className="flex justify-center items-center min-h-screen w-full ">
        <main className="w-full max-w-md mx-auto">
          <Card className="grid items-center justify-center">
            <CardHeader className="space-y-4 flex justify-center items-center">
              <AppLogo />
              <CardTitle className="text-center">
               <h5>Register</h5>
              </CardTitle>
              <CardDescription className="text-center">
                <p>Login to elegance Dashboard</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Register />
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }