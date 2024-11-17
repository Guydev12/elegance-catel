import AppLogo from "@/components/shared/AppLogo";
import LoginForm from "@/components/shared/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
      <div className="flex justify-center items-center min-h-screen w-full ">
        <main className="w-full max-w-md mx-auto">
          <Card className="grid items-center justify-center">
            <CardHeader className="space-y-4 flex justify-center items-center">
              <AppLogo />
              <CardTitle className="text-center">
               <h5>Log In</h5>
              </CardTitle>
              <CardDescription className="text-center">
                <p>Login to elegance Dashboard</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LoginForm />
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }