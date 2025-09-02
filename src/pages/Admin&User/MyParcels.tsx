import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useState } from "react";
import { useCancelParcelMutation, useMyParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcel } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import { parcelStatus } from "@/constants/Parcel";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { ConfirmationAlert } from "@/components/ConfirmationAlert";

export default function MyParcels() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    console.log(setLimit);

    const { data: userData, isLoading: userLoading } = useUserInfoQuery(undefined);
    const userRole = userData?.data?.role?.toLowerCase();

    const { data, isLoading: parcelLoading } = useMyParcelsQuery({ page: currentPage, limit });
    const [cancelParcel] = useCancelParcelMutation();

    const handleCancelParcel = async (parcelId: string) => {
        const toastId = toast.loading("Cancelling...");
        try {
            const res = await cancelParcel(parcelId).unwrap();
            if (res.success) {
                toast.success(res.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message, { id: toastId });
        }
    };

    const totalPage = data?.meta?.totalPage || 1;

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
                            <h1 className="text-xl font-semibold">My Created Parcel List</h1>
                        </div>
                        <div className="overflow-x-auto w-full border border-muted rounded-md">
                            <Table className="table-fixed w-full min-w-[600px]">
                                <TableHeader className="bg-primary/50">
                                    <TableRow>
                                        <TableHead className="hidden lg:inline-block mt-0 lg:mt-1.5 w-[25%] text-center">Parcel Id</TableHead>
                                        <TableHead className="w-[25%] text-center">Receiver</TableHead>
                                        <TableHead className="w-[20%] text-center">Status</TableHead>
                                        <TableHead className="w-[15%] text-center">Cancel</TableHead>
                                        <TableHead className="w-[15%] text-center">View Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Array.isArray(data?.data) && data.data.length > 0 ? (data?.data?.map((item: IParcel, idx: number) => (
                                        <TableRow key={idx}>
                                            <TableCell className="hidden lg:inline-block mt-0 lg:mt-1.5 w-[25%] text-center">{item?._id}</TableCell>
                                            <TableCell className="w-[25%] text-center">{item?.receiverEmail}</TableCell>
                                            <TableCell className="w-[20%] text-center">{item?.currentStatus}</TableCell>
                                            <TableCell className="w-[15%] text-center">
                                                <ConfirmationAlert onConfirm={() => handleCancelParcel(item._id as string)}>
                                                    <Button
                                                        size="sm"
                                                        disabled={!(item?.currentStatus === parcelStatus.REQUESTED || item?.currentStatus === parcelStatus.APPROVED)}>Cancel
                                                    </Button>
                                                </ConfirmationAlert>
                                            </TableCell>
                                            <TableCell className="w-[15%] text-center">
                                                <Button size="sm"><Link to={`/${userRole}/parcel/${item._id}`}><Eye></Eye></Link></Button>
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

                            {totalPage > 1 && (
                                <div className="flex justify-end mt-4">
                                    <div>
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() => setCurrentPage((prev) => prev - 1)}
                                                        className={
                                                            currentPage === 1
                                                                ? "pointer-events-none opacity-50"
                                                                : "cursor-pointer"
                                                        }
                                                    />
                                                </PaginationItem>
                                                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                                    (page) => (
                                                        <PaginationItem
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                        >
                                                            <PaginationLink isActive={currentPage === page}>
                                                                {page}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                )}
                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                                        className={
                                                            currentPage === totalPage
                                                                ? "pointer-events-none opacity-50"
                                                                : "cursor-pointer"
                                                        }
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}