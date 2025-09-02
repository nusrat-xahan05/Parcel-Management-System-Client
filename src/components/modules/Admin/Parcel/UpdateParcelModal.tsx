import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parcelStatus } from "@/constants/Parcel";
import { useUpdateParcelInfoMutation } from "@/redux/features/parcel/parcel.api";
import { useAllUserInfoQuery } from "@/redux/features/user/user.api";
import type { IParcel, IUser } from "@/types";
import type { TParcelStatus } from "@/types/parcel.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


type ChildProps = {
    parcelInfo: Partial<IParcel>
}

const updateParcelZodSchema = z.object({
    agentId: z
        .string({ error: 'Agent Id Must Be String' })
        .optional(),
    currentStatus: z
        .enum(Object.values(parcelStatus) as [TParcelStatus, ...TParcelStatus[]])
        .optional()
        .superRefine((val, ctx) => {
            if (val && !Object.values(parcelStatus).includes(val)) {
                ctx.addIssue({
                    code: "custom",
                    message: `${val} is Not Acceptable`,
                });
            }
        }),
}).refine((value) => {
    if ((value.currentStatus === parcelStatus.APPROVED) && !value.agentId) {
        return false;
    }
    return true;
}, {
    message: "Need to Assign To An Agent as the Parcel is Approved"
})


export function UpdateParcelModal({ parcelInfo }: ChildProps) {
    const parcelStatuses: TParcelStatus[] = ["APPROVED", "DISPATCHED", "IN TRANSIT", "OUT FOR DELIVERY", "DELIVERED", "CONFIRMED", "CANCELLED", "BLOCKED"];
    const [open, setOpen] = useState(false);

    const { data: allUsers, isLoading: agentLoading } = useAllUserInfoQuery({});
    const agents = allUsers?.data?.filter((user: IUser) => user.role === "AGENT") || [];

    const [updateParcelInfo] = useUpdateParcelInfoMutation();

    const form = useForm<z.infer<typeof updateParcelZodSchema>>({
        resolver: zodResolver(updateParcelZodSchema),
        defaultValues: {
            agentId: parcelInfo.agentId,
            currentStatus: parcelInfo.currentStatus,
        },
    });

    const currentStatus = form.watch("currentStatus");
    const onSubmit = async (data: z.infer<typeof updateParcelZodSchema>) => {
        const updatedInfo = {
            agentId: data.agentId,
            currentStatus: data.currentStatus
        };

        const toastId = toast.loading("Updating...");
        try {
            const res = await updateParcelInfo({ parcelId: parcelInfo._id, parcelData: updatedInfo }).unwrap();
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
                <Button>Update Status</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Update Parcel Status</DialogTitle>
                    <p className="mb-4 text-center text-muted-foreground">{parcelInfo.currentStatus}</p>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6" id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="currentStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parcel Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={parcelInfo.currentStatus}>
                                            <FormControl>
                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-primary">
                                                {parcelStatuses.map((status) => (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {currentStatus === "APPROVED" && (
                                <FormField
                                    control={form.control}
                                    name="agentId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assign Agent</FormLabel>
                                            <Select 
                                                onValueChange={field.onChange} 
                                                defaultValue={parcelInfo.agentId}
                                                disabled={agentLoading}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an Agent" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {agents.map((agent: IUser) => (
                                                        <SelectItem key={agent._id} value={agent?._id ? agent?._id : ' '}>
                                                            {agent.email}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="add-tour-type">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}