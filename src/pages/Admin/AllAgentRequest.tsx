import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useState } from "react";
import { useAllAgentRequestQuery } from "@/redux/features/user/user.api";
import type { IAllUserQueryParams, IUser } from "@/types";
import { Eye } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import LoadingSpinner from "@/components/layout/LoadingSpinner/LoadingSpinner";
import UserFilter from "@/components/modules/Admin/User/UserFilter";

export default function AllAgentRequest() {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(8);

    const role = searchParams.get("role") || undefined;
    const userStatus = searchParams.get("userStatus") || undefined;
    const agentStatus = searchParams.get("agentStatus") || undefined;
    const email = searchParams.get("email") || undefined;

    const queryParams: IAllUserQueryParams = {
        role,
        userStatus,
        agentStatus,
        email,
        page: currentPage,
        limit
    };

    const { data, isLoading: allUserLoading } = useAllAgentRequestQuery(queryParams);

    const totalPage = data?.meta?.totalPage || 1;

    return (
        <div className="relative w-full h-screen">
            {
                allUserLoading && (
                    <LoadingSpinner></LoadingSpinner>
                )
            }

            {
                !allUserLoading && (
                    <div className="w-full max-w-7xl mx-auto px-5">
                        <UserFilter></UserFilter>
                        <div className="flex justify-between my-8">
                            <h1 className="text-xl font-semibold">User List</h1>
                        </div>
                        <div className="overflow-x-auto w-full border border-muted rounded-md">
                            <Table className="table-fixed w-full min-w-[600px]">
                                <TableHeader className="bg-primary/50">
                                    <TableRow>
                                        <TableHead className="w-1/5 text-center">Email</TableHead>
                                        <TableHead className="w-1/5 text-center">Role</TableHead>
                                        <TableHead className="w-1/5 text-center">Agent Status</TableHead>
                                        <TableHead className="w-1/5 text-center">Verification</TableHead>
                                        <TableHead className="w-1/5 text-center">View Details</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.data?.map((item: Partial<IUser>, idx: number) => (
                                        <TableRow key={idx}>
                                            <TableCell className="w-1/5 text-center">{item?.userId?.email}</TableCell>
                                            <TableCell className="w-1/5 text-center">{item?.userId?.role}</TableCell>
                                            <TableCell className="w-1/5 text-center">{item?.agentStatus}</TableCell>
                                            <TableCell className="w-1/5 text-center">
                                                {item?.userId?.isVerified ? "Yes" : "No"}
                                            </TableCell>
                                            <TableCell className="w-1/5 text-center">
                                                <Button size="sm"><Link to={`/admin/user/${item?.userId?._id}`}><Eye></Eye></Link></Button>
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