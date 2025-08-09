import TravelLogin from "@/assets/images/travel-login.jpg";
import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center max-sm:p-2 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">

{/* ======================= Login Form ==================================== */}
              <div className="px-4 py-16">
                <LoginForm />
              </div>

{/* ======================= Login Image ==================================== */}
              <div className="bg-muted relative hidden md:block">
                <img
                  src={TravelLogin}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
