import { useConfirmParcelMutation, useIncomingParcelQuery } from "@/redux/features/parcel/parcel.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcel } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { ConfirmationAlert } from "@/components/ConfirmationAlert";
import { parcelStatus } from "@/constants/Parcel";
import { toast } from "sonner";

export default function IncomingParcels() {
    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined);
    const userRole = userData?.data?.role?.toLowerCase();

    const { data, isLoading: parcelLoading } = useIncomingParcelQuery();
    const [confirmParcel] = useConfirmParcelMutation();

    const handleConfirmParcel = async (parcelId: string) => {
        const toastId = toast.loading("Confirming...");
        try {
            const res = await confirmParcel(parcelId).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message, { id: toastId });
        }
    };

    return (
        <div className="relative w-full h-screen">
            {
                (userLoading || parcelLoading) && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !(userLoading || parcelLoading) && (
                    <div className="w-full max-w-7xl mx-auto px-5">
                        <div className="flex justify-between my-8">
                            <h1 className="text-xl font-semibold">Incoming Parcel List</h1>
                        </div>
                        <div className="overflow-x-auto w-full border border-muted rounded-md">
                            <Table className="table-fixed w-full min-w-[600px]">
                                <TableHeader className="bg-primary/50">
                                    <TableRow>
                                        <TableHead className="w-[30%] text-center">Parcel Id</TableHead>
                                        <TableHead className="w-[25%] text-center">Sender</TableHead>
                                        <TableHead className="w-[15%] text-center">Status</TableHead>
                                        <TableHead className="w-[15%] text-center">Confirm Delivery</TableHead>
                                        <TableHead className="w-[15%] text-center">View Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.isArray(data?.data) && data.data.length > 0 ? (
                                        data.data.map((item: IParcel, idx: number) => (
                                            <TableRow key={idx}>
                                                <TableCell className="w-[30%] text-center">{item?._id}</TableCell>
                                                <TableCell className="w-[25%] text-center">{item?.senderEmail}</TableCell>
                                                <TableCell className="w-[15%] text-center">{item?.currentStatus}</TableCell>
                                                <TableCell className="w-[15%] text-center">
                                                    <ConfirmationAlert onConfirm={() => handleConfirmParcel(item._id as string)}>
                                                        <Button
                                                            size="sm"
                                                            disabled={(item?.currentStatus !== parcelStatus.DELIVERED)}>Confirm
                                                        </Button>
                                                    </ConfirmationAlert>
                                                </TableCell>
                                                <TableCell className="w-[15%] text-center">
                                                    <Button size="sm">
                                                        <Link to={`/${userRole}/parcel/${item._id}`}>
                                                            <Eye />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">
                                                No parcels found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )
            }
        </div>
    );
}