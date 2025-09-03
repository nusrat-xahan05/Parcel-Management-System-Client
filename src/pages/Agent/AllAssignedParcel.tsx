import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useState } from "react";
import { useAssignedParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IAllParcelQueryParams, IParcel } from "@/types";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import { UpdateAssignedParcelStatus } from "@/components/modules/Agent/UpdateAssignedParcelStatus";

export default function AllAssignedParcel() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    console.log(setLimit);

    const queryParams: IAllParcelQueryParams = {
        page: currentPage,
        limit
    };
    const { data, isLoading: allParcelLoading } = useAssignedParcelsQuery(queryParams);

    const totalPage = data?.meta?.totalPage || 1;

    return (
        <div className="relative w-full h-screen">
            {
                allParcelLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !allParcelLoading && (
                    <div className="w-full max-w-7xl mx-auto px-5">
                        <div className="flex justify-between my-8">
                            <h1 className="text-xl font-semibold">Parcel List</h1>
                        </div>
                        <div className="overflow-x-auto w-full border border-muted rounded-md">
                            <Table className="table-fixed w-full min-w-[600px]">
                                <TableHeader className="bg-primary/50">
                                    <TableRow>
                                        <TableHead className="w-[25%] text-center">Parcel Id</TableHead>
                                        <TableHead className="w-[20%] text-center">Receiver Phone</TableHead>
                                        <TableHead className="w-[25%] text-center">Delivery Address</TableHead>
                                        <TableHead className="w-[15%] text-center">Current Status</TableHead>
                                        <TableHead className="w-[15%] text-center">Update</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.map((item: IParcel, idx: number) => (
                                        <TableRow key={idx}>
                                            <TableCell className="w-[25%] text-center break-words whitespace-normal">{item?._id}</TableCell>
                                            <TableCell className="w-[20%] text-center">{item?.receiverPhone}</TableCell>
                                            <TableCell className="w-[25%] text-center break-words whitespace-normal">{item?.deliveryAddress}</TableCell>
                                            <TableCell className="w-[15%] text-center">{item?.currentStatus}</TableCell>
                                            <TableCell className="w-[15%] text-center">
                                                <UpdateAssignedParcelStatus parcelInfo={item}></UpdateAssignedParcelStatus>
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
                )
            }
        </div>
    );
}