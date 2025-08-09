import TravelRegister from "@/assets/images/travel-register.jpg";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center max-sm:p-2 p-6 md:p-10">
      <div className="w-full md:max-w-7xl lg:max-w-5xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
{/* ======================= Register Form ==================================== */}
              <div className="px-4 py-16 order-2">
                <RegisterForm />
              </div>


{/* ======================= Register Image ==================================== */}
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
