import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentStatus } from "@/constants/User";
import { useUpdateAgentReqMutation } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";
import type { TAgentStatus } from "@/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


type ChildProps = {
    profileInfo: IUser
}

const updateAgentSchema = z
    .object({
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


export function UpdateAgentRequest({ profileInfo }: ChildProps) {
    const agentStatuses: TAgentStatus[] = ["APPROVED", "REJECTED"];
    const [open, setOpen] = useState(false);

    const [updateAgentReq] = useUpdateAgentReqMutation();

    const form = useForm<z.infer<typeof updateAgentSchema>>({
        resolver: zodResolver(updateAgentSchema),
        defaultValues: {
            agentStatus: profileInfo.agentStatus
        },
    });

    const onSubmit = async (data: z.infer<typeof updateAgentSchema>) => {
        const updatedInfo = {
            agentStatus: data.agentStatus
        };

        const toastId = toast.loading("Updating...");
        try {
            const res = await updateAgentReq({ userId: profileInfo._id, userData: updatedInfo }).unwrap();
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
                <Button>Update Agent Request</Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Review Agent Request</DialogTitle>
                    <p className="mb-4 text-center text-muted-foreground">{profileInfo.email} | {profileInfo.role}</p>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-6" id="update-user-info" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="agentStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Agent Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={profileInfo.userStatus}>
                                            <FormControl>
                                                <SelectTrigger className="w-full px-5 rounded-xl">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-primary">
                                                {agentStatuses.map((status) => (
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