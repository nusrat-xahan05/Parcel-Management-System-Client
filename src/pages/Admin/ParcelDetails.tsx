import { UpdateParcelModal } from "@/components/modules/Admin/UpdateParcelModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSingleParcelInfoQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel, IParcelStatusLog } from "@/types/parcel.type";
import { useNavigate, useParams } from "react-router";

export default function ParcelDetails() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();;
    const { data, isLoading } = useSingleParcelInfoQuery(id!);

    if (isLoading && !data) {
        return <p>Loading</p>;
    }

    return (
        <div className="container mx-auto max-w-3xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Parcel Information</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </div>

            {/* Parcel Details Card */}
            <Card className="border-l-4 border-l-primary shadow-lg rounded-2xl p-7">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold">
                        Parcel Details - {data?.data?.trackingId}
                    </CardTitle>
                    <UpdateParcelModal parcelInfo={data?.data as Partial<IParcel>}></UpdateParcelModal>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Parcel Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Parcel Information</h3>
                            <p className="text-sm">Parcel Type: {data?.data?.parcelType}</p>
                            <p className="text-sm">Weight: {data?.data?.weight} kg</p>
                            <p className="text-sm">Service Type: {data?.data?.serviceType}</p>
                            <p className="text-sm">Delivery Type: {data?.data?.deliveryType}</p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Payment & Status</h3>
                            <p className="text-sm">Cash on Delivery: {data?.data?.codAmount} TK.</p>
                            <p className="text-sm">Agent ID: {data?.data?.agentId || "Not Assigned"}</p>
                            <p className="text-sm">Current Status: <span className="bg-primary">{data?.data?.currentStatus}</span></p>
                        </div>
                    </div>

                    <Separator />
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Sender Information</h3>
                            <p className="text-sm">Email: {data?.data?.senderEmail}</p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Receiver Information</h3>
                            <p className="text-sm">Name: {data?.data?.receiverName}</p>
                            <p className="text-sm">Email: {data?.data?.receiverEmail}</p>
                            <p className="text-sm">Phone: {data?.data?.receiverPhone}</p>
                        </div>
                    </div>

                    <Separator />
                    {/* Addresses */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Pickup Address</h3>
                            <p className="text-sm">{data?.data?.pickUpAddress}</p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-muted-foreground mb-1.5">Delivery Address</h3>
                            <p className="text-sm">{data?.data?.deliveryAddress}</p>
                        </div>
                    </div>

                    <Separator />
                    {/* Status Log */}
                    <div>
                        <h3 className="text-base font-medium text-muted-foreground mb-1.5">Parcel Status Timeline</h3>
                        <div className="flex flex-wrap items-center space-x-2 space-y-3">
                            {data?.data?.parcelStatusLog.map((log: IParcelStatusLog, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-base">{log.status}</span>
                                        <span className="text-xs">
                                            {log.timeStamp}
                                        </span>
                                        <span className="text-xs">By: {log.updatedBy}</span>
                                    </div>

                                    {/* Arrow → only if not last item */}
                                    {index < ((data?.data?.parcelStatusLog?.length ?? 0) - 1) && (
                                        <span className="mx-2">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />
                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <p className="text-base font-medium text-muted-foreground mb-1.5">Created At: <span className="text-sm text-foreground">{data?.data?.createdAt}</span></p>
                        <p className="text-base font-medium text-muted-foreground mb-1.5">Last Updated: <span className="text-sm text-foreground">{data?.data?.updatedAt}</span></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
