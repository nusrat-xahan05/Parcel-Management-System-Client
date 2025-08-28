import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

const contactSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is Required" })
            .min(3, { message: "Name is Too Short" })
            .max(50, { message: "Name is Too Long" }),
        email: z
            .email({ message: "Invalid Email Address Format" })
            .transform((val) => val.toLowerCase()),
        phone: z
            .string({ error: "Phone Number Must Be String" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh" }),
        message: z
            .string()
            .min(1, { message: "Message is Required" })
            .min(10, { message: "Message must be at least 10 characters" })
            .max(160, { message: "Message must not be longer than 160 characters" }),
    })

export function ContactForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    // const [contact] = useContactMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof contactSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        };

        try {
            // const res = await contact(userInfo).unwrap();
            console.log(userInfo);
            toast.success("Message Sent successfully");
            navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            toast.error(`${err.data.message}`);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 py-4", className)} {...props}>
            <div className="flex flex-col items-center gap-2 pb-3 text-center">
                <h1 className="text-2xl font-bold">Send your message</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details and message to reach us
                </p>
            </div>

            <div className="grid gap-6 px-5">
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="phone"
                                            placeholder="+880123456789"
                                            type="phone"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write Your Message..."
                                            {...field} className="h-[205px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <p className="text-center text-sm text-muted-foreground">
                            We want your input: questions, bug reports, complaints, praise, feature requests — every little bit helps to improve our service system.
                        </p>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}