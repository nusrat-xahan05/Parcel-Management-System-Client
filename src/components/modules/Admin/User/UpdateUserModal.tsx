import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AgentStatus, userStatus } from "@/constants/User";
import { useUpdateUserInfoMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import type { TAgentStatus, TUserStatus } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


type ChildProps = {
    profileInfo: IUser
}

const updateUserSchema = z
    .object({
        name: z
            .string({ error: "Name Must Be A String" })
            .min(3, { message: "Name is Too Short" })
            .max(50, { message: "Name is Too Long" })
            .optional(),
        isVerified: z
            .string()
            .optional(),
        phone: z
            .string({ error: "Phone Number Must Be String" })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, { message: "Phone Number Must Be Valid For Bangladesh. Formal: +8801XXXXXXXXX OR 01XXXXXXXXX" })
            .optional(),
        address: z
            .string({ error: "Address Must Be String" })
            .max(200, { message: "Address Cannot Exceed 200 Characters" })
            .optional(),
        userStatus: z
            .enum(Object.values(userStatus) as [TUserStatus, ...TUserStatus[]])
            .optional()
            .superRefine((val, ctx) => {
                if (val && !Object.values(userStatus).includes(val)) {
                    ctx.addIssue({
                        code: "custom",
                        message: `Status Must Be 'ACTIVE' or 'BLOCKED'. ${val} is Not Acceptable`,
                    });
                }
            }),
        agentStatus: z
            .enum(Object.values(AgentStatus) as [TAgentStatus, ...TAgentStatus[]])
            .optional()
            .superRefine((val, ctx) => {
                if (val && !Object.values(AgentStatus).includes(val)) {
                    ctx.addIssue({
                        code: "custom",
                        message: `${val} is Not Acceptable`,
                    });
                }
            }),
    })


export function UpdateUserModal({ profileInfo }: ChildProps) {
    const userStatuses: TUserStatus[] = ["ACTIVE", "BLOCKED"];
    const [open, setOpen] = useState(false);

    const [updateUserInfo] = useUpdateUserInfoMutation();

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: profileInfo.name,
            isVerified: profileInfo.isVerified ? "true" : "false",
            address: profileInfo.address,
            phone: profileInfo.phone,
            userStatus: profileInfo.userStatus,
            agentStatus: profileInfo.agentStatus
        },
    });

    const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
        const updatedInfo = {
            name: data.name,
            isVerified: data.isVerified === 'true' ? true : false,
            address: data.address,
            phone: data.phone,
            userStatus: data.userStatus,
            agentStatus: data.agentStatus
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <FormField
                                control={form.control}
                                name="agentStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agent Status</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || profileInfo.agentStatus}
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isVerified"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verified</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={profileInfo.isVerified?.toString()}>
                                            <FormControl>
                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-primary">
                                                <SelectItem value="true">Yes</SelectItem>
                                                <SelectItem value="false">No</SelectItem>
                                            </SelectContent>
                                            <FormMessage></FormMessage>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="userStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={profileInfo.userStatus}>
                                            <FormControl>
                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-primary">
                                                {userStatuses.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status === "ACTIVE" ? "Active" : "Blocked"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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