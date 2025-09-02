import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserInfoMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


type ChildProps = {
    profileInfo: IUser
}

const editInfoSchema = z
    .object({
        name: z
            .string({ error: "Name Must Be A String" })
            .min(3, { message: "Name is Too Short" })
            .max(50, { message: "Name is Too Long" })
            .optional(),
        phone: z
            .string({ error: "Phone Number Must Be String" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh. Formal: +8801XXXXXXXXX OR 01XXXXXXXXX" })
            .optional(),
        address: z
            .string({ error: "Address Must Be String" })
            .max(200, { message: "Address Cannot Exceed 200 Characters" })
            .optional()
    })


export function EditInfoModal({ profileInfo }: ChildProps) {
    const [open, setOpen] = useState(false);

    const [updateUserInfo] = useUpdateUserInfoMutation();

    const form = useForm<z.infer<typeof editInfoSchema>>({
        resolver: zodResolver(editInfoSchema),
        defaultValues: {
            name: profileInfo.name,
            address: profileInfo.address,
            phone: profileInfo.phone
        },
    });

    const onSubmit = async (data: z.infer<typeof editInfoSchema>) => {
        const updatedInfo = {
            name: data.name,
            address: data.address,
            phone: data.phone
        };

        const toastId = toast.loading("Updating...");
        try {
            const res = await updateUserInfo({ userId: profileInfo._id, userData: updatedInfo }).unwrap();
            toast.success(res.message, { id: toastId });
            setOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.data.message, { id: toastId });
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit Info</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Update User Information</DialogTitle>
                    <p className="mb-4 text-center text-muted-foreground">{profileInfo.email} | {profileInfo.role}</p>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6" id="update-user-info" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || profileInfo.name}
                                            />
                                        </FormControl>
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
                                                type="phone"
                                                {...field}
                                                value={field.value || profileInfo.phone || "+880"}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write Your Address..."
                                            {...field} className="h-[100px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="update-user-info">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}