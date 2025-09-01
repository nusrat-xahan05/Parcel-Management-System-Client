import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IParcelStatusLog } from "@/types/parcel.type";


const trackParcelSchema = z.object({
    id: z
        .string()
        .min(1, { message: "Tracking ID is required" })
});


export default function TrackParcel() {
    const form = useForm<z.infer<typeof trackParcelSchema>>({
        resolver: zodResolver(trackParcelSchema),
        defaultValues: {
            id: ""
        },
    });

    const [trigger, { data: parcelData, isFetching, error: trackingError }] = useLazyTrackParcelQuery();

    const onSubmit = async (data: z.infer<typeof trackParcelSchema>) => {
        console.log('track data: ', data.id);
        trigger(data.id);
    };

    let disableBtn = false;
    if (parcelData) {
        disableBtn = true;
    }

    return (
        <div className="min-h-[350px] max-w-3xl mx-auto flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center my-7">Enter the Parcel Tracking ID</h1>

            <div className="mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-center">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="w-[300px]" placeholder="Tracking ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={disableBtn}>
                            {isFetching ? "Loading..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="mt-6">
                {
                    !parcelData && (
                        <div className="text-red-500 text-center">
                            {(trackingError as { data?: { message?: string } })?.data?.message || ""}
                        </div>
                    )
                }

                {parcelData && (
                    <Card className="border-l-4 border-l-primary shadow-lg rounded-2xl p-7">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-semibold">
                                Parcel Details - {parcelData?.data?.trackingId}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-base font-medium text-muted-foreground mb-1.5">Parcel Information</h3>
                                    <p className="text-sm">Parcel Type: {parcelData?.data?.parcelType}</p>
                                    <p className="text-sm">Weight: {parcelData?.data?.weight} kg</p>
                                    <p className="text-sm">Cash on Delivery: {parcelData?.data?.codAmount} TK.</p>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-muted-foreground mb-1.5">Delivery Address</h3>
                                    <p className="text-sm">{parcelData?.data?.deliveryAddress}</p>
                                </div>
                            </div>

                            <Separator />
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-base font-medium text-muted-foreground mb-1.5">Sender Information</h3>
                                    <p className="text-sm">Name: {parcelData?.data?.senderName}</p>
                                    <p className="text-sm">Email: {parcelData?.data?.senderEmail}</p>
                                    <p className="text-sm">Phone: {parcelData?.data?.senderPhone}</p>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-muted-foreground mb-1.5">Receiver Information</h3>
                                    <p className="text-sm">Name: {parcelData?.data?.receiverName}</p>
                                    <p className="text-sm">Email: {parcelData?.data?.receiverEmail}</p>
                                    <p className="text-sm">Phone: {parcelData?.data?.receiverPhone}</p>
                                </div>
                            </div>

                            <Separator />
                            {/* Status Log */}
                            <div>
                                <h3 className="text-base font-medium text-muted-foreground mb-1.5">Parcel Status Timeline</h3>
                                <div className="flex flex-wrap items-center space-x-2 space-y-3">
                                    {parcelData?.data?.parcelStatusLog.map((log: IParcelStatusLog, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="flex flex-col items-center text-center">
                                                <span className="text-base">{log.status}</span>
                                                <span className="text-xs">
                                                    {log.timeStamp}
                                                </span>
                                                <span className="text-xs">By: {log.updatedBy}</span>
                                            </div>

                                            {/* Arrow → only if not last item */}
                                            {index < ((parcelData?.data?.parcelStatusLog?.length ?? 0) - 1) && (
                                                <span className="mx-2">→</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}


