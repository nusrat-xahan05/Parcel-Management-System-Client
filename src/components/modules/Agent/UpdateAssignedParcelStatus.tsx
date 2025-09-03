import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parcelStatus } from "@/constants/Parcel";
import { useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types";
import type { TParcelStatus } from "@/types/parcel.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


type ChildProps = {
    parcelInfo: IParcel
}

const updateParcelStatusSchema = z
    .object({
        currentStatus: z
            .enum(Object.values(parcelStatus) as [TParcelStatus, ...TParcelStatus[]])
            .optional()
            .refine((val) => val !== undefined, {
                message: "Status is Required",
            })
            .superRefine((val, ctx) => {
                if (val && !Object.values(parcelStatus).includes(val)) {
                    ctx.addIssue({
                        code: "custom",
                        message: `${val} is Not Acceptable`,
                    });
                }
            }),
    })


export function UpdateAssignedParcelStatus({ parcelInfo }: ChildProps) {
    const parcelStatuses: TParcelStatus[] = ["DISPATCHED", "IN TRANSIT", "OUT FOR DELIVERY", "DELIVERED"];
    const [open, setOpen] = useState(false);

    const [updateParcelStatus] = useUpdateParcelStatusMutation();

    const form = useForm<z.infer<typeof updateParcelStatusSchema>>({
        resolver: zodResolver(updateParcelStatusSchema),
        defaultValues: {
            currentStatus: parcelInfo.currentStatus
        },
    });

    const onSubmit = async (data: z.infer<typeof updateParcelStatusSchema>) => {
        const updatedInfo = {
            currentStatus: data.currentStatus
        };

        console.log('from data: ', updatedInfo);

        const toastId = toast.loading("Updating...");
        try {
            const res = await updateParcelStatus({ parcelId: parcelInfo._id, parcelData: updatedInfo }).unwrap();
            console.log('from update res: ', res);
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
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Update Parcel Status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6" id="update-user-info" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
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
                        </div>
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