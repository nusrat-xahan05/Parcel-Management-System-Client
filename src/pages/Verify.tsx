import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters",
    }),
})

export default function Verify() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(location.state);
    const [confirmed, setConfirmed] = useState(false);
    const [timer, setTimer] = useState(60);

    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const handleSendOtp = async () => {
        const toastId = toast.loading("Sending OTP...");

        try {
            const res = await sendOtp({ email: email }).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId });
                setConfirmed(true);
                setTimer(5);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.data.message, { id: toastId });
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toastId = toast.loading("Verifying OTP...");
        
        const userInfo = {
            email,
            otp: data.pin,
        };

        try {
            const res = await verifyOtp(userInfo).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId });
                setConfirmed(true);
                navigate("/login");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.data.message, { id: toastId });
        }
    };

    useEffect(() => {
        if (!email || !confirmed) {
            return;
        }

        const timerId = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            console.log("Tick");
        }, 1000);

        return () => clearInterval(timerId);
    }, [email, confirmed]);

    return (
        <div className="grid place-content-center h-screen">
            {
                confirmed ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Verify Your Email Address</CardTitle>
                            <CardDescription>Please Enter the 6-Digit Code We Sent To <br /> {email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                                        <Dot></Dot>
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
                                                <FormDescription>
                                                    <Button
                                                        onClick={handleSendOtp}
                                                        type="button"
                                                        variant="link"
                                                        disabled={timer !== 0}
                                                        className={cn("p-0 m-0", {
                                                            "cursor-pointer": timer === 0,
                                                            "text-gray-500": timer !== 0,
                                                        })}
                                                    >
                                                        Resent OPT:{" "}
                                                    </Button>{" "}
                                                    {timer}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button form="otp-form" type="submit">Submit</Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Verify Your Email Address</CardTitle>
                            <CardDescription>We'll Send You An OTP at <br /> {email}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleSendOtp} className="w-[300px]">Confirm</Button>
                        </CardFooter>
                        <Link to="/" className="text-center underline underline-offset-4">
                            Back to Home
                        </Link>
                    </Card>
                )
            }
        </div>
    );
}