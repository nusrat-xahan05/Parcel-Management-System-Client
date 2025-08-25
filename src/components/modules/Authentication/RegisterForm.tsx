import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import Password from "@/components/ui/Password";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is Required" })
            .min(3, { message: "Name is Too Short" })
            .max(50, { message: "Name is Too Long" }),
        email: z
            .email({ message: "Invalid Email Address Format" })
            .transform((val) => val.toLowerCase()),
        password: z
            .string({
                error: (issue) => issue.input === undefined
                    ? "Password is Required"
                    : "Password Must Be a String"
            })
            .min(1, { message: "Password is Required" })
            .min(8, { message: "Password Must Be At Least 8 Characters Long" })
            .regex(/^(?=.*[A-Z])/, { message: "Password Must Contain At Least 1 Uppercase Letter" })
            .regex(/^(?=.*[!@#$%^&*])/, { message: "Password Must Contain At Least 1 Special Character" })
            .regex(/^(?=.*\d)/, { message: "Password Must Contain At Least 1 Number" }),
        role: z
            .string()
            .min(1, { message: "Role is Required" })
    })

export function RegisterForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: "",
            password: "",
            role: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        };

        try {
            const result = await register(userInfo).unwrap();
            console.log(result);
            toast.success("User created successfully");
            navigate("/verify");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to create an account
                </p>
            </div>

            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="email"
                                            placeholder="john.doe@company.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Password {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full px-5 rounded-xl">
                                                <SelectValue placeholder="What Do You Want to Be?" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-primary">
                                            <SelectItem value="SENDER">SENDER</SelectItem>
                                            <SelectItem value="RECEIVER">RECEIVER</SelectItem>
                                        </SelectContent>
                                        <FormMessage></FormMessage>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
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