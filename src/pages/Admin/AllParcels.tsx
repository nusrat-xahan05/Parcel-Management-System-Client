import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useState } from "react";
import { useAllParcelInfoQuery } from "@/redux/features/parcel/parcel.api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IParcel } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Eye } from "lucide-react";

export default function AllParcels() {
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [limit, setLimit] = useState(5);

    const { data } = useAllParcelInfoQuery({ page: currentPage, limit });
    const totalPage = data?.meta?.totalPage || 1;

    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Parcel List</h1>
            </div>
            <div className="border border-muted rounded-md">
                <Table className="table-fixed w-full">
                    <TableHeader className="bg-primary/50">
                        <TableRow>
                            <TableHead className="w-1/5 text-center">Parcel Id</TableHead>
                            <TableHead className="w-1/5 text-center">Sender</TableHead>
                            <TableHead className="w-1/5 text-center">Receiver</TableHead>
                            <TableHead className="w-1/5 text-center">Status</TableHead>
                            <TableHead className="w-1/5 text-center">View Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((item: IParcel, idx: number) => (
                            <TableRow key={idx}>
                                <TableCell className="w-1/5 text-center">{item?._id}</TableCell>
                                <TableCell className="w-1/5 text-center">{item?.senderEmail}</TableCell>
                                <TableCell className="w-1/5 text-center">{item?.receiverEmail}</TableCell>
                                <TableCell className="w-1/5 text-center">{item?.currentStatus}</TableCell>
                                <TableCell className="w-1/5 text-center">
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