import TravelRegister from "@/assets/images/travel-register.jpg";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-5 order-2">
                <RegisterForm />
              </div>
              <div className="bg-muted order-1 relative hidden md:block">
                <img
                  src={TravelRegister}
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
