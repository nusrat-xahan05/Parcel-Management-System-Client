import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DeliveryType, ParcelType, ServiceType } from "@/constants/Parcel";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import type { IParcel, TDeliveryType, TParcelType, TServiceType } from "@/types/parcel.type";
// import type { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import parcelImg from '@/assets/images/parcels.png';
import { Separator } from "@/components/ui/separator";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";

const createParcelZodSchema = z.object({
    serviceType: z
        .enum(Object.values(ServiceType) as [TServiceType, ...TServiceType[]])
        .optional()
        .refine((val) => val !== undefined, {
            message: "Service Type is Required",
        })
        .superRefine((val, ctx) => {
            if (val && !Object.values(ServiceType).includes(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: `${val} is Not Acceptable`,
                });
            }
        }),
    deliveryType: z
        .enum(Object.values(DeliveryType) as [TDeliveryType, ...TDeliveryType[]])
        .optional()
        .refine((val) => val !== undefined, {
            message: "Delivery Type is Required",
        })
        .superRefine((val, ctx) => {
            if (val && !Object.values(DeliveryType).includes(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: `${val} is Not Acceptable`,
                });
            }
        }),
    parcelType: z
        .enum(Object.values(ParcelType) as [TParcelType, ...TParcelType[]])
        .optional()
        .refine((val) => val !== undefined, {
            message: "Parcel Type is Required",
        })
        .superRefine((val, ctx) => {
            if (val && !Object.values(ParcelType).includes(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: `${val} is Not Acceptable`,
                });
            }
        }),
    senderEmail: z
        .string()
        .optional(),
    receiverName: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Receiver Name is Required"
                : "Receiver Name Must Be a String"
        })
        .min(2, { message: "Receiver Name Too Short" })
        .max(50, { message: "Receiver Name Too Long" }),
    receiverEmail: z
        .email({ message: "Invalid Email Address Format" })
        .regex(
            // eslint-disable-next-line no-useless-escape
            /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
            { message: "Invalid Email Address Format" }
        )
        .transform((val) => val.toLowerCase()),
    receiverPhone: z
        .string({ error: "Phone Number Must Be String" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh. Formal: +8801XXXXXXXXX OR 01XXXXXXXXX" }),
    pickUpAddress: z
        .string({
            error: (issue) => issue.input === undefined
                ? "PickUp Address is Required"
                : "PickUp Address Must Be a String"
        })
        .max(200, { message: "Pickup Address Cannot Exceed 400 Characters" }),
    deliveryAddress: z
        .string({
            error: (issue) => issue.input === undefined
                ? "Delivery Address is Required"
                : "Delivery Address Must Be a String"
        })
        .max(200, { message: "Delivery Address Cannot Exceed 400 Characters" }),
    weight: z
        .string()
        .min(1, {
            message: 'Weight must be a Positive Number'
        }),
    codAmount: z
        .string()
        .min(0, {
            message: 'Cash On Delivery Amount must be a Positive Number'
        }),
})

