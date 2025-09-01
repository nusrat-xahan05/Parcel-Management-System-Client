import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useState } from "react";
import { useCancelParcelMutation, useMyParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcel } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import { parcelStatus } from "@/constants/Parcel";
import { CancelConfirmation } from "@/components/CancelConfirmation";
import { toast } from "sonner";

export default function MyParcels() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    console.log(setLimit);

    const { data } = useMyParcelsQuery({ page: currentPage, limit });
    const [cancelParcel] = useCancelParcelMutation();

    const handleCancelParcel = async (parcelId: string) => {
        console.log('From Cancel main: ', parcelId);

        const toastId = toast.loading("Cancelling...");
        try {
            const res = await cancelParcel(parcelId).unwrap();

            console.log('from res: ', res)
            if (res.success) {
                toast.success(res.message, { id: toastId });
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log('from error: ', err)
            toast.error(err.message, { id: toastId });
        }
    };

    const totalPage = data?.meta?.totalPage || 1;

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">My Created Parcel List</h1>
            </div>
            <div className="border border-muted rounded-md">
                <Table className="table-fixed w-full">
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            <TableHead className="w-[25%] text-center">Parcel Id</TableHead>
                            <TableHead className="w-[25%] text-center">Receiver</TableHead>
                            <TableHead className="w-[20%] text-center">Status</TableHead>
                            <TableHead className="w-[15%] text-center">Cancel</TableHead>
                            <TableHead className="w-[15%] text-center">View Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: IParcel, idx: number) => (
                            <TableRow key={idx}>
                                <TableCell className="w-[25%] text-center">{item?._id}</TableCell>
                                <TableCell className="w-[25%] text-center">{item?.receiverEmail}</TableCell>
                                <TableCell className="w-[20%] text-center">{item?.currentStatus}</TableCell>
                                <TableCell className="w-[15%] text-center">
                                    <CancelConfirmation onConfirm={() => handleCancelParcel(item._id as string)}>
                                        <Button
                                            size="sm"
                                            disabled={!(item?.currentStatus === parcelStatus.REQUESTED || item?.currentStatus === parcelStatus.APPROVED)}>Cancel
                                        </Button>
                                    </CancelConfirmation>
                                </TableCell>
                                <TableCell className="w-[15%] text-center">
                                    <Button size="sm"><Link to={`/admin/parcel/${item._id}`}><Eye></Eye></Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
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
    );
}