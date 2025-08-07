import Logo from "@/assets/icons/Logo";
import CustomFormField from "@/components/form/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Password from "@/components/ui/Password";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";


export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium mb-5">
            <Logo />
            <h2 className="text-foreground max-sm:hidden text-3xl font-bold font-tour-title">
              Tour Your <span className="text-primary">Way</span>
            </h2>
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>
      <div className="grid gap-6">
        {/* ============================ register form ================================= */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Jhon Doe"
              description="This is your full name"
            />

            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="jhon.doe@gmail.com"
              description="This is your full email"
            />

            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              description="This is your full password"
              customInput={<Password />}
            />

            <CustomFormField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              type="password"
              description="This is your full confirm password"
              customInput={<Password />}
            />

            <Button className="w-full">Register</Button>
          </form>
        </Form>

        {/* ==================== continue with google ============================= */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