export default function CreateParcel() {
    const serviceTypes: TServiceType[] = ["REGULAR", "SAME DAY"];
    const deliveryTypes: TDeliveryType[] = ["HOME", "ADDRESS POINT"];
    const parcelTypes: TParcelType[] = ['FRAGILE', "CLOTHES", "ELECTRONICS", "FOOD ITEMS", "MEDICAL", "DOCUMENTS", "OTHERS"];

    const [createParcel] = useCreateParcelMutation();
    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined);


    const form = useForm<z.infer<typeof createParcelZodSchema>>({
        resolver: zodResolver(createParcelZodSchema),
        defaultValues: {
            serviceType: "REGULAR",
            deliveryType: "HOME",
            parcelType: "CLOTHES",
            senderEmail: "Loading...",
            receiverName: "John Doe",
            receiverEmail: "john.doe@company.com",
            receiverPhone: "+8801234567890",
            pickUpAddress: "Loading...",
            deliveryAddress: "ABC Block, Dhaka",
            weight: "1",
            codAmount: "0",
        },
    });

    useEffect(() => {
        if (!userLoading && userData?.data) {
            form.reset({
                serviceType: "REGULAR",
                deliveryType: "HOME",
                parcelType: "CLOTHES",
                senderEmail: userData.data.email || "Not Provided",
                receiverName: "John Doe",
                receiverEmail: "john.doe@company.com",
                receiverPhone: "+8801234567890",
                pickUpAddress: userData.data.address || "Not Provided",
                deliveryAddress: "ABC Block, Dhaka",
                weight: "1",
                codAmount: "0",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoading, userData]);


    const handleSubmit = async (data: z.infer<typeof createParcelZodSchema>) => {
        const parcelData = {
            ...data,
            weight: Number(data.weight),
            codAmount: Number(data.codAmount)
        };

        const toastId = toast.loading("Processing....");
        try {
            const res = await createParcel(parcelData as IParcel).unwrap();

            if (res.success) {
                toast.success(res.message, { id: toastId });
                form.reset();
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if(err.data.message === 'Zod Error'){
                toast.error(`${err.data.errorSources[0].message}`, { id: toastId });
            }
            toast.error(`${err.data.message}`, { id: toastId });
        }
    };

    return (
        <div className="relative w-full h-screen">
            {
                userLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !userLoading && (
                    <div className="w-full max-w-4xl mx-auto px-5 mt-16">
                        <Card className="border-l-4 border-l-primary shadow-lg rounded-2xl p-7">
                            <CardHeader className="flex gap-6 mb-3.5">
                                <img className="size-14" src={parcelImg} alt="Parcel Image" />
                                <div>
                                    <CardTitle className="text-2xl font-semibold">Create New Parcel</CardTitle>
                                    <CardDescription className="mb-4 text-muted-foreground">Fill the details to create a parcel</CardDescription>
                                </div>

                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form
                                        id="create-parcel"
                                        className="space-y-5"
                                        onSubmit={form.handleSubmit(handleSubmit)}
                                    >
                                        <h3 className="text-lg font-medium text-muted-foreground mb-1.5">Parcel Information</h3>
                                        <Separator></Separator>
                                        <div className="grid grid-cols-4 gap-6 mt-2">
                                            <FormField
                                                control={form.control}
                                                name="serviceType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Service Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                                    <SelectValue placeholder="Select Service" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-primary">
                                                                {serviceTypes.map((option) => (
                                                                    <SelectItem key={option} value={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="deliveryType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Delivery Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                                    <SelectValue placeholder="Select Delivery" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-primary">
                                                                {deliveryTypes.map((option) => (
                                                                    <SelectItem key={option} value={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="parcelType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Parcel Type</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                                    <SelectValue placeholder="Select Parcel" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="bg-primary">
                                                                {parcelTypes.map((option) => (
                                                                    <SelectItem key={option} value={option}>
                                                                        {option}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="weight"
                                                render={({ field, fieldState }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Parcel Weight (KG)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number" {...field} value={field.value || ""} />
                                                        </FormControl>
                                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <h3 className="text-lg font-medium text-muted-foreground mb-1.5 mt-6">Cash On Delivery Amount</h3>
                                        <Separator></Separator>
                                        <div className="grid grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="codAmount"
                                                render={({ field, fieldState }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>COD Amount (TK)</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number" {...field} value={field.value || ""} />
                                                        </FormControl>
                                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <h3 className="text-lg font-medium text-muted-foreground mb-1.5 mt-6">Receiver Information</h3>
                                        <Separator></Separator>
                                        <div className="grid grid-cols-2 gap-6 items-start">
                                            <FormField
                                                control={form.control}
                                                name="receiverName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Receiver Name</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="receiverEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Receiver Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="email"
                                                                placeholder="john.doe@company.com"
                                                                type="email"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="receiverPhone"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Receiver Phone</FormLabel>
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
                                                name="deliveryAddress"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>Delivery Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea {...field} className="h-[80px]" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <h3 className="text-lg font-medium text-muted-foreground mb-1.5 mt-6">Sender Information</h3>
                                        <Separator></Separator>
                                        <div className="grid grid-cols-2 gap-6 items-start">
                                            <FormField
                                                control={form.control}
                                                name="senderEmail"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Sender Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="email"
                                                                type="email"
                                                                {...field}
                                                                disabled
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="pickUpAddress"
                                                render={({ field }) => (
                                                    <FormItem className="flex-1">
                                                        <FormLabel>PickUp Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea {...field} className="h-[80px]" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit" form="create-parcel">
                                    Create Parcel
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )
            }
        </div>
    );
}