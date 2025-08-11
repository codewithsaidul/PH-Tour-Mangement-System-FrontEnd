import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/feature/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(120);
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  //! Nedded - But turned off for development
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [navigate, email]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP");

    try {
      const res = await sendOTP({ email }).unwrap();

      if (res.statusCode === 200 && res.success) {
        toast.success("OTP send successfully", { id: toastId });
        setConfirmed(true);
        setTimer(120);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("verifying OTP");
    const userInfo = {
      email,
      otp: values.pin,
    };

    try {
      const res = await verifyOTP(userInfo).unwrap();

      if (res.statusCode === 200 && res.success) {
        toast.success("Account Verified successfully", { id: toastId });
        setConfirmed(true);
        navigate("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card className="max-w-fit w-full">
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to ${email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>

                          <Dot />

                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>

                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="flex items-center gap-2">
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          className={cn("m-0 p-0", {
                            "cursor-pointer": timer === 0,
                            "text-foreground": timer !== 0,
                          })}
                          disabled={timer !== 0}
                        >
                          Resend OTP
                        </Button>
                        {timer !== 0 && (
                          <span className="text-foreground">{timer}</span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button form="otp-form" type="submit">
              Veirfy
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-[300px]">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
