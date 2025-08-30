import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const form = useForm();
    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const loginInfo = {
            email: data.email.toLowerCase(),
            password: data.password
        }
        try {
            const res = await login(loginInfo).unwrap();

            if (res.success) {
                toast.success("Logged in successfully");
                navigate("/");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.data.message === "User Is Not Verified") {
                toast.error("Your account is not verified");
                navigate("/verify", { state: data.email });
            }
            else{
                toast.error(`${err.data.message}`);
            }
        }
        form.reset();
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your mail & password to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: "Email is Required"
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            // autoComplete="email"
                                            placeholder="john@example.com"
                                            type="email"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            rules={{
                                required: "Password is Required"
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="********"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" replace className="underline underline-offset-4">
                    Register
                </Link>
            </div>
        </div>
    );
}